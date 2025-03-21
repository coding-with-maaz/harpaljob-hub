
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  PencilIcon, 
  Trash2Icon, 
  EyeIcon, 
  ChevronLeftIcon, 
  ChevronRightIcon,
  Search
} from "lucide-react";
import { Job } from "@/lib/types";
import { Link } from "react-router-dom";

// Mock data for the dashboard jobs list
const mockJobs: Job[] = [
  {
    id: "job-1",
    title: "Senior React Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    country: "United States",
    type: "full-time",
    salary: "$120,000 - $150,000",
    description: "We are looking for a senior React developer to join our team.",
    requirements: ["5+ years of experience with React", "TypeScript knowledge", "Team player"],
    responsibilities: ["Lead frontend development", "Code reviews", "Mentoring"],
    postedDate: "2023-11-15",
    logo: "/placeholder.svg",
    category: "Technology",
    featured: true,
    tags: ["React", "TypeScript", "Senior"],
    applicationDeadline: "2023-12-15",
    companyDescription: "",
    companySize: "",
    status: "active",
    views: 0,
    userId: "1"
  },
  {
    id: "job-2",
    title: "UX Designer",
    company: "DesignHub",
    location: "Remote",
    country: "United States",
    type: "full-time",
    salary: "$90,000 - $110,000",
    description: "Join our creative team as a UX Designer.",
    requirements: ["3+ years of UX design experience", "Portfolio", "Figma"],
    responsibilities: ["Create wireframes", "User research", "Prototyping"],
    postedDate: "2023-11-10",
    logo: "/placeholder.svg",
    category: "Design",
    companyDescription: "",
    companySize: "",
    status: "active",
    views: 0,
    userId: "1",
    tags: []
  },
  {
    id: "job-3",
    title: "Marketing Manager",
    company: "GrowthCo",
    location: "New York, NY",
    country: "United States",
    type: "full-time",
    salary: "$85,000 - $100,000",
    description: "Lead our marketing efforts and drive growth.",
    requirements: ["5+ years in marketing", "B2B experience", "Analytics"],
    responsibilities: ["Campaign management", "Performance analysis", "Team leadership"],
    postedDate: "2023-11-05",
    logo: "/placeholder.svg",
    category: "Marketing",
    companyDescription: "",
    companySize: "",
    status: "active",
    views: 0,
    userId: "1",
    tags: []
  },
  {
    id: "job-4",
    title: "Frontend Developer",
    company: "WebSolutions",
    location: "Austin, TX",
    country: "United States",
    type: "contract",
    salary: "$70 - $90 per hour",
    description: "We need a talented frontend developer for our client projects.",
    requirements: ["3+ years with JavaScript", "CSS expertise", "React knowledge"],
    responsibilities: ["Build responsive UIs", "Optimize performance", "Client communication"],
    postedDate: "2023-11-02",
    logo: "/placeholder.svg",
    category: "Technology",
    companyDescription: "",
    companySize: "",
    status: "active",
    views: 0,
    userId: "1",
    tags: []
  },
  {
    id: "job-5",
    title: "Product Manager",
    company: "ProductFirst",
    location: "Seattle, WA",
    country: "United States",
    type: "full-time",
    salary: "$110,000 - $130,000",
    description: "Shape the future of our SaaS product.",
    requirements: ["4+ years in product management", "SaaS experience", "Technical background"],
    responsibilities: ["Roadmap planning", "Feature prioritization", "Cross-functional leadership"],
    postedDate: "2023-10-28",
    logo: "/placeholder.svg",
    category: "Technology",
    companyDescription: "",
    companySize: "",
    status: "active",
    views: 0,
    userId: "1",
    tags: []
  }
];

const DashboardJobsList = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter jobs based on search term
  const filteredJobs = mockJobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const handleEdit = (jobId: string) => {
    toast({
      title: "Edit Job",
      description: `You're editing job with ID: ${jobId}`
    });
  };

  const handleDelete = (jobId: string) => {
    toast({
      title: "Delete Job",
      description: `Job with ID: ${jobId} has been deleted`,
      variant: "destructive"
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Job Listings</CardTitle>
        <CardDescription>View, edit, and delete your job postings</CardDescription>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search jobs by title or company..."
            className="pl-8 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Posted Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentJobs.length > 0 ? (
              currentJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>{job.type}</TableCell>
                  <TableCell>{new Date(job.postedDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        asChild
                      >
                        <Link to={`/job/${job.id}`}>
                          <EyeIcon className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleEdit(job.id)}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleDelete(job.id)}
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  No jobs found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        {/* Pagination controls */}
        {filteredJobs.length > 0 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredJobs.length)} of {filteredJobs.length} jobs
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <div className="text-sm">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardJobsList;
