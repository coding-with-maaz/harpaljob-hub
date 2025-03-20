
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  Globe, 
  BarChart4, 
  LineChart, 
  Share2, 
  Tag,
  RefreshCw,
  CheckCircle,
  PlusCircle,
  Trash2,
  ArrowUpRight,
  Info,
  Settings,
  Gauge
} from "lucide-react";
import { analyzeKeywordDensity, suggestRelatedKeywords } from "@/utils/seo";
import SEODashboardController from "./SEODashboardController";

const DashboardSEO = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("global");
  const [metaTitle, setMetaTitle] = useState("HarpalJobs | Find Your Dream Job Today");
  const [metaDescription, setMetaDescription] = useState("HarpalJobs is a leading job board connecting job seekers with top employers. Search thousands of job listings across all industries and locations.");
  const [keywords, setKeywords] = useState("jobs, careers, employment, hiring, job search, job board");
  const [keywordToAnalyze, setKeywordToAnalyze] = useState("jobs");
  const [contentToAnalyze, setContentToAnalyze] = useState("");
  const [keywordAnalysis, setKeywordAnalysis] = useState({ count: 0, density: 0 });
  const [relatedKeywords, setRelatedKeywords] = useState<string[]>([]);
  const [canonicalUrl, setCanonicalUrl] = useState("https://harpalJobs.com");
  const [sitemapUrl, setSitemapUrl] = useState("https://harpalJobs.com/sitemap.xml");
  const [robotsTxt, setRobotsTxt] = useState("User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /private/\nSitemap: https://harpalJobs.com/sitemap.xml");

  // Function to save SEO settings
  const saveSettings = () => {
    toast({
      title: "SEO Settings Saved",
      description: "Your SEO settings have been updated successfully.",
    });
  };

  // Function to analyze keyword density
  const analyzeKeyword = () => {
    if (!keywordToAnalyze || !contentToAnalyze) {
      toast({
        title: "Error",
        description: "Please provide both a keyword and content to analyze.",
        variant: "destructive",
      });
      return;
    }
    
    const analysis = analyzeKeywordDensity(contentToAnalyze, keywordToAnalyze);
    setKeywordAnalysis(analysis);
    
    // Generate related keywords
    const related = suggestRelatedKeywords(keywordToAnalyze);
    setRelatedKeywords(related);
    
    toast({
      title: "Keyword Analysis Complete",
      description: `Keyword "${keywordToAnalyze}" appears ${analysis.count} times (${analysis.density.toFixed(2)}%).`,
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="global" onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="global">
              <Globe className="mr-2 h-4 w-4" />
              Global SEO
            </TabsTrigger>
            <TabsTrigger value="tools">
              <Search className="mr-2 h-4 w-4" />
              SEO Tools
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart4 className="mr-2 h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="structured">
              <Settings className="mr-2 h-4 w-4" />
              Advanced
            </TabsTrigger>
          </TabsList>
          
          <Button variant="outline" size="sm" onClick={() => window.open('/seo-analyzer', '_blank')}>
            <Gauge className="mr-2 h-4 w-4" />
            Open SEO Analyzer
          </Button>
        </div>
        
        <TabsContent value="global">
          <SEODashboardController />
        </TabsContent>
        
        <TabsContent value="tools">
          <Card>
            <CardHeader>
              <CardTitle>SEO Analysis Tools</CardTitle>
              <CardDescription>
                Analyze and optimize your content for search engines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-base font-medium">Keyword Density Analyzer</h3>
                  
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-grow">
                        <label className="text-sm font-medium">Keyword to Analyze</label>
                        <Input 
                          value={keywordToAnalyze} 
                          onChange={(e) => setKeywordToAnalyze(e.target.value)}
                          placeholder="Enter a keyword"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">&nbsp;</label>
                        <Button 
                          onClick={analyzeKeyword} 
                          className="w-full mt-1"
                        >
                          Analyze
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Content to Analyze</label>
                      <Textarea 
                        value={contentToAnalyze} 
                        onChange={(e) => setContentToAnalyze(e.target.value)}
                        placeholder="Paste your content here to analyze keyword density"
                        rows={5}
                        className="mt-1"
                      />
                    </div>
                    
                    {keywordAnalysis.count > 0 && (
                      <div className="p-4 bg-muted rounded-md">
                        <h4 className="font-medium mb-2">Analysis Results:</h4>
                        <p>Keyword: <span className="font-medium">{keywordToAnalyze}</span></p>
                        <p>Occurrences: <span className="font-medium">{keywordAnalysis.count}</span></p>
                        <p>
                          Density: <span className="font-medium">{keywordAnalysis.density.toFixed(2)}%</span>
                          {keywordAnalysis.density < 1 && (
                            <span className="text-yellow-600 ml-2">(Consider increasing)</span>
                          )}
                          {keywordAnalysis.density > 4 && (
                            <span className="text-yellow-600 ml-2">(Consider reducing)</span>
                          )}
                          {keywordAnalysis.density >= 1 && keywordAnalysis.density <= 4 && (
                            <span className="text-green-600 ml-2">(Optimal range)</span>
                          )}
                        </p>
                      </div>
                    )}
                    
                    {relatedKeywords.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Related Keywords:</h4>
                        <div className="flex flex-wrap gap-2">
                          {relatedKeywords.map((keyword, index) => (
                            <span 
                              key={index} 
                              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Meta Tags</CardTitle>
                <CardDescription>Configure meta tags for individual pages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Meta Title</label>
                  <Input 
                    value={metaTitle} 
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder="Page title"
                  />
                  <p className="text-xs text-muted-foreground">
                    Recommended: 50-60 characters. Current: {metaTitle.length} characters
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Meta Description</label>
                  <Textarea 
                    value={metaDescription} 
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="Page description"
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">
                    Recommended: 150-160 characters. Current: {metaDescription.length} characters
                  </p>
                </div>
                
                <Button onClick={saveSettings}>Save Meta Settings</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>URL Settings</CardTitle>
                <CardDescription>Configure canonical URLs and redirects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Canonical URL</label>
                  <Input 
                    value={canonicalUrl} 
                    onChange={(e) => setCanonicalUrl(e.target.value)}
                    placeholder="https://example.com"
                  />
                  <p className="text-xs text-muted-foreground">
                    The definitive URL for this page to avoid duplicate content issues
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium mb-1">Permanent Redirects (301)</h3>
                  <div className="p-3 bg-muted rounded-md text-sm">
                    <p>No redirects configured</p>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Redirect
                  </Button>
                </div>
                
                <Button onClick={saveSettings}>Save URL Settings</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Search Performance</CardTitle>
                <CardDescription>Search rankings and click-through rate</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <LineChart className="h-5 w-5" />
                  <span>Search performance chart would appear here</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Keywords</CardTitle>
                <CardDescription>Keywords driving traffic to your site</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { keyword: "remote jobs", position: 3, change: 1, volume: 12400 },
                    { keyword: "software developer jobs", position: 5, change: -2, volume: 6800 },
                    { keyword: "work from home", position: 8, change: 3, volume: 8500 },
                    { keyword: "tech jobs", position: 12, change: 0, volume: 4300 },
                    { keyword: "marketing jobs", position: 15, change: 5, volume: 3700 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Tag className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">{item.keyword}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm">#{item.position}</span>
                        <span className={`text-sm ${
                          item.change > 0 ? 'text-green-500' : 
                          item.change < 0 ? 'text-red-500' : 'text-gray-500'
                        }`}>
                          {item.change > 0 ? `+${item.change}` : item.change}
                        </span>
                        <span className="text-xs text-gray-500">{item.volume.toLocaleString()} searches/mo</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>SEO Optimization Tips</CardTitle>
              <CardDescription>Suggestions to improve your search engine rankings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md flex items-start">
                  <Info className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Improve Meta Descriptions</h4>
                    <p className="text-sm text-yellow-700">12 job listings are missing meta descriptions, which could improve click-through rates in search results.</p>
                    <Button variant="link" className="p-0 h-auto text-yellow-800">Fix Issues</Button>
                  </div>
                </div>
                
                <div className="p-3 bg-green-50 border border-green-200 rounded-md flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-green-800">Mobile Optimization</h4>
                    <p className="text-sm text-green-700">Your website is fully optimized for mobile devices, which is great for SEO rankings.</p>
                  </div>
                </div>
                
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md flex items-start">
                  <Info className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Add More Internal Links</h4>
                    <p className="text-sm text-yellow-700">Increasing internal links between related job listings can improve SEO and user navigation.</p>
                    <Button variant="link" className="p-0 h-auto text-yellow-800">Learn More</Button>
                  </div>
                </div>
                
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md flex items-start">
                  <Info className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Optimize Page Load Speed</h4>
                    <p className="text-sm text-yellow-700">Some pages are loading slowly, which can affect SEO rankings and user experience.</p>
                    <Button variant="link" className="p-0 h-auto text-yellow-800">View Details</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="structured">
          <Card>
            <CardHeader>
              <CardTitle>Structured Data</CardTitle>
              <CardDescription>Configure structured data for rich results in search listings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="mb-4">
                <p className="text-sm mb-4">
                  Structured data helps search engines understand your content and can enable rich results in search listings.
                </p>
                
                <div className="space-y-4">
                  <div className="p-3 border rounded-md flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Job Postings Schema</span>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  
                  <div className="p-3 border rounded-md flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Organization Schema</span>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  
                  <div className="p-3 border rounded-md flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>Website Schema</span>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  
                  <div className="p-3 border rounded-md flex items-center justify-between">
                    <div className="flex items-center">
                      <PlusCircle className="h-5 w-5 text-blue-500 mr-2" />
                      <span>Add New Schema</span>
                    </div>
                    <Button variant="outline" size="sm">Add</Button>
                  </div>
                </div>
              </div>
              
              <Button onClick={saveSettings}>Save Structured Data Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardSEO;
