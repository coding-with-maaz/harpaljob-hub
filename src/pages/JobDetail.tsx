
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";

// Temporary placeholders for missing components - these should be created properly
const JobDetailHeader = ({ job }: { job: any }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <div className="flex items-center gap-4 mb-4">
      {job.logo && <img src={job.logo} alt={job.company} className="w-16 h-16 object-contain rounded" />}
      <div>
        <h1 className="text-2xl font-bold">{job.title}</h1>
        <p className="text-gray-600">{job.company} - {job.location}</p>
      </div>
    </div>
    <div className="flex flex-wrap gap-2 mt-4">
      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{job.type}</span>
      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">{job.salary}</span>
      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
        {typeof job.category === 'string' ? job.category : job.category.name}
      </span>
    </div>
  </div>
);

const JobDescription = ({ description }: { description: string }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
    <h2 className="text-xl font-semibold mb-4">Job Description</h2>
    <div className="prose max-w-none">
      <p>{description}</p>
    </div>
  </div>
);

const JobRequirements = ({ requirements }: { requirements: string[] }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
    <h2 className="text-xl font-semibold mb-4">Requirements</h2>
    <ul className="list-disc pl-5 space-y-2">
      {requirements.map((req, index) => (
        <li key={index}>{req}</li>
      ))}
    </ul>
  </div>
);

const JobBenefits = ({ benefits }: { benefits: string[] }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
    <h2 className="text-xl font-semibold mb-4">Benefits</h2>
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
          {benefit}
        </li>
      ))}
    </ul>
  </div>
);

const JobApplication = ({ job }: { job: any }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
    <h2 className="text-xl font-semibold mb-4">Apply for this job</h2>
    <Button className="w-full">Apply Now</Button>
    <div className="mt-4 text-sm text-gray-500">
      <p>Application deadline: {new Date(job.deadline).toLocaleDateString()}</p>
      <p className="mt-2">Applications: {job.applications || 0}</p>
      <p>Views: {job.views || 0}</p>
    </div>
  </div>
);

const RelatedJobs = ({ category, currentJobId }: { category: string, currentJobId: string }) => (
  <div className="mt-8">
    <h2 className="text-xl font-semibold mb-4">Similar Jobs</h2>
    <p>Related jobs in {category} will appear here.</p>
  </div>
);

// TEMPORARY REDUCER FUNCTION - Replace with actual Redux implementation
const fetchJob = (slug: string) => {
  return {
    type: 'FETCH_JOB',
    payload: slug
  };
};

const JobDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Mock data for development - replace with actual Redux implementation
  const mockJob = {
    id: "1",
    title: "Software Engineer",
    description: "Join our team as a Software Engineer to build amazing products...",
    company: "Tech Company",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    salaryMin: 120000,
    salaryMax: 150000,
    logo: "https://via.placeholder.com/150",
    postedDate: "2023-06-15",
    categoryId: "technology",
    employerId: "emp123",
    requirements: ["5+ years experience with React", "Strong JavaScript skills", "Computer Science degree"],
    benefits: ["Health insurance", "401k matching", "Flexible work hours", "Remote work option"],
    status: "active" as const,
    isFeatured: true,
    isRemote: true,
    experience: "Mid-Senior level",
    education: "Bachelor's degree",
    skills: ["React", "TypeScript", "Node.js"],
    applicationsCount: 12,
    viewsCount: 250,
    createdAt: "2023-06-15",
    updatedAt: "2023-06-16",
    deadline: "2023-07-15",
    featured: true,
    views: 250,
    applications: 12,
    slug: "software-engineer-tech-company",
    companyId: "comp123",
    category: "Technology",
    country: "US"
  };
  
  const job = mockJob;
  const loading = false;
  const error = null;
  
  useEffect(() => {
    if (slug) {
      // This should dispatch to Redux in the actual implementation
      dispatch(fetchJob(slug));
    }
  }, [dispatch, slug]);

  if (loading) {
    return <div className="text-center py-12">Loading job details...</div>;
  }

  if (error) {
    return <div className="text-center py-12">Error: {error}</div>;
  }

  if (!job) {
    return <div className="text-center py-12">Job not found.</div>;
  }

  return (
    <>
      <SEOHead
        title={`${job.title} at ${job.company} | HarpalJobs`}
        description={job.description}
        keywords={`${job.title}, ${job.company}, ${job.location}, ${job.category}, ${job.type}`}
        ogImage={job.logo}
        ogUrl={`https://harpaljobs.com/jobs/${job.slug}`}
        structuredData={{
          "@context": "https://schema.org/",
          "@type": "JobPosting",
          "title": job.title,
          "description": job.description,
          "hiringOrganization": {
            "@type": "Organization",
            "name": job.company,
            "logo": job.logo
          },
          "jobLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": job.location,
              "addressCountry": job.country || "US"
            }
          },
          "employmentType": job.type,
          "baseSalary": {
            "@type": "MonetaryAmount",
            "currency": "USD",
            "value": {
              "@type": "QuantitativeValue",
              "minValue": job.salaryMin,
              "maxValue": job.salaryMax,
              "unitText": "YEAR"
            }
          },
          "datePosted": job.postedDate,
          "validThrough": job.deadline
        }}
      />
      
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="flex-grow bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            
            <JobDetailHeader job={job} />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="md:col-span-2">
                <JobDescription description={job.description} />
                
                <JobRequirements requirements={job.requirements} />
                
                <JobBenefits benefits={job.benefits} />
              </div>
              
              <div>
                <JobApplication job={job} />
              </div>
            </div>
            
            <RelatedJobs category={typeof job.category === 'string' ? job.category : job.category.name} currentJobId={job.id} />
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default JobDetail;
