
import React, { useEffect } from "react";
import { generateSitemapXML } from "@/utils/seo";
import { jobs } from "@/lib/jobs";

const SitemapPage: React.FC = () => {
  useEffect(() => {
    const baseUrl = window.location.origin;
    
    // Make sure each job has slug property, fallback to id if not available
    // Also handle the lastmod date with proper fallbacks
    const sitemapItems = jobs.map(job => ({
      url: `/jobs/${job.slug || job.id}`,
      lastmod: job.postedDate || new Date().toISOString() // Only use postedDate as updatedAt doesn't exist
    }));
    
    const sitemapXml = generateSitemapXML(baseUrl, sitemapItems);
    
    // Create a blob with the XML content
    const blob = new Blob([sitemapXml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    
    // Force download or display of the XML content
    window.location.href = url;
    
    // Clean up the URL object
    return () => URL.revokeObjectURL(url);
  }, []);
  
  return null;
};

export default SitemapPage;
