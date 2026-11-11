/**
 * Canonical origin of the published site, without a trailing slash.
 * Used wherever a build product needs absolute URLs (RSS feed, OKF bundle).
 * Override with the SITE_URL environment variable.
 */
export const siteUrl = (process.env.SITE_URL || 'https://awesome.napcore.eu').replace(/\/+$/, '');
