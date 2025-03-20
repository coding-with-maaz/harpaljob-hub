/**
 * Generates structured data for job listings
 * @param jobs Array of job objects
 * @returns JSON-LD structured data object for job listings
 */
export const generateJobListingStructuredData = (jobs: any[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": jobs.map((job, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "JobPosting",
        "title": job.title,
        "description": job.description,
        "datePosted": job.datePosted,
        "validThrough": job.validThrough,
        "employmentType": job.employmentType,
        "hiringOrganization": {
          "@type": "Organization",
          "name": job.company,
          "sameAs": job.companyUrl || undefined,
          "logo": job.companyLogo || undefined
        },
        "jobLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": job.location,
            "addressCountry": job.country || "US"
          }
        },
        "baseSalary": job.salaryMin && job.salaryMax ? {
          "@type": "MonetaryAmount",
          "currency": job.currency || "USD",
          "value": {
            "@type": "QuantitativeValue",
            "minValue": job.salaryMin,
            "maxValue": job.salaryMax,
            "unitText": job.salaryUnit || "YEAR"
          }
        } : undefined
      }
    }))
  };
};

/**
 * Generates structured data for a single job posting
 * @param job Job object
 * @returns JSON-LD structured data object for job posting
 */
export const generateJobPostingStructuredData = (job: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "datePosted": job.datePosted,
    "validThrough": job.validThrough,
    "employmentType": job.employmentType,
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.company,
      "sameAs": job.companyUrl || undefined,
      "logo": job.companyLogo || undefined
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.location,
        "addressCountry": job.country || "US"
      }
    },
    "baseSalary": job.salaryMin && job.salaryMax ? {
      "@type": "MonetaryAmount",
      "currency": job.currency || "USD",
      "value": {
        "@type": "QuantitativeValue",
        "minValue": job.salaryMin,
        "maxValue": job.salaryMax,
        "unitText": job.salaryUnit || "YEAR"
      }
    } : undefined,
    "skills": job.skills || undefined,
    "applicantLocationRequirements": job.remoteOk ? {
      "@type": "Country",
      "name": "Anywhere (Remote)"
    } : undefined,
    "jobBenefits": job.benefits || undefined
  };
};

/**
 * Generates meta tags for SEO optimization
 * @param title Page title
 * @param description Page description
 * @returns Object with title and description
 */
export const generateMetaTags = (title: string, description: string) => {
  return {
    title: `${title} | HarpalJobs`,
    description: description,
  };
};

/**
 * Generates keywords from job data
 * @param job Job object
 * @returns Comma-separated string of keywords
 */
export const generateJobKeywords = (job: any) => {
  const keywords = [
    job.title,
    job.company,
    job.location,
    job.jobType,
    job.category,
    'job listing',
    'career',
    'employment',
    'job search'
  ];
  
  // Add skills as keywords if available
  if (job.skills && Array.isArray(job.skills)) {
    keywords.push(...job.skills);
  }
  
  // Filter out any undefined or empty values
  return keywords.filter(Boolean).join(', ');
};

/**
 * Analyzes content for keyword density
 * @param content Text content to analyze
 * @param keyword Keyword to check density for
 * @returns Object with occurrence count and density percentage
 */
export const analyzeKeywordDensity = (content: string, keyword: string) => {
  if (!content || !keyword) return { count: 0, density: 0 };
  
  const regex = new RegExp(`\\b${keyword.toLowerCase()}\\b`, 'gi');
  const matches = content.toLowerCase().match(regex) || [];
  const wordCount = content.split(/\s+/).length;
  
  return {
    count: matches.length,
    density: (matches.length / wordCount) * 100
  };
};

/**
 * Suggests related keywords based on a primary keyword
 * @param keyword Primary keyword
 * @returns Array of related keywords
 */
export const suggestRelatedKeywords = (keyword: string) => {
  // This is a simplified mock implementation
  // In a real application, this would call an API or use a more sophisticated algorithm
  const keywordMap: Record<string, string[]> = {
    'developer': ['software engineer', 'programmer', 'coder', 'web developer', 'full stack'],
    'manager': ['team lead', 'director', 'supervisor', 'project manager', 'leader'],
    'remote': ['work from home', 'telecommute', 'virtual position', 'home-based', 'distributed team'],
    'part-time': ['flexible hours', 'hourly', 'contract', 'temporary', 'freelance'],
    'full-time': ['permanent', 'salaried', 'regular', '40 hours', 'benefits'],
  };
  
  const lowerKeyword = keyword.toLowerCase();
  
  // Check if we have predefined related keywords
  for (const [key, values] of Object.entries(keywordMap)) {
    if (lowerKeyword.includes(key)) {
      return values;
    }
  }
  
  // Default related keywords for job listings
  return [
    'career',
    'position',
    'employment',
    'job opening',
    'opportunity'
  ];
};

/**
 * Generates a sitemap XML string for the job board
 * @param baseUrl The base URL of the website
 * @param jobs Array of job objects
 * @returns String containing sitemap XML content
 */
export const generateSitemapXML = (baseUrl: string, jobs: any[]) => {
  const urlEntries = jobs.map(job => {
    return `
  <url>
    <loc>${baseUrl}/job/${job.id}</loc>
    <lastmod>${new Date(job.postedDate).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: 'jobs', priority: '0.9', changefreq: 'daily' },
    { url: 'saved-jobs', priority: '0.7', changefreq: 'weekly' },
    { url: 'mobile-app', priority: '0.6', changefreq: 'monthly' },
  ];

  const staticEntries = staticPages.map(page => {
    return `
  <url>
    <loc>${baseUrl}/${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries.join('')}${urlEntries.join('')}
</urlset>`;
};

/**
 * Generates robots.txt content
 * @param baseUrl The base URL of the website
 * @returns String containing robots.txt content
 */
export const generateRobotsTxt = (baseUrl: string) => {
  return `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /dashboard/
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`;
};

/**
 * Check if a URL is SEO-friendly
 * @param url URL to check
 * @returns Object with boolean success flag and improvement suggestions
 */
export const checkSEOFriendlyURL = (url: string) => {
  const issues = [];
  
  // Check for uppercase letters
  if (/[A-Z]/.test(url)) {
    issues.push('URL contains uppercase letters. Use lowercase for better SEO.');
  }
  
  // Check for special characters
  if (/[^\w\-\/]/.test(url)) {
    issues.push('URL contains special characters. Use only letters, numbers, and hyphens.');
  }
  
  // Check for underscores
  if (/_/.test(url)) {
    issues.push('URL contains underscores. Use hyphens instead for better SEO.');
  }
  
  // Check for trailing slash consistency
  if (url.length > 1 && url.endsWith('/')) {
    issues.push('URL has trailing slash. Consider maintaining consistency across URLs.');
  }
  
  // Check for multiple consecutive hyphens
  if (/--/.test(url)) {
    issues.push('URL contains consecutive hyphens. Use single hyphens between words.');
  }
  
  return {
    isSEOFriendly: issues.length === 0,
    issues,
    suggestions: issues.length > 0 ? 
      'Fix the issues above to improve URL SEO-friendliness.' : 
      'URL appears to be SEO-friendly.'
  };
};

/**
 * Checks if page content has proper heading structure
 * @param html HTML content to analyze
 * @returns Object with success flag and improvement suggestions
 */
export const analyzeHeadingStructure = (html: string) => {
  const h1Matches = html.match(/<h1[^>]*>(.*?)<\/h1>/gi) || [];
  const h2Matches = html.match(/<h2[^>]*>(.*?)<\/h2>/gi) || [];
  const h3Matches = html.match(/<h3[^>]*>(.*?)<\/h3>/gi) || [];
  
  const issues = [];
  
  // Check for H1 tag presence and count
  if (h1Matches.length === 0) {
    issues.push('No H1 heading found. Every page should have one main H1 heading.');
  } else if (h1Matches.length > 1) {
    issues.push(`Multiple H1 headings found (${h1Matches.length}). Each page should have only one H1 heading.`);
  }
  
  // Check for hierarchical structure
  if (h2Matches.length === 0 && h3Matches.length > 0) {
    issues.push('H3 headings are used without H2 headings. Maintain proper heading hierarchy (H1 > H2 > H3).');
  }
  
  return {
    isWellStructured: issues.length === 0,
    headingCount: {
      h1: h1Matches.length,
      h2: h2Matches.length,
      h3: h3Matches.length,
    },
    issues,
    suggestions: issues.length > 0 ? 
      'Fix the heading structure issues for better SEO.' : 
      'Heading structure appears to be well organized.'
  };
};

/**
 * Analyze page load speed factors
 * @param pageSize Size of the page in kilobytes
 * @param imagesCount Number of images on the page
 * @param externalScriptsCount Number of external scripts
 * @returns Analysis with optimization suggestions
 */
export const analyzePageSpeed = (pageSize: number, imagesCount: number, externalScriptsCount: number) => {
  const issues = [];
  
  if (pageSize > 3000) {
    issues.push('Page size exceeds 3MB. Consider optimizing resources to improve load speed.');
  }
  
  if (imagesCount > 15) {
    issues.push(`Page contains ${imagesCount} images. Consider lazy loading or reducing image count.`);
  }
  
  if (externalScriptsCount > 10) {
    issues.push(`Page loads ${externalScriptsCount} external scripts. Consider bundling or reducing scripts.`);
  }
  
  return {
    pageSize: `${(pageSize / 1024).toFixed(2)} MB`,
    imagesCount,
    externalScriptsCount,
    issues,
    optimizationSuggestions: issues.length > 0 ? issues : ['Page appears to be well optimized for speed.']
  };
};

/**
 * Calculate potential SEO score based on various factors
 * @param factors Object containing various SEO factors and their values
 * @returns Numeric score from 0-100 and improvement suggestions
 */
export const calculateSEOScore = (factors: {
  hasTitle: boolean;
  titleLength: number;
  hasDescription: boolean;
  descriptionLength: number;
  hasH1: boolean;
  keywordInTitle: boolean;
  keywordInDescription: boolean;
  keywordInH1: boolean;
  keywordDensity: number;
  hasSocialMeta: boolean;
  hasStructuredData: boolean;
  pageLoadSpeed: number; // 1-5 rating
  mobileOptimized: boolean;
  hasCanonicalUrl: boolean;
  hasAltTags: boolean;
}) => {
  let score = 0;
  const maxScore = 100;
  const suggestions = [];
  
  // Title factors (max 15 points)
  if (factors.hasTitle) {
    score += 10;
    if (factors.titleLength >= 40 && factors.titleLength <= 60) {
      score += 5;
    } else {
      suggestions.push('Optimize title length to be between 40-60 characters');
    }
  } else {
    suggestions.push('Add a title tag to your page');
  }
  
  // Description factors (max 15 points)
  if (factors.hasDescription) {
    score += 10;
    if (factors.descriptionLength >= 120 && factors.descriptionLength <= 160) {
      score += 5;
    } else {
      suggestions.push('Optimize meta description length to be between 120-160 characters');
    }
  } else {
    suggestions.push('Add a meta description to your page');
  }
  
  // Heading factors (max 10 points)
  if (factors.hasH1) {
    score += 10;
  } else {
    suggestions.push('Add an H1 heading to your page');
  }
  
  // Keyword usage (max 20 points)
  if (factors.keywordInTitle) score += 5;
  else suggestions.push('Include your primary keyword in the title');
  
  if (factors.keywordInDescription) score += 5;
  else suggestions.push('Include your primary keyword in the meta description');
  
  if (factors.keywordInH1) score += 5;
  else suggestions.push('Include your primary keyword in the H1 heading');
  
  if (factors.keywordDensity >= 1 && factors.keywordDensity <= 3) score += 5;
  else suggestions.push('Adjust keyword density to be between 1-3%');
  
  // Technical factors (max 40 points)
  if (factors.hasSocialMeta) score += 5;
  else suggestions.push('Add social media meta tags (Open Graph, Twitter Cards)');
  
  if (factors.hasStructuredData) score += 10;
  else suggestions.push('Implement structured data (JSON-LD)');
  
  score += Math.min(factors.pageLoadSpeed * 2, 10);
  if (factors.pageLoadSpeed < 4) {
    suggestions.push('Improve page load speed');
  }
  
  if (factors.mobileOptimized) score += 5;
  else suggestions.push('Optimize your page for mobile devices');
  
  if (factors.hasCanonicalUrl) score += 5;
  else suggestions.push('Add a canonical URL to prevent duplicate content issues');
  
  if (factors.hasAltTags) score += 5;
  else suggestions.push('Add alt text to all images');
  
  return {
    score: Math.round(score),
    maxScore,
    rating: score >= 90 ? 'Excellent' : score >= 70 ? 'Good' : score >= 50 ? 'Average' : 'Poor',
    suggestions
  };
};
