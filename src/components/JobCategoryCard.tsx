
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
      <Card className="h-full hover:shadow-md transition-all duration-200 hover:-translate-y-1 overflow-hidden border-t-4 border-t-job-blue">
        <CardContent className="p-6">
          <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center mb-4`}>
            {icon}
          </div>
          <h3 className="text-xl font-semibold mb-2 group-hover:text-job-blue transition-colors">
            {name}
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            {description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">
              {count} {count === 1 ? 'job' : 'jobs'}
            </span>
            <span className="text-xs font-medium text-job-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              View Jobs →
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default JobCategoryCard;
