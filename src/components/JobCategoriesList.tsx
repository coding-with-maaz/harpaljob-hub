
import React from 'react';
import { Link } from 'react-router-dom';
import { JobCategory } from '@/lib/types';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface JobCategoriesListProps {
  categories: JobCategory[] | Record<string, JobCategory>;
}

const JobCategoriesList: React.FC<JobCategoriesListProps> = ({ categories }) => {
  // Handle both array and object formats of categories
  const renderCategories = () => {
    if (Array.isArray(categories)) {
      return categories.map((category) => (
        <Link to={`/category/${category.id}`} key={category.id}>
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="text-4xl text-job-blue mb-2">{category.icon}</div>
              <h3 className="text-lg font-semibold text-center">{category.name}</h3>
              <Badge variant="secondary" className="mt-2">{category.jobCount} Jobs</Badge>
            </CardContent>
          </Card>
        </Link>
      ));
    } else {
      return Object.keys(categories).map((categoryKey) => {
        const category = categories[categoryKey];
        return (
          <Link to={`/category/${categoryKey}`} key={categoryKey}>
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="text-4xl text-job-blue mb-2">{category.icon}</div>
                <h3 className="text-lg font-semibold text-center">{category.name}</h3>
                <Badge variant="secondary" className="mt-2">{category.jobCount} Jobs</Badge>
              </CardContent>
            </Card>
          </Link>
        );
      });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {renderCategories()}
    </div>
  );
};

export default JobCategoriesList;
