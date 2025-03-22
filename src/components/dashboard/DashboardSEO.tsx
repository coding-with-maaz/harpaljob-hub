
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Globe, 
  BarChart4, 
  Settings,
  Gauge,
  ArrowUpRight
} from "lucide-react";
import SEODashboardController from "./SEODashboardController";
import SEOKeywordAnalyzer from "./SEOKeywordAnalyzer";
import { getSEOPerformanceData } from "@/services/seoService";

const DashboardSEO = () => {
  const [activeTab, setActiveTab] = useState("global");

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
          <SEOKeywordAnalyzer />
          
          <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Meta Tags</CardTitle>
                <CardDescription>Configure meta tags for individual pages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" variant="outline">
                  Open Meta Tag Manager
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>URL Settings</CardTitle>
                <CardDescription>Configure canonical URLs and redirects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" variant="outline">
                  Open URL Manager
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
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
                  <BarChart4 className="h-5 w-5" />
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
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Keyword</span>
                    <div className="flex items-center gap-6">
                      <span className="text-sm font-medium">Position</span>
                      <span className="text-sm font-medium">Change</span>
                      <span className="text-sm font-medium">Volume</span>
                    </div>
                  </div>
                  <hr className="border-muted" />
                  {[
                    { keyword: "remote jobs", position: 3, change: 1, volume: 12400 },
                    { keyword: "software developer jobs", position: 5, change: -2, volume: 6800 },
                    { keyword: "work from home", position: 8, change: 3, volume: 8500 },
                    { keyword: "tech jobs", position: 12, change: 0, volume: 4300 },
                    { keyword: "marketing jobs", position: 15, change: 5, volume: 3700 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{item.keyword}</span>
                      <div className="flex items-center gap-6">
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
              <p className="mb-4 text-sm">Based on our analysis of your site, here are some optimization recommendations:</p>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className="bg-yellow-100 p-1 rounded-full mr-3 mt-0.5">
                        <span className="block h-4 w-4 rounded-full bg-yellow-400"></span>
                      </div>
                      <div>
                        <h4 className="font-medium">Improve Meta Descriptions</h4>
                        <p className="text-sm text-muted-foreground mt-1">12 job listings are missing meta descriptions, which could improve click-through rates in search results.</p>
                        <Button variant="link" className="p-0 h-auto text-primary mt-1">Fix Issues</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5">
                        <span className="block h-4 w-4 rounded-full bg-green-400"></span>
                      </div>
                      <div>
                        <h4 className="font-medium">Mobile Optimization</h4>
                        <p className="text-sm text-muted-foreground mt-1">Your website is fully optimized for mobile devices, which is great for SEO rankings.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className="bg-yellow-100 p-1 rounded-full mr-3 mt-0.5">
                        <span className="block h-4 w-4 rounded-full bg-yellow-400"></span>
                      </div>
                      <div>
                        <h4 className="font-medium">Add More Internal Links</h4>
                        <p className="text-sm text-muted-foreground mt-1">Increasing internal links between related job listings can improve SEO and user navigation.</p>
                        <Button variant="link" className="p-0 h-auto text-primary mt-1">Learn More</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
                  <Card className="border-green-100">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-green-100 p-1 rounded-full mr-3">
                            <span className="block h-4 w-4 rounded-full bg-green-400"></span>
                          </div>
                          <span>Job Postings Schema</span>
                        </div>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-green-100">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-green-100 p-1 rounded-full mr-3">
                            <span className="block h-4 w-4 rounded-full bg-green-400"></span>
                          </div>
                          <span>Organization Schema</span>
                        </div>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-green-100">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-green-100 p-1 rounded-full mr-3">
                            <span className="block h-4 w-4 rounded-full bg-green-400"></span>
                          </div>
                          <span>Website Schema</span>
                        </div>
                        <Button variant="outline" size="sm">Edit</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-blue-100">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-blue-100 p-1 rounded-full mr-3">
                            <span className="block h-4 w-4 rounded-full bg-blue-400"></span>
                          </div>
                          <span>Add New Schema</span>
                        </div>
                        <Button variant="outline" size="sm">Add</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <Button>View Structured Data Documentation</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardSEO;
