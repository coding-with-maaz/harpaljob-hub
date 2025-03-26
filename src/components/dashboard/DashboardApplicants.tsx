
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { 
  MoreHorizontal, 
  ChevronLeft, 
  ChevronRight,
  Search,
  FileText,
  Mail,
  Calendar,
  XCircle,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock application data
const mockApplications = [
  {
    id: "app-1",
    applicantName: "John Smith",
    email: "john.smith@example.com",
    jobTitle: "Senior React Developer",
    company: "TechCorp",
    appliedDate: "2023-11-20",
    status: "pending",
    resume: "/uploads/resume-john-smith.pdf",
    coverLetter: "I am excited to apply for this position...",
    reviewNotes: ""
  },
  {
    id: "app-2",
    applicantName: "Sarah Johnson",
    email: "sarah.j@example.com",
    jobTitle: "UX Designer",
    company: "DesignHub",
    appliedDate: "2023-11-18",
    status: "reviewed",
    resume: "/uploads/resume-sarah-johnson.pdf",
    coverLetter: "With my 5 years of experience in UX design...",
    reviewNotes: "Good portfolio, schedule for interview"
  },
  {
    id: "app-3",
    applicantName: "Michael Chen",
    email: "mchen@example.com",
    jobTitle: "Frontend Developer",
    company: "WebSolutions",
    appliedDate: "2023-11-15",
    status: "shortlisted",
    resume: "/uploads/resume-michael-chen.pdf",
    coverLetter: "I have been working with React for 3 years...",
    reviewNotes: "Strong technical skills, good cultural fit"
  },
  {
    id: "app-4",
    applicantName: "Emma Davis",
    email: "emma.davis@example.com",
    jobTitle: "Marketing Manager",
    company: "GrowthCo",
    appliedDate: "2023-11-12",
    status: "rejected",
    resume: "/uploads/resume-emma-davis.pdf",
    coverLetter: "I would love to bring my marketing expertise...",
    reviewNotes: "Not enough experience in B2B marketing"
  },
  {
    id: "app-5",
    applicantName: "Robert Wilson",
    email: "rwilson@example.com",
    jobTitle: "DevOps Engineer",
    company: "CloudTech",
    appliedDate: "2023-11-10",
    status: "accepted",
    resume: "/uploads/resume-robert-wilson.pdf",
    coverLetter: "Having worked with AWS for 5+ years...",
    reviewNotes: "Perfect fit for the role, excellent technical knowledge"
  }
];

const StatusBadgeVariant = {
  pending: "secondary",
  reviewed: "default",
  shortlisted: "default",
  rejected: "destructive",
  accepted: "outline"
};

const StatusBadgeText = {
  pending: "Pending",
  reviewed: "Reviewed",
  shortlisted: "Shortlisted",
  rejected: "Rejected",
  accepted: "Accepted"
};

const DashboardApplicants = () => {
  const { toast } = useToast();
  const [applications, setApplications] = useState(mockApplications);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [applicationsPerPage] = useState(5);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showApplicationDetails, setShowApplicationDetails] = useState(false);
  const [noteInput, setNoteInput] = useState("");

  // Filter applications based on search query and status
  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate pagination
  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = filteredApplications.slice(indexOfFirstApplication, indexOfLastApplication);
  const totalPages = Math.ceil(filteredApplications.length / applicationsPerPage);

  const handleStatusChange = (appId, newStatus) => {
    setApplications(applications.map(app => 
      app.id === appId ? { ...app, status: newStatus } : app
    ));
    
    toast({
      title: "Status Updated",
      description: `Application status has been changed to ${StatusBadgeText[newStatus]}.`
    });
  };

  const handleSaveNotes = (appId) => {
    if (!noteInput.trim()) return;
    
    setApplications(applications.map(app => 
      app.id === appId ? { ...app, reviewNotes: noteInput } : app
    ));
    
    toast({
      title: "Notes Saved",
      description: "Review notes have been saved successfully."
    });
    
    setNoteInput("");
  };

  const handleViewApplication = (app) => {
    setSelectedApplication(app);
    setNoteInput(app.reviewNotes);
    setShowApplicationDetails(true);
  };

  return (
    <>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Job Applications</CardTitle>
                <CardDescription>Manage and review applications</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Search applications..." 
                    className="pl-8 w-full sm:w-[200px] lg:w-[300px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="shortlisted">Shortlisted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Job</TableHead>
                  <TableHead>Applied Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentApplications.length > 0 ? (
                  currentApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{application.applicantName}</div>
                          <div className="text-sm text-muted-foreground">{application.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{application.jobTitle}</div>
                          <div className="text-sm text-muted-foreground">{application.company}</div>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(application.appliedDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={StatusBadgeVariant[application.status]}>
                          {StatusBadgeText[application.status]}
                        </Badge>
                      </TableCell>
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
                            <DropdownMenuItem onClick={() => handleViewApplication(application)}>
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleStatusChange(application.id, "pending")}>
                              Mark as Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(application.id, "reviewed")}>
                              Mark as Reviewed
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(application.id, "shortlisted")}>
                              Shortlist
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(application.id, "rejected")}>
                              Reject
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(application.id, "accepted")}>
                              Accept
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No applications found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {Math.min(filteredApplications.length, indexOfFirstApplication + 1)}-
              {Math.min(indexOfLastApplication, filteredApplications.length)} of {filteredApplications.length}
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
      </div>

      {selectedApplication && showApplicationDetails && (
        <AlertDialog open={showApplicationDetails} onOpenChange={setShowApplicationDetails}>
          <AlertDialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
            <AlertDialogHeader>
              <AlertDialogTitle>Application Details</AlertDialogTitle>
              <AlertDialogDescription>
                Reviewing application from {selectedApplication.applicantName}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">Applicant Information</h3>
                  <div className="mt-1 p-3 border rounded-md space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Name:</span>
                      <span className="text-sm font-medium">{selectedApplication.applicantName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Email:</span>
                      <span className="text-sm">{selectedApplication.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Applied on:</span>
                      <span className="text-sm">{new Date(selectedApplication.appliedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <Badge variant={StatusBadgeVariant[selectedApplication.status]}>
                        {StatusBadgeText[selectedApplication.status]}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Job Information</h3>
                  <div className="mt-1 p-3 border rounded-md space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Position:</span>
                      <span className="text-sm font-medium">{selectedApplication.jobTitle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Company:</span>
                      <span className="text-sm">{selectedApplication.company}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Documents</h3>
                  <div className="mt-1 space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      View Resume
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">Cover Letter</h3>
                  <div className="mt-1 p-3 border rounded-md h-32 overflow-auto">
                    <p className="text-sm">{selectedApplication.coverLetter}</p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-medium">Review Notes</h3>
                    <Button size="sm" variant="ghost" onClick={() => handleSaveNotes(selectedApplication.id)}>
                      Save Notes
                    </Button>
                  </div>
                  <div className="mt-1">
                    <textarea 
                      className="w-full min-h-[120px] p-3 border rounded-md text-sm" 
                      placeholder="Add notes about this candidate..."
                      value={noteInput}
                      onChange={(e) => setNoteInput(e.target.value)}
                    />
                  </div>
                </div>
                <div className="pt-2">
                  <h3 className="text-sm font-medium mb-2">Update Status</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline" 
                      className="justify-start"
                      onClick={() => handleStatusChange(selectedApplication.id, "reviewed")}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Mark Reviewed
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start"
                      onClick={() => handleStatusChange(selectedApplication.id, "shortlisted")}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Shortlist
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start text-green-600"
                      onClick={() => handleStatusChange(selectedApplication.id, "accepted")}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Accept
                    </Button>
                    <Button 
                      variant="outline" 
                      className="justify-start text-destructive"
                      onClick={() => handleStatusChange(selectedApplication.id, "rejected")}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default DashboardApplicants;
