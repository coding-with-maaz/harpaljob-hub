
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { 
  Smartphone, 
  Bell, 
  Link, 
  Upload, 
  Download, 
  AppWindow, 
  Code, 
  Server
} from "lucide-react";

const DashboardMobileApp = () => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [deepLinksEnabled, setDeepLinksEnabled] = useState(true);
  const [geolocationEnabled, setGeolocationEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(true);
  const [jobAlerts, setJobAlerts] = useState(true);
  const [appVersion, setAppVersion] = useState("1.0.0");
  const [buildNumber, setBuildNumber] = useState(100);
  const [apiKey, setApiKey] = useState("hj_mob_12345abcde67890fghijk");

  const togglePush = () => {
    setPushEnabled(!pushEnabled);
    toast.success(`Push notifications ${!pushEnabled ? 'enabled' : 'disabled'}`);
  };

  const toggleDeepLinks = () => {
    setDeepLinksEnabled(!deepLinksEnabled);
    toast.success(`Deep links ${!deepLinksEnabled ? 'enabled' : 'disabled'}`);
  };

  const toggleGeolocation = () => {
    setGeolocationEnabled(!geolocationEnabled);
    toast.success(`Geolocation ${!geolocationEnabled ? 'enabled' : 'disabled'}`);
  };

  const toggleDarkMode = () => {
    setDarkModeEnabled(!darkModeEnabled);
    toast.success(`Dark mode ${!darkModeEnabled ? 'enabled' : 'disabled'} by default`);
  };

  const toggleJobAlerts = () => {
    setJobAlerts(!jobAlerts);
    toast.success(`Job alerts ${!jobAlerts ? 'enabled' : 'disabled'}`);
  };

  const regenerateApiKey = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = 'hj_mob_';
    for (let i = 0; i < 20; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setApiKey(result);
    toast.success("API key regenerated successfully");
  };

  const publishUpdate = () => {
    const newBuildNumber = buildNumber + 1;
    setBuildNumber(newBuildNumber);
    toast.success(`New version ${appVersion} (build ${newBuildNumber}) queued for release`);
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    toast.success("API key copied to clipboard");
  };

  return (
    <Tabs defaultValue="settings" className="w-full">
      <TabsList className="mb-4 grid grid-cols-4 w-full max-w-md">
        <TabsTrigger value="settings">Settings</TabsTrigger>
        <TabsTrigger value="updates">Updates</TabsTrigger>
        <TabsTrigger value="api">API</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>

      <TabsContent value="settings">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Mobile App Configuration</CardTitle>
              <CardDescription>Configure basic settings for the mobile application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="h-4 w-4 text-muted-foreground"/>
                  <Label htmlFor="push-switch">Push Notifications</Label>
                </div>
                <Switch id="push-switch" checked={pushEnabled} onCheckedChange={togglePush} />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Link className="h-4 w-4 text-muted-foreground"/>
                  <Label htmlFor="deeplink-switch">Deep Linking</Label>
                </div>
                <Switch id="deeplink-switch" checked={deepLinksEnabled} onCheckedChange={toggleDeepLinks} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AppWindow className="h-4 w-4 text-muted-foreground"/>
                  <Label htmlFor="darkmode-switch">Dark Mode Default</Label>
                </div>
                <Switch id="darkmode-switch" checked={darkModeEnabled} onCheckedChange={toggleDarkMode} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Smartphone className="h-4 w-4 text-muted-foreground"/>
                  <Label htmlFor="geolocation-switch">Geolocation</Label>
                </div>
                <Switch id="geolocation-switch" checked={geolocationEnabled} onCheckedChange={toggleGeolocation} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="h-4 w-4 text-muted-foreground"/>
                  <Label htmlFor="alerts-switch">Job Alerts</Label>
                </div>
                <Switch id="alerts-switch" checked={jobAlerts} onCheckedChange={toggleJobAlerts} />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto" onClick={() => toast.success("Settings saved successfully")}>
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mobile App Links</CardTitle>
              <CardDescription>
                Download links for your mobile application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div className="mr-3">
                  <Download className="h-6 w-6 text-brand-apple" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">App Store</h3>
                  <p className="text-xs text-muted-foreground">iOS - iPhone & iPad</p>
                </div>
                <Button size="sm" variant="outline">
                  Copy
                </Button>
              </div>

              <div className="flex items-center p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div className="mr-3">
                  <Download className="h-6 w-6 text-brand-google" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Google Play</h3>
                  <p className="text-xs text-muted-foreground">Android devices</p>
                </div>
                <Button size="sm" variant="outline">
                  Copy
                </Button>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-medium mb-1">QR Code for Download</h3>
                <div className="h-32 w-32 bg-muted border border-border rounded-md flex items-center justify-center">
                  <p className="text-xs text-muted-foreground">QR Code Placeholder</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="updates">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>App Versions</CardTitle>
                <CardDescription>
                  Manage your mobile application versions
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-xs">
                Current: v{appVersion} (Build {buildNumber})
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="version">Version Number</Label>
                  <Input 
                    id="version" 
                    value={appVersion} 
                    onChange={(e) => setAppVersion(e.target.value)} 
                    className="mt-1" 
                  />
                </div>
                <div>
                  <Label htmlFor="build">Build Number</Label>
                  <div className="flex items-center mt-1 space-x-2">
                    <Input 
                      id="build" 
                      value={buildNumber.toString()} 
                      onChange={(e) => setBuildNumber(parseInt(e.target.value) || buildNumber)} 
                      className="flex-1" 
                    />
                    <Button variant="outline" size="sm" onClick={() => setBuildNumber(buildNumber + 1)}>
                      Increment
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="release-notes">Release Notes</Label>
                <textarea 
                  id="release-notes" 
                  className="w-full min-h-[100px] p-2 border rounded-md resize-y" 
                  placeholder="Enter release notes here..."
                ></textarea>
              </div>

              <div className="pt-4">
                <h3 className="text-sm font-medium mb-2">Recent Updates</h3>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg border">
                    <div className="flex justify-between items-center">
                      <div className="font-semibold">v1.0.0 (Build 100)</div>
                      <Badge variant="outline" className="text-xs">Current</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Released on June 10, 2023</div>
                    <Separator className="my-2" />
                    <div className="text-sm">Initial release with job search and application features</div>
                  </div>
                  
                  <div className="p-3 rounded-lg border">
                    <div className="flex justify-between items-center">
                      <div className="font-semibold">v0.9.5 (Build 95)</div>
                      <Badge variant="secondary" className="text-xs">Beta</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">Released on May 25, 2023</div>
                    <Separator className="my-2" />
                    <div className="text-sm">Beta testing version with core functionality</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={publishUpdate} className="ml-auto">
              <Upload className="mr-2 h-4 w-4" />
              Publish Update
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="api">
        <Card>
          <CardHeader>
            <CardTitle>Mobile API Configuration</CardTitle>
            <CardDescription>
              Manage API keys and settings for mobile integration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="api-key" className="text-sm font-medium">API Key</Label>
              <div className="flex mt-1 space-x-2">
                <Input 
                  id="api-key" 
                  value={apiKey} 
                  readOnly 
                  className="font-mono text-sm flex-1"
                />
                <Button variant="outline" size="sm" onClick={copyApiKey}>
                  Copy
                </Button>
                <Button variant="outline" size="sm" onClick={regenerateApiKey}>
                  Regenerate
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Used for authenticating mobile app API requests
              </p>
            </div>

            <div className="pt-4">
              <h3 className="text-sm font-medium mb-2">API Endpoints</h3>
              <div className="space-y-2">
                <div className="p-3 rounded-lg border">
                  <div className="flex items-center">
                    <Server className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-medium">Jobs API</span>
                  </div>
                  <code className="text-xs block mt-1 bg-muted p-2 rounded">
                    https://api.harpaljobs.com/v1/jobs
                  </code>
                </div>
                
                <div className="p-3 rounded-lg border">
                  <div className="flex items-center">
                    <Server className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-medium">Applications API</span>
                  </div>
                  <code className="text-xs block mt-1 bg-muted p-2 rounded">
                    https://api.harpaljobs.com/v1/applications
                  </code>
                </div>
                
                <div className="p-3 rounded-lg border">
                  <div className="flex items-center">
                    <Server className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-medium">User Profiles API</span>
                  </div>
                  <code className="text-xs block mt-1 bg-muted p-2 rounded">
                    https://api.harpaljobs.com/v1/profiles
                  </code>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-sm font-medium mb-2">API Documentation</h3>
              <div className="flex items-center p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <Code className="h-5 w-5 mr-3 text-muted-foreground" />
                <div className="flex-1">
                  <h4 className="font-medium">HarpalJobs API Documentation</h4>
                  <p className="text-xs text-muted-foreground">
                    Complete documentation for mobile app developers
                  </p>
                </div>
                <Button size="sm" variant="outline">View Docs</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="analytics">
        <Card>
          <CardHeader>
            <CardTitle>Mobile App Analytics</CardTitle>
            <CardDescription>
              Track usage and performance metrics for your mobile application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">12,543</div>
                  <p className="text-xs text-muted-foreground mt-1">Total Downloads</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">8,721</div>
                  <p className="text-xs text-muted-foreground mt-1">Active Users</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">4.7</div>
                  <p className="text-xs text-muted-foreground mt-1">App Store Rating</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">4.5</div>
                  <p className="text-xs text-muted-foreground mt-1">Play Store Rating</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-3">Platform Distribution</h3>
                <div className="h-8 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[65%] text-xs text-white flex items-center justify-center">
                    Android: 65%
                  </div>
                </div>
                <div className="h-8 w-full bg-muted rounded-full overflow-hidden mt-2">
                  <div className="h-full bg-gray-500 w-[35%] text-xs text-white flex items-center justify-center">
                    iOS: 35%
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3">Feature Usage</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Job Search</span>
                    <div className="h-2 w-60 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[92%]"></div>
                    </div>
                    <span className="text-sm">92%</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Job Applications</span>
                    <div className="h-2 w-60 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[78%]"></div>
                    </div>
                    <span className="text-sm">78%</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Saved Jobs</span>
                    <div className="h-2 w-60 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[63%]"></div>
                    </div>
                    <span className="text-sm">63%</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Profile Management</span>
                    <div className="h-2 w-60 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[45%]"></div>
                    </div>
                    <span className="text-sm">45%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">App Version Distribution</h3>
                <div className="p-3 rounded-lg border space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">v1.0.0</span>
                    <span className="text-sm">85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">v0.9.5</span>
                    <span className="text-sm">12%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">v0.9.0</span>
                    <span className="text-sm">3%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default DashboardMobileApp;
