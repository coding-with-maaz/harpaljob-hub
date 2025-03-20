import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Globe, 
  Check, 
  AlertTriangle,
  ArrowUpRight,
  FileText,
  X,
  Plus,
  Search,
  Tag
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface Keyword {
  id: string;
  name: string;
  volume: number;
  difficulty: number;
  rank: number | null;
}

const DashboardSEO = () => {
  const { toast } = useToast();
  const [metaTitle, setMetaTitle] = useState("HarpalJobs | Find Your Next Career Opportunity");
  const [metaDescription, setMetaDescription] = useState(
    "Browse thousands of job listings from top companies. Find and apply for the latest opportunities in technology, marketing, design and more."
  );
  const [ogTitle, setOgTitle] = useState("HarpalJobs - Your Career Starts Here");
  const [ogDescription, setOgDescription] = useState(
    "Discover your dream job with HarpalJobs - the leading job board for professionals."
  );
  const [sitemapGenerated, setSitemapGenerated] = useState("2023-11-25");
  const [newKeyword, setNewKeyword] = useState("");
  const [keywords, setKeywords] = useState<Keyword[]>([
    { id: "1", name: "remote jobs", volume: 45600, difficulty: 89, rank: 12 },
    { id: "2", name: "tech jobs", volume: 32400, difficulty: 76, rank: 8 },
    { id: "3", name: "developer jobs", volume: 18900, difficulty: 65, rank: 5 },
    { id: "4", name: "work from home jobs", volume: 74300, difficulty: 92, rank: 22 },
    { id: "5", name: "entry level jobs", volume: 41000, difficulty: 71, rank: 14 },
    { id: "6", name: "part time jobs", volume: 83600, difficulty: 88, rank: null },
    { id: "7", name: "job search", volume: 110500, difficulty: 95, rank: null }
  ]);

  const handleSaveMetadata = () => {
    toast({
      title: "SEO Settings Saved",
      description: "Your metadata changes have been saved successfully.",
    });
  };

  const handleGenerateSitemap = () => {
    setSitemapGenerated(new Date().toISOString().split("T")[0]);
    toast({
      title: "Sitemap Generated",
      description: "Your sitemap has been successfully generated and submitted to search engines.",
    });
  };

  const addKeyword = () => {
    if (!newKeyword.trim()) return;
    
    const newKeywordObj: Keyword = {
      id: Date.now().toString(),
      name: newKeyword.trim().toLowerCase(),
      volume: Math.floor(Math.random() * 50000) + 5000,
      difficulty: Math.floor(Math.random() * 60) + 40,
      rank: null
    };
    
    setKeywords([...keywords, newKeywordObj]);
    setNewKeyword("");
    
    toast({
      title: "Keyword Added",
      description: `"${newKeyword}" has been added to your tracked keywords.`,
    });
  };

  const removeKeyword = (id: string) => {
    setKeywords(keywords.filter(keyword => keyword.id !== id));
    
    toast({
      title: "Keyword Removed",
      description: "The keyword has been removed from tracking.",
    });
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty >= 80) return "text-red-500 bg-red-50";
    if (difficulty >= 60) return "text-yellow-500 bg-yellow-50";
    return "text-green-500 bg-green-50";
  };

  return (
    <div className="space-y-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>SEO Health Check</CardTitle>
          <CardDescription>
            Overview of your website's search engine optimization status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-green-500/20 p-1">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="font-medium">Meta tags optimization</p>
                  <p className="text-sm text-muted-foreground">All pages have proper meta tags</p>
                </div>
              </div>
              <span className="text-sm font-medium text-green-500">Good</span>
            </div>
            
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-yellow-500/20 p-1">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <p className="font-medium">Image optimization</p>
                  <p className="text-sm text-muted-foreground">12 images missing alt text</p>
                </div>
              </div>
              <span className="text-sm font-medium text-yellow-500">Needs Improvement</span>
            </div>
            
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-green-500/20 p-1">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="font-medium">Mobile responsiveness</p>
                  <p className="text-sm text-muted-foreground">Website is fully responsive</p>
                </div>
              </div>
              <span className="text-sm font-medium text-green-500">Good</span>
            </div>
            
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-yellow-500/20 p-1">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <p className="font-medium">Page load speed</p>
                  <p className="text-sm text-muted-foreground">Average load time: 3.2s</p>
                </div>
              </div>
              <span className="text-sm font-medium text-yellow-500">Needs Improvement</span>
            </div>
            
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-green-500/20 p-1">
                  <Check className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="font-medium">Structured data</p>
                  <p className="text-sm text-muted-foreground">JobPosting schema implemented</p>
                </div>
              </div>
              <span className="text-sm font-medium text-green-500">Good</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="metadata" className="space-y-4">
        <TabsList>
          <TabsTrigger value="metadata">Metadata</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="tracking">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="metadata" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Website Metadata</CardTitle>
              <CardDescription>
                Customize your website's meta tags for better search engine visibility
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="meta-title">
                  Meta Title (60-70 characters recommended)
                </label>
                <input
                  id="meta-title"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Characters: {metaTitle.length}/70
                  {metaTitle.length > 70 && (
                    <span className="text-destructive"> (Too long)</span>
                  )}
                </p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="meta-description">
                  Meta Description (150-160 characters recommended)
                </label>
                <textarea
                  id="meta-description"
                  rows={3}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Characters: {metaDescription.length}/160
                  {metaDescription.length > 160 && (
                    <span className="text-destructive"> (Too long)</span>
                  )}
                </p>
              </div>
              
              <div className="pt-4">
                <h3 className="text-sm font-medium mb-2">Preview in Search Results</h3>
                <div className="rounded-lg border p-4">
                  <div className="text-blue-600 text-xl mb-1 hover:underline cursor-pointer">
                    {metaTitle.length > 70 ? metaTitle.substring(0, 67) + "..." : metaTitle}
                  </div>
                  <div className="text-green-700 text-sm mb-1">
                    https://harpal-jobs.example.com/
                  </div>
                  <div className="text-sm text-slate-700">
                    {metaDescription.length > 160
                      ? metaDescription.substring(0, 157) + "..."
                      : metaDescription}
                  </div>
                </div>
              </div>
              
              <Button className="mt-4" onClick={handleSaveMetadata}>
                Save Metadata
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="keywords" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Keyword Research & Tracking</CardTitle>
              <CardDescription>
                Track important keywords and monitor their performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-2">
                <Input 
                  placeholder="Add a keyword to track..." 
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addKeyword()}
                />
                <Button onClick={addKeyword}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
                <Button variant="outline">
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  Import
                </Button>
              </div>
              
              <div className="rounded-md border">
                <div className="bg-muted/50 p-3">
                  <div className="grid grid-cols-12 text-sm font-medium">
                    <div className="col-span-5">Keyword</div>
                    <div className="col-span-2 text-center">Search Volume</div>
                    <div className="col-span-2 text-center">Difficulty</div>
                    <div className="col-span-2 text-center">Rank</div>
                    <div className="col-span-1"></div>
                  </div>
                </div>
                <div className="divide-y">
                  {keywords.map((keyword) => (
                    <div key={keyword.id} className="p-3">
                      <div className="grid grid-cols-12 items-center text-sm">
                        <div className="col-span-5 font-medium">{keyword.name}</div>
                        <div className="col-span-2 text-center">{keyword.volume.toLocaleString()}</div>
                        <div className="col-span-2 text-center">
                          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${getDifficultyColor(keyword.difficulty)}`}>
                            {keyword.difficulty}/100
                          </span>
                        </div>
                        <div className="col-span-2 text-center">
                          {keyword.rank 
                            ? <span className="font-medium">{keyword.rank}</span> 
                            : <span className="text-muted-foreground">-</span>}
                        </div>
                        <div className="col-span-1 flex justify-end">
                          <Button variant="ghost" size="sm" onClick={() => removeKeyword(keyword.id)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Keyword Suggestions</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">job search platform</Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">find jobs online</Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">career opportunities</Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">job board</Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">hiring near me</Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-muted">best job search site</Badge>
                </div>
              </div>
              
              <div className="grid gap-4 sm:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Page Optimization</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">68%</div>
                    <p className="text-xs text-muted-foreground">Average across all pages</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Keywords Ranking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4/7</div>
                    <p className="text-xs text-muted-foreground">Keywords in top 20 results</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Organic Traffic</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">14.2K</div>
                    <p className="text-xs text-muted-foreground">Monthly organic visits</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sitemap" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sitemap Management</CardTitle>
              <CardDescription>
                Generate and manage your website's sitemap for search engines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">sitemap.xml</div>
                  <div className="text-xs text-muted-foreground">
                    Last generated: {sitemapGenerated}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-8">
                    <Globe className="mr-2 h-4 w-4" />
                    View
                  </Button>
                  <Button size="sm" className="h-8" onClick={handleGenerateSitemap}>
                    Regenerate
                  </Button>
                </div>
              </div>
              
              <div className="rounded-lg border p-4">
                <h3 className="text-sm font-medium mb-2">Search Engine Submission</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Submit your sitemap to search engines to ensure your content is indexed.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center justify-between rounded border p-3">
                    <div className="flex items-center space-x-2">
                      <img src="https://www.google.com/favicon.ico" alt="Google" className="h-5 w-5" />
                      <span className="text-sm font-medium">Google Search Console</span>
                    </div>
                    <Button size="sm" variant="outline" className="h-7 gap-1">
                      <ArrowUpRight className="h-3 w-3" />
                      <span>Submit</span>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between rounded border p-3">
                    <div className="flex items-center space-x-2">
                      <img src="https://www.bing.com/favicon.ico" alt="Bing" className="h-5 w-5" />
                      <span className="text-sm font-medium">Bing Webmaster Tools</span>
                    </div>
                    <Button size="sm" variant="outline" className="h-7 gap-1">
                      <ArrowUpRight className="h-3 w-3" />
                      <span>Submit</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Social Media SEO</CardTitle>
              <CardDescription>
                Customize how your content appears when shared on social media
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="og-title">
                    Open Graph Title
                  </label>
                  <input
                    id="og-title"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={ogTitle}
                    onChange={(e) => setOgTitle(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="og-description">
                    Open Graph Description
                  </label>
                  <textarea
                    id="og-description"
                    rows={2}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={ogDescription}
                    onChange={(e) => setOgDescription(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="og-image">
                    Open Graph Image
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="h-16 w-28 rounded-md border bg-muted flex items-center justify-center">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Button variant="outline" size="sm">
                      Upload Image
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Recommended size: 1200 x 630 pixels
                  </p>
                </div>
                
                <div className="rounded-lg border p-4 mt-4">
                  <h3 className="text-sm font-medium mb-3">Social Media Preview</h3>
                  <div className="space-y-4">
                    <div className="rounded-md border overflow-hidden">
                      <div className="bg-[#1877F2] text-white p-2 text-xs font-medium">
                        Facebook Preview
                      </div>
                      <div className="p-3">
                        <div className="h-36 bg-muted rounded-md flex items-center justify-center mb-2">
                          <p className="text-xs text-muted-foreground">Image Preview</p>
                        </div>
                        <h4 className="text-sm font-semibold text-[#385898] hover:underline mb-1">
                          {ogTitle}
                        </h4>
                        <p className="text-xs text-gray-500 mb-1">harpal-jobs.example.com</p>
                        <p className="text-xs text-gray-700">{ogDescription}</p>
                      </div>
                    </div>
                    
                    <div className="rounded-md border overflow-hidden">
                      <div className="bg-[#1DA1F2] text-white p-2 text-xs font-medium">
                        Twitter Preview
                      </div>
                      <div className="p-3">
                        <div className="h-36 bg-muted rounded-md flex items-center justify-center mb-2">
                          <p className="text-xs text-muted-foreground">Image Preview</p>
                        </div>
                        <h4 className="text-sm font-semibold mb-1">{ogTitle}</h4>
                        <p className="text-xs text-gray-700">{ogDescription}</p>
                        <p className="text-xs text-gray-500 mt-1">harpal-jobs.example.com</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button className="mt-2" onClick={handleSaveMetadata}>
                  Save Social Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tracking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics & Tracking</CardTitle>
              <CardDescription>
                Configure analytics and tracking codes for your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="ga-id">
                    Google Analytics Tracking ID
                  </label>
                  <input
                    id="ga-id"
                    placeholder="UA-XXXXXXXXX-X or G-XXXXXXXXX"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter your Google Analytics tracking ID to integrate with your website
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="gtm-id">
                    Google Tag Manager Container ID
                  </label>
                  <input
                    id="gtm-id"
                    placeholder="GTM-XXXXXXX"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter your GTM container ID to manage all your marketing tags
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="fb-pixel">
                    Facebook Pixel ID
                  </label>
                  <input
                    id="fb-pixel"
                    placeholder="XXXXXXXXXXXXXXXXXX"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="custom-head">
                    Custom Head Code
                  </label>
                  <textarea
                    id="custom-head"
                    rows={5}
                    placeholder="<!-- Add your custom scripts, meta tags, or other code here -->"
                    className="font-mono w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <p className="text-xs text-muted-foreground">
                    Add custom code to be included in the &lt;head&gt; section of your website
                  </p>
                </div>
                
                <Button>
                  Save Tracking Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardSEO;
