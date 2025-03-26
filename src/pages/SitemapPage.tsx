
import React, { useEffect } from "react";
import { generateSitemapXML } from "@/utils/seo";
import { jobs } from "@/lib/jobs";

const SitemapPage: React.FC = () => {
  useEffect(() => {
    const baseUrl = window.location.origin;
    
    // Make sure each job has slug property, fallback to id if not available
    const sitemapItems = jobs.map(job => ({
      url: `/jobs/${job.slug || job.id}`,
      lastmod: job.postedDate || job.updatedAt || new Date().toISOString()
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
