
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { 
  Users, 
  Eye, 
  MousePointerClick, 
  BriefcaseIcon, 
  RefreshCw,
  DownloadIcon 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data for real-time analytics
const generateHourlyData = () => {
  const data = [];
  const now = new Date();
  for (let i = 0; i < 24; i++) {
    const hour = new Date(now);
    hour.setHours(now.getHours() - 23 + i);
    hour.setMinutes(0);
    hour.setSeconds(0);
    data.push({
      time: hour.toLocaleTimeString([], { hour: '2-digit', hour12: true }),
      views: Math.floor(Math.random() * 80) + 30,
      applications: Math.floor(Math.random() * 15),
      conversions: Math.floor(Math.random() * 8),
    });
  }
  return data;
};

const generateDailyData = () => {
  const data = [];
  const now = new Date();
  for (let i = 0; i < 7; i++) {
    const day = new Date(now);
    day.setDate(now.getDate() - 6 + i);
    data.push({
      time: day.toLocaleDateString([], { weekday: 'short' }),
      views: Math.floor(Math.random() * 800) + 400,
      applications: Math.floor(Math.random() * 80) + 20,
      conversions: Math.floor(Math.random() * 40) + 10,
    });
  }
  return data;
};

const generateWeeklyData = () => {
  const data = [];
  const now = new Date();
  for (let i = 0; i < 4; i++) {
    const week = new Date(now);
    week.setDate(now.getDate() - 21 + (i * 7));
    data.push({
      time: `Week ${i + 1}`,
      views: Math.floor(Math.random() * 5000) + 2000,
      applications: Math.floor(Math.random() * 400) + 100,
      conversions: Math.floor(Math.random() * 200) + 50,
    });
  }
  return data;
};

const generateMonthlyData = () => {
  const data = [];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const now = new Date();
  const currentMonth = now.getMonth();
  
  for (let i = 0; i < 12; i++) {
    const monthIndex = (currentMonth - 11 + i + 12) % 12; // Go back 11 months and cycle through
    data.push({
      time: months[monthIndex],
      views: Math.floor(Math.random() * 20000) + 8000,
      applications: Math.floor(Math.random() * 1500) + 500,
      conversions: Math.floor(Math.random() * 800) + 200,
    });
  }
  return data;
};

const categoryData = [
  { name: 'Technology', value: 40 },
  { name: 'Marketing', value: 25 },
  { name: 'Design', value: 15 },
  { name: 'Finance', value: 10 },
  { name: 'Others', value: 10 },
];

const locationData = [
  { name: 'Remote', value: 35 },
  { name: 'San Francisco', value: 20 },
  { name: 'New York', value: 15 },
  { name: 'London', value: 10 },
  { name: 'Others', value: 20 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD'];

const RealtimeAnalytics = () => {
  const [timeRange, setTimeRange] = useState("hourly");
  const [chartData, setChartData] = useState(generateHourlyData());
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    // Set initial data based on time range
    switch (timeRange) {
      case "hourly":
        setChartData(generateHourlyData());
        break;
      case "daily":
        setChartData(generateDailyData());
        break;
      case "weekly":
        setChartData(generateWeeklyData());
        break;
      case "monthly":
        setChartData(generateMonthlyData());
        break;
      default:
        setChartData(generateHourlyData());
    }
  }, [timeRange]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate data fetching delay
    setTimeout(() => {
      switch (timeRange) {
        case "hourly":
          setChartData(generateHourlyData());
          break;
        case "daily":
          setChartData(generateDailyData());
          break;
        case "weekly":
          setChartData(generateWeeklyData());
          break;
        case "monthly":
          setChartData(generateMonthlyData());
          break;
        default:
          setChartData(generateHourlyData());
      }
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 800);
  };

  // Calculate totals for the current time range
  const totals = chartData.reduce(
    (acc, curr) => {
      return {
        views: acc.views + curr.views,
        applications: acc.applications + curr.applications,
        conversions: acc.conversions + curr.conversions,
      };
    },
    { views: 0, applications: 0, conversions: 0 }
  );

  // Format time range for display
  const formatTimeRange = () => {
    switch (timeRange) {
      case "hourly":
        return "Last 24 Hours";
      case "daily":
        return "Last 7 Days";
      case "weekly":
        return "Last 4 Weeks";
      case "monthly":
        return "Last 12 Months";
      default:
        return "Last 24 Hours";
    }
  };

  return (
    <div className="space-y-4">
      {/* Real-time stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.views.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {formatTimeRange()}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.applications.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {formatTimeRange()}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.conversions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {formatTimeRange()}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totals.views > 0 ? ((totals.conversions / totals.views) * 100).toFixed(1) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              {formatTimeRange()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Real-time timeline chart */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Real-time Activity</CardTitle>
              <CardDescription>
                Job views and applications over time
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-xs text-muted-foreground">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8"
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`h-4 w-4 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="ghost" size="sm" className="h-8">
                <DownloadIcon className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          </div>
          <Tabs 
            defaultValue="hourly"
            value={timeRange}
            onValueChange={setTimeRange}
            className="pt-2"
          >
            <TabsList className="grid grid-cols-4 w-full sm:w-[400px]">
              <TabsTrigger value="hourly">Hourly</TabsTrigger>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="views"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  name="Page Views"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="applications"
                  stroke="#82ca9d"
                  name="Applications"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="conversions"
                  stroke="#ff7300"
                  name="Conversions"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Distribution charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Job Category Distribution</CardTitle>
            <CardDescription>
              Most popular job categories by applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Job Location Distribution</CardTitle>
            <CardDescription>
              Most popular job locations by applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={locationData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Percentage" fill="#8884d8">
                    {locationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Users Card */}
      <Card>
        <CardHeader>
          <CardTitle>Real-time User Activity</CardTitle>
          <CardDescription>
            Current users browsing the job board
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <Users className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">{Math.floor(Math.random() * 40) + 10}</div>
                <div className="text-xs text-muted-foreground">Active users</div>
              </div>
            </div>
            <Badge variant="outline" className="px-3 py-1">
              <span className="mr-1 h-2 w-2 rounded-full bg-green-500 inline-block"></span>
              Live
            </Badge>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-md border p-3">
                <div className="text-sm font-medium">New Visitors</div>
                <div className="mt-1 text-xl font-bold">{Math.floor(Math.random() * 20) + 5}</div>
              </div>
              <div className="rounded-md border p-3">
                <div className="text-sm font-medium">Returning Visitors</div>
                <div className="mt-1 text-xl font-bold">{Math.floor(Math.random() * 30) + 10}</div>
              </div>
            </div>
            
            <div className="rounded-md border p-3">
              <div className="text-sm font-medium mb-2">Most Viewed Pages</div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Job Listings</span>
                  <span className="text-sm font-medium">{Math.floor(Math.random() * 15) + 8} users</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Senior React Developer</span>
                  <span className="text-sm font-medium">{Math.floor(Math.random() * 8) + 3} users</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">UX Designer</span>
                  <span className="text-sm font-medium">{Math.floor(Math.random() * 5) + 2} users</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          Data refreshes automatically every minute
        </CardFooter>
      </Card>
    </div>
  );
};

export default RealtimeAnalytics;
