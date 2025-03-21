
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import AdBanner from "@/components/ads/AdBanner";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Briefcase, 
  Code, 
  LineChart, 
  Palette, 
  GraduationCap, 
  HeartPulse, 
  Building2, 
  BarChart3, 
  ShieldCheck, 
  Truck, 
  Wrench, 
  Coffee,
  Search
} from "lucide-react";
import { jobs } from "@/lib/jobs";

// Define category with icon type
interface Category {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  color: string;
  count: number;
}

const JobCategories = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = React.useState("");

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
  const categories: Category[] = [
    {
      id: "technology",
      name: "Technology",
      icon: Code,
      description: "Software development, IT, and tech jobs",
      color: "bg-blue-100 text-blue-700",
      count: categoryCounts["Technology"] || 0
    },
    {
      id: "design",
      name: "Design",
      icon: Palette,
      description: "UX/UI design, graphic design, and creative roles",
      color: "bg-purple-100 text-purple-700",
      count: categoryCounts["Design"] || 0
    },
    {
      id: "marketing",
      name: "Marketing",
      icon: LineChart,
      description: "Digital marketing, content creation, and SEO",
      color: "bg-green-100 text-green-700",
      count: categoryCounts["Marketing"] || 0
    },
    {
      id: "business",
      name: "Business",
      icon: Briefcase,
      description: "Management, operations, and business administration",
      color: "bg-amber-100 text-amber-700",
      count: categoryCounts["Business"] || 0
    },
    {
      id: "education",
      name: "Education",
      icon: GraduationCap,
      description: "Teaching, training, and educational roles",
      color: "bg-cyan-100 text-cyan-700",
      count: categoryCounts["Education"] || 0
    },
    {
      id: "healthcare",
      name: "Healthcare",
      icon: HeartPulse,
      description: "Medical, nursing, and health-related positions",
      color: "bg-red-100 text-red-700",
      count: categoryCounts["Healthcare"] || 0
    },
    {
      id: "finance",
      name: "Finance",
      icon: BarChart3,
      description: "Accounting, banking, and financial services",
      color: "bg-emerald-100 text-emerald-700",
      count: categoryCounts["Finance"] || 0
    },
    {
      id: "government",
      name: "Government",
      icon: Building2,
      description: "Public service and government positions",
      color: "bg-slate-100 text-slate-700",
      count: categoryCounts["Government"] || 0
    },
    {
      id: "legal",
      name: "Legal",
      icon: ShieldCheck,
      description: "Law, compliance, and legal services",
      color: "bg-indigo-100 text-indigo-700",
      count: categoryCounts["Legal"] || 0
    },
    {
      id: "transportation",
      name: "Transportation",
      icon: Truck,
      description: "Logistics, delivery, and transportation roles",
      color: "bg-orange-100 text-orange-700",
      count: categoryCounts["Transportation"] || 0
    },
    {
      id: "manufacturing",
      name: "Manufacturing",
      icon: Wrench,
      description: "Production, assembly, and manufacturing jobs",
      color: "bg-zinc-100 text-zinc-700",
      count: categoryCounts["Manufacturing"] || 0
    },
    {
      id: "hospitality",
      name: "Hospitality",
      icon: Coffee,
      description: "Hotels, restaurants, and service industry",
      color: "bg-rose-100 text-rose-700",
      count: categoryCounts["Hospitality"] || 0
    }
  ];

  // Filter categories based on search
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <SEOHead
        title="Job Categories | Find Jobs By Industry"
        description="Browse job listings by category to find the perfect career path in your preferred industry. Explore opportunities in technology, marketing, healthcare, and more."
        keywords="job categories, job industries, career paths, job search by category, industry jobs"
        ogType="website"
      />
      
      <div className="flex min-h-screen flex-col">
        <Navbar />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-12 md:py-16">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
                Browse Jobs By Category
              </h1>
              <p className="text-blue-100 text-center max-w-2xl mx-auto mb-8">
                Find the perfect job in your field of expertise or explore new career opportunities across industries.
              </p>
              
              <div className="max-w-md mx-auto relative">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  className="pl-10 w-full h-10 rounded-lg border border-blue-400 bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Categories Grid */}
          <section className="py-12 container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCategories.map((category) => (
                <Link 
                  to={`/category/${category.id}`} 
                  key={category.id}
                  className="group"
                >
                  <Card className="h-full hover:shadow-md transition-all duration-200 hover:-translate-y-1 overflow-hidden">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4`}>
                        <category.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-job-blue transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {category.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          {category.count} {category.count === 1 ? 'job' : 'jobs'}
                        </span>
                        <span className="text-xs font-medium text-job-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          Browse Jobs →
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            
            {filteredCategories.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No categories found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setSearchTerm("")}
                >
                  Clear Search
                </Button>
              </div>
            )}
          </section>
          
          {/* Featured Categories Banner */}
          <section className="bg-gray-50 py-10">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Top Categories
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {categories.slice(0, 6).map((category) => (
                  <Link 
                    key={category.id} 
                    to={`/category/${category.id}`}
                    className={`px-4 py-2 rounded-full ${category.color} font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-opacity`}
                  >
                    <category.icon className="h-4 w-4" />
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
          
          {/* Ad Banner */}
          <div className="container mx-auto px-4 py-8">
            <AdBanner
              id="categories-footer-ad"
              position="footer"
              size="responsive"
            />
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default JobCategories;
