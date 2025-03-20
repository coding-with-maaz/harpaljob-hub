
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { SEOPreview } from "@/components/SEOHead";
import { generateRobotsTxt } from "@/utils/seo";
import { AlertCircle, Check, Copy, Download, ExternalLink, Globe, Info, RefreshCw, Save } from 'lucide-react';

interface SEODashboardControllerProps {
  domainName?: string;
}

const SEODashboardController: React.FC<SEODashboardControllerProps> = ({ 
  domainName = "harpalJobs.com"
}) => {
  const { toast } = useToast();
  const [globalTitle, setGlobalTitle] = useState('HarpalJobs | Find Your Dream Job Today');
  const [globalDescription, setGlobalDescription] = useState('HarpalJobs is the leading job board connecting job seekers with top employers. Search thousands of job listings across all industries and locations.');
  const [globalKeywords, setGlobalKeywords] = useState('jobs, careers, employment, hiring, job search, job board');
  const [ogImage, setOgImage] = useState('/og-image.png');
  const [indexingEnabled, setIndexingEnabled] = useState(true);
  const [robotsTxt, setRobotsTxt] = useState(generateRobotsTxt(`https://${domainName}`));
  const [customHeadCode, setCustomHeadCode] = useState('');
  const [siteVerificationGoogle, setSiteVerificationGoogle] = useState('');
  const [siteVerificationBing, setSiteVerificationBing] = useState('');
  
  const handleSaveSEOSettings = () => {
    toast({
      title: "SEO Settings Saved",
      description: "Your SEO settings have been updated successfully.",
    });
  };
  
  const handleGenerateRobotsTxt = () => {
    setRobotsTxt(generateRobotsTxt(`https://${domainName}`));
    toast({
      title: "Robots.txt Generated",
      description: "Robots.txt has been regenerated with default settings.",
    });
  };
  
  const downloadRobotsTxt = () => {
    const blob = new Blob([robotsTxt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const copyToClipboard = (text: string, message: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied!",
        description: message,
      });
    });
  };
  
  const verificationMeta = () => {
    let code = '';
    if (siteVerificationGoogle) {
      code += `<meta name="google-site-verification" content="${siteVerificationGoogle}" />\n`;
    }
    if (siteVerificationBing) {
      code += `<meta name="msvalidate.01" content="${siteVerificationBing}" />`;
    }
    return code;
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>SEO Global Settings</CardTitle>
          <CardDescription>
            Configure site-wide SEO settings that apply to all pages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="space-y-4">
            <TabsList>
              <TabsTrigger value="basic">Basic SEO</TabsTrigger>
              <TabsTrigger value="social">Social Media</TabsTrigger>
              <TabsTrigger value="indexing">Indexing Control</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Default Site Title</label>
                  <Input 
                    value={globalTitle} 
                    onChange={(e) => setGlobalTitle(e.target.value)}
                    placeholder="Your website title"
                  />
                  <p className="text-xs text-muted-foreground">
                    Recommended length: 50-60 characters. Current: {globalTitle.length} characters
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Default Meta Description</label>
                  <Textarea 
                    value={globalDescription} 
                    onChange={(e) => setGlobalDescription(e.target.value)}
                    placeholder="Your website description"
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    Recommended length: 150-160 characters. Current: {globalDescription.length} characters
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Default Keywords</label>
                  <Textarea 
                    value={globalKeywords} 
                    onChange={(e) => setGlobalKeywords(e.target.value)}
                    placeholder="keyword1, keyword2, keyword3"
                    rows={2}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter keywords separated by commas
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Default Search Preview</h3>
                <SEOPreview 
                  title={globalTitle}
                  description={globalDescription}
                  url={`https://${domainName}`}
                />
              </div>
              
              <Button onClick={handleSaveSEOSettings} className="mt-4">
                <Save className="mr-2 h-4 w-4" />
                Save Basic SEO Settings
              </Button>
            </TabsContent>
            
            <TabsContent value="social" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">OG Image URL</label>
                  <Input 
                    value={ogImage} 
                    onChange={(e) => setOgImage(e.target.value)}
                    placeholder="/path/to/image.jpg"
                  />
                  <p className="text-xs text-muted-foreground">
                    Image displayed when sharing on social media (Recommended size: 1200x630px)
                  </p>
                </div>
                
                <div className="p-3 bg-muted/50 rounded-lg flex items-start space-x-2">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">Social media previews will use the following:</p>
                    <ul className="text-xs text-muted-foreground list-disc pl-4 mt-1 space-y-1">
                      <li>Title: Same as your page title</li>
                      <li>Description: Same as your meta description</li>
                      <li>Image: The OG Image URL defined above</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="text-sm font-medium mb-2 block">Open Graph Code Preview</label>
                  <div className="p-3 bg-slate-900 text-slate-100 rounded-md font-mono text-xs">
                    {`<meta property="og:title" content="${globalTitle}" />
<meta property="og:description" content="${globalDescription}" />
<meta property="og:image" content="${ogImage}" />
<meta property="og:url" content="https://${domainName}" />
<meta property="og:type" content="website" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${globalTitle}" />
<meta name="twitter:description" content="${globalDescription}" />
<meta name="twitter:image" content="${ogImage}" />`}
                  </div>
                  <div className="flex justify-end mt-2">
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(
                      `<meta property="og:title" content="${globalTitle}" />
<meta property="og:description" content="${globalDescription}" />
<meta property="og:image" content="${ogImage}" />
<meta property="og:url" content="https://${domainName}" />
<meta property="og:type" content="website" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${globalTitle}" />
<meta name="twitter:description" content="${globalDescription}" />
<meta name="twitter:image" content="${ogImage}" />`,
                      "Open Graph tags copied to clipboard"
                    )}>
                      <Copy className="h-3.5 w-3.5 mr-1" />
                      Copy
                    </Button>
                  </div>
                </div>
              </div>
              
              <Button onClick={handleSaveSEOSettings} className="mt-4">
                <Save className="mr-2 h-4 w-4" />
                Save Social Media Settings
              </Button>
            </TabsContent>
            
            <TabsContent value="indexing" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div>
                    <h3 className="font-medium">Search Engine Indexing</h3>
                    <p className="text-sm text-muted-foreground">Allow search engines to index your site</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={indexingEnabled} 
                      onCheckedChange={setIndexingEnabled}
                      id="indexing-switch"
                    />
                    <Badge variant={indexingEnabled ? "default" : "destructive"}>
                      {indexingEnabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                </div>
                
                {!indexingEnabled && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Warning: Indexing Disabled</h4>
                      <p className="text-sm text-yellow-700">
                        Your site will not appear in search engine results while indexing is disabled.
                        Only use this feature during development or for private pages.
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Robots.txt Content</label>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm" onClick={handleGenerateRobotsTxt}>
                        <RefreshCw className="h-3.5 w-3.5 mr-1" />
                        Regenerate
                      </Button>
                      <Button variant="outline" size="sm" onClick={downloadRobotsTxt}>
                        <Download className="h-3.5 w-3.5 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                  <Textarea 
                    value={robotsTxt} 
                    onChange={(e) => setRobotsTxt(e.target.value)}
                    rows={8}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    This tells search engines which parts of your site to crawl
                  </p>
                </div>
                
                <div className="flex items-center p-3 bg-muted/50 rounded-md">
                  <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm">
                      A sitemap.xml file is automatically generated at: 
                      <a 
                        href={`https://${domainName}/sitemap.xml`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ml-1 text-blue-600 hover:underline inline-flex items-center"
                      >
                        {`https://${domainName}/sitemap.xml`}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              
              <Button onClick={handleSaveSEOSettings} className="mt-4">
                <Save className="mr-2 h-4 w-4" />
                Save Indexing Settings
              </Button>
            </TabsContent>
            
            <TabsContent value="advanced" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Google Search Console Verification</label>
                  <Input 
                    value={siteVerificationGoogle} 
                    onChange={(e) => setSiteVerificationGoogle(e.target.value)}
                    placeholder="Verification code from Google Search Console"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the content value from the meta tag provided by Google Search Console
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bing Webmaster Tools Verification</label>
                  <Input 
                    value={siteVerificationBing} 
                    onChange={(e) => setSiteVerificationBing(e.target.value)}
                    placeholder="Verification code from Bing Webmaster Tools"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the content value from the meta tag provided by Bing Webmaster Tools
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Custom Head Code</label>
                  <Textarea 
                    value={customHeadCode} 
                    onChange={(e) => setCustomHeadCode(e.target.value)}
                    placeholder="<!-- Additional HTML for <head> section -->"
                    rows={4}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Additional code to add to the &lt;head&gt; section of all pages (use with caution)
                  </p>
                </div>
                
                {(siteVerificationGoogle || siteVerificationBing) && (
                  <div className="mt-4">
                    <label className="text-sm font-medium mb-2 block">Verification Meta Tags Preview</label>
                    <div className="p-3 bg-slate-900 text-slate-100 rounded-md font-mono text-xs">
                      {verificationMeta()}
                    </div>
                    <div className="flex justify-end mt-2">
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(
                        verificationMeta(),
                        "Verification tags copied to clipboard"
                      )}>
                        <Copy className="h-3.5 w-3.5 mr-1" />
                        Copy
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              <Button onClick={handleSaveSEOSettings} className="mt-4">
                <Save className="mr-2 h-4 w-4" />
                Save Advanced Settings
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>SEO Quick Actions</CardTitle>
          <CardDescription>Common SEO tasks and tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto flex-col items-start p-4 justify-start" onClick={() => window.open('/seo-analyzer', '_blank')}>
              <div className="flex items-center w-full mb-2">
                <Globe className="h-5 w-5 mr-2 text-blue-500" />
                <span className="font-medium">SEO Analyzer</span>
              </div>
              <p className="text-xs text-muted-foreground text-left">
                Analyze and optimize content for better search rankings
              </p>
            </Button>
            
            <Button variant="outline" className="h-auto flex-col items-start p-4 justify-start" onClick={() => window.open('/sitemap.xml', '_blank')}>
              <div className="flex items-center w-full mb-2">
                <Globe className="h-5 w-5 mr-2 text-green-500" />
                <span className="font-medium">View Sitemap</span>
              </div>
              <p className="text-xs text-muted-foreground text-left">
                View and download your sitemap.xml file
              </p>
            </Button>
            
            <Button variant="outline" className="h-auto flex-col items-start p-4 justify-start" onClick={downloadRobotsTxt}>
              <div className="flex items-center w-full mb-2">
                <Download className="h-5 w-5 mr-2 text-indigo-500" />
                <span className="font-medium">Download robots.txt</span>
              </div>
              <p className="text-xs text-muted-foreground text-left">
                Download your robots.txt file for reference
              </p>
            </Button>
            
            <Button variant="outline" className="h-auto flex-col items-start p-4 justify-start">
              <div className="flex items-center w-full mb-2">
                <Check className="h-5 w-5 mr-2 text-orange-500" />
                <span className="font-medium">Run SEO Audit</span>
              </div>
              <p className="text-xs text-muted-foreground text-left">
                Perform a comprehensive SEO audit of your site
              </p>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEODashboardController;
