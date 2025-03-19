
import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <Briefcase className="h-7 w-7 text-job-blue" />
              <span className="text-xl font-display font-semibold">HarpalJob</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6">
              Connecting top talent with innovative companies. Find your dream job or the perfect candidate with HarpalJob.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-job-blue transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-job-blue transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-job-blue transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-job-blue transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-6">For Job Seekers</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/jobs" className="text-muted-foreground hover:text-job-blue transition-colors text-sm">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/companies" className="text-muted-foreground hover:text-job-blue transition-colors text-sm">
                  Browse Companies
                </Link>
              </li>
              <li>
                <Link to="/saved-jobs" className="text-muted-foreground hover:text-job-blue transition-colors text-sm">
                  Saved Jobs
                </Link>
              </li>
              <li>
                <Link to="/job-alerts" className="text-muted-foreground hover:text-job-blue transition-colors text-sm">
                  Job Alerts
                </Link>
              </li>
              <li>
                <Link to="/career-advice" className="text-muted-foreground hover:text-job-blue transition-colors text-sm">
                  Career Advice
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-6">For Employers</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/post-job" className="text-muted-foreground hover:text-job-blue transition-colors text-sm">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-muted-foreground hover:text-job-blue transition-colors text-sm">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-muted-foreground hover:text-job-blue transition-colors text-sm">
                  Employer Resources
                </Link>
              </li>
              <li>
                <Link to="/recruitment" className="text-muted-foreground hover:text-job-blue transition-colors text-sm">
                  Recruitment Solutions
                </Link>
              </li>
              <li>
                <Link to="/advertising" className="text-muted-foreground hover:text-job-blue transition-colors text-sm">
                  Advertising Options
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className="h-5 w-5 text-job-blue mr-3 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  123 Job Street, Employment City, Work State 12345
                </span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 text-job-blue mr-3 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  (123) 456-7890
                </span>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 text-job-blue mr-3 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  contact@harpaljob.com
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} HarpalJob. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/about" className="text-sm text-muted-foreground hover:text-job-blue transition-colors">
              About
            </Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-job-blue transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-job-blue transition-colors">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="text-sm text-muted-foreground hover:text-job-blue transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
