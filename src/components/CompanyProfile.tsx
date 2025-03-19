
import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Users, Calendar, Globe, MapPin, Briefcase } from 'lucide-react';
import { Job } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CompanyProfileProps {
  job: Job;
}

const CompanyProfile: React.FC<CompanyProfileProps> = ({ job }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">About {job.company}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-start gap-4 mb-4">
          <div className="h-16 w-16 overflow-hidden rounded-md bg-secondary flex-shrink-0">
            <img
              src={job.logo}
              alt={`${job.company} logo`}
              className="h-full w-full object-cover"
            />
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
