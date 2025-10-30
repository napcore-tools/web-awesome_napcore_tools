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
  title: string        // Display name of the standard
  icon: string         // Emoji icon for visual identification
  description?: string // Optional short description
}

/**
 * Standard metadata map (keyed by slugified standard name)
 * The keys are URL-friendly slugs matching how standards are written in tool YAML frontmatter
 */
export const STANDARD_METADATA: Record<string, StandardMetadata> = {
  'datex-ii': {
    title: 'DATEX II',
    icon: '🚦',
    description: 'European standard for traffic and travel information exchange'
  },
  'netex': {
    title: 'NeTEx',
    icon: '🚇',
    description: 'Network Timetable Exchange - public transport network data'
  },
  'siri': {
    title: 'SIRI',
    icon: '📡',
    description: 'Service Interface for Real-time Information - live transit data'
  },
  'mobilitydcat-ap': {
    title: 'mobilityDCAT-AP',
    icon: '🏷️',
    description: 'Mobility Data Catalog Application Profile - metadata standard'
  },
  'dcat-ap': {
    title: 'DCAT-AP',
    icon: '📋',
    description: 'Data Catalog Application Profile - EU open data metadata'
  },
  'isodis-14819': {
    title: 'ISO/DIS 14819',
    icon: '📍',
    description: 'ALERT-C location referencing standard'
  },
  'cen-16157': {
    title: 'CEN 16157',
    icon: '📜',
    description: 'European standard for intelligent transport systems'
  },
  'rds-tmc': {
    title: 'RDS-TMC',
    icon: '📻',
    description: 'Radio Data System - Traffic Message Channel'
  },
  'gtfs': {
    title: 'GTFS',
    icon: '🚌',
    description: 'General Transit Feed Specification'
  },
  'gbfs': {
    title: 'GBFS',
    icon: '🚲',
    description: 'General Bikeshare Feed Specification - standard for shared mobility systems'
  },
  'transmodel': {
    title: 'TransModel',
    icon: '🗺️',
    description: 'European reference data model for public transport'
  },
  'gtfs-realtime': {
    title: 'GTFS Realtime',
    icon: '⚡',
    description: 'Real-time transit updates extension for GTFS'
  },
  'rdf': {
    title: 'RDF',
    icon: '🔗',
    description: 'Resource Description Framework - W3C standard for linked data and semantic web'
  },
  'osm': {
    title: 'OSM',
    icon: '🌍',
    description: 'OpenStreetMap - collaborative open-source mapping data'
  }
}

/**
 * Get metadata for a standard, with fallback to default values
 * @param standardSlug - The slugified standard name (e.g., 'datex-ii')
 */
export function getStandardMetadata(standardSlug: string): StandardMetadata {
  return STANDARD_METADATA[standardSlug] || {
    title: standardSlug, // Use slug as title if metadata not found
    icon: '📄', // Default icon for unknown standards
    description: undefined
  }
}
