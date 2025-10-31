/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://petyears.net',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
    additionalSitemaps: [
      `${process.env.SITE_URL || 'https://petyears.net'}/server-sitemap.xml`,
    ],
  },
  transform: async (config, path) => {
    // Custom transform for blog posts
    if (path.includes('/blog/')) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      };
    }

    // Default transformation
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};