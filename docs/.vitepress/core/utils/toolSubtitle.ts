import type { Tool } from '../data-loaders/tools.data';
import { getStandardMetadata } from '../metadata/standards';

/** Returns the standards supported by a tool as a display string, e.g. "DATEX II · NeTEx". */
export function getSubtitle(tool: Tool): string {
  if (tool.standards?.length) {
    return tool.standards.map((s) => getStandardMetadata(s).title).join(' · ');
  }
  return '';
}
