
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
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarInset
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import DashboardJobsList from "@/components/dashboard/DashboardJobsList";
import DashboardStats from "@/components/dashboard/DashboardStats";
import DashboardSEO from "@/components/dashboard/DashboardSEO";
import DashboardSettings from "@/components/dashboard/DashboardSettings";
import { 
  LayoutDashboard, 
  Briefcase, 
  UserCircle, 
  Settings, 
  Search, 
  Plus, 
  LogOut 
} from "lucide-react";

const Dashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <Helmet>
        <title>Dashboard | HarpalJobs</title>
        <meta name="description" content="Manage your job listings, applicants, and website settings" />
      </Helmet>

      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full bg-muted/10">
          <Sidebar>
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
                        <LayoutDashboard />
                        <span>Overview</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab("jobs")} 
                        isActive={activeTab === "jobs"}
                        tooltip="Manage Jobs"
                      >
                        <Briefcase />
                        <span>Jobs</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab("applicants")}
                        isActive={activeTab === "applicants"}
                        tooltip="Manage Applicants"
                      >
                        <UserCircle />
                        <span>Applicants</span>
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
                        <Search />
                        <span>SEO</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton 
                        onClick={() => setActiveTab("settings")}
                        isActive={activeTab === "settings"}
                        tooltip="General Settings"
                      >
                        <Settings />
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
                onClick={() => {
                  toast({
                    title: "Logged out successfully",
                    description: "You have been logged out of the dashboard."
                  });
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </Sidebar>
          
          <SidebarInset className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  {activeTab === "overview" && "Dashboard Overview"}
                  {activeTab === "jobs" && "Manage Jobs"}
                  {activeTab === "applicants" && "Manage Applicants"}
                  {activeTab === "seo" && "SEO Settings"}
                  {activeTab === "settings" && "General Settings"}
                </h1>
                <p className="text-muted-foreground">
                  {activeTab === "overview" && "View statistics and recent activity"}
                  {activeTab === "jobs" && "Create, edit and delete job listings"}
                  {activeTab === "applicants" && "Review and manage job applications"}
                  {activeTab === "seo" && "Optimize search engine visibility"}
                  {activeTab === "settings" && "Configure system settings"}
                </p>
              </div>
              
              {activeTab === "jobs" && (
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Job
                </Button>
              )}
            </div>
            
            {activeTab === "overview" && <DashboardStats />}
            {activeTab === "jobs" && <DashboardJobsList />}
            {activeTab === "applicants" && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>Manage and respond to job applicants</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Applicants management interface will appear here</p>
                </CardContent>
              </Card>
            )}
            {activeTab === "seo" && <DashboardSEO />}
            {activeTab === "settings" && <DashboardSettings />}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </>
  );
};

export default Dashboard;
