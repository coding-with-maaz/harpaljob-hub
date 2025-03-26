
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

/**
 * Analyzes heading structure of a page for SEO
 * @param htmlContent HTML content to analyze
 * @returns Analysis results with issues and recommendations
 */
export const analyzeHeadingStructure = (htmlContent: string) => {
  const headings = {
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: []
  };
  
  // Extract headings (simplified version - in production use DOM parser)
  const h1Matches = htmlContent.match(/<h1[^>]*>(.*?)<\/h1>/gi) || [];
  const h2Matches = htmlContent.match(/<h2[^>]*>(.*?)<\/h2>/gi) || [];
  const h3Matches = htmlContent.match(/<h3[^>]*>(.*?)<\/h3>/gi) || [];
  const h4Matches = htmlContent.match(/<h4[^>]*>(.*?)<\/h4>/gi) || [];
  const h5Matches = htmlContent.match(/<h5[^>]*>(.*?)<\/h5>/gi) || [];
  const h6Matches = htmlContent.match(/<h6[^>]*>(.*?)<\/h6>/gi) || [];
  
  // Process matches to extract actual text content
  h1Matches.forEach(h => {
    const text = h.replace(/<\/?[^>]+(>|$)/g, "").trim();
    headings.h1.push(text);
  });
  
  h2Matches.forEach(h => {
    const text = h.replace(/<\/?[^>]+(>|$)/g, "").trim();
    headings.h2.push(text);
  });
  
  h3Matches.forEach(h => {
    const text = h.replace(/<\/?[^>]+(>|$)/g, "").trim();
    headings.h3.push(text);
  });
  
  h4Matches.forEach(h => {
    const text = h.replace(/<\/?[^>]+(>|$)/g, "").trim();
    headings.h4.push(text);
  });
  
  h5Matches.forEach(h => {
    const text = h.replace(/<\/?[^>]+(>|$)/g, "").trim();
    headings.h5.push(text);
  });
  
  h6Matches.forEach(h => {
    const text = h.replace(/<\/?[^>]+(>|$)/g, "").trim();
    headings.h6.push(text);
  });
  
  // Analyze headings
  const issues = [];
  const recommendations = [];
  
  if (headings.h1.length === 0) {
    issues.push("No H1 heading found.");
    recommendations.push("Add a single H1 heading that contains your primary keyword.");
  } else if (headings.h1.length > 1) {
    issues.push(`Multiple H1 headings found (${headings.h1.length}).`);
    recommendations.push("Use only one H1 heading per page.");
  }
  
  if (headings.h2.length === 0 && (headings.h3.length > 0 || headings.h4.length > 0)) {
    issues.push("H3 or H4 headings used without H2 headings.");
    recommendations.push("Maintain proper heading hierarchy (H1 > H2 > H3).");
  }
  
  return {
    headingsCount: {
      h1: headings.h1.length,
      h2: headings.h2.length,
      h3: headings.h3.length,
      h4: headings.h4.length,
      h5: headings.h5.length,
      h6: headings.h6.length
    },
    headingsContent: headings,
    issues,
    recommendations
  };
};

/**
 * Calculates an overall SEO score based on various factors
 * @param factors Object with different SEO factors and their scores
 * @returns Object with overall score and breakdown
 */
export const calculateSEOScore = (factors: {
  titleScore: number;
  metaDescriptionScore: number;
  headingsScore: number;
  contentScore: number;
  linksScore: number;
  imageAltScore: number;
  urlScore: number;
  mobileScore: number;
  speedScore: number;
  schemaScore: number;
}) => {
  // Weights for different factors (sum should be 100)
  const weights = {
    titleScore: 10,
    metaDescriptionScore: 10,
    headingsScore: 15,
    contentScore: 20,
    linksScore: 10,
    imageAltScore: 5,
    urlScore: 5,
    mobileScore: 10,
    speedScore: 10,
    schemaScore: 5
  };
  
  // Calculate weighted score
  let totalScore = 0;
  const breakdown = {};
  
  Object.keys(factors).forEach(factor => {
    const weight = weights[factor as keyof typeof weights];
    const score = factors[factor as keyof typeof factors];
    const weightedScore = (score / 100) * weight;
    
    totalScore += weightedScore;
    breakdown[factor] = {
      raw: score,
      weighted: weightedScore,
      weight
    };
  });
  
  // Determine rating
  let rating = "Poor";
  if (totalScore >= 90) {
    rating = "Excellent";
  } else if (totalScore >= 70) {
    rating = "Good";
  } else if (totalScore >= 50) {
    rating = "Average";
  } else if (totalScore >= 30) {
    rating = "Below Average";
  }
  
  return {
    score: Math.round(totalScore),
    rating,
    breakdown
  };
};

/**
 * Generates XML sitemap content
 * @param domain Base domain with protocol
 * @param urls Array of page URLs and their last modified dates
 * @returns XML sitemap as a string
 */
export const generateSitemapXML = (domain: string, urls: Array<{ url: string, lastmod?: string }>) => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
  
  urls.forEach(item => {
    const lastmod = item.lastmod || new Date().toISOString().split('T')[0];
    xml += `  <url>
    <loc>${domain}${item.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  });
  
  xml += `</urlset>`;
  
  return xml;
};

/**
 * Generates structured data for job listings
 * @param jobs Array of job objects
 * @returns JSON-LD structured data string
 */
export const generateJobListingStructuredData = (jobs: any[]) => {
  const jobPostings = jobs.map(job => ({
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "datePosted": job.postedDate,
    "validThrough": job.deadline,
    "employmentType": job.type.toUpperCase().replace(' ', '_'),
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.company,
      "sameAs": job.companyWebsite || `https://example.com/company/${job.companyId}`
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.location.split(',')[0],
        "addressCountry": job.country || "US"
      }
    },
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": {
        "@type": "QuantitativeValue",
        "minValue": job.salaryMin,
        "maxValue": job.salaryMax,
        "unitText": "YEAR"
      }
    }
  }));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": jobPostings.map((job, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": job
    }))
  };

  return JSON.stringify(structuredData);
};
