
import React from "react";
import { Helmet } from "react-helmet";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: "website" | "article" | "profile";
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  canonicalUrl?: string;
  structuredData?: Record<string, any>;
  noIndex?: boolean;
  noFollow?: boolean;
  language?: string;
  author?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords,
  ogImage = "/og-image.png",
  ogUrl,
  ogType = "website",
  twitterCard = "summary_large_image",
  canonicalUrl,
  structuredData,
  noIndex = false,
  noFollow = false,
  language = "en",
  author,
}) => {
  // Create robots meta content
  const robotsContent = [
    noIndex ? 'noindex' : 'index',
    noFollow ? 'nofollow' : 'follow'
  ].join(', ');

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robotsContent} />
      
      {/* Language and author */}
      <html lang={language} />
      {author && <meta name="author" content={author} />}
      
      {/* OpenGraph meta tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      <meta property="og:type" content={ogType} />
      
      {/* Twitter meta tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Structured data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;

// Export a preview component for the dashboard
export const SEOPreview: React.FC<{
  title: string;
  description: string;
  url?: string;
}> = ({ title, description, url = "https://harpalJobs.com/jobs" }) => {
  return (
    <div className="border rounded-md p-4 max-w-xl">
      <div className="text-sm text-green-600 mb-1 truncate">{url}</div>
      <h3 className="text-blue-700 text-lg font-medium mb-1 hover:underline cursor-pointer truncate">
        {title}
      </h3>
      <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
    </div>
  );
};
