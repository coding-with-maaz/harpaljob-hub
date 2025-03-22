
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset
} from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  UserCircle, 
  Briefcase, 
  FileText, 
  BookmarkCheck, 
  BellRing, 
  MessageSquare,
  Settings, 
  LogOut,
  Search,
  Building
} from "lucide-react";

// Component for saved jobs section
const SavedJobsSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Jobs</CardTitle>
        <CardDescription>Jobs you've bookmarked for later</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">You haven't saved any jobs yet. Browse jobs and click the bookmark icon to save them for later.</p>
          <Button variant="outline" className="w-full sm:w-auto">
            <Search className="mr-2 h-4 w-4" />
            Browse Jobs
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Component for applications section
const ApplicationsSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Applications</CardTitle>
        <CardDescription>Track your job applications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">You haven't applied to any jobs yet.</p>
          <Button variant="outline" className="w-full sm:w-auto">
            <Search className="mr-2 h-4 w-4" />
            Find Jobs to Apply
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Component for profile section
const ProfileSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
        <CardDescription>Update your personal information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">First Name</label>
              <p className="text-sm text-muted-foreground">John</p>
            </div>
            <div>
              <label className="text-sm font-medium">Last Name</label>
              <p className="text-sm text-muted-foreground">Doe</p>
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <p className="text-sm text-muted-foreground">john.doe@example.com</p>
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <p className="text-sm text-muted-foreground">Not provided</p>
            </div>
          </div>
          <Button variant="outline" className="mt-4">Edit Profile</Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Component for resume section
const ResumeSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Resume</CardTitle>
        <CardDescription>Manage your resume and CV</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">You haven't uploaded a resume yet. Upload your resume to quickly apply to jobs.</p>
          <Button variant="outline">Upload Resume</Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Component for notifications section
const NotificationsSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Manage your notification preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">You have no new notifications.</p>
          <Button variant="outline">Configure Notifications</Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Component for messages section
const MessagesSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Messages</CardTitle>
        <CardDescription>Communications from employers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">You have no messages yet.</p>
        </div>
      </CardContent>
    </Card>
  );
};

// Component for settings section
const SettingsSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your account preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">Email Preferences</h3>
            <div className="mt-2 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm">Job Alerts</label>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm">Newsletter</label>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">Privacy Settings</h3>
            <div className="mt-2 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm">Profile Visibility</label>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm">Data Usage</label>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">Account Security</h3>
            <div className="mt-2 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm">Password</label>
                <Button variant="outline" size="sm">Change</Button>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm">Two-Factor Authentication</label>
                <Button variant="outline" size="sm">Setup</Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main UserDashboard component
const UserDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const isMobile = useIsMobile();

  // Set sidebar default open state based on device type
  const defaultSidebarOpen = !isMobile;

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account."
    });
  };

  return (
    <>
      <Helmet>
        <title>My Dashboard | HarpalJobs</title>
        <meta name="description" content="Manage your job applications, saved jobs, and profile settings" />
      </Helmet>

      <SidebarProvider defaultOpen={defaultSidebarOpen}>
        <div className="flex min-h-screen w-full bg-muted/10">
          <Sidebar className="border-r">
            <SidebarHeader className="border-b px-6 py-3">
              <h2 className="text-xl font-bold">HarpalJobs</h2>
              <p className="text-xs text-muted-foreground">User Dashboard</p>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>My Job Search</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab("overview")}
                        isActive={activeTab === "overview"}
                        tooltip="Dashboard Overview"
                      >
                        <UserCircle className="h-4 w-4" />
                        <span>Overview</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab("applications")} 
                        isActive={activeTab === "applications"}
                        tooltip="My Applications"
                      >
                        <Briefcase className="h-4 w-4" />
                        <span>Applications</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab("saved")}
                        isActive={activeTab === "saved"}
                        tooltip="Saved Jobs"
                      >
                        <BookmarkCheck className="h-4 w-4" />
                        <span>Saved Jobs</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab("resume")}
                        isActive={activeTab === "resume"}
                        tooltip="Resume Management"
                      >
                        <FileText className="h-4 w-4" />
                        <span>Resume</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              
              <SidebarGroup>
                <SidebarGroupLabel>Communication</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab("notifications")}
                        isActive={activeTab === "notifications"}
                        tooltip="Notifications"
                      >
                        <BellRing className="h-4 w-4" />
                        <span>Notifications</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab("messages")}
                        isActive={activeTab === "messages"}
                        tooltip="Messages"
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>Messages</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel>Account</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab("profile")}
                        isActive={activeTab === "profile"}
                        tooltip="My Profile"
                      >
                        <UserCircle className="h-4 w-4" />
                        <span>Profile</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab("settings")}
                        isActive={activeTab === "settings"}
                        tooltip="Settings"
                      >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            
            <div className="mt-auto border-t p-4">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </Sidebar>
          
          <SidebarInset className="p-4 md:p-6 overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                  {activeTab === "overview" && "Dashboard Overview"}
                  {activeTab === "applications" && "My Applications"}
                  {activeTab === "saved" && "Saved Jobs"}
                  {activeTab === "resume" && "Resume Management"}
                  {activeTab === "notifications" && "Notifications"}
                  {activeTab === "messages" && "Messages"}
                  {activeTab === "profile" && "My Profile"}
                  {activeTab === "settings" && "Settings"}
                </h1>
                <p className="text-muted-foreground">
                  {activeTab === "overview" && "Welcome back! Manage your job search activities"}
                  {activeTab === "applications" && "Track and manage your job applications"}
                  {activeTab === "saved" && "View and manage your saved job listings"}
                  {activeTab === "resume" && "Upload and manage your resume"}
                  {activeTab === "notifications" && "Stay updated with job alerts and application updates"}
                  {activeTab === "messages" && "Communication with employers"}
                  {activeTab === "profile" && "Edit your personal information"}
                  {activeTab === "settings" && "Manage your account settings and preferences"}
                </p>
              </div>
              
              {activeTab === "saved" && (
                <Button className="hidden sm:flex">
                  <Search className="mr-2 h-4 w-4" />
                  Find More Jobs
                </Button>
              )}
            </div>
            
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Job Search Overview</CardTitle>
                    <CardDescription>Summary of your job search activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col items-center justify-center bg-muted p-4 rounded-lg">
                        <span className="text-3xl font-bold">0</span>
                        <span className="text-sm text-muted-foreground">Applications</span>
                      </div>
                      <div className="flex flex-col items-center justify-center bg-muted p-4 rounded-lg">
                        <span className="text-3xl font-bold">0</span>
                        <span className="text-sm text-muted-foreground">Saved Jobs</span>
                      </div>
                      <div className="flex flex-col items-center justify-center bg-muted p-4 rounded-lg">
                        <span className="text-3xl font-bold">0</span>
                        <span className="text-sm text-muted-foreground">Interviews</span>
                      </div>
                      <div className="flex flex-col items-center justify-center bg-muted p-4 rounded-lg">
                        <span className="text-3xl font-bold">0</span>
                        <span className="text-sm text-muted-foreground">Offers</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button className="w-full sm:w-auto">
                        <Search className="mr-2 h-4 w-4" />
                        Find Jobs
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Completion</CardTitle>
                    <CardDescription>Complete your profile to increase visibility to employers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                      <p className="text-sm text-muted-foreground">Your profile is 45% complete</p>
                      <ul className="space-y-2">
                        <li className="flex items-center text-sm">
                          <span className="mr-2 h-4 w-4 rounded-full bg-green-500"></span>
                          Basic information completed
                        </li>
                        <li className="flex items-center text-sm">
                          <span className="mr-2 h-4 w-4 rounded-full bg-red-500"></span>
                          Resume not uploaded
                        </li>
                        <li className="flex items-center text-sm">
                          <span className="mr-2 h-4 w-4 rounded-full bg-red-500"></span>
                          Skills not added
                        </li>
                        <li className="flex items-center text-sm">
                          <span className="mr-2 h-4 w-4 rounded-full bg-red-500"></span>
                          Work experience not added
                        </li>
                      </ul>
                      <Button variant="outline" className="w-full">Complete Profile</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Recommended Jobs</CardTitle>
                    <CardDescription>Based on your profile and search history</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">Complete your profile to get personalized job recommendations.</p>
                      <Button>Browse All Jobs</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeTab === "applications" && <ApplicationsSection />}
            {activeTab === "saved" && <SavedJobsSection />}
            {activeTab === "resume" && <ResumeSection />}
            {activeTab === "notifications" && <NotificationsSection />}
            {activeTab === "messages" && <MessagesSection />}
            {activeTab === "profile" && <ProfileSection />}
            {activeTab === "settings" && <SettingsSection />}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  );
};

export default UserDashboard;
