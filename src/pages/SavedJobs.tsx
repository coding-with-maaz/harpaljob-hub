
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Trash2, ArrowLeft, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Job } from '@/lib/types';
import { getJobById } from '@/lib/jobs';
import { getSavedJobs, removeSavedJob } from '@/lib/savedJobs';
import JobCard from '@/components/JobCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const SavedJobs: React.FC = () => {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadSavedJobs();
  }, []);
  
  const loadSavedJobs = () => {
    setLoading(true);
    const savedJobIds = getSavedJobs();
    const jobs: Job[] = [];
    
    savedJobIds.forEach(savedJob => {
      const job = getJobById(savedJob.id);
      if (job) {
        jobs.push(job);
      }
    });
    
    setSavedJobs(jobs);
    setLoading(false);
  };
  
  const handleRemoveJob = (id: string) => {
    removeSavedJob(id);
    setSavedJobs(prevJobs => prevJobs.filter(job => job.id !== id));
    
    toast({
      title: "Job Removed",
      description: "The job has been removed from your saved list."
    });
  };
  
  const filteredJobs = searchQuery.trim() === ''
    ? savedJobs
    : savedJobs.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center mb-6">
              <Link to="/jobs" className="mr-4 text-muted-foreground hover:text-job-blue flex items-center">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Jobs
              </Link>
              <h1 className="text-2xl font-bold">Saved Jobs</h1>
            </div>
            
            {/* Search and filters */}
            <div className="glass-card rounded-xl p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search saved jobs..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            {/* Jobs list */}
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-pulse h-8 w-8 rounded-full bg-job-blue/20"></div>
              </div>
            ) : savedJobs.length === 0 ? (
              <div className="text-center py-12">
                <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">No Saved Jobs Yet</h2>
                <p className="text-muted-foreground mb-6">
                  You haven't saved any jobs yet. Browse jobs and click the bookmark icon to save them for later.
                </p>
                <Link
                  to="/jobs"
                  className="px-4 py-2 bg-job-blue text-white rounded-lg inline-flex items-center hover:bg-job-indigo transition-colors"
                >
                  Browse Jobs
                </Link>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">No Matching Jobs</h2>
                <p className="text-muted-foreground mb-6">
                  No saved jobs match your search criteria. Try adjusting your search or clear filters.
                </p>
                <Button variant="outline" onClick={() => setSearchQuery('')}>
                  Clear Search
                </Button>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredJobs.map(job => (
                  <div key={job.id} className="relative">
                    <JobCard job={job} />
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute top-4 right-4 h-8 w-8 bg-white/80 hover:bg-red-50 hover:text-red-600 text-muted-foreground transition-colors"
                      onClick={() => handleRemoveJob(job.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SavedJobs;
