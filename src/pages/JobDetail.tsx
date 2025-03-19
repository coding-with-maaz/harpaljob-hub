
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, Building, Clock, Calendar, Bookmark, Share2, ArrowLeft, CheckCircle, ChevronRight, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getJobById, getLatestJobs } from '@/lib/jobs';
import { Job } from '@/lib/types';
import JobCard from '@/components/JobCard';
import { cn } from '@/lib/utils';

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [relatedJobs, setRelatedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (id) {
      const foundJob = getJobById(id);
      if (foundJob) {
        setJob(foundJob);
        // Get related jobs (in a real app, these would be jobs with similar tags/category)
        setRelatedJobs(getLatestJobs(3).filter(j => j.id !== id));
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
    // In a real app, this would save the job to the user's bookmarks
    alert('Job bookmarked!');
  };
  
  const handleShare = () => {
    // In a real app, this would open a share dialog
    navigator.clipboard.writeText(window.location.href);
    alert('Job URL copied to clipboard!');
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
                      <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
                      <div className="flex flex-wrap gap-y-2 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center mr-4">
                          <Building className="h-4 w-4 mr-1 text-job-slate" />
                          <span>{job.company}</span>
                        </div>
                        <div className="flex items-center mr-4">
                          <MapPin className="h-4 w-4 mr-1 text-job-slate" />
                          <span>{job.location}</span>
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
                      <div className="flex flex-wrap gap-3">
                        <Link 
                          to={job.applicationUrl || "#"} 
                          className="px-4 py-2 bg-job-blue text-white rounded-lg hover:bg-job-indigo transition-colors"
                        >
                          Apply Now
                        </Link>
                        <button 
                          onClick={handleBookmark}
                          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors flex items-center"
                        >
                          <Bookmark className="h-4 w-4 mr-2" />
                          Save
                        </button>
                        <button 
                          onClick={handleShare}
                          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors flex items-center"
                        >
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Job description */}
                <div className="glass-card rounded-xl p-6 mb-6">
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
                    <Link 
                      to={job.applicationUrl || "#"} 
                      className="px-6 py-2.5 bg-job-blue text-white rounded-lg hover:bg-job-indigo transition-colors inline-flex items-center"
                    >
                      Apply for this position
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Link>
                  </div>
                </div>
                
                {/* Company info */}
                {job.companyDescription && (
                  <div className="glass-card rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">About {job.company}</h2>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="h-12 w-12 overflow-hidden rounded-md bg-secondary flex-shrink-0">
                        <img
                          src={job.logo}
                          alt={`${job.company} logo`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{job.company}</h3>
                        <Link to="#" className="text-sm text-job-blue hover:underline">
                          Visit Website
                        </Link>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{job.companyDescription}</p>
                  </div>
                )}
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
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-border">
                      <Link 
                        to={job.applicationUrl || "#"} 
                        className="w-full py-2.5 bg-job-blue text-white rounded-lg hover:bg-job-indigo transition-colors flex items-center justify-center"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                  
                  {/* Related jobs */}
                  <div className="glass-card rounded-xl p-6">
                    <h2 className="text-lg font-semibold mb-4">Similar Jobs</h2>
                    <div className="space-y-4">
                      {relatedJobs.length > 0 ? (
                        relatedJobs.map((relatedJob) => (
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
    </div>
  );
};

export default JobDetail;
