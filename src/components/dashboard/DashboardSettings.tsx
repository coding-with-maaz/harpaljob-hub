
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Save,
  User,
  Mail,
  Lock,
  PaintBucket,
  FileArchive
} from "lucide-react";

const DashboardSettings = () => {
  const { toast } = useToast();
  const [profileForm, setProfileForm] = useState({
    name: "Admin User",
    email: "admin@example.com",
    phone: "+1 (555) 123-4567",
    role: "Administrator"
  });
  
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "HarpalJobs",
    jobsPerPage: "10",
    contactEmail: "contact@example.com",
    enableApplications: true,
    notifyNewApplications: true
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully."
    });
  };

  const handleSaveGeneral = () => {
    toast({
      title: "Settings Saved",
      description: "General settings have been updated successfully."
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Your data export is being generated and will be available shortly."
    });
  };

  const handleThemeChange = (theme: string) => {
    toast({
      title: "Theme Changed",
      description: `Website theme changed to ${theme}.`
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="data">Data Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your website's basic configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="site-name">
                  Website Name
                </label>
                <input
                  id="site-name"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={generalSettings.siteName}
                  onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="jobs-per-page">
                  Jobs Per Page
                </label>
                <select
                  id="jobs-per-page"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={generalSettings.jobsPerPage}
                  onChange={(e) => setGeneralSettings({...generalSettings, jobsPerPage: e.target.value})}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="contact-email">
                  Contact Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={generalSettings.contactEmail}
                  onChange={(e) => setGeneralSettings({...generalSettings, contactEmail: e.target.value})}
                />
              </div>
              
              <div className="space-y-3 pt-3">
                <div className="flex items-center space-x-2">
                  <input
                    id="enable-applications"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    checked={generalSettings.enableApplications}
                    onChange={(e) => setGeneralSettings({...generalSettings, enableApplications: e.target.checked})}
                  />
                  <label htmlFor="enable-applications" className="text-sm font-medium">
                    Enable job applications
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    id="notify-applications"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    checked={generalSettings.notifyNewApplications}
                    onChange={(e) => setGeneralSettings({...generalSettings, notifyNewApplications: e.target.checked})}
                  />
                  <label htmlFor="notify-applications" className="text-sm font-medium">
                    Receive email notifications for new applications
                  </label>
                </div>
              </div>
              
              <Button className="mt-4" onClick={handleSaveGeneral}>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Manage your personal information and account settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className="w-24 h-24 mx-auto sm:mx-0 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <div className="space-y-4 flex-1">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="profile-name">
                        Name
                      </label>
                      <input
                        id="profile-name"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="profile-email">
                        Email
                      </label>
                      <input
                        id="profile-email"
                        type="email"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="profile-phone">
                        Phone
                      </label>
                      <input
                        id="profile-phone"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium" htmlFor="profile-role">
                        Role
                      </label>
                      <input
                        id="profile-role"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={profileForm.role}
                        disabled
                      />
                    </div>
                  </div>
                  <Button onClick={handleSaveProfile}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the look and feel of your website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-3">Theme</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div 
                      className="border rounded-md p-2 cursor-pointer flex flex-col items-center hover:border-primary transition-colors"
                      onClick={() => handleThemeChange("Light")}
                    >
                      <div className="h-20 w-full rounded bg-white border mb-2"></div>
                      <span className="text-sm">Light</span>
                    </div>
                    <div 
                      className="border rounded-md p-2 cursor-pointer flex flex-col items-center hover:border-primary transition-colors"
                      onClick={() => handleThemeChange("Dark")}
                    >
                      <div className="h-20 w-full rounded bg-slate-900 border mb-2"></div>
                      <span className="text-sm">Dark</span>
                    </div>
                    <div 
                      className="border rounded-md p-2 cursor-pointer flex flex-col items-center hover:border-primary transition-colors"
                      onClick={() => handleThemeChange("System")}
                    >
                      <div className="h-20 w-full rounded bg-gradient-to-r from-white to-slate-900 border mb-2"></div>
                      <span className="text-sm">System</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h3 className="text-sm font-medium mb-3">Primary Color</h3>
                  <div className="grid grid-cols-6 gap-2">
                    <button className="h-8 w-8 rounded-full bg-blue-500 hover:ring-2 hover:ring-offset-2 ring-blue-500 transition-all"></button>
                    <button className="h-8 w-8 rounded-full bg-red-500 hover:ring-2 hover:ring-offset-2 ring-red-500 transition-all"></button>
                    <button className="h-8 w-8 rounded-full bg-green-500 hover:ring-2 hover:ring-offset-2 ring-green-500 transition-all"></button>
                    <button className="h-8 w-8 rounded-full bg-purple-500 hover:ring-2 hover:ring-offset-2 ring-purple-500 transition-all"></button>
                    <button className="h-8 w-8 rounded-full bg-orange-500 hover:ring-2 hover:ring-offset-2 ring-orange-500 transition-all"></button>
                    <button className="h-8 w-8 rounded-full bg-pink-500 hover:ring-2 hover:ring-offset-2 ring-pink-500 transition-all"></button>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h3 className="text-sm font-medium mb-3">Custom CSS</h3>
                  <textarea
                    rows={6}
                    className="font-mono w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="/* Add your custom CSS here */"
                  ></textarea>
                </div>
                
                <Button>
                  <PaintBucket className="mr-2 h-4 w-4" />
                  Save Appearance
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage password and account security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Change Password</h3>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="current-password">
                    Current Password
                  </label>
                  <input
                    id="current-password"
                    type="password"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="new-password">
                    New Password
                  </label>
                  <input
                    id="new-password"
                    type="password"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="confirm-password">
                    Confirm New Password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                
                <Button>
                  <Lock className="mr-2 h-4 w-4" />
                  Update Password
                </Button>
              </div>
              
              <div className="pt-6 space-y-4">
                <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account by enabling two-factor authentication.
                </p>
                <Button variant="outline">
                  Enable Two-Factor Authentication
                </Button>
              </div>
              
              <div className="pt-6 space-y-4">
                <h3 className="text-sm font-medium">Session Management</h3>
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Current Session</p>
                      <p className="text-xs text-muted-foreground">
                        Started: Today at 10:23 AM • Chrome on Windows
                      </p>
                    </div>
                    <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      Active Now
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full sm:w-auto">
                  Log Out All Other Devices
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="data" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Export and manage your website data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Export Data</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Download a copy of your website data in various formats.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      id="export-jobs"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                    <label htmlFor="export-jobs" className="ml-2 text-sm">
                      Job Listings
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="export-applications"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                    <label htmlFor="export-applications" className="ml-2 text-sm">
                      Job Applications
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="export-users"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      defaultChecked
                    />
                    <label htmlFor="export-users" className="ml-2 text-sm">
                      User Data
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="export-analytics"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="export-analytics" className="ml-2 text-sm">
                      Analytics Data
                    </label>
                  </div>
                </div>
                
                <div className="mt-4 space-x-2">
                  <Button variant="outline" onClick={handleExportData}>
                    <FileArchive className="mr-2 h-4 w-4" />
                    Export as CSV
                  </Button>
                  <Button variant="outline" onClick={handleExportData}>
                    <FileArchive className="mr-2 h-4 w-4" />
                    Export as JSON
                  </Button>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-2">Database Backup</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Create and manage backups of your website database.
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                  <Button>
                    Create Backup
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Last backup: Nov 28, 2023 at 03:45 PM
                  </span>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-2 text-destructive">Danger Zone</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  These actions are permanent and cannot be undone.
                </p>
                <div className="space-y-3">
                  <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
                    Reset All Settings
                  </Button>
                  <div className="pt-2">
                    <Button variant="destructive">
                      Delete All Data
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardSettings;
