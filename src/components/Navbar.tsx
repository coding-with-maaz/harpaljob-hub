
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Briefcase, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const closeMenu = () => setIsOpen(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  // Add a function to check if a path is included in the current path
  const isPartOfPath = (path: string) => {
    return location.pathname.includes(path);
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
              isActive('/jobs') || isPartOfPath('/job/') ? "text-job-blue" : "text-foreground"
            )}
          >
            Find Jobs
          </Link>
          
          <Link 
            to="/job-categories" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-job-blue",
              isActive('/job-categories') || isPartOfPath('/category/') ? "text-job-blue" : "text-foreground"
            )}
          >
            Job Categories
          </Link>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium transition-colors hover:text-job-blue">
                  Resources
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-1 p-2">
                    <li>
                      <Link 
                        to="/saved-jobs" 
                        className="block select-none rounded-md p-2 text-sm outline-none hover:bg-secondary"
                        onClick={closeMenu}
                      >
                        Saved Jobs
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/mobile-app" 
                        className="block select-none rounded-md p-2 text-sm outline-none hover:bg-secondary"
                        onClick={closeMenu}
                      >
                        Mobile App
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/seo-analyzer" 
                        className="block select-none rounded-md p-2 text-sm outline-none hover:bg-secondary"
                        onClick={closeMenu}
                      >
                        SEO Analyzer
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium transition-colors hover:text-job-blue">
                  <Smartphone className="mr-1 h-4 w-4" />
                  Mobile App
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[300px] p-4">
                    <div className="text-sm font-medium mb-2">Get the HarpalJobs App</div>
                    <p className="text-xs text-muted-foreground mb-4">
                      Download our mobile app for iOS and Android to search and apply for jobs on the go.
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" className="w-full justify-center">
                        App Store
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-center">
                        Google Play
                      </Button>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="text-xs text-muted-foreground mb-2">Scan QR code to download</div>
                      <div className="h-24 w-24 mx-auto bg-muted flex items-center justify-center rounded-md">
                        <span className="text-xs">QR Code</span>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
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
            <Link 
              to="/job-categories" 
              className="block text-lg font-medium hover:text-job-blue"
              onClick={closeMenu}
            >
              Job Categories
            </Link>
            <div className="space-y-4">
              <p className="text-lg font-medium">Popular Categories</p>
              <div className="ml-4 space-y-3">
                <Link 
                  to="/category/technology" 
                  className="block text-base hover:text-job-blue"
                  onClick={closeMenu}
                >
                  Technology
                </Link>
                <Link 
                  to="/category/design" 
                  className="block text-base hover:text-job-blue"
                  onClick={closeMenu}
                >
                  Design
                </Link>
                <Link 
                  to="/category/marketing" 
                  className="block text-base hover:text-job-blue"
                  onClick={closeMenu}
                >
                  Marketing
                </Link>
                <Link 
                  to="/category/business" 
                  className="block text-base hover:text-job-blue"
                  onClick={closeMenu}
                >
                  Business
                </Link>
                <Link 
                  to="/category/healthcare" 
                  className="block text-base hover:text-job-blue"
                  onClick={closeMenu}
                >
                  Healthcare
                </Link>
              </div>
            </div>
            
            <div className="space-y-4">
              <p className="text-lg font-medium flex items-center">
                <Smartphone className="mr-2 h-5 w-5" />
                Mobile App
              </p>
              <div className="ml-4 space-y-3">
                <a 
                  href="#" 
                  className="block text-base hover:text-job-blue"
                  onClick={(e) => { e.preventDefault(); closeMenu(); }}
                >
                  Download for iOS
                </a>
                <a 
                  href="#" 
                  className="block text-base hover:text-job-blue"
                  onClick={(e) => { e.preventDefault(); closeMenu(); }}
                >
                  Download for Android
                </a>
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
