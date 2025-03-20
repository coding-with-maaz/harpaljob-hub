
import React, { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { X } from "lucide-react";

export type AdSize = 'small' | 'medium' | 'large' | 'responsive';
export type AdPosition = 'inline' | 'sidebar' | 'header' | 'footer';

interface AdBannerProps {
  id: string;
  size?: AdSize;
  position?: AdPosition;
  className?: string;
}

// This would typically come from a central ad management system
const isAdEnabled = () => {
  // For demo purposes, we'll use localStorage, but in a real app this might
  // come from a context provider or API
  const enabledFromStorage = localStorage.getItem('adsEnabled');
  return enabledFromStorage !== 'false'; // Default to true if not set
};

const isMobileAdEnabled = () => {
  const enabledFromStorage = localStorage.getItem('mobileAdsEnabled');
  return enabledFromStorage !== 'false'; // Default to true if not set
};

const AdBanner: React.FC<AdBannerProps> = ({ 
  id, 
  size = 'medium', 
  position = 'inline',
  className = ''
}) => {
  const [dismissed, setDismissed] = useState(false);
  const [adEnabled, setAdEnabled] = useState(true);
  const isMobile = useIsMobile();
  
  // Determine if this ad should be shown based on global settings
  useEffect(() => {
    const enabled = isAdEnabled();
    const mobileEnabled = isMobileAdEnabled();
    setAdEnabled(isMobile ? (enabled && mobileEnabled) : enabled);
    
    const handleStorageChange = () => {
      const updatedEnabled = isAdEnabled();
      const updatedMobileEnabled = isMobileAdEnabled();
      setAdEnabled(isMobile ? (updatedEnabled && updatedMobileEnabled) : updatedEnabled);
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isMobile]);
  
  // Don't render if ad is globally disabled or this specific one was dismissed
  if (!adEnabled || dismissed) return null;
  
  // Define height based on size
  const getHeight = () => {
    switch (size) {
      case 'small': return 'h-16';
      case 'medium': return 'h-24';
      case 'large': return 'h-32';
      case 'responsive': return 'h-auto';
      default: return 'h-24';
    }
  };
  
  // Get ad content based on position
  const getAdContent = () => {
    switch (position) {
      case 'header':
        return {
          title: "Premium Job Alerts",
          description: "Get job matches delivered to your inbox daily",
          cta: "Subscribe Now",
          bgColor: "bg-blue-50"
        };
      case 'sidebar':
        return {
          title: "Upgrade Your Profile",
          description: "Stand out to recruiters",
          cta: "Go Premium",
          bgColor: "bg-purple-50"
        };
      case 'footer':
        return {
          title: "HarpalJobs Mobile App",
          description: "Search jobs on the go",
          cta: "Download",
          bgColor: "bg-green-50"
        };
      default:
        return {
          title: "Resume Review Service",
          description: "Get professional feedback",
          cta: "Learn More",
          bgColor: "bg-amber-50"
        };
    }
  };
  
  const content = getAdContent();
  
  return (
    <div 
      className={`relative rounded-md overflow-hidden shadow-sm border border-slate-200 ${getHeight()} w-full ${content.bgColor} ${className}`} 
      data-ad-id={id}
    >
      <button 
        className="absolute top-1 right-1 p-1 rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-slate-700 transition-colors"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss ad"
      >
        <X className="h-3 w-3" />
      </button>
      
      <div className="flex h-full p-3">
        <div className="flex-shrink-0 flex items-center justify-center bg-white/50 rounded-md w-16">
          <span className="text-xs font-medium text-slate-400">AD</span>
        </div>
        <div className="ml-3 flex flex-col justify-between flex-grow">
          <div>
            <h4 className="text-sm font-semibold">{content.title}</h4>
            <p className="text-xs text-slate-600 mt-1">{content.description}</p>
          </div>
          <button className="text-xs font-medium bg-white px-3 py-1 rounded-md shadow-sm border border-slate-200 hover:bg-slate-50 mt-2 self-start">
            {content.cta}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;
