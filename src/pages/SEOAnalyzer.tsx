import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  analyzeKeywordDensity, 
  analyzeHeadingStructure, 
  isSEOFriendlyURL, 
  calculateSEOScore 
} from "@/utils/seo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Check, 
  X, 
  AlertTriangle, 
  Link as LinkIcon, 
  Search, 
  Globe, 
  Type, 
  Gauge, 
  Microscope,
  ScrollText,
  Brain
} from "lucide-react";

const SEOAnalyzer: React.FC = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [keyword, setKeyword] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [urlAnalysis, setUrlAnalysis] = useState<any>(null);
  const [keywordAnalysis, setKeywordAnalysis] = useState<any>(null);
  const [headingAnalysis, setHeadingAnalysis] = useState<any>(null);
  const [seoScore, setSeoScore] = useState<any>(null);
  
  const handleAnalyzeKeyword = () => {
    if (!content || !keyword) {
      toast({
        title: "Missing Information",
        description: "Please provide both content and keyword for analysis",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      const analysis = analyzeKeywordDensity(content, keyword);
      setKeywordAnalysis(analysis);
      
      toast({
        title: "Analysis Complete",
        description: `Keyword density analysis for "${keyword}" is complete.`,
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "An error occurred during keyword analysis",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleAnalyzeURL = () => {
    if (!url) {
      toast({
        title: "Missing Information",
        description: "Please provide a URL for analysis",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      const analysis = isSEOFriendlyURL(url);
      setUrlAnalysis(analysis);
      
      toast({
        title: "Analysis Complete",
        description: "URL analysis is complete.",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "An error occurred during URL analysis",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleAnalyzeHeadings = () => {
    if (!htmlContent) {
      toast({
        title: "Missing Information",
        description: "Please provide HTML content for heading analysis",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      const analysis = analyzeHeadingStructure(htmlContent);
      setHeadingAnalysis(analysis);
      
      toast({
        title: "Analysis Complete",
        description: "Heading structure analysis is complete.",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "An error occurred during heading analysis",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleFullAnalysis = () => {
    if (!url || !content || !keyword) {
      toast({
        title: "Missing Information",
        description: "Please provide URL, content, and keyword for full analysis",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      // Run all analyses
      const keywordDensityResult = analyzeKeywordDensity(content, keyword);
      setKeywordAnalysis(keywordDensityResult);
      
      const urlResult = isSEOFriendlyURL(url);
      setUrlAnalysis(urlResult);
      
      if (htmlContent) {
        const headingResult = analyzeHeadingStructure(htmlContent);
        setHeadingAnalysis(headingResult);
      }
      
      // Calculate overall SEO score with the correct parameters
      const score = calculateSEOScore({
        titleScore: content.includes("<title>") ? 80 : 0,
        metaDescriptionScore: content.includes('name="description"') ? 85 : 0,
        headingsScore: content.includes("<h1") ? 90 : 0,
        contentScore: keywordDensityResult.density > 0.5 && keywordDensityResult.density < 3 ? 85 : 50,
        linksScore: 70,
        imageAltScore: content.includes('alt="') ? 90 : 40, 
        urlScore: urlResult.isSEOFriendly ? 100 : 50,
        mobileScore: 85,
        speedScore: 75,
        schemaScore: content.includes('application/ld+json') ? 100 : 0
      });
      
      setSeoScore(score);
      
      toast({
        title: "Analysis Complete",
        description: "Full SEO analysis is complete.",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "An error occurred during full analysis",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  return (
    <>
      <Helmet>
        <title>SEO Analyzer | HarpalJobs</title>
        <meta name="description" content="Analyze your website's SEO factors including keywords, URLs, and heading structure." />
      </Helmet>
      
      <div className="flex min-h-screen flex-col">
        <Navbar />
        
        <main className="flex-1 py-16 bg-gradient-to-b from-white to-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl font-bold mb-3 text-job-blue">SEO Analyzer</h1>
              <div className="h-1 w-20 bg-job-blue mx-auto mb-6 rounded-full"></div>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                Analyze your website's SEO factors to improve search engine rankings and drive more organic traffic.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <Card className="border-t-4 border-t-job-blue shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-gradient-to-r from-slate-50 to-white pb-4">
                    <div className="flex items-center mb-2">
                      <Brain className="h-5 w-5 text-job-blue mr-2" />
                      <CardTitle>Analysis Tools</CardTitle>
                    </div>
                    <CardDescription>Enter information to analyze</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                    <div className="space-y-2">
                      <label htmlFor="url" className="text-sm font-medium flex items-center">
                        <Globe className="h-4 w-4 text-job-blue mr-2" /> 
                        URL to Analyze
                      </label>
                      <div className="flex space-x-2">
                        <Input 
                          id="url" 
                          value={url} 
                          onChange={(e) => setUrl(e.target.value)} 
                          placeholder="https://example.com/page"
                          className="focus-visible:ring-job-blue"
                        />
                        <Button 
                          size="icon" 
                          onClick={handleAnalyzeURL} 
                          disabled={isAnalyzing}
                          className="bg-job-blue hover:bg-job-indigo text-white"
                        >
                          <LinkIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="keyword" className="text-sm font-medium flex items-center">
                        <Search className="h-4 w-4 text-job-blue mr-2" />
                        Primary Keyword
                      </label>
                      <Input 
                        id="keyword" 
                        value={keyword} 
                        onChange={(e) => setKeyword(e.target.value)} 
                        placeholder="Enter target keyword"
                        className="focus-visible:ring-job-blue"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="content" className="text-sm font-medium flex items-center">
                        <ScrollText className="h-4 w-4 text-job-blue mr-2" />
                        Page Content
                      </label>
                      <Textarea 
                        id="content" 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        placeholder="Paste page content here"
                        rows={4}
                        className="focus-visible:ring-job-blue"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="html" className="text-sm font-medium flex items-center">
                        <Type className="h-4 w-4 text-job-blue mr-2" />
                        HTML Structure (optional)
                      </label>
                      <Textarea 
                        id="html" 
                        value={htmlContent} 
                        onChange={(e) => setHtmlContent(e.target.value)} 
                        placeholder="Paste HTML content for heading analysis"
                        rows={4}
                        className="focus-visible:ring-job-blue"
                      />
                    </div>
                    
                    <div className="pt-4 space-y-3">
                      <Button 
                        onClick={handleFullAnalysis} 
                        disabled={isAnalyzing} 
                        className="w-full bg-job-blue hover:bg-job-indigo text-white"
                      >
                        {isAnalyzing ? "Analyzing..." : "Run Full Analysis"}
                      </Button>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={handleAnalyzeKeyword} 
                          disabled={isAnalyzing}
                          className="w-full border-job-blue text-job-blue hover:bg-job-blue/10"
                        >
                          <Search className="mr-2 h-4 w-4" />
                          Keyword Only
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={handleAnalyzeHeadings} 
                          disabled={isAnalyzing}
                          className="w-full border-job-blue text-job-blue hover:bg-job-blue/10"
                        >
                          <Type className="mr-2 h-4 w-4" />
                          Headings Only
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6 bg-gradient-to-br from-blue-50 to-white shadow-md">
                  <CardHeader>
                    <CardTitle className="text-base text-job-blue">SEO Analysis Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-slate-600 space-y-3">
                    <div className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <p>Include your keyword in title, description and headings</p>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <p>Aim for keyword density between 0.5% and 3%</p>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <p>Use concise, descriptive URLs with keywords</p>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <p>Proper heading structure (H1 → H2 → H3)</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:col-span-2">
                <Card className="shadow-md hover:shadow-lg transition-shadow h-full border-t-4 border-t-job-blue">
                  <CardHeader className="bg-gradient-to-r from-slate-50 to-white">
                    <div className="flex items-center mb-2">
                      <Gauge className="h-5 w-5 text-job-blue mr-2" />
                      <CardTitle>Analysis Results</CardTitle>
                    </div>
                    <CardDescription>SEO analysis details and recommendations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isAnalyzing ? (
                      <div className="py-12 text-center">
                        <div className="animate-pulse mb-6">
                          <Microscope className="h-16 w-16 text-job-blue/40 mx-auto" />
                        </div>
                        <p className="mb-4 text-slate-500">Analyzing your content...</p>
                        <Progress value={45} className="w-full max-w-md mx-auto h-2 bg-slate-200" />
                      </div>
                    ) : seoScore ? (
                      <Tabs defaultValue="overview" className="mt-2">
                        <TabsList className="grid grid-cols-4 mb-6 bg-slate-100">
                          <TabsTrigger 
                            value="overview"
                            className="data-[state=active]:bg-job-blue data-[state=active]:text-white"
                          >
                            <Gauge className="mr-2 h-4 w-4" />
                            Overview
                          </TabsTrigger>
                          <TabsTrigger 
                            value="keyword"
                            className="data-[state=active]:bg-job-blue data-[state=active]:text-white"
                          >
                            <Search className="mr-2 h-4 w-4" />
                            Keyword
                          </TabsTrigger>
                          <TabsTrigger 
                            value="url"
                            className="data-[state=active]:bg-job-blue data-[state=active]:text-white"
                          >
                            <LinkIcon className="mr-2 h-4 w-4" />
                            URL
                          </TabsTrigger>
                          <TabsTrigger 
                            value="structure"
                            className="data-[state=active]:bg-job-blue data-[state=active]:text-white"
                          >
                            <Type className="mr-2 h-4 w-4" />
                            Structure
                          </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="overview" className="space-y-4 mt-4">
                          <div className="flex flex-col items-center justify-center py-6">
                            <div className="relative">
                              <div 
                                className={`h-36 w-36 rounded-full flex items-center justify-center border-8 ${
                                  seoScore.score >= 80 ? 'border-green-500' : 
                                  seoScore.score >= 60 ? 'border-yellow-500' : 
                                  'border-red-500'
                                }`}
                              >
                                <span className="text-4xl font-bold">{seoScore.score}</span>
                              </div>
                              <span 
                                className={`text-sm font-semibold absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full ${
                                  seoScore.rating === 'Excellent' ? 'bg-green-100 text-green-800' : 
                                  seoScore.rating === 'Good' ? 'bg-blue-100 text-blue-800' : 
                                  seoScore.rating === 'Average' ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-red-100 text-red-800'
                                }`}
                              >
                                {seoScore.rating}
                              </span>
                            </div>
                            
                            <p className="mt-8 text-sm text-slate-600">
                              Your SEO score is {seoScore.score} out of {seoScore.maxScore} points.
                            </p>
                          </div>
                          
                          <div className="bg-slate-50 rounded-lg p-6 shadow-inner">
                            <h3 className="font-medium mb-4 flex items-center text-job-blue">
                              <AlertTriangle className="h-5 w-5 mr-2" />
                              Improvement Suggestions
                            </h3>
                            {seoScore.suggestions.length > 0 ? (
                              <ul className="space-y-3">
                                {seoScore.suggestions.map((suggestion: string, index: number) => (
                                  <li key={index} className="flex items-start bg-white p-3 rounded-lg shadow-sm">
                                    <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                                    <span className="text-sm">{suggestion}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                                <div className="flex">
                                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                                  <p className="text-sm text-green-800">
                                    Great job! No major SEO issues were found.
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="keyword" className="space-y-4 mt-4">
                          {keywordAnalysis && (
                            <>
                              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                  <p className="text-sm text-gray-500">Target Keyword</p>
                                  <p className="font-medium">{keyword}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Density</p>
                                  <p className="font-medium">{keywordAnalysis.density.toFixed(2)}%</p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Occurrences</p>
                                  <p className="font-medium">{keywordAnalysis.count}</p>
                                </div>
                              </div>
                              
                              <div className="p-4">
                                <h3 className="font-medium mb-2">Keyword Analysis</h3>
                                {keywordAnalysis.density < 0.5 && (
                                  <Alert variant="destructive" className="mb-4">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertTitle>Density Too Low</AlertTitle>
                                    <AlertDescription>
                                      Your keyword density is below 0.5%, which might be too low for optimal SEO. Consider increasing the keyword usage.
                                    </AlertDescription>
                                  </Alert>
                                )}
                                
                                {keywordAnalysis.density > 3 && (
                                  <Alert variant="destructive" className="mb-4">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertTitle>Potential Keyword Stuffing</AlertTitle>
                                    <AlertDescription>
                                      Your keyword density is above 3%, which might be considered keyword stuffing. Consider reducing keyword usage.
                                    </AlertDescription>
                                  </Alert>
                                )}
                                
                                {keywordAnalysis.density >= 0.5 && keywordAnalysis.density <= 3 && (
                                  <Alert className="mb-4">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <AlertTitle>Optimal Keyword Density</AlertTitle>
                                    <AlertDescription>
                                      Your keyword density is within the recommended range of 0.5% to 3%.
                                    </AlertDescription>
                                  </Alert>
                                )}
                              </div>
                            </>
                          )}
                        </TabsContent>
                        
                        <TabsContent value="url" className="space-y-4 mt-4">
                          {urlAnalysis && (
                            <>
                              <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-500">Analyzed URL</p>
                                <p className="font-medium break-all">{url}</p>
                              </div>
                              
                              <div className="p-4">
                                <div className="flex items-center mb-4">
                                  <div className={`h-8 w-8 flex items-center justify-center rounded-full mr-3 ${urlAnalysis.isSEOFriendly ? 'bg-green-100' : 'bg-yellow-100'}`}>
                                    {urlAnalysis.isSEOFriendly ? (
                                      <Check className="h-5 w-5 text-green-600" />
                                    ) : (
                                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                                    )}
                                  </div>
                                  <div>
                                    <h3 className="font-medium">
                                      {urlAnalysis.isSEOFriendly ? "SEO-Friendly URL" : "URL Needs Improvement"}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                      {urlAnalysis.suggestions}
                                    </p>
                                  </div>
                                </div>
                                
                                {urlAnalysis.issues.length > 0 && (
                                  <div className="mt-4">
                                    <h4 className="text-sm font-medium mb-2">Issues Found:</h4>
                                    <ul className="space-y-2">
                                      {urlAnalysis.issues.map((issue: string, index: number) => (
                                        <li key={index} className="flex items-start">
                                          <X className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                                          <span className="text-sm">{issue}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </TabsContent>
                        
                        <TabsContent value="structure" className="space-y-4 mt-4">
                          {headingAnalysis ? (
                            <>
                              <div className="grid grid-cols-3 gap-4 mb-4">
                                <div className="bg-gray-50 p-4 rounded-lg text-center">
                                  <p className="text-sm text-gray-500">H1 Tags</p>
                                  <p className="text-xl font-semibold">{headingAnalysis.headingCount.h1}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg text-center">
                                  <p className="text-sm text-gray-500">H2 Tags</p>
                                  <p className="text-xl font-semibold">{headingAnalysis.headingCount.h2}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg text-center">
                                  <p className="text-sm text-gray-500">H3 Tags</p>
                                  <p className="text-xl font-semibold">{headingAnalysis.headingCount.h3}</p>
                                </div>
                              </div>
                              
                              <div className="p-4">
                                <div className="flex items-center mb-4">
                                  <div className={`h-8 w-8 flex items-center justify-center rounded-full mr-3 ${headingAnalysis.isWellStructured ? 'bg-green-100' : 'bg-yellow-100'}`}>
                                    {headingAnalysis.isWellStructured ? (
                                      <Check className="h-5 w-5 text-green-600" />
                                    ) : (
                                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                                    )}
                                  </div>
                                  <div>
                                    <h3 className="font-medium">
                                      {headingAnalysis.isWellStructured ? "Well-Structured Headings" : "Heading Structure Needs Improvement"}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                      {headingAnalysis.suggestions}
                                    </p>
                                  </div>
                                </div>
                                
                                {headingAnalysis.issues.length > 0 && (
                                  <div className="mt-4">
                                    <h4 className="text-sm font-medium mb-2">Issues Found:</h4>
                                    <ul className="space-y-2">
                                      {headingAnalysis.issues.map((issue: string, index: number) => (
                                        <li key={index} className="flex items-start">
                                          <X className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                                          <span className="text-sm">{issue}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </>
                          ) : (
                            <div className="text-center py-8">
                              <Globe className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                              <p className="text-sm text-gray-500">
                                No heading structure analysis available. Please provide HTML content and run the analysis.
                              </p>
                            </div>
                          )}
                        </TabsContent>
                      </Tabs>
                    ) : (
                      <div className="py-16 text-center">
                        <div className="bg-blue-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Microscope className="h-12 w-12 text-job-blue mx-auto" />
                        </div>
                        <h3 className="text-xl font-medium mb-3 text-job-blue">Ready to Analyze</h3>
                        <p className="text-sm text-slate-600 max-w-md mx-auto">
                          Enter your page URL, content, and target keyword, then run the analysis 
                          to get detailed SEO insights and recommendations.
                        </p>
                        <div className="mt-8">
                          <Button 
                            variant="outline" 
                            onClick={() => {
                              setUrl("https://example.com/my-page");
                              setKeyword("digital marketing");
                              setContent("This is a sample page about digital marketing strategies...");
                              toast({
                                title: "Example data added",
                                description: "Sample data has been added to the fields",
                              });
                            }}
                            className="border-job-blue text-job-blue hover:bg-job-blue/10"
                          >
                            Use Example Data
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default SEOAnalyzer;
