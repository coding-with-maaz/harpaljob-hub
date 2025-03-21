
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface JobCategoryCardProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
  count: number;
}

const JobCategoryCard: React.FC<JobCategoryCardProps> = ({
  id,
  name,
  icon,
  description,
  color,
  count
}) => {
  return (
    <Link to={`/category/${id}`} className="group">
      <Card className="h-full hover:shadow-md transition-all duration-300 hover:-translate-y-1 overflow-hidden rounded-xl border-t-4 border-t-job-blue">
        <CardContent className="p-6">
          <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300`}>
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-job-blue transition-colors">
            {name}
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            {description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium bg-slate-100 px-2 py-1 rounded-full">
              {count} {count === 1 ? 'job' : 'jobs'}
            </span>
            <span className="text-xs font-medium text-job-blue opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 transform">
              View Jobs →
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default JobCategoryCard;
