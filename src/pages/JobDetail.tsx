import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  MapPin, 
  Building, 
  Clock, 
  Calendar, 
  Bookmark, 
  Share2, 
  ArrowLeft, 
  CheckCircle, 
  ChevronRight, 
  ExternalLink, 
  BookmarkCheck,
  Users,
  Linkedin,
  FileText,
  Award
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getJobById, getLatestJobs, getJobsByCategory } from '@/lib/jobs';
import { Job } from '@/lib/types';
import JobCard from '@/components/JobCard';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';
import { toggleSaveJob, isJobSaved } from '@/lib/savedJobs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import JobApplicationForm from '@/components/JobApplicationForm';
import ShareJobModal from '@/components/ShareJobModal';
import CompanyProfile from '@/components/CompanyProfile';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [similarJobs, setSimilarJobs] = useState<Job[]>([]);
  const [companyJobs, setCompanyJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [applicationDialogOpen, setApplicationDialogOpen] = useState(false);
  
  useEffect(() => {
    if (id) {
      const foundJob = getJobById(id);
      if (foundJob) {
        setJob(foundJob);
        // Check if job is saved
        setIsSaved(isJobSaved(id));
        
        // Get related jobs by category
        const categoryJobs = getJobsByCategory(foundJob.category).filter(j => j.id !== id);
        setSimilarJobs(categoryJobs.slice(0, 2));
        
        // Get jobs from same company
        const jobsFromCompany = getLatestJobs().filter(j => j.company === foundJob.company && j.id !== id);
        setCompanyJobs(jobsFromCompany.slice(0, 2));
      }
      setLoading(false);
    }
  }, [id]);
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const handleBackClick = () => {
    navigate(-1);
  };
  
  const handleBookmark = () => {
    if (job) {
      const newSavedStatus = toggleSaveJob(job.id);
      setIsSaved(newSavedStatus);
      
      toast({
        title: newSavedStatus ? "Job Saved" : "Job Removed",
        description: newSavedStatus 
          ? `${job.title} has been added to your saved jobs.` 
          : `${job.title} has been removed from your saved jobs.`,
      });
    }
  };
  
  const handleShare = () => {
    setShareModalOpen(true);
  };
  
  const calculateDaysRemaining = (deadline?: string) => {
    if (!deadline) return null;
    
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col page-transition">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse h-8 w-8 rounded-full bg-job-blue/20"></div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!job) {
    return (
      <div className="min-h-screen flex flex-col page-transition">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Job Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The job you're looking for doesn't exist or has been removed.
            </p>
            <Link 
              to="/jobs" 
              className="px-4 py-2 bg-job-blue text-white rounded-lg inline-flex items-center hover:bg-job-indigo transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Jobs
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const daysRemaining = calculateDaysRemaining(job.applicationDeadline);

  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="max-w-5xl mx-auto mb-6">
            <nav className="flex items-center text-sm">
              <button 
                onClick={handleBackClick}
                className="text-muted-foreground hover:text-job-blue flex items-center mr-2"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </button>
              <Link to="/" className="text-muted-foreground hover:text-job-blue">
                Home
              </Link>
              <ChevronRight className="h-3 w-3 mx-2 text-muted-foreground" />
              <Link to="/jobs" className="text-muted-foreground hover:text-job-blue">
                Jobs
              </Link>
              <ChevronRight className="h-3 w-3 mx-2 text-muted-foreground" />
              <span className="text-foreground truncate max-w-[200px]">{job.title}</span>
            </nav>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Main content */}
              <div className="flex-1">
                {/* Job header */}
                <div className="glass-card rounded-xl p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 overflow-hidden rounded-md bg-secondary flex-shrink-0">
                      <img
                        src={job.logo}
                        alt={`${job.company} logo`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-job-blue">{job.company}</span>
                        {job.featured && (
                          <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                            Featured
                          </Badge>
                        )}
                      </div>
                      <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
                      <div className="flex flex-wrap gap-y-2 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center mr-4">
                          <Building className="h-4 w-4 mr-1 text-job-slate" />
                          <span>{job.company}</span>
                        </div>
                        <div className="flex items-center mr-4">
                          <MapPin className="h-4 w-4 mr-1 text-job-slate" />
                          <span>{job.location}, {job.country}</span>
                        </div>
                        <div className="flex items-center mr-4">
                          <Clock className="h-4 w-4 mr-1 text-job-slate" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-job-slate" />
                          <span>Posted on {formatDate(job.postedDate)}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {job.tags?.map((tag, index) => (
                          <span key={index} className="job-tag bg-secondary/80 text-secondary-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Application deadline notice */}
                      {job.applicationDeadline && daysRemaining !== null && (
                        <div className={cn(
                          "mb-4 px-3 py-2 rounded-md text-sm flex items-center",
                          daysRemaining <= 3 
                            ? "bg-red-50 text-red-600" 
                            : daysRemaining <= 7 
                              ? "bg-amber-50 text-amber-600" 
                              : "bg-green-50 text-green-600"
                        )}>
                          <Calendar className="h-4 w-4 mr-2" />
                          {daysRemaining === 0 ? (
                            <span>Application closes today!</span>
                          ) : daysRemaining === 1 ? (
                            <span>Application closes tomorrow!</span>
                          ) : (
                            <span>Application closes in {daysRemaining} days ({formatDate(job.applicationDeadline)})</span>
                          )}
                        </div>
                      )}
                      
                      <div className="flex flex-wrap gap-3">
                        <Dialog open={applicationDialogOpen} onOpenChange={setApplicationDialogOpen}>
                          <DialogTrigger asChild>
                            <Button 
                              className="px-4 py-2 bg-job-blue text-white rounded-lg hover:bg-job-indigo transition-colors"
                            >
                              Apply Now
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px] p-0">
                            <JobApplicationForm job={job} onClose={() => setApplicationDialogOpen(false)} />
                          </DialogContent>
                        </Dialog>
                        
                        <Button 
                          onClick={handleBookmark}
                          variant="outline"
                          className={cn(
                            "px-4 py-2 rounded-lg transition-colors flex items-center",
                            isSaved ? "bg-blue-50 text-job-blue border-job-blue/30" : "bg-secondary text-secondary-foreground"
                          )}
                        >
                          {isSaved ? (
                            <>
                              <BookmarkCheck className="h-4 w-4 mr-2" />
                              Saved
                            </>
                          ) : (
                            <>
                              <Bookmark className="h-4 w-4 mr-2" />
                              Save
                            </>
                          )}
                        </Button>
                        
                        <Button 
                          onClick={handleShare}
                          variant="outline"
                          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors flex items-center"
                        >
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Tabs for job information */}
                <div className="glass-card rounded-xl p-6 mb-6">
                  <Tabs defaultValue="description" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="description">Description</TabsTrigger>
                      <TabsTrigger value="company">Company</TabsTrigger>
                      <TabsTrigger value="more-jobs">More Jobs</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="description">
                      <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                      <p className="text-muted-foreground mb-6">{job.description}</p>
                      
                      <h3 className="text-lg font-semibold mb-3">Responsibilities</h3>
                      <ul className="list-none space-y-2 mb-6">
                        {job.responsibilities.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-job-blue mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                      <ul className="list-none space-y-2 mb-6">
                        {job.requirements.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-job-blue mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {job.benefits && (
                        <>
                          <h3 className="text-lg font-semibold mb-3">Benefits</h3>
                          <ul className="list-none space-y-2 mb-6">
                            {job.benefits.map((item, index) => (
                              <li key={index} className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-job-blue mt-0.5 mr-2 flex-shrink-0" />
                                <span className="text-muted-foreground">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                      
                      <div className="mt-8">
                        <Dialog open={applicationDialogOpen} onOpenChange={setApplicationDialogOpen}>
                          <DialogTrigger asChild>
                            <Button className="px-6 py-2.5 bg-job-blue text-white rounded-lg hover:bg-job-indigo transition-colors inline-flex items-center">
                              Apply for this position
                              <ExternalLink className="h-4 w-4 ml-2" />
                            </Button>
                          </DialogTrigger>
                        </Dialog>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="company">
                      {job.companyDescription ? (
                        <CompanyProfile job={job} />
                      ) : (
                        <div className="text-center py-8">
                          <Building className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium mb-2">Company Profile Not Available</h3>
                          <p className="text-muted-foreground">
                            Additional company information isn't available for {job.company}.
                          </p>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="more-jobs">
                      <h3 className="text-lg font-semibold mb-4">More jobs at {job.company}</h3>
                      {companyJobs.length > 0 ? (
                        <div className="grid gap-4">
                          {companyJobs.map(job => (
                            <JobCard key={job.id} job={job} />
                          ))}
                          <div className="mt-2 text-center">
                            <Link 
                              to="/jobs" 
                              className="text-job-blue hover:text-job-indigo flex items-center justify-center"
                            >
                              Browse All Jobs
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium mb-2">No Other Jobs Available</h3>
                          <p className="text-muted-foreground">
                            There are currently no other job listings from {job.company}.
                          </p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="w-full md:w-80 flex-shrink-0">
                <div className="sticky top-24 space-y-6">
                  {/* Job summary */}
                  <div className="glass-card rounded-xl p-6">
                    <h2 className="text-lg font-semibold mb-4">Job Summary</h2>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Published on</div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-job-slate" />
                          <span>{formatDate(job.postedDate)}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Job Type</div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-job-slate" />
                          <span>{job.type}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Category</div>
                        <div className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-2 text-job-slate" />
                          <span>{job.category}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Salary</div>
                        <div className="flex items-center font-medium">
                          {job.salary}
                        </div>
                      </div>
                      
                      {job.companySize && (
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Company Size</div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-job-slate" />
                            <span>{job.companySize}</span>
                          </div>
                        </div>
                      )}
                      
                      {job.applicationDeadline && (
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Apply Before</div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-job-slate" />
                            <span>{formatDate(job.applicationDeadline)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-border">
                      <Dialog open={applicationDialogOpen} onOpenChange={setApplicationDialogOpen}>
                        <DialogTrigger asChild>
                          <Button className="w-full py-2.5 bg-job-blue text-white rounded-lg hover:bg-job-indigo transition-colors flex items-center justify-center">
                            Apply Now
                          </Button>
                        </DialogTrigger>
                      </Dialog>
                    </div>
                  </div>
                  
                  {/* Required Skills */}
                  {job.tags && job.tags.length > 0 && (
                    <div className="glass-card rounded-xl p-6">
                      <h2 className="text-lg font-semibold mb-4">Required Skills</h2>
                      <div className="flex flex-wrap gap-2">
                        {job.tags.map((tag, index) => (
                          <Badge variant="secondary" key={index} className="text-sm rounded-full px-3 py-1">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Similar jobs */}
                  <div className="glass-card rounded-xl p-6">
                    <h2 className="text-lg font-semibold mb-4">Similar Jobs</h2>
                    <div className="space-y-4">
                      {similarJobs.length > 0 ? (
                        similarJobs.map((relatedJob) => (
                          <Link 
                            key={relatedJob.id} 
                            to={`/job/${relatedJob.id}`}
                            className="block group"
                          >
                            <div className="p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                              <div className="flex items-start gap-3">
                                <div className="h-10 w-10 overflow-hidden rounded bg-secondary flex-shrink-0">
                                  <img
                                    src={relatedJob.logo}
                                    alt={`${relatedJob.company} logo`}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div>
                                  <h3 className="font-medium text-sm group-hover:text-job-blue transition-colors">
                                    {relatedJob.title}
                                  </h3>
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <Building className="h-3 w-3 mr-1" />
                                    {relatedJob.company}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">No similar jobs found.</p>
                      )}
                    </div>
                    <div className="mt-4 pt-4 border-t border-border">
                      <Link 
                        to="/jobs" 
                        className="text-sm text-job-blue hover:text-job-indigo flex items-center justify-center"
                      >
                        Browse All Jobs
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Share Modal */}
      <ShareJobModal 
        job={job} 
        isOpen={shareModalOpen} 
        onClose={() => setShareModalOpen(false)} 
      />
    </div>
  );
};

export default JobDetail;
