import React from "react";
import { Helmet } from "react-helmet";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { AppDispatch } from '@/lib/store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchJob } from '@/lib/store/jobSlice';
import { Job } from "@/lib/types";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JobDetailHeader from "@/components/JobDetailHeader";
import JobDescription from "@/components/JobDescription";
import JobRequirements from "@/components/JobRequirements";
import JobBenefits from "@/components/JobBenefits";
import JobApplication from "@/components/JobApplication";
import RelatedJobs from "@/components/RelatedJobs";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";

const JobDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const job = useSelector((state: any) => state.job.job) as Job | null;
  const loading = useSelector((state: any) => state.job.loading);
  const error = useSelector((state: any) => state.job.error);

  useEffect(() => {
    if (slug) {
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
