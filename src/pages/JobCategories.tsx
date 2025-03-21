
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
import JobCategoriesList from "@/components/JobCategoriesList";
import { Search, Filter } from "lucide-react";

const JobCategories = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = React.useState("");

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
        
        <main className="flex-1 pt-20">
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-job-blue to-job-indigo py-12 md:py-16">
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
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <h2 className="text-2xl font-bold mb-4 md:mb-0">All Categories</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
                <select 
                  className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                  defaultValue="popular"
                >
                  <option value="popular">Most Popular</option>
                  <option value="a-z">A-Z</option>
                  <option value="z-a">Z-A</option>
                  <option value="newest">Most Jobs</option>
                </select>
              </div>
            </div>
            
            <JobCategoriesList
              layout="grid"
              showCounts={true}
              searchTerm={searchTerm}
            />
            
            {searchTerm && <JobCategoriesList searchTerm={searchTerm} layout="grid" /> && 
              <JobCategoriesList searchTerm={searchTerm} layout="grid" />.length === 0 && (
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
                Popular Categories
              </h2>
              <JobCategoriesList 
                limit={6} 
                layout="pills" 
                showCounts={true}
              />
            </div>
          </section>
          
          {/* Job Search Tips */}
          <section className="py-10 container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Tips for Finding the Perfect Job
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="h-10 w-10 rounded-full bg-blue-100 text-job-blue flex items-center justify-center mb-4">1</div>
                    <h3 className="font-semibold text-lg mb-2">Choose the Right Category</h3>
                    <p className="text-muted-foreground">Browse through our carefully curated job categories to find positions that match your skills and interests.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mb-4">2</div>
                    <h3 className="font-semibold text-lg mb-2">Refine Your Search</h3>
                    <p className="text-muted-foreground">Use filters to narrow down your job search by location, salary range, and employment type.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="h-10 w-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4">3</div>
                    <h3 className="font-semibold text-lg mb-2">Set Up Job Alerts</h3>
                    <p className="text-muted-foreground">Create personalized job alerts to receive notifications when new opportunities in your preferred categories become available.</p>
                  </CardContent>
                </Card>
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
