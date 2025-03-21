
import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Smartphone, 
  Check, 
  Star, 
  Navigation, 
  Bell, 
  Upload, 
  FileText, 
  RefreshCw,
  ChevronRight,
  Download,
  Zap,
  Users,
  Shield,
  Briefcase
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
          <section className="pt-28 pb-16 bg-gradient-to-br from-job-blue/10 via-indigo-100/20 to-transparent overflow-hidden relative">
            <div className="absolute -right-64 -top-64 w-96 h-96 bg-indigo-200 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute -left-64 top-96 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
            
            <div className="container px-4 mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7">
                  <div className="animate-slide-up">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                      Your Job Search <span className="bg-gradient-to-r from-job-blue to-job-indigo bg-clip-text text-transparent">In Your Pocket</span>
                    </h1>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
                      Download the HarpalJobs mobile app today and take your job search with you wherever you go. 
                      Apply to jobs, track applications, and get notifications all from your mobile device.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button size="lg" className="gap-2 rounded-full px-6 shadow-md transition-transform hover:translate-y-[-2px]">
                        <Download className="h-5 w-5" />
                        Download for iOS
                      </Button>
                      <Button size="lg" variant="outline" className="gap-2 rounded-full px-6 border-2 hover:bg-job-blue/5">
                        <Download className="h-5 w-5" />
                        Download for Android
                      </Button>
                    </div>
                    
                    <div className="flex items-center mt-8 gap-4">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-5 w-5 text-yellow-400" fill="currentColor" />
                        ))}
                      </div>
                      <span className="text-sm font-medium">4.8 Average Rating</span>
                      <Separator orientation="vertical" className="h-4" />
                      <span className="text-sm font-medium">10K+ Downloads</span>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-5 relative flex justify-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-20 transform -rotate-6"></div>
                  
                  <div className="relative transform transition-all duration-500 hover:rotate-[-5deg] hover:translate-y-[-10px]">
                    <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[40px] shadow-xl overflow-hidden h-[600px] w-[300px]">
                      <div className="h-12 bg-slate-900 flex items-center justify-center rounded-t-[40px]">
                        <div className="w-32 h-6 bg-black rounded-full overflow-hidden flex items-center justify-center">
                          <div className="w-16 h-4 bg-slate-800 rounded-full"></div>
                        </div>
                      </div>
                      <div className="p-3 bg-slate-50 flex-1 h-[calc(100%-48px)]">
                        <div className="w-full h-full bg-white rounded-[32px] shadow-inner overflow-hidden relative">
                          <div className="h-14 bg-job-blue flex items-center px-4">
                            <h3 className="text-white font-bold">HarpalJobs</h3>
                          </div>
                          <div className="p-4">
                            <div className="mb-4 bg-slate-100 rounded-xl h-32 flex items-center justify-center animate-pulse">
                              <Briefcase className="h-10 w-10 text-slate-300" />
                            </div>
                            <div className="space-y-2">
                              <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                              <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                              <div className="h-4 bg-slate-100 rounded w-5/6"></div>
                            </div>
                            <div className="mt-6 bg-slate-100 p-3 rounded-xl">
                              <div className="h-4 bg-slate-200 rounded w-1/2 mb-2"></div>
                              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                            </div>
                            <div className="mt-4 bg-slate-100 p-3 rounded-xl">
                              <div className="h-4 bg-slate-200 rounded w-1/3 mb-2"></div>
                              <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4">
                              <Button className="w-full">View Jobs</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* App Highlights */}
          <section className="py-20 bg-white">
            <div className="container px-4 mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Why Choose Our App?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our app is designed to make your job search faster, easier, and more efficient than ever before.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-all">
                  <div className="h-14 w-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                    <Zap className="h-7 w-7 text-job-blue" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
                  <p className="text-muted-foreground">
                    Our optimized app ensures ultra-fast job searching and application processes, saving you valuable time.
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-all">
                  <div className="h-14 w-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6">
                    <Users className="h-7 w-7 text-purple-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">User-Friendly</h3>
                  <p className="text-muted-foreground">
                    Designed with simplicity in mind, our intuitive interface makes job searching accessible for everyone.
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-all">
                  <div className="h-14 w-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6">
                    <Shield className="h-7 w-7 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
                  <p className="text-muted-foreground">
                    Your data is protected with industry-leading security measures to ensure your privacy is never compromised.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Features Section */}
          <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
            <div className="container px-4 mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">Powerful Features at Your Fingertips</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our mobile app comes packed with features designed to make your job search easier and more efficient.
                </p>
              </div>
              
              <Tabs defaultValue="discover" className="w-full">
                <div className="flex justify-center mb-8">
                  <TabsList className="grid w-full max-w-md grid-cols-3">
                    <TabsTrigger value="discover">Discover</TabsTrigger>
                    <TabsTrigger value="apply">Apply</TabsTrigger>
                    <TabsTrigger value="manage">Manage</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="discover" className="animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Discover Perfect Opportunities</h3>
                      <p className="text-muted-foreground mb-6">
                        Find the right job faster with our intelligent job matching system and personalized recommendations.
                      </p>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                            <Navigation className="h-3 w-3 text-job-blue" />
                          </div>
                          <div>
                            <h4 className="font-medium">Personalized Job Feed</h4>
                            <p className="text-sm text-muted-foreground">
                              Get job recommendations tailored to your skills and preferences.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="h-6 w-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                            <Bell className="h-3 w-3 text-job-blue" />
                          </div>
                          <div>
                            <h4 className="font-medium">Instant Notifications</h4>
                            <p className="text-sm text-muted-foreground">
                              Receive alerts when new jobs matching your criteria are posted.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-slate-100 rounded-2xl p-6 flex items-center justify-center">
                      <div className="h-80 w-60 bg-white rounded-xl shadow-md relative">
                        <div className="absolute inset-2 bg-gray-50 rounded-lg p-2">
                          <div className="h-8 bg-job-blue rounded-md mb-3"></div>
                          <div className="space-y-3">
                            <div className="h-20 bg-gray-100 rounded-md"></div>
                            <div className="h-20 bg-gray-100 rounded-md"></div>
                            <div className="h-20 bg-gray-100 rounded-md"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="apply" className="animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Apply With Ease</h3>
                      <p className="text-muted-foreground mb-6">
                        Streamlined application process allows you to apply to jobs quickly and efficiently.
                      </p>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                            <Upload className="h-3 w-3 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">One-Click Apply</h4>
                            <p className="text-sm text-muted-foreground">
                              Apply to jobs instantly with your saved profile information.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                            <FileText className="h-3 w-3 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Resume Management</h4>
                            <p className="text-sm text-muted-foreground">
                              Upload and manage multiple resumes for different positions.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-slate-100 rounded-2xl p-6 flex items-center justify-center">
                      <div className="h-80 w-60 bg-white rounded-xl shadow-md relative">
                        <div className="absolute inset-2 bg-gray-50 rounded-lg p-2">
                          <div className="h-8 bg-green-500 rounded-md mb-3"></div>
                          <div className="bg-gray-100 rounded-md p-3 mb-3">
                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          </div>
                          <div className="h-32 bg-gray-100 rounded-md mb-3"></div>
                          <div className="h-10 bg-green-500 rounded-md"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="manage" className="animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Manage Your Job Search</h3>
                      <p className="text-muted-foreground mb-6">
                        Stay organized and never miss an opportunity with our comprehensive management tools.
                      </p>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <div className="h-6 w-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                            <Star className="h-3 w-3 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Saved Jobs</h4>
                            <p className="text-sm text-muted-foreground">
                              Save jobs you're interested in to review later.
                            </p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="h-6 w-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                            <RefreshCw className="h-3 w-3 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Application Tracking</h4>
                            <p className="text-sm text-muted-foreground">
                              Keep track of all your job applications in one place.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-slate-100 rounded-2xl p-6 flex items-center justify-center">
                      <div className="h-80 w-60 bg-white rounded-xl shadow-md relative">
                        <div className="absolute inset-2 bg-gray-50 rounded-lg p-2">
                          <div className="h-8 bg-purple-500 rounded-md mb-3"></div>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between bg-gray-100 rounded-md p-2">
                              <div className="w-8 h-8 bg-purple-100 rounded-full"></div>
                              <div className="w-20 h-4 bg-gray-200 rounded"></div>
                            </div>
                            <div className="flex items-center justify-between bg-gray-100 rounded-md p-2">
                              <div className="w-8 h-8 bg-purple-100 rounded-full"></div>
                              <div className="w-20 h-4 bg-gray-200 rounded"></div>
                            </div>
                            <div className="flex items-center justify-between bg-gray-100 rounded-md p-2">
                              <div className="w-8 h-8 bg-purple-100 rounded-full"></div>
                              <div className="w-20 h-4 bg-gray-200 rounded"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>
          
          {/* Testimonials Section */}
          <section className="py-20 bg-white">
            <div className="container px-4 mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold mb-4">What Users Are Saying</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Join thousands of satisfied users who have found their dream jobs using our mobile app.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                  <div className="flex items-center mb-6">
                    <div className="mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 text-yellow-400 inline-block" fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">5.0</span>
                  </div>
                  <p className="mb-6 text-slate-600 italic">
                    "The HarpalJobs app made my job search so much easier. I was able to apply to multiple positions while commuting to work, and I got alerts as soon as new jobs were posted."
                  </p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm mr-3">
                      SJ
                    </div>
                    <div>
                      <p className="font-semibold">Sarah J.</p>
                      <p className="text-sm text-muted-foreground">Software Developer</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                  <div className="flex items-center mb-6">
                    <div className="mr-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 text-yellow-400 inline-block" fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">5.0</span>
                  </div>
                  <p className="mb-6 text-slate-600 italic">
                    "I love how easy it is to upload my resume and apply for jobs with just a few taps. The interface is intuitive and the job recommendations are spot on!"
                  </p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-sm mr-3">
                      MT
                    </div>
                    <div>
                      <p className="font-semibold">Michael T.</p>
                      <p className="text-sm text-muted-foreground">Marketing Specialist</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                  <div className="flex items-center mb-6">
                    <div className="mr-2">
                      {[1, 2, 3, 4].map((star) => (
                        <Star key={star} className="h-4 w-4 text-yellow-400 inline-block" fill="currentColor" />
                      ))}
                      <Star className="h-4 w-4 text-yellow-200 inline-block" fill="currentColor" />
                    </div>
                    <span className="text-sm text-muted-foreground">4.0</span>
                  </div>
                  <p className="mb-6 text-slate-600 italic">
                    "The notification feature is a game-changer. I got an alert about a new job posting, applied immediately, and ended up getting the position!"
                  </p>
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm mr-3">
                      RK
                    </div>
                    <div>
                      <p className="font-semibold">Rachel K.</p>
                      <p className="text-sm text-muted-foreground">UX Designer</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          {/* Download CTA Section */}
          <section className="py-20">
            <div className="container px-4 mx-auto">
              <div className="bg-gradient-to-r from-job-blue to-job-indigo rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
                <div className="absolute -right-24 -bottom-24 w-64 h-64 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute -left-24 -top-24 w-64 h-64 bg-white/10 rounded-full blur-xl"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take Your Job Search Mobile?</h2>
                    <p className="mb-8 text-white/90 text-lg">
                      Download the HarpalJobs app today and discover a smarter way to find your dream job.
                    </p>
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-center">
                        <div className="h-6 w-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                          <Check className="h-3 w-3" />
                        </div>
                        <span>Free to download and use</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-6 w-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                          <Check className="h-3 w-3" />
                        </div>
                        <span>Available for iOS and Android</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-6 w-6 bg-white/20 rounded-full flex items-center justify-center mr-3">
                          <Check className="h-3 w-3" />
                        </div>
                        <span>Regular updates with new features</span>
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-4">
                      <Button size="lg" variant="secondary" className="gap-2 rounded-full px-6 shadow-md transition-transform hover:translate-y-[-2px]">
                        <Download className="h-5 w-5" />
                        Download for iOS
                      </Button>
                      <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20 gap-2 rounded-full px-6">
                        <Download className="h-5 w-5" />
                        Download for Android
                      </Button>
                    </div>
                  </div>
                  <div className="hidden md:flex justify-center">
                    <div className="w-80 h-80 relative">
                      <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl"></div>
                      <div className="relative flex items-center justify-center h-full">
                        <div className="w-48 h-48 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 animate-pulse">
                          <Smartphone className="h-24 w-24" />
                        </div>
                      </div>
                    </div>
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

export default MobileApp;
