
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
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Building, 
  Briefcase, 
  Users, 
  PieChart, 
  Settings, 
  LogOut,
  Plus,
  UserCircle,
  FileText,
  BellRing,
  MessageSquare,
  Sparkles
} from "lucide-react";

// Component for posted jobs section
const PostedJobsSection = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>My Job Listings</CardTitle>
          <CardDescription>Manage your active job postings</CardDescription>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Post New Job
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">You haven't posted any jobs yet.</p>
        </div>
      </CardContent>
    </Card>
  );
};

// Component for applicants section
const ApplicantsSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Applicants</CardTitle>
        <CardDescription>Review and manage job applicants</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">No applicants yet. Post a job to start receiving applications.</p>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Post a Job
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Component for company profile section
const CompanyProfileSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Profile</CardTitle>
        <CardDescription>Manage your company information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <Building className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Your Company</h3>
              <p className="text-sm text-muted-foreground">Complete your company profile to attract top talent</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Company Name</label>
              <p className="text-sm text-muted-foreground">Not provided</p>
            </div>
            <div>
              <label className="text-sm font-medium">Industry</label>
              <p className="text-sm text-muted-foreground">Not provided</p>
            </div>
            <div>
              <label className="text-sm font-medium">Company Size</label>
              <p className="text-sm text-muted-foreground">Not provided</p>
            </div>
            <div>
              <label className="text-sm font-medium">Website</label>
              <p className="text-sm text-muted-foreground">Not provided</p>
            </div>
            <div>
              <label className="text-sm font-medium">Company Description</label>
              <p className="text-sm text-muted-foreground">Not provided</p>
            </div>
          </div>
          
          <Button variant="outline">Edit Company Profile</Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Component for analytics section
const AnalyticsSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics</CardTitle>
        <CardDescription>Job listing performance metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <div className="text-3xl font-bold">0</div>
              <div className="text-sm text-muted-foreground">Total Views</div>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <div className="text-3xl font-bold">0</div>
              <div className="text-sm text-muted-foreground">Total Applications</div>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <div className="text-3xl font-bold">0</div>
              <div className="text-sm text-muted-foreground">Active Jobs</div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Performance Overview</h3>
            <p className="text-sm text-muted-foreground">Post jobs to see performance metrics.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Component for messaging section
const MessagingSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Messages</CardTitle>
        <CardDescription>Communicate with job applicants</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">No messages yet.</p>
        </div>
      </CardContent>
    </Card>
  );
};

// Component for settings section
const EmployerSettingsSection = () => {
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
                <label className="text-sm">Application Notifications</label>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm">Newsletter</label>
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
          
          <div>
            <h3 className="text-lg font-medium">Billing Information</h3>
            <div className="mt-2 space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm">Payment Methods</label>
                <Button variant="outline" size="sm">Manage</Button>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm">Subscription Plan</label>
                <Button variant="outline" size="sm">View</Button>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm">Billing History</label>
                <Button variant="outline" size="sm">View</Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main EmployerDashboard component
const EmployerDashboard = () => {
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
        <title>Employer Dashboard | HarpalJobs</title>
        <meta name="description" content="Manage your job listings, applicants, and company profile" />
      </Helmet>

      <SidebarProvider defaultOpen={defaultSidebarOpen}>
        <div className="flex min-h-screen w-full bg-muted/10">
          <Sidebar className="border-r">
            <SidebarHeader className="border-b px-6 py-3">
              <h2 className="text-xl font-bold">HarpalJobs</h2>
              <p className="text-xs text-muted-foreground">Employer Dashboard</p>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Recruitment</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab("overview")}
                        isActive={activeTab === "overview"}
                        tooltip="Dashboard Overview"
                      >
                        <Building className="h-4 w-4" />
                        <span>Overview</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab("jobs")} 
                        isActive={activeTab === "jobs"}
                        tooltip="Manage Jobs"
                      >
                        <Briefcase className="h-4 w-4" />
                        <span>Job Listings</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab("applicants")}
                        isActive={activeTab === "applicants"}
                        tooltip="Manage Applicants"
                      >
                        <Users className="h-4 w-4" />
                        <span>Applicants</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab("analytics")}
                        isActive={activeTab === "analytics"}
                        tooltip="View Analytics"
                      >
                        <PieChart className="h-4 w-4" />
                        <span>Analytics</span>
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
                        onClick={() => setActiveTab("messages")}
                        isActive={activeTab === "messages"}
                        tooltip="Messages"
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>Messages</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
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
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>

              <SidebarGroup>
                <SidebarGroupLabel>Account</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab("company")}
                        isActive={activeTab === "company"}
                        tooltip="Company Profile"
                      >
                        <Building className="h-4 w-4" />
                        <span>Company Profile</span>
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
                  {activeTab === "overview" && "Employer Dashboard"}
                  {activeTab === "jobs" && "Job Listings"}
                  {activeTab === "applicants" && "Applicants"}
                  {activeTab === "analytics" && "Analytics"}
                  {activeTab === "messages" && "Messages"}
                  {activeTab === "notifications" && "Notifications"}
                  {activeTab === "company" && "Company Profile"}
                  {activeTab === "settings" && "Settings"}
                </h1>
                <p className="text-muted-foreground">
                  {activeTab === "overview" && "Manage your recruitment activities"}
                  {activeTab === "jobs" && "Create and manage your job listings"}
                  {activeTab === "applicants" && "Review and manage job applications"}
                  {activeTab === "analytics" && "Track the performance of your job listings"}
                  {activeTab === "messages" && "Communicate with job applicants"}
                  {activeTab === "notifications" && "Manage your notification preferences"}
                  {activeTab === "company" && "Update your company information"}
                  {activeTab === "settings" && "Manage your account settings and preferences"}
                </p>
              </div>
              
              {activeTab === "jobs" && (
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Post New Job
                </Button>
              )}
            </div>
            
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recruitment Summary</CardTitle>
                    <CardDescription>Overview of your recruitment activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col items-center justify-center bg-muted p-4 rounded-lg">
                        <span className="text-3xl font-bold">0</span>
                        <span className="text-sm text-muted-foreground">Active Jobs</span>
                      </div>
                      <div className="flex flex-col items-center justify-center bg-muted p-4 rounded-lg">
                        <span className="text-3xl font-bold">0</span>
                        <span className="text-sm text-muted-foreground">Total Applicants</span>
                      </div>
                      <div className="flex flex-col items-center justify-center bg-muted p-4 rounded-lg">
                        <span className="text-3xl font-bold">0</span>
                        <span className="text-sm text-muted-foreground">Shortlisted</span>
                      </div>
                      <div className="flex flex-col items-center justify-center bg-muted p-4 rounded-lg">
                        <span className="text-3xl font-bold">0</span>
                        <span className="text-sm text-muted-foreground">Interviews</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button className="w-full">
                        <Plus className="mr-2 h-4 w-4" />
                        Post New Job
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Company Profile Completion</CardTitle>
                    <CardDescription>Complete your profile to attract top talent</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: "25%" }}></div>
                      </div>
                      <p className="text-sm text-muted-foreground">Your company profile is 25% complete</p>
                      <ul className="space-y-2">
                        <li className="flex items-center text-sm">
                          <span className="mr-2 h-4 w-4 rounded-full bg-green-500"></span>
                          Basic information added
                        </li>
                        <li className="flex items-center text-sm">
                          <span className="mr-2 h-4 w-4 rounded-full bg-red-500"></span>
                          Company description missing
                        </li>
                        <li className="flex items-center text-sm">
                          <span className="mr-2 h-4 w-4 rounded-full bg-red-500"></span>
                          Logo not uploaded
                        </li>
                        <li className="flex items-center text-sm">
                          <span className="mr-2 h-4 w-4 rounded-full bg-red-500"></span>
                          Company benefits not added
                        </li>
                      </ul>
                      <Button variant="outline" className="w-full">Complete Company Profile</Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Featured Jobs</CardTitle>
                      <CardDescription>Your featured job listings</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">View All Jobs</Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">You don't have any featured jobs. Feature your jobs to increase visibility.</p>
                      <Button variant="outline">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Upgrade to Featured
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
            
            {activeTab === "jobs" && <PostedJobsSection />}
            {activeTab === "applicants" && <ApplicantsSection />}
            {activeTab === "analytics" && <AnalyticsSection />}
            {activeTab === "messages" && <MessagingSection />}
            {activeTab === "notifications" && (
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
            )}
            {activeTab === "company" && <CompanyProfileSection />}
            {activeTab === "settings" && <EmployerSettingsSection />}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  );
};

export default EmployerDashboard;
