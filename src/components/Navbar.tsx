
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const closeMenu = () => setIsOpen(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "py-3 bg-white/80 backdrop-blur-md shadow-sm" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
          <Briefcase className="h-8 w-8 text-job-blue" />
          <span className="text-xl font-display font-semibold">HarpalJob</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-job-blue",
              isActive('/') ? "text-job-blue" : "text-foreground"
            )}
          >
            Home
          </Link>
          <Link 
            to="/jobs" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-job-blue",
              isActive('/jobs') ? "text-job-blue" : "text-foreground"
            )}
          >
            Find Jobs
          </Link>
          <div className="relative group">
            <button className="flex items-center text-sm font-medium text-foreground transition-colors hover:text-job-blue">
              Categories
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div className="absolute left-0 mt-2 w-48 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform scale-95 group-hover:scale-100">
              <div className="py-1 divide-y divide-border">
                <Link to="/jobs?category=Technology" className="block px-4 py-2 text-sm hover:bg-secondary">Technology</Link>
                <Link to="/jobs?category=Design" className="block px-4 py-2 text-sm hover:bg-secondary">Design</Link>
                <Link to="/jobs?category=Marketing" className="block px-4 py-2 text-sm hover:bg-secondary">Marketing</Link>
                <Link to="/jobs?category=Sales" className="block px-4 py-2 text-sm hover:bg-secondary">Sales</Link>
                <Link to="/jobs?category=Finance" className="block px-4 py-2 text-sm hover:bg-secondary">Finance</Link>
              </div>
            </div>
          </div>
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <Link 
            to="/post-job" 
            className="px-4 py-2 text-sm font-medium text-job-blue hover:text-job-indigo transition-colors"
          >
            Post a Job
          </Link>
          <Link 
            to="/sign-in" 
            className="px-4 py-2 rounded-full text-sm font-medium bg-job-blue text-white hover:bg-job-indigo transition-colors shadow-sm"
          >
            Sign In
          </Link>
        </div>
        
        <button 
          className="md:hidden focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "md:hidden fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full px-4 pt-20 pb-6">
          <nav className="flex-1 space-y-6">
            <Link 
              to="/" 
              className="block text-lg font-medium hover:text-job-blue"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              to="/jobs" 
              className="block text-lg font-medium hover:text-job-blue"
              onClick={closeMenu}
            >
              Find Jobs
            </Link>
            <div className="space-y-4">
              <p className="text-lg font-medium">Categories</p>
              <div className="ml-4 space-y-3">
                <Link 
                  to="/jobs?category=Technology" 
                  className="block text-base hover:text-job-blue"
                  onClick={closeMenu}
                >
                  Technology
                </Link>
                <Link 
                  to="/jobs?category=Design" 
                  className="block text-base hover:text-job-blue"
                  onClick={closeMenu}
                >
                  Design
                </Link>
                <Link 
                  to="/jobs?category=Marketing" 
                  className="block text-base hover:text-job-blue"
                  onClick={closeMenu}
                >
                  Marketing
                </Link>
                <Link 
                  to="/jobs?category=Sales" 
                  className="block text-base hover:text-job-blue"
                  onClick={closeMenu}
                >
                  Sales
                </Link>
                <Link 
                  to="/jobs?category=Finance" 
                  className="block text-base hover:text-job-blue"
                  onClick={closeMenu}
                >
                  Finance
                </Link>
              </div>
            </div>
          </nav>
          
          <div className="mt-6 space-y-4">
            <Link 
              to="/post-job" 
              className="block w-full py-3 text-center text-job-blue font-medium border border-job-blue rounded-lg hover:bg-job-blue hover:text-white transition-colors"
              onClick={closeMenu}
            >
              Post a Job
            </Link>
            <Link 
              to="/sign-in" 
              className="block w-full py-3 text-center text-white font-medium bg-job-blue rounded-lg hover:bg-job-indigo transition-colors"
              onClick={closeMenu}
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
