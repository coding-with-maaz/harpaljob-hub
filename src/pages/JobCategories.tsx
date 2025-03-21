
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JobCategoriesList from "@/components/JobCategoriesList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Briefcase, SearchIcon, Lightbulb } from "lucide-react";

const JobCategories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [layout, setLayout] = useState<"grid" | "list" | "pills">("grid");
  
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
              
              <JobCategoriesList layout={layout} searchTerm={searchTerm} />
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
