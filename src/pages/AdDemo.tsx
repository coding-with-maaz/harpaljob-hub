
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdBanner from "@/components/ads/AdBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AdDemo = () => {
  const [adsEnabled, setAdsEnabled] = useState(true);
  const [mobileAdsEnabled, setMobileAdsEnabled] = useState(true);
  const [googleAdsEnabled, setGoogleAdsEnabled] = useState(true);

  useEffect(() => {
    // Check the current ad settings when component mounts
    const adsEnabledValue = localStorage.getItem('adsEnabled');
    const mobileAdsEnabledValue = localStorage.getItem('mobileAdsEnabled');
    const googleAdsEnabledValue = localStorage.getItem('googleAdsEnabled');
    
    setAdsEnabled(adsEnabledValue !== 'false');
    setMobileAdsEnabled(mobileAdsEnabledValue !== 'false');
    setGoogleAdsEnabled(googleAdsEnabledValue !== 'false');
    
    // Listen for changes to localStorage
    const handleStorageChange = () => {
      const updatedAdsEnabled = localStorage.getItem('adsEnabled');
      const updatedMobileAdsEnabled = localStorage.getItem('mobileAdsEnabled');
      const updatedGoogleAdsEnabled = localStorage.getItem('googleAdsEnabled');
      
      setAdsEnabled(updatedAdsEnabled !== 'false');
      setMobileAdsEnabled(updatedMobileAdsEnabled !== 'false');
      setGoogleAdsEnabled(updatedGoogleAdsEnabled !== 'false');
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleAdsEnabled = () => {
    const newValue = !adsEnabled;
    localStorage.setItem('adsEnabled', newValue.toString());
    setAdsEnabled(newValue);
  };

  const toggleMobileAdsEnabled = () => {
    const newValue = !mobileAdsEnabled;
    localStorage.setItem('mobileAdsEnabled', newValue.toString());
    setMobileAdsEnabled(newValue);
  };

  const toggleGoogleAdsEnabled = () => {
    const newValue = !googleAdsEnabled;
    localStorage.setItem('googleAdsEnabled', newValue.toString());
    setGoogleAdsEnabled(newValue);
  };

  return (
    <>
      <Helmet>
        <title>Ad Demonstration | HarpalJobs</title>
        <meta name="description" content="Demonstration of ad placements and controls on HarpalJobs website" />
        <meta name="keywords" content="job board, job search, employment, career, jobs, ad demonstration" />
      </Helmet>

      <div className="flex min-h-screen flex-col">
        <Navbar />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Ad Demonstration</h1>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
            <Card>
              <CardHeader>
                <CardTitle>Ad Controls</CardTitle>
                <CardDescription>Toggle ad visibility settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>All Ads</span>
                  <Button 
                    variant={adsEnabled ? "default" : "outline"} 
                    onClick={toggleAdsEnabled}
                  >
                    {adsEnabled ? "Enabled" : "Disabled"}
                  </Button>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Mobile Ads</span>
                  <Button 
                    variant={mobileAdsEnabled ? "default" : "outline"} 
                    onClick={toggleMobileAdsEnabled}
                  >
                    {mobileAdsEnabled ? "Enabled" : "Disabled"}
                  </Button>
                </div>
                
                <div className="flex justify-between items-center">
                  <span>Google Ads</span>
                  <Button 
                    variant={googleAdsEnabled ? "default" : "outline"} 
                    onClick={toggleGoogleAdsEnabled}
                  >
                    {googleAdsEnabled ? "Enabled" : "Disabled"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Header Ad (Google)</h2>
              <div className="mb-6">
                <AdBanner 
                  id="header-ad" 
                  position="header" 
                  size="responsive" 
                  type="google"
                  googleAdSlot="header_12345"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-semibold mb-4">Content Area</h2>
                <div className="prose max-w-none mb-6">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.</p>
                  
                  <AdBanner 
                    id="inline-ad-1" 
                    position="inline" 
                    size="medium" 
                    className="my-6"
                  />
                  
                  <p>Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor.</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.</p>
                  
                  <AdBanner 
                    id="google-inline-ad" 
                    position="inline" 
                    size="medium" 
                    type="google" 
                    googleAdSlot="inline_67890"
                    className="my-6"
                  />
                  
                  <p>Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor.</p>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-4">Sidebar</h2>
                <AdBanner 
                  id="sidebar-ad-1" 
                  position="sidebar" 
                  size="medium"
                  className="mb-6"
                />
                
                <AdBanner 
                  id="sidebar-ad-2" 
                  position="sidebar" 
                  size="small"
                  className="mb-6"
                />
                
                <AdBanner 
                  id="sidebar-google-ad" 
                  position="sidebar" 
                  size="large" 
                  type="google"
                  googleAdSlot="sidebar_54321"
                />
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Footer Ad</h2>
              <AdBanner 
                id="footer-ad" 
                position="footer" 
                size="responsive"
              />
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default AdDemo;
