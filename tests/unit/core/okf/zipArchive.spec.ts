import { inflateRawSync } from 'node:zlib';
import { describe, expect, it } from 'vitest';
import { zipArchive } from '@/core/okf/zipArchive';

const END_RECORD_SIZE = 22;

/** Reads the entries back by walking the local headers. */
function readEntries(archive: Buffer): Map<string, string> {
  const entries = new Map<string, string>();
  let offset = 0;
  while (archive.readUInt32LE(offset) === 0x04034b50) {
    const compressedSize = archive.readUInt32LE(offset + 18);
    const nameLength = archive.readUInt16LE(offset + 26);
    const nameStart = offset + 30;
    const dataStart = nameStart + nameLength;
    const name = archive.subarray(nameStart, dataStart).toString('utf8');
    const data = inflateRawSync(archive.subarray(dataStart, dataStart + compressedSize));
    entries.set(name, data.toString('utf8'));
    offset = dataStart + compressedSize;
  }
  return entries;
}

describe('zipArchive', () => {
  const files = new Map([
    ['index.md', '# Bundle\n'],
    ['tools/motis.md', '---\ntype: Software Tool\n---\n\nIntermodal routing\n'],
  ]);

  it('round-trips names and contents', () => {
    expect(readEntries(zipArchive(files))).toEqual(files);
  });

  it('records the number of entries in the end record', () => {
    const archive = zipArchive(files);
    const end = archive.subarray(archive.length - END_RECORD_SIZE);

    expect(end.readUInt32LE(0)).toBe(0x06054b50);
    expect(end.readUInt16LE(8)).toBe(2);
    expect(end.readUInt16LE(10)).toBe(2);
  });

  it('produces identical bytes for identical input', () => {
    expect(zipArchive(files).equals(zipArchive(new Map(files)))).toBe(true);
  });

  it('writes names and contents as UTF-8', () => {
    const utf8 = new Map([['standards/dopravní-značky.md', 'Šablona ✓\n']]);

    expect(readEntries(zipArchive(utf8))).toEqual(utf8);
  });

  it('writes a bare end record for no files', () => {
    expect(zipArchive([]).length).toBe(END_RECORD_SIZE);
  });
});
