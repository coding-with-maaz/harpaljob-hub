
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BanIcon, 
  CheckCircle, 
  Edit, 
  LayoutDashboard, 
  Layers, 
  LineChart,
  PlusSquare,
  Settings,
  Smartphone,
  Trash2
} from "lucide-react";

const DashboardAds = () => {
  const { toast } = useToast();
  const [adsEnabled, setAdsEnabled] = useState(true);
  const [mobileAdsEnabled, setMobileAdsEnabled] = useState(true);
  const [selectedAd, setSelectedAd] = useState<string | null>(null);

  const dummyAds = [
    {
      id: "ad1",
      name: "Job Alert Banner",
      type: "Banner",
      location: "Homepage",
      impressions: 12453,
      clicks: 387,
      ctr: "3.1%",
      active: true
    },
    {
      id: "ad2",
      name: "Premium Membership",
      type: "Sidebar",
      location: "Job Listings",
      impressions: 8765,
      clicks: 214,
      ctr: "2.4%",
      active: true
    },
    {
      id: "ad3",
      name: "Mobile App Promotion",
      type: "Popup",
      location: "Job Details",
      impressions: 5421,
      clicks: 178,
      ctr: "3.3%",
      active: false
    },
    {
      id: "ad4",
      name: "Resume Builder",
      type: "Inline",
      location: "Dashboard",
      impressions: 3245,
      clicks: 87,
      ctr: "2.7%",
      active: true
    },
  ];

  const toggleAdsEnabled = () => {
    setAdsEnabled(!adsEnabled);
    toast({
      title: !adsEnabled ? "Ads Enabled" : "Ads Disabled",
      description: !adsEnabled 
        ? "All ads are now visible on the website" 
        : "All ads have been hidden from the website",
    });
  };

  const toggleMobileAdsEnabled = () => {
    setMobileAdsEnabled(!mobileAdsEnabled);
    toast({
      title: !mobileAdsEnabled ? "Mobile Ads Enabled" : "Mobile Ads Disabled",
      description: !mobileAdsEnabled 
        ? "All ads are now visible on mobile devices" 
        : "All ads have been hidden from mobile devices",
    });
  };

  const toggleAdStatus = (adId: string) => {
    toast({
      title: "Ad Status Updated",
      description: "The ad status has been successfully updated",
    });
  };

  const handleCreateAd = () => {
    toast({
      title: "Create New Ad",
      description: "Open ad creation form",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Ad Management</CardTitle>
              <CardDescription>
                Configure and manage advertising campaigns
              </CardDescription>
            </div>
            <div className="flex items-center mt-4 sm:mt-0 gap-3">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="ads-enabled" 
                  checked={adsEnabled} 
                  onCheckedChange={toggleAdsEnabled} 
                />
                <label htmlFor="ads-enabled" className="text-sm font-medium">
                  {adsEnabled ? "Ads Enabled" : "Ads Disabled"}
                </label>
              </div>
              <Button onClick={handleCreateAd} size="sm">
                <PlusSquare className="mr-2 h-4 w-4" />
                New Ad
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active" className="space-y-4">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="active">Active Ads</TabsTrigger>
              <TabsTrigger value="all">All Ads</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="space-y-4">
              <div className="rounded-md border">
                <div className="bg-muted/50 p-3">
                  <div className="grid grid-cols-12 text-sm font-medium">
                    <div className="col-span-5 sm:col-span-4">Ad Name</div>
                    <div className="col-span-3 hidden sm:block">Type</div>
                    <div className="col-span-3 sm:col-span-2">Clicks</div>
                    <div className="col-span-2 hidden sm:block">CTR</div>
                    <div className="col-span-4 sm:col-span-1 text-right">Actions</div>
                  </div>
                </div>
                <div className="divide-y">
                  {dummyAds.filter(ad => ad.active).map((ad) => (
                    <div key={ad.id} className="p-3">
                      <div className="grid grid-cols-12 items-center text-sm">
                        <div className="col-span-5 sm:col-span-4 font-medium">{ad.name}</div>
                        <div className="col-span-3 hidden sm:block text-muted-foreground">{ad.type}</div>
                        <div className="col-span-3 sm:col-span-2">{ad.clicks}</div>
                        <div className="col-span-2 hidden sm:block">{ad.ctr}</div>
                        <div className="col-span-4 sm:col-span-1 flex justify-end space-x-1">
                          <Button variant="outline" size="icon" className="h-7 w-7">
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="outline" size="icon" className="h-7 w-7">
                            <BanIcon className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <div className="bg-muted/50 p-3">
                  <div className="grid grid-cols-12 text-sm font-medium">
                    <div className="col-span-5 sm:col-span-4">Ad Name</div>
                    <div className="col-span-3 hidden sm:block">Location</div>
                    <div className="col-span-3 sm:col-span-2">Status</div>
                    <div className="col-span-2 hidden sm:block">Impressions</div>
                    <div className="col-span-4 sm:col-span-1 text-right">Actions</div>
                  </div>
                </div>
                <div className="divide-y">
                  {dummyAds.map((ad) => (
                    <div key={ad.id} className="p-3">
                      <div className="grid grid-cols-12 items-center text-sm">
                        <div className="col-span-5 sm:col-span-4 font-medium">{ad.name}</div>
                        <div className="col-span-3 hidden sm:block text-muted-foreground">{ad.location}</div>
                        <div className="col-span-3 sm:col-span-2">
                          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${ad.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                            {ad.active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <div className="col-span-2 hidden sm:block">{ad.impressions}</div>
                        <div className="col-span-4 sm:col-span-1 flex justify-end space-x-1">
                          <Button variant="outline" size="icon" className="h-7 w-7">
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="outline" size="icon" className="h-7 w-7">
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Ad Display Settings</CardTitle>
                  <CardDescription>Configure how and where ads are displayed</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0 p-4 rounded-lg border">
                      <div>
                        <h3 className="font-medium">Mobile Ads</h3>
                        <p className="text-sm text-muted-foreground">Show ads on mobile devices</p>
                      </div>
                      <Switch 
                        checked={mobileAdsEnabled} 
                        onCheckedChange={toggleMobileAdsEnabled}
                      />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0 p-4 rounded-lg border">
                      <div>
                        <h3 className="font-medium">Ad Frequency</h3>
                        <p className="text-sm text-muted-foreground">Limit the number of ads shown per page</p>
                      </div>
                      <select 
                        className="border rounded-md px-3 py-1.5 text-sm" 
                        defaultValue={2}
                      >
                        <option value={1}>1 ad per page</option>
                        <option value={2}>2 ads per page</option>
                        <option value={3}>3 ads per page</option>
                        <option value={0}>No limit</option>
                      </select>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0 p-4 rounded-lg border">
                      <div>
                        <h3 className="font-medium">Ad Locations</h3>
                        <p className="text-sm text-muted-foreground">Choose where ads should appear</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="outline">Header</Button>
                        <Button size="sm" variant="outline">Sidebar</Button>
                        <Button size="sm" variant="outline">In-content</Button>
                        <Button size="sm" variant="outline">Footer</Button>
                      </div>
                    </div>
                  </div>
                  
                  <Button onClick={() => toast({ title: "Settings Saved", description: "Your ad settings have been updated" })}>
                    Save Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ad Performance</CardTitle>
            <CardDescription>Overview of ad performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <LineChart className="h-5 w-5" />
              <span>Ad performance chart would appear here</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Ad Placements</CardTitle>
            <CardDescription>Where your ads are being displayed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span className="text-sm">Homepage</span>
                </div>
                <span className="text-sm font-medium">42%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  <span className="text-sm">Job Listings</span>
                </div>
                <span className="text-sm font-medium">28%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm">Job Details</span>
                </div>
                <span className="text-sm font-medium">15%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                  <span className="text-sm">Dashboard</span>
                </div>
                <span className="text-sm font-medium">10%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  <span className="text-sm">Other</span>
                </div>
                <span className="text-sm font-medium">5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardAds;
