
/**
 * Generates a basic robots.txt file content
 * @param domain Domain name including protocol (e.g., https://example.com)
 * @returns robots.txt content as a string
 */
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

/**
 * Analyze keyword density in content
 * @param content The content to analyze
 * @param keyword The keyword to find
 * @returns Object with count and density percentage
 */
export const analyzeKeywordDensity = (content: string, keyword: string) => {
  // Basic keyword density calculation (replaced by service in production)
  const contentLower = content.toLowerCase();
  const keywordLower = keyword.toLowerCase();
  
  // Count occurrences (simple implementation)
  const regex = new RegExp(`\\b${keywordLower}\\b`, 'gi');
  const matches = contentLower.match(regex) || [];
  const count = matches.length;
  
  // Calculate density
  const words = contentLower.split(/\s+/).length;
  const density = words > 0 ? (count / words) * 100 : 0;
  
  return { count, density };
};

/**
 * Generate related keywords suggestions
 * @param keyword The base keyword
 * @returns Array of related keywords
 */
export const suggestRelatedKeywords = (keyword: string): string[] => {
  // Demo function with static suggestions based on the keyword
  // In production, this would call an API or use a more sophisticated algorithm
  const suggestions = [
    `${keyword} jobs`,
    `remote ${keyword}`,
    `${keyword} career`,
    `${keyword} salary`,
    `${keyword} training`,
    `${keyword} certification`,
    `best ${keyword}`,
    `${keyword} near me`
  ];
  
  // Return 5 random suggestions
  return suggestions.sort(() => 0.5 - Math.random()).slice(0, 5);
};

/**
 * Check if a URL is SEO-friendly
 * @param url The URL to check
 * @returns Object with boolean result and reasons
 */
export const isSEOFriendlyURL = (url: string) => {
  const issues = [];
  
  // Check for uppercase letters
  if (/[A-Z]/.test(url)) {
    issues.push("URL contains uppercase letters.");
  }
  
  // Check for special characters
  if (/[^a-zA-Z0-9-/]/.test(url)) {
    issues.push("URL contains special characters other than hyphens.");
  }
  
  // Check for underscores
  if (/_/.test(url)) {
    issues.push("URL contains underscores. Consider using hyphens instead.");
  }
  
  // Check for multiple consecutive hyphens
  if (/--/.test(url)) {
    issues.push("URL contains consecutive hyphens.");
  }
  
  // Check if URL is too long (over 100 characters)
  if (url.length > 100) {
    issues.push("URL is too long. Consider shortening it.");
  }
  
  return {
    isSEOFriendly: issues.length === 0,
    issues
  };
};

/**
 * Generate a meta description based on content
 * @param content The content to base the description on
 * @param maxLength Maximum length for the description
 * @returns Generated meta description
 */
export const generateMetaDescription = (content: string, maxLength = 160) => {
  // Simple implementation - in production this might use AI or more sophisticated algorithms
  let description = content
    .replace(/[\r\n]+/g, ' ')  // Replace line breaks with spaces
    .replace(/\s+/g, ' ')      // Replace multiple spaces with single space
    .trim();
  
  // Truncate to maximum length
  if (description.length > maxLength) {
    description = description.substring(0, maxLength - 3) + '...';
  }
  
  return description;
};
