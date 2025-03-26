import React from 'react';
import { Link } from 'react-router-dom';
import { JobCategory } from '@/lib/types';
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface JobCategoriesListProps {
  categories: {
    [key: string]: JobCategory;
  };
}

const JobCategoriesList: React.FC<JobCategoriesListProps> = ({ categories }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Object.keys(categories).map((category) => (
        <Link to={`/categories/${category}`} key={category}>
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="text-4xl text-job-blue mb-2">{categories[category as keyof typeof categories].icon}</div>
              <h3 className="text-lg font-semibold text-center">{categories[category as keyof typeof categories].name}</h3>
              <Badge variant="secondary" className="mt-2">{categories[category as keyof typeof categories].jobCount} Jobs</Badge>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default JobCategoriesList;
