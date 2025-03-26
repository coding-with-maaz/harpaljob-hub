
import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockJobs } from "@/components/dashboard/JobsData";
import { 
  MoreHorizontal, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Filter, 
  Plus, 
  Pencil, 
  Trash2,
  Eye,
  ArrowUpDown,
  Clock,
  Tag,
  Building
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Job, JobCategory } from "@/lib/types";

// Fix the type issues by ensuring we're using strings as keys and React nodes for display
const DashboardJobsList = () => {
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string>("postedDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filter jobs based on search query and status
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Sort jobs
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    let aVal, bVal;
    
    // Handle different field types
    if (sortField === "postedDate") {
      aVal = new Date(a.postedDate).getTime();
      bVal = new Date(b.postedDate).getTime();
    } else if (sortField === "salaryMin") {
      aVal = a.salaryMin || 0;
      bVal = b.salaryMin || 0;
    } else if (sortField === "title") {
      aVal = a.title.toLowerCase();
      bVal = b.title.toLowerCase();
    } else if (sortField === "company") {
      aVal = a.company.toLowerCase();
      bVal = b.company.toLowerCase();
    } else if (sortField === "location") {
      aVal = a.location.toLowerCase();
      bVal = b.location.toLowerCase();
    } else {
      aVal = a[sortField as keyof Job];
      bVal = b[sortField as keyof Job];
    }
    
    // Handle the direction
    if (sortDirection === "asc") {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  // Calculate pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = sortedJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(sortedJobs.length / jobsPerPage);

  const handleSort = (field: string) => {
    if (sortField === field) {
      // Toggle direction if clicking the same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new field and default to descending
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const handleDeleteClick = (jobId: string) => {
    setJobToDelete(jobId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (jobToDelete) {
      setJobs(jobs.filter(job => job.id !== jobToDelete));
      setShowDeleteConfirm(false);
      setJobToDelete(null);
      
      toast({
        title: "Job Deleted",
        description: "The job listing has been successfully deleted."
      });
    }
  };

  const handleStatusChange = (jobId: string, newStatus: string) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, status: newStatus } : job
    ));
    
    toast({
      title: "Status Updated",
      description: `Job status has been changed to ${newStatus}.`
    });
  };

  const handleFeatureToggle = (jobId: string) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, featured: !job.featured } : job
    ));
    
    const job = jobs.find(j => j.id === jobId);
    const newFeaturedStatus = job ? !job.featured : false;
    
    toast({
      title: newFeaturedStatus ? "Job Featured" : "Job Unfeatured",
      description: newFeaturedStatus 
        ? "The job has been marked as featured and will appear in featured sections."
        : "The job has been removed from featured listings."
    });
  };

  // Function to convert category to string for display
  const getCategoryName = (category: string | JobCategory): string => {
    if (typeof category === 'string') {
      return category;
    }
    return category?.name || 'Uncategorized';
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  // Generate status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>;
      case "draft":
        return <Badge variant="secondary">Draft</Badge>;
      case "closed":
        return <Badge variant="outline">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Job Listings</CardTitle>
              <CardDescription>Manage your job postings</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search jobs..." 
                  className="pl-8 w-full sm:w-[200px] lg:w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-1">
                    <Filter className="h-4 w-4" /> Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                    All Jobs
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                    Active Jobs
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("draft")}>
                    Draft Jobs
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("closed")}>
                    Closed Jobs
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add New Job
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer" onClick={() => handleSort("title")}>
                  <div className="flex items-center">
                    Title
                    {sortField === "title" && (
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("company")}>
                  <div className="flex items-center">
                    Company
                    {sortField === "company" && (
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("location")}>
                  <div className="flex items-center">
                    Location
                    {sortField === "location" && (
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("category")}>
                  <div className="flex items-center">
                    Category
                    {sortField === "category" && (
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort("postedDate")}>
                  <div className="flex items-center">
                    Posted Date
                    {sortField === "postedDate" && (
                      <ArrowUpDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentJobs.length > 0 ? (
                currentJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell>
                      <div className="font-medium">
                        {job.title}
                        {job.featured && (
                          <Badge variant="secondary" className="ml-2">Featured</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{job.company}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>{getCategoryName(job.category)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                        <span>{formatDate(job.postedDate)}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(job.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" /> View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" /> Edit Job
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleFeatureToggle(job.id)}>
                            <Tag className="mr-2 h-4 w-4" />
                            {job.featured ? "Remove from Featured" : "Mark as Featured"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Status</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleStatusChange(job.id, "active")}>
                            Mark as Active
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(job.id, "draft")}>
                            Save as Draft
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(job.id, "closed")}>
                            Close Job
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeleteClick(job.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" /> Delete Job
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No jobs found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {Math.min(sortedJobs.length, indexOfFirstJob + 1)}-
            {Math.min(indexOfLastJob, sortedJobs.length)} of {sortedJobs.length}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the job listing.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DashboardJobsList;
