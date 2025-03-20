
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Smartphone, 
  Check, 
  Star, 
  Navigation, 
  Bell, 
  Upload, 
  FileText, 
  RefreshCw 
} from "lucide-react";

const MobileApp = () => {
  return (
    <>
      <Helmet>
        <title>Mobile App | HarpalJobs</title>
        <meta 
          name="description" 
          content="Download the HarpalJobs mobile app for iOS and Android to search and apply for jobs on the go."
        />
      </Helmet>
      
      <div className="flex min-h-screen flex-col">
        <Navbar />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="pt-28 pb-16 bg-gradient-to-b from-job-blue/10 to-transparent">
            <div className="container px-4 mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                    Your Job Search <span className="text-job-blue">In Your Pocket</span>
                  </h1>
                  <p className="text-lg text-muted-foreground mb-8">
                    Download the HarpalJobs mobile app today and take your job search with you wherever you go. 
                    Apply to jobs, track applications, and get notifications all from your mobile device.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="gap-2">
                      <Smartphone className="h-5 w-5" />
                      Download for iOS
                    </Button>
                    <Button size="lg" variant="outline" className="gap-2">
                      <Smartphone className="h-5 w-5" />
                      Download for Android
                    </Button>
                  </div>
                </div>
                <div className="relative mx-auto max-w-xs">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-3xl opacity-30 transform -rotate-6"></div>
                  <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl overflow-hidden h-[600px] w-[300px]">
                    <div className="h-12 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <div className="w-24 h-6 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                    </div>
                    <div className="p-4 bg-white dark:bg-slate-900 flex-1">
                      <div className="w-full h-full bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-center p-8">
                        <p className="text-sm text-muted-foreground">Mobile app screenshot placeholder</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Features Section */}
          <section className="py-16">
            <div className="container px-4 mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Powerful Features at Your Fingertips</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our mobile app comes packed with features designed to make your job search easier and more efficient.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Navigation className="h-6 w-6 text-job-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Personalized Job Feed</h3>
                  <p className="text-muted-foreground">
                    Get job recommendations tailored to your skills, experience, and preferences, updated in real-time.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Bell className="h-6 w-6 text-job-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Instant Notifications</h3>
                  <p className="text-muted-foreground">
                    Receive alerts when new jobs matching your criteria are posted or when employers respond to your applications.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Upload className="h-6 w-6 text-job-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">One-Click Apply</h3>
                  <p className="text-muted-foreground">
                    Apply to jobs instantly with your saved resume and profile information, saving you time and effort.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-job-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Resume Management</h3>
                  <p className="text-muted-foreground">
                    Upload, edit, and manage multiple resumes right from your phone to tailor applications for different positions.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Star className="h-6 w-6 text-job-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Saved Jobs</h3>
                  <p className="text-muted-foreground">
                    Save jobs you're interested in to review later, helping you stay organized during your job search.
                  </p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <RefreshCw className="h-6 w-6 text-job-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Application Tracking</h3>
                  <p className="text-muted-foreground">
                    Keep track of all your job applications in one place, including status updates and employer responses.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Testimonials Section */}
          <section className="py-16 bg-slate-50">
            <div className="container px-4 mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">What Users Are Saying</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Join thousands of satisfied users who have found their dream jobs using our mobile app.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex items-center mb-4">
                    <div className="mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 text-yellow-400 inline-block" fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">5.0</span>
                  </div>
                  <p className="mb-4 italic">
                    "The HarpalJobs app made my job search so much easier. I was able to apply to multiple positions while commuting to work, and I got alerts as soon as new jobs were posted."
                  </p>
                  <div>
                    <p className="font-semibold">Sarah J.</p>
                    <p className="text-sm text-muted-foreground">Software Developer</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex items-center mb-4">
                    <div className="mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 text-yellow-400 inline-block" fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">5.0</span>
                  </div>
                  <p className="mb-4 italic">
                    "I love how easy it is to upload my resume and apply for jobs with just a few taps. The interface is intuitive and the job recommendations are spot on!"
                  </p>
                  <div>
                    <p className="font-semibold">Michael T.</p>
                    <p className="text-sm text-muted-foreground">Marketing Specialist</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                  <div className="flex items-center mb-4">
                    <div className="mr-2">
                      {[1, 2, 3, 4].map((star) => (
                        <Star key={star} className="h-4 w-4 text-yellow-400 inline-block" fill="currentColor" />
                      ))}
                      <Star className="h-4 w-4 text-yellow-200 inline-block" fill="currentColor" />
                    </div>
                    <span className="text-sm text-muted-foreground">4.0</span>
                  </div>
                  <p className="mb-4 italic">
                    "The notification feature is a game-changer. I got an alert about a new job posting, applied immediately, and ended up getting the position!"
                  </p>
                  <div>
                    <p className="font-semibold">Rachel K.</p>
                    <p className="text-sm text-muted-foreground">UX Designer</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Download CTA Section */}
          <section className="py-16">
            <div className="container px-4 mx-auto">
              <div className="bg-gradient-to-r from-job-blue to-blue-600 rounded-2xl p-8 md:p-12 text-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-3xl font-bold mb-4">Ready to Take Your Job Search Mobile?</h2>
                    <p className="mb-6 text-white/90">
                      Download the HarpalJobs app today and discover a smarter way to find your dream job.
                    </p>
                    <ul className="space-y-2 mb-8">
                      <li className="flex items-center">
                        <Check className="h-5 w-5 mr-2" />
                        <span>Free to download and use</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 mr-2" />
                        <span>Available for iOS and Android</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 mr-2" />
                        <span>Regular updates with new features</span>
                      </li>
                    </ul>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button size="lg" variant="secondary" className="gap-2">
                        <Smartphone className="h-5 w-5" />
                        Download for iOS
                      </Button>
                      <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20 gap-2">
                        <Smartphone className="h-5 w-5" />
                        Download for Android
                      </Button>
                    </div>
                  </div>
                  <div className="hidden md:flex justify-center">
                    <div className="w-64 h-64 relative">
                      <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl"></div>
                      <div className="relative flex items-center justify-center h-full">
                        <div className="w-40 h-40 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                          <Smartphone className="h-20 w-20" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* FAQ Section */}
          <section className="py-16 bg-slate-50">
            <div className="container px-4 mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Got questions about our mobile app? Find answers to common questions below.
                </p>
              </div>
              
              <div className="max-w-3xl mx-auto divide-y">
                <div className="py-5">
                  <h3 className="text-xl font-semibold mb-2">Is the mobile app free to use?</h3>
                  <p className="text-muted-foreground">
                    Yes, the HarpalJobs mobile app is completely free to download and use. All features are available to all users without any subscription fees.
                  </p>
                </div>
                
                <div className="py-5">
                  <h3 className="text-xl font-semibold mb-2">Which platforms is the app available on?</h3>
                  <p className="text-muted-foreground">
                    Our app is available for both iOS (iPhone and iPad) and Android devices. You can download it from the App Store or Google Play Store.
                  </p>
                </div>
                
                <div className="py-5">
                  <h3 className="text-xl font-semibold mb-2">Can I use the same account on the app and website?</h3>
                  <p className="text-muted-foreground">
                    Yes, your HarpalJobs account works across both our website and mobile app. Your profile, saved jobs, and applications will sync automatically.
                  </p>
                </div>
                
                <div className="py-5">
                  <h3 className="text-xl font-semibold mb-2">How do I upload my resume on the app?</h3>
                  <p className="text-muted-foreground">
                    You can upload your resume directly from your phone by selecting the file from your device storage, Google Drive, Dropbox, or other cloud storage services.
                  </p>
                </div>
                
                <div className="py-5">
                  <h3 className="text-xl font-semibold mb-2">Will I receive notifications for new job postings?</h3>
                  <p className="text-muted-foreground">
                    Yes, you can set up job alerts based on your preferences, and we'll send you notifications when new matching jobs are posted or when there are updates to your applications.
                  </p>
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

export default MobileApp;
