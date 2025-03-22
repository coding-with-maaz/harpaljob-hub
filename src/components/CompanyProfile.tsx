
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building, Users, Calendar, Globe, MapPin, Briefcase, UserPlus, UserMinus } from 'lucide-react';
import { Job, CompanyStats } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useFollowCompany } from '@/hooks/use-follow-company';

interface CompanyProfileProps {
  job: Job;
}

const CompanyProfile: React.FC<CompanyProfileProps> = ({ job }) => {
  const { toast } = useToast();
  const { isFollowing, toggleFollow, followerCount } = useFollowCompany(job.companyId);
  const [stats, setStats] = useState<CompanyStats>({
    followers: followerCount || 0,
    activeJobs: 5, // Demo data
    totalJobs: 12, // Demo data
    views: job.views || 0
  });

  const handleFollowToggle = () => {
    toggleFollow();
    
    toast({
      title: isFollowing ? "Unfollowed" : "Followed",
      description: isFollowing 
        ? `You are no longer following ${job.company}` 
        : `You are now following ${job.company}`,
    });
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">About {job.company}</CardTitle>
          <Button 
            variant={isFollowing ? "outline" : "default"}
            size="sm"
            onClick={handleFollowToggle}
            className="flex items-center gap-1"
          >
            {isFollowing ? <UserMinus className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-start gap-4 mb-4">
          <div className="h-16 w-16 overflow-hidden rounded-md bg-secondary flex-shrink-0">
            {job.logo ? (
              <img
                src={job.logo}
                alt={`${job.company} logo`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-job-blue">
                <Building className="h-6 w-6" />
              </div>
            )}
          </div>
          <div>
            <h3 className="font-medium text-lg">{job.company}</h3>
            {job.companyWebsite && (
              <Link 
                to={job.companyWebsite} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sm text-job-blue hover:underline flex items-center gap-1"
              >
                <Globe className="h-3 w-3" />
                Visit Website
              </Link>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-2 mb-4">
          <div className="bg-secondary/30 rounded-md p-2 text-center">
            <div className="text-lg font-semibold">{stats.followers}</div>
            <div className="text-xs text-muted-foreground">Followers</div>
          </div>
          <div className="bg-secondary/30 rounded-md p-2 text-center">
            <div className="text-lg font-semibold">{stats.activeJobs}</div>
            <div className="text-xs text-muted-foreground">Active Jobs</div>
          </div>
          <div className="bg-secondary/30 rounded-md p-2 text-center">
            <div className="text-lg font-semibold">{stats.totalJobs}</div>
            <div className="text-xs text-muted-foreground">Total Jobs</div>
          </div>
          <div className="bg-secondary/30 rounded-md p-2 text-center">
            <div className="text-lg font-semibold">{stats.views}</div>
            <div className="text-xs text-muted-foreground">Views</div>
          </div>
        </div>
        
        <p className="text-muted-foreground mb-4">{job.companyDescription}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {job.companyIndustry && (
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-job-slate" />
              <div>
                <div className="text-xs text-muted-foreground">Industry</div>
                <div className="text-sm">{job.companyIndustry}</div>
              </div>
            </div>
          )}
          
          {job.companySize && (
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-job-slate" />
              <div>
                <div className="text-xs text-muted-foreground">Company Size</div>
                <div className="text-sm">{job.companySize}</div>
              </div>
            </div>
          )}
          
          {job.companyFoundedYear && (
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-job-slate" />
              <div>
                <div className="text-xs text-muted-foreground">Founded</div>
                <div className="text-sm">{job.companyFoundedYear}</div>
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-job-slate" />
            <div>
              <div className="text-xs text-muted-foreground">Headquarters</div>
              <div className="text-sm">{job.location.split('(')[0].trim()}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyProfile;
