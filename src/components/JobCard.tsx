import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, Building, Clock, Eye } from 'lucide-react';
import { Job } from '@/lib/types';
import { cn } from '@/lib/utils';

interface JobCardProps {
  job: Job;
  featured?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, featured = false }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <Link 
      to={`/job/${job.id}`} 
      className={cn(
        "block group",
        featured ? "col-span-2 md:col-span-1" : ""
      )}
    >
      <div className={cn(
        "glass-card rounded-xl p-6 hover-card h-full",
        featured ? "border-l-4 border-l-job-blue" : ""
      )}>
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 overflow-hidden rounded-md bg-secondary flex-shrink-0">
            {job.logo ? (
              <img src={job.logo} alt={`${job.company} logo`} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-job-blue">
                <Building className="h-6 w-6" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-job-blue">{job.company}</span>
              <span className="text-xs text-muted-foreground flex items-center">
                <CalendarDays className="h-3 w-3 mr-1" />
                {formatDate(job.postedDate)}
              </span>
            </div>
            <h3 className="font-semibold text-lg leading-tight mb-2 group-hover:text-job-blue transition-colors">
              {job.title}
            </h3>
            <div className="flex flex-wrap gap-1 mb-3">
              {job.requirements?.slice(0, 3).map((req, index) => (
                <span key={index} className="job-tag bg-secondary/80 text-secondary-foreground">
                  {req}
                </span>
              ))}
              {job.requirements && job.requirements.length > 3 && (
                <span className="job-tag bg-secondary/80 text-secondary-foreground">
                  +{job.requirements.length - 3}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center mr-4">
                <MapPin className="h-3.5 w-3.5 mr-1 text-job-slate" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center mr-4">
                <Clock className="h-3.5 w-3.5 mr-1 text-job-slate" />
                <span>{job.type}</span>
              </div>
              <div className="flex items-center">
                <Building className="h-3.5 w-3.5 mr-1 text-job-slate" />
                <Badge variant="outline">
                  {typeof job.category === 'string' ? job.category : job.category.name}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        {featured && (
          <div className="mt-4 border-t border-border pt-4">
            <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
          </div>
        )}
        
        <div className="mt-4 flex justify-between items-center">
          <span className="font-medium text-sm">{job.salary}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground flex items-center">
              <Eye className="h-3 w-3 mr-1" />
              {job.views || 0}
            </span>
            <span className="text-xs font-medium text-job-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
