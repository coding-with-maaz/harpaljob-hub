
import React, { useState, useEffect } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import DashboardJobsList from "@/components/dashboard/DashboardJobsList";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardSEO from "@/components/dashboard/DashboardSEO";
import DashboardAds from "@/components/dashboard/DashboardAds";
import DashboardSettings from "@/components/dashboard/DashboardSettings";
import DashboardMobileApp from "@/components/dashboard/DashboardMobileApp";
import DashboardCategories from "@/components/dashboard/DashboardCategories";
import DashboardApplicants from "@/components/dashboard/DashboardApplicants";
import RealtimeAnalytics from "@/components/dashboard/RealtimeAnalytics";
import { 
  LayoutDashboard, 
  Briefcase, 
  UserCircle, 
  Settings, 
  Search, 
  Plus, 
  LogOut,
  Smartphone,
  AreaChart,
  Wallet,
  Tag,
  LayoutGrid,
  BarChart
} from "lucide-react";

const Dashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const isMobile = useIsMobile();

  // Set sidebar default open state based on device type
  const defaultSidebarOpen = !isMobile;

  // Initialize ad settings in localStorage if they don't exist
  useEffect(() => {
    if (localStorage.getItem('adsEnabled') === null) {
      localStorage.setItem('adsEnabled', 'true');
    }
    
    if (localStorage.getItem('mobileAdsEnabled') === null) {
      localStorage.setItem('mobileAdsEnabled', 'true');
    }
    
    if (localStorage.getItem('googleAdsEnabled') === null) {
      localStorage.setItem('googleAdsEnabled', 'true');
    }
  }, []);

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the dashboard."
    });
  };

  return (
    <>
      <Helmet>
        <title>Dashboard | HarpalJobs</title>
        <meta name="description" content="Manage your job listings, applicants, website settings, and advertising" />
      </Helmet>

      <SidebarProvider defaultOpen={defaultSidebarOpen}>
        <div className="flex min-h-screen w-full bg-muted/10">
          <Sidebar className="border-r">
            <SidebarHeader className="border-b px-6 py-3">
              <h2 className="text-xl font-bold">HarpalJobs</h2>
              <p className="text-xs text-muted-foreground">Admin Dashboard</p>
            </SidebarHeader>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Main</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab("overview")}
                        isActive={activeTab === "overview"}
                        tooltip="Dashboard Overview"
                      >
                        <LayoutDashboard className="h-4 w-4" />
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
                        <span>Jobs</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab("categories")} 
                        isActive={activeTab === "categories"}
                        tooltip="Manage Job Categories"
                      >
                        <LayoutGrid className="h-4 w-4" />
                        <span>Categories</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab("applicants")}
                        isActive={activeTab === "applicants"}
                        tooltip="Manage Applicants"
                      >
                        <UserCircle className="h-4 w-4" />
                        <span>Applicants</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab("analytics")}
                        isActive={activeTab === "analytics"}
                        tooltip="Real-time Analytics"
                      >
                        <BarChart className="h-4 w-4" />
                        <span>Analytics</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab("ads")}
                        isActive={activeTab === "ads"}
                        tooltip="Manage Advertisements"
                      >
                        <Wallet className="h-4 w-4" />
                        <span>Ads</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab("mobile-app")}
                        isActive={activeTab === "mobile-app"}
                        tooltip="Mobile App Management"
                      >
                        <Smartphone className="h-4 w-4" />
                        <span>Mobile App</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab("reports")}
                        isActive={activeTab === "reports"}
                        tooltip="Analytics & Reports"
                      >
                        <AreaChart className="h-4 w-4" />
                        <span>Reports</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              
              <SidebarGroup>
                <SidebarGroupLabel>Settings</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab("seo")}
                        isActive={activeTab === "seo"}
                        tooltip="SEO Settings"
                      >
                        <Search className="h-4 w-4" />
                        <span>SEO</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab("settings")}
                        isActive={activeTab === "settings"}
                        tooltip="General Settings"
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
                  {activeTab === "jobs" && "Manage Jobs"}
                  {activeTab === "categories" && "Manage Categories"}
                  {activeTab === "applicants" && "Manage Applicants"}
                  {activeTab === "analytics" && "Real-time Analytics"}
                  {activeTab === "ads" && "Ad Management"}
                  {activeTab === "mobile-app" && "Mobile App Management"}
                  {activeTab === "reports" && "Analytics & Reports"}
                  {activeTab === "seo" && "SEO Settings"}
                  {activeTab === "settings" && "General Settings"}
                </h1>
                <p className="text-muted-foreground">
                  {activeTab === "overview" && "View statistics and recent activity"}
                  {activeTab === "jobs" && "Create, edit and delete job listings"}
                  {activeTab === "categories" && "Organize and manage job categories"}
                  {activeTab === "applicants" && "Review and manage job applications"}
                  {activeTab === "analytics" && "Monitor real-time website activity"}
                  {activeTab === "ads" && "Configure and monitor advertising campaigns"}
                  {activeTab === "mobile-app" && "Configure and monitor the mobile application"}
                  {activeTab === "reports" && "View detailed analytics and generate reports"}
                  {activeTab === "seo" && "Optimize search engine visibility"}
                  {activeTab === "settings" && "Configure system settings"}
                </p>
              </div>
              
              {activeTab === "jobs" && (
                <Button className="hidden sm:flex">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Job
                </Button>
              )}
              
              {activeTab === "categories" && (
                <Button className="hidden sm:flex">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Category
                </Button>
              )}
              
              {isMobile && activeTab === "jobs" && (
                <Button size="icon" className="sm:hidden">
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            {activeTab === "overview" && <DashboardStats />}
            {activeTab === "jobs" && <DashboardJobsList />}
            {activeTab === "categories" && <DashboardCategories />}
            {activeTab === "ads" && <DashboardAds />}
            {activeTab === "applicants" && <DashboardApplicants />}
            {activeTab === "analytics" && <RealtimeAnalytics />}
            {activeTab === "reports" && (
              <Card>
                <CardHeader>
                  <CardTitle>Analytics & Reports</CardTitle>
                  <CardDescription>Detailed insights about your job board performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Comprehensive analytics dashboard will appear here</p>
                </CardContent>
              </Card>
            )}
            {activeTab === "mobile-app" && <DashboardMobileApp />}
            {activeTab === "seo" && <DashboardSEO />}
            {activeTab === "settings" && <DashboardSettings />}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  );
};

export default Dashboard;
