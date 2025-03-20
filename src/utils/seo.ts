
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
