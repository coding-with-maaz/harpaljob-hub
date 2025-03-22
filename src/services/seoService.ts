
import { SEOSettings, KeywordAnalysis } from "../lib/types";

// Mock data until we have an actual backend
const mockSEOSettings: SEOSettings = {
  id: "seo-1",
  globalTitle: "HarpalJobs | Find Your Dream Job Today",
  globalDescription: "HarpalJobs is the leading job board connecting job seekers with top employers. Search thousands of job listings across all industries and locations.",
  globalKeywords: "jobs, careers, employment, hiring, job search, job board",
  ogImage: "/og-image.png",
  indexingEnabled: true,
  robotsTxt: `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /private/\nSitemap: https://harpalJobs.com/sitemap.xml`,
  siteVerificationGoogle: "",
  siteVerificationBing: "",
  customHeadCode: "",
  canonicalUrl: "https://harpalJobs.com",
  userId: "admin-1",
  updatedAt: new Date().toISOString()
};

// Get SEO settings
export const getSEOSettings = async (): Promise<SEOSettings> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSEOSettings);
    }, 500);
  });
};

// Update SEO settings
export const updateSEOSettings = async (settings: Partial<SEOSettings>): Promise<SEOSettings> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedSettings = {
        ...mockSEOSettings,
        ...settings,
        updatedAt: new Date().toISOString()
      };
      // In a real app, we would update the backend here
      resolve(updatedSettings);
    }, 500);
  });
};

// Analyze keyword density in content
export const analyzeKeywordDensity = async (
  content: string, 
  keyword: string
): Promise<KeywordAnalysis> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple keyword density calculation
      const contentLower = content.toLowerCase();
      const keywordLower = keyword.toLowerCase();
      
      // Count occurrences
      const regex = new RegExp(`\\b${keywordLower}\\b`, 'gi');
      const matches = contentLower.match(regex) || [];
      const count = matches.length;
      
      // Calculate density (percentage)
      const words = contentLower.split(/\s+/).length;
      const density = (count / words) * 100;
      
      // Generate fake suggestions
      const suggestions = [
        `${keyword} optimization`,
        `best ${keyword}`,
        `${keyword} trends`,
        `${keyword} services`,
        `${keyword} solutions`
      ];
      
      resolve({
        keyword,
        count,
        density,
        suggestions
      });
    }, 800);
  });
};

// Generate robots.txt content
export const generateRobotsTxt = (domain: string): string => {
  return `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /dashboard/
Disallow: /private/
Disallow: /api/

# Sitemap
Sitemap: ${domain}/sitemap.xml

# Crawl delay
Crawl-delay: 10`;
};

// Get SEO performance data
export const getSEOPerformanceData = async () => {
  // Simulate API call for SEO analytics
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        rankings: [
          { keyword: "remote jobs", position: 3, change: 1, volume: 12400 },
          { keyword: "software developer jobs", position: 5, change: -2, volume: 6800 },
          { keyword: "work from home", position: 8, change: 3, volume: 8500 },
          { keyword: "tech jobs", position: 12, change: 0, volume: 4300 },
          { keyword: "marketing jobs", position: 15, change: 5, volume: 3700 }
        ],
        clicks: 1243,
        impressions: 15678,
        ctr: 7.93,
        averagePosition: 4.2
      });
    }, 600);
  });
};
