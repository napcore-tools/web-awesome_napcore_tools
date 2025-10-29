/**
 * STANDARD METADATA DEFINITIONS
 *
 * Visual metadata (icons, descriptions) for mobility data standards.
 * Used by StandardsGrid.vue to display standards with icons.
 *
 * Note: This is for display purposes only. The canonical list of standards
 * comes from tool frontmatter - if a new standard appears in a tool,
 * add its metadata here for a better visual presentation.
 */

export interface StandardMetadata {
  icon: string        // Emoji icon for visual identification
  description?: string // Optional short description
}

/**
 * Standard metadata map (keyed by exact standard name from tool frontmatter)
 * The keys must match exactly how standards are written in tool YAML frontmatter
 */
export const STANDARD_METADATA: Record<string, StandardMetadata> = {
  'DATEX II': {
    icon: '🚦',
    description: 'European standard for traffic and travel information exchange'
  },
  'NeTEx': {
    icon: '🚇',
    description: 'Network Timetable Exchange - public transport network data'
  },
  'SIRI': {
    icon: '📡',
    description: 'Service Interface for Real-time Information - live transit data'
  },
  'mobilityDCAT-AP': {
    icon: '🏷️',
    description: 'Mobility Data Catalog Application Profile - metadata standard'
  },
  'DCAT-AP': {
    icon: '📋',
    description: 'Data Catalog Application Profile - EU open data metadata'
  },
  'ISO/DIS 14819 Part 3': {
    icon: '📍',
    description: 'ALERT-C location referencing standard'
  },
  'CEN 16157': {
    icon: '📜',
    description: 'European standard for intelligent transport systems'
  },
  'RDS-TMC': {
    icon: '📻',
    description: 'Radio Data System - Traffic Message Channel'
  },
  'GTFS': {
    icon: '🚌',
    description: 'General Transit Feed Specification'
  },
  'GBFS': {
    icon: '🚲',
    description: 'General Bikeshare Feed Specification - standard for shared mobility systems'
  },
  'TransModel': {
    icon: '🗺️',
    description: 'European reference data model for public transport'
  },
  'GTFS Realtime': {
    icon: '⚡',
    description: 'Real-time transit updates extension for GTFS'
  },
  'RDF': {
    icon: '🔗',
    description: 'Resource Description Framework - W3C standard for linked data and semantic web'
  },
  'OSM': {
    icon: '🌍',
    description: 'OpenStreetMap - collaborative open-source mapping data'
  }
}

/**
 * Get metadata for a standard, with fallback to default icon
 */
export function getStandardMetadata(standardName: string): StandardMetadata {
  return STANDARD_METADATA[standardName] || {
    icon: '📄', // Default icon for unknown standards
    description: undefined
  }
}
