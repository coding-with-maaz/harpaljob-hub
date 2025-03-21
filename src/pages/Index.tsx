import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Briefcase, Building, MapPin, Bookmark, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import JobCard from '@/components/JobCard';
import { useGetFeaturedJobsQuery, useGetLatestJobsQuery, useGetCategoriesQuery } from '@/lib/store/api';
import type { Job } from '@/lib/store/types';

const Index: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();
  
  // Fetch data using RTK Query hooks
  const { data: featuredJobsData, isLoading: isLoadingFeatured } = useGetFeaturedJobsQuery({ limit: 2 });
  const { data: latestJobsData, isLoading: isLoadingLatest } = useGetLatestJobsQuery({ limit: 6 });
  const { data: categoriesData, isLoading: isLoadingCategories } = useGetCategoriesQuery();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    if (searchTerm) searchParams.set('search', searchTerm);
    if (location) searchParams.set('location', location);
    navigate(`/jobs?${searchParams.toString()}`);
  };
  
  const categories = [
    { name: 'Technology', icon: <Briefcase className="h-6 w-6" />, count: 120, color: 'bg-blue-50 text-job-blue' },
    { name: 'Design', icon: <Building className="h-6 w-6" />, count: 64, color: 'bg-purple-50 text-job-purple' },
    { name: 'Marketing', icon: <Search className="h-6 w-6" />, count: 82, color: 'bg-teal-50 text-job-teal' },
    { name: 'Sales', icon: <MapPin className="h-6 w-6" />, count: 53, color: 'bg-amber-50 text-amber-600' },
    { name: 'Customer Service', icon: <Bookmark className="h-6 w-6" />, count: 41, color: 'bg-red-50 text-red-600' },
    { name: 'Finance', icon: <Building className="h-6 w-6" />, count: 35, color: 'bg-green-50 text-green-600' },
  ];

  return (
    <div className="min-h-screen flex flex-col page-transition">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 relative bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-slide-up">
              Find Your Dream Job With <span className="text-job-blue">HarpalJob</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
              Connect with top employers and discover opportunities that match your skills and aspirations.
            </p>
            
            <div className="bg-white rounded-xl shadow-glass p-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Job title or keyword"
                    className="w-full h-11 pl-10 pr-4 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-job-blue/20 transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full h-11 pl-10 pr-4 rounded-lg border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-job-blue/20 transition-all"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <button 
                  type="submit"
                  className="h-11 px-6 font-medium bg-job-blue text-white rounded-lg hover:bg-job-indigo transition-colors shadow-sm"
                >
                  Search Jobs
                </button>
              </form>
            </div>
            
            <div className="mt-6 text-sm text-muted-foreground animate-slide-up" style={{ animationDelay: '300ms' }}>
              Popular searches: 
              <Link to="/jobs?search=developer" className="ml-2 mr-1 text-job-blue hover:underline">Developer</Link>,
              <Link to="/jobs?search=designer" className="mx-1 text-job-blue hover:underline">Designer</Link>,
              <Link to="/jobs?search=marketing" className="mx-1 text-job-blue hover:underline">Marketing</Link>,
              <Link to="/jobs?search=remote" className="mx-1 text-job-blue hover:underline">Remote</Link>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 animate-slide-up" style={{ animationDelay: '400ms' }}>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-job-blue" />
                <span className="text-sm">10,000+ Jobs</span>
              </div>
              <div className="flex items-center">
                <Building className="h-5 w-5 mr-2 text-job-blue" />
                <span className="text-sm">2,000+ Companies</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-job-blue" />
                <span className="text-sm">100+ Locations</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Jobs Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Jobs</h2>
            <Link to="/jobs" className="text-job-blue hover:text-job-indigo font-medium flex items-center group">
              Browse All Jobs
              <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          {isLoadingFeatured ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-job-blue mx-auto"></div>
            </div>
          ) : featuredJobsData?.data ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredJobsData.data.map((job) => (
                <JobCard key={job.id} job={job} featured={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-xl">
              <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Featured Jobs</h3>
              <p className="text-muted-foreground">
                Check back later for featured job opportunities.
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Popular Job Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore job opportunities across various industries and find the perfect role for your skills and experience.
            </p>
          </div>
          
          {isLoadingCategories ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-job-blue mx-auto"></div>
            </div>
          ) : categoriesData?.data ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {categoriesData.data.map((category) => (
                <Link 
                  key={category.id} 
                  to={`/jobs?category=${category.id}`}
                  className="glass-card rounded-xl p-6 text-center hover-card"
                >
                  <div className={`h-14 w-14 rounded-full bg-blue-50 text-job-blue flex items-center justify-center mx-auto mb-4`}>
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {category.jobCount} jobs
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-xl">
              <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Categories Available</h3>
              <p className="text-muted-foreground">
                Check back later for job categories.
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* Latest Jobs Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">Latest Jobs</h2>
            <Link to="/jobs" className="text-job-blue hover:text-job-indigo font-medium flex items-center group">
              View All Jobs
              <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          {isLoadingLatest ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-job-blue mx-auto"></div>
            </div>
          ) : latestJobsData?.data ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestJobsData.data.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-xl">
              <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Latest Jobs</h3>
              <p className="text-muted-foreground">
                Check back later for new job opportunities.
              </p>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-job-blue to-job-indigo text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Are You an Employer Looking for Talent?
            </h2>
            <p className="text-white/90 mb-8 text-lg">
              Post your job openings on HarpalJob and connect with thousands of qualified candidates. Get started today!
            </p>
            <Link 
              to="/post-job" 
              className="inline-flex items-center px-6 py-3 rounded-full bg-white text-job-blue font-medium hover:bg-gray-100 transition-colors shadow-md"
            >
              Post a Job
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
