
import React from "react";
import { Link } from "react-router-dom";
import { 
  Code, 
  LineChart, 
  Palette, 
  Briefcase, 
  GraduationCap, 
  HeartPulse, 
  Building2, 
  BarChart3, 
  ShieldCheck, 
  Truck, 
  Wrench, 
  Coffee
} from "lucide-react";
import JobCategoryCard from "./JobCategoryCard";
import { jobs } from "@/lib/jobs";

export interface CategoryType {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  color: string;
}

interface JobCategoriesListProps {
  limit?: number;
  layout?: "grid" | "list" | "pills";
  showCounts?: boolean;
  searchTerm?: string;
}

const JobCategoriesList: React.FC<JobCategoriesListProps> = ({ 
  limit = 12, 
  layout = "grid",
  showCounts = true,
  searchTerm = ""
}) => {
  // Count jobs by category
  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    jobs.forEach(job => {
      if (counts[job.category]) {
        counts[job.category]++;
      } else {
        counts[job.category] = 1;
      }
    });
    return counts;
  }, []);

  // Define categories with icons
  const categories: CategoryType[] = [
    {
      id: "technology",
      name: "Technology",
      icon: Code,
      description: "Software development, IT, and tech jobs",
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: "design",
      name: "Design",
      icon: Palette,
      description: "UX/UI design, graphic design, and creative roles",
      color: "bg-purple-100 text-purple-700",
    },
    {
      id: "marketing",
      name: "Marketing",
      icon: LineChart,
      description: "Digital marketing, content creation, and SEO",
      color: "bg-green-100 text-green-700",
    },
    {
      id: "business",
      name: "Business",
      icon: Briefcase,
      description: "Management, operations, and business administration",
      color: "bg-amber-100 text-amber-700",
    },
    {
      id: "education",
      name: "Education",
      icon: GraduationCap,
      description: "Teaching, training, and educational roles",
      color: "bg-cyan-100 text-cyan-700",
    },
    {
      id: "healthcare",
      name: "Healthcare",
      icon: HeartPulse,
      description: "Medical, nursing, and health-related positions",
      color: "bg-red-100 text-red-700",
    },
    {
      id: "finance",
      name: "Finance",
      icon: BarChart3,
      description: "Accounting, banking, and financial services",
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      id: "government",
      name: "Government",
      icon: Building2,
      description: "Public service and government positions",
      color: "bg-slate-100 text-slate-700",
    },
    {
      id: "legal",
      name: "Legal",
      icon: ShieldCheck,
      description: "Law, compliance, and legal services",
      color: "bg-indigo-100 text-indigo-700",
    },
    {
      id: "transportation",
      name: "Transportation",
      icon: Truck,
      description: "Logistics, delivery, and transportation roles",
      color: "bg-orange-100 text-orange-700",
    },
    {
      id: "manufacturing",
      name: "Manufacturing",
      icon: Wrench,
      description: "Production, assembly, and manufacturing jobs",
      color: "bg-zinc-100 text-zinc-700",
    },
    {
      id: "hospitality",
      name: "Hospitality",
      icon: Coffee,
      description: "Hotels, restaurants, and service industry",
      color: "bg-rose-100 text-rose-700",
    }
  ];

  // Filter categories based on search term
  const filteredCategories = categories.filter(category => 
    searchTerm ? 
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
    : true
  );

  // Limit categories to display
  const displayCategories = filteredCategories.slice(0, limit);

  if (layout === "pills") {
    return (
      <div className="flex flex-wrap justify-center gap-3">
        {displayCategories.map(category => {
          const CategoryIcon = category.icon;
          const count = categoryCounts[category.name] || 0;
          
          return (
            <Link 
              key={category.id} 
              to={`/category/${category.id}`}
              className={`px-4 py-2 rounded-full ${category.color} font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-opacity`}
            >
              <CategoryIcon className="h-4 w-4" />
              <span>{category.name}</span>
              {showCounts && (
                <span className="bg-white bg-opacity-50 text-xs rounded-full px-2 py-0.5">
                  {count}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    );
  }

  if (layout === "list") {
    return (
      <ul className="space-y-2">
        {displayCategories.map(category => {
          const CategoryIcon = category.icon;
          const count = categoryCounts[category.name] || 0;
          
          return (
            <li key={category.id}>
              <Link 
                to={`/category/${category.id}`}
                className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-md ${category.color} flex items-center justify-center`}>
                    <CategoryIcon className="h-4 w-4" />
                  </span>
                  <span>{category.name}</span>
                </div>
                {showCounts && (
                  <span className="text-sm text-muted-foreground">
                    {count} jobs
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  // Default grid layout
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {displayCategories.map(category => {
        const CategoryIcon = category.icon;
        const count = categoryCounts[category.name] || 0;
        
        return (
          <JobCategoryCard
            key={category.id}
            id={category.id}
            name={category.name}
            icon={<CategoryIcon className="h-6 w-6" />}
            description={category.description}
            color={category.color}
            count={count}
          />
        );
      })}
    </div>
  );
};

export default JobCategoriesList;
