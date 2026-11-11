/**
 * A minimal zip writer, so a generated directory can also be offered as one download.
 *
 * Written by hand to avoid a build dependency: the format needed here is a local
 * header and a central directory entry per file. Deflate comes from Node's zlib.
 *
 * Entries are stamped with the zip epoch (1980-01-01), not the wall clock, so
 * rebuilding unchanged content produces a byte-identical archive.
 */

import { deflateRawSync } from 'node:zlib';

const LOCAL_HEADER = 0x04034b50;
const CENTRAL_HEADER = 0x02014b50;
const END_OF_CENTRAL_DIRECTORY = 0x06054b50;

const DEFLATED = 8;
const UTF8_NAMES = 0x0800;
const VERSION = 20;

// 1980-01-01 00:00:00, the earliest a DOS timestamp can express
const DOS_DATE = (1 << 5) | 1;
const DOS_TIME = 0;

const CRC_TABLE = new Uint32Array(256).map((_, index) => {
  let value = index;
  for (let bit = 0; bit < 8; bit += 1) {
    value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  }
  return value;
});

function crc32(buffer: Buffer): number {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

/**
 * Packs files into a zip archive.
 *
 * @param files - Path inside the archive mapped to its contents, written as UTF-8
 * @returns The archive
 */
export function zipArchive(files: Iterable<[string, string]>): Buffer {
  const parts: Buffer[] = [];
  const directory: Buffer[] = [];
  let entries = 0;
  let offset = 0;

  for (const [name, contents] of files) {
    const data = Buffer.from(contents, 'utf8');
    const compressed = deflateRawSync(data);
    const filePath = Buffer.from(name, 'utf8');
    const crc = crc32(data);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(LOCAL_HEADER, 0);
    local.writeUInt16LE(VERSION, 4);
    local.writeUInt16LE(UTF8_NAMES, 6);
    local.writeUInt16LE(DEFLATED, 8);
    local.writeUInt16LE(DOS_TIME, 10);
    local.writeUInt16LE(DOS_DATE, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(compressed.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(filePath.length, 26);
    local.writeUInt16LE(0, 28);

    const entry = Buffer.alloc(46);
    entry.writeUInt32LE(CENTRAL_HEADER, 0);
    entry.writeUInt16LE(VERSION, 4);
    entry.writeUInt16LE(VERSION, 6);
    entry.writeUInt16LE(UTF8_NAMES, 8);
    entry.writeUInt16LE(DEFLATED, 10);
    entry.writeUInt16LE(DOS_TIME, 12);
    entry.writeUInt16LE(DOS_DATE, 14);
    entry.writeUInt32LE(crc, 16);
    entry.writeUInt32LE(compressed.length, 20);
    entry.writeUInt32LE(data.length, 24);
    entry.writeUInt16LE(filePath.length, 28);
    // Extra field, comment, disk number, attributes: none
    entry.writeUInt32LE(offset, 42);

    parts.push(local, filePath, compressed);
    directory.push(entry, filePath);
    entries += 1;
    offset += local.length + filePath.length + compressed.length;
  }

  // The end record counts entries in 16 bits and addresses them in 32. Beyond either,
  // an archive needs zip64, which this writer does not emit.
  if (entries > 0xffff || offset > 0xffffffff) {
    throw new Error('zipArchive: too many entries or too much data for a plain zip');
  }

  const directoryBuffer = Buffer.concat(directory);

  const end = Buffer.alloc(22);
  end.writeUInt32LE(END_OF_CENTRAL_DIRECTORY, 0);
  end.writeUInt16LE(entries, 8);
  end.writeUInt16LE(entries, 10);
  end.writeUInt32LE(directoryBuffer.length, 12);
  end.writeUInt32LE(offset, 16);

  return Buffer.concat([...parts, directoryBuffer, end]);
}
