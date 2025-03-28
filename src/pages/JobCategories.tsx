import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Briefcase, SearchIcon, Lightbulb, Building2, Code2, Palette, BarChart3, Headphones, PiggyBank } from "lucide-react";
import { useGetCategoriesQuery } from "@/lib/store/api";
import type { JobCategory } from "@/lib/store/types";

const JobCategories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [layout, setLayout] = useState<"grid" | "list" | "pills">("grid");
  
  // Fetch categories using RTK Query
  const { data: categoriesData, isLoading, error } = useGetCategoriesQuery();
  
  // Filter categories based on search term
  const filteredCategories = categoriesData?.data.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];
  
  // Get category icon based on name
  const getCategoryIcon = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    if (name.includes('tech') || name.includes('software') || name.includes('developer')) {
      return <Code2 className="h-6 w-6" />;
    }
    if (name.includes('design') || name.includes('creative')) {
      return <Palette className="h-6 w-6" />;
    }
    if (name.includes('marketing') || name.includes('sales')) {
      return <BarChart3 className="h-6 w-6" />;
    }
    if (name.includes('customer') || name.includes('support')) {
      return <Headphones className="h-6 w-6" />;
    }
    if (name.includes('finance') || name.includes('accounting')) {
      return <PiggyBank className="h-6 w-6" />;
    }
    return <Building2 className="h-6 w-6" />;
  };
  
  return (
    <>
      <Helmet>
        <title>Job Categories | HarpalJobs</title>
        <meta 
          name="description" 
          content="Browse through our extensive list of job categories to find the perfect career opportunity for you."
        />
      </Helmet>
      
      <div className="flex min-h-screen flex-col">
        <Navbar />
        
        <main className="flex-1">
          <section className="pt-28 pb-16 bg-gradient-to-b from-job-blue/10 to-transparent">
            <div className="container px-4 mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                  Browse <span className="text-job-blue">Job Categories</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  Explore job opportunities by category to find the perfect role that matches your skills and interests.
                </p>
              </div>
              
              <div className="relative max-w-2xl mx-auto mb-12">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <SearchIcon className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  type="text"
                  placeholder="Search job categories..."
                  className="pl-10 py-6 text-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex justify-between items-center mb-8">
                <div className="text-lg font-medium">
                  {searchTerm ? `Search Results for "${searchTerm}"` : "All Categories"}
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant={layout === "grid" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setLayout("grid")}
                  >
                    Grid
                  </Button>
                  <Button 
                    variant={layout === "list" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setLayout("list")}
                  >
                    List
                  </Button>
                  <Button 
                    variant={layout === "pills" ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setLayout("pills")}
                  >
                    Pills
                  </Button>
                </div>
              </div>
              
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-job-blue mx-auto"></div>
                </div>
              ) : error ? (
                <div className="text-center py-12 bg-red-50 rounded-xl">
                  <h3 className="text-xl font-semibold mb-2 text-red-600">Error Loading Categories</h3>
                  <p className="text-red-600 mb-6">
                    There was an error loading the job categories. Please try again later.
                  </p>
                </div>
              ) : filteredCategories.length > 0 ? (
                <div className={`grid gap-6 ${
                  layout === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" :
                  layout === "list" ? "grid-cols-1" :
                  "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                }`}>
                  {filteredCategories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/jobs?category=${category.id}`}
                      className={`group ${
                        layout === "pills" 
                          ? "bg-white rounded-full px-6 py-3 text-center hover:bg-job-blue hover:text-white transition-colors"
                          : "bg-white rounded-xl p-6 hover:shadow-md transition-shadow"
                      }`}
                    >
                      <div className={`flex items-center gap-4 ${
                        layout === "pills" ? "justify-center" : ""
                      }`}>
                        <div className={`p-3 rounded-full ${
                          layout === "pills" 
                            ? "bg-job-blue/10 text-job-blue group-hover:bg-white/20 group-hover:text-white"
                            : "bg-job-blue/10 text-job-blue"
                        }`}>
                          {getCategoryIcon(category.name)}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-medium ${
                            layout === "pills" ? "text-sm" : "text-lg"
                          }`}>
                            {category.name}
                          </h3>
                          {layout !== "pills" && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {category.description}
                            </p>
                          )}
                        </div>
                        <div className={`text-sm ${
                          layout === "pills" 
                            ? "bg-job-blue/10 text-job-blue group-hover:bg-white/20 group-hover:text-white"
                            : "text-muted-foreground"
                        }`}>
                          {category.jobCount} jobs
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-slate-50 rounded-xl">
                  <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Categories Found</h3>
                  <p className="text-muted-foreground">
                    We couldn't find any categories matching your search.
                  </p>
                </div>
              )}
            </div>
          </section>
          
          <section className="py-16 bg-slate-50">
            <div className="container px-4 mx-auto">
              <div className="bg-white rounded-2xl p-8 border shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 text-amber-700 p-3 rounded-full">
                    <Lightbulb className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Job Category Tips</h3>
                    <p className="text-muted-foreground mb-4">
                      When exploring job categories, consider these helpful tips:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-job-blue font-bold">•</span>
                        <span>Look beyond your current industry to discover transferable skills</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-job-blue font-bold">•</span>
                        <span>Research growth trends in different categories to find emerging opportunities</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-job-blue font-bold">•</span>
                        <span>Consider both your technical skills and soft skills when exploring categories</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default JobCategories;
