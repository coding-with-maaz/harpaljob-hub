
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { analyzeKeywordDensity } from "@/services/seoService";
import { KeywordAnalysis } from "@/lib/types";
import { Loader2 } from "lucide-react";

const SEOKeywordAnalyzer = () => {
  const { toast } = useToast();
  const [keywordToAnalyze, setKeywordToAnalyze] = useState("");
  const [contentToAnalyze, setContentToAnalyze] = useState("");
  const [keywordAnalysis, setKeywordAnalysis] = useState<KeywordAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyzeKeyword = async () => {
    if (!keywordToAnalyze || !contentToAnalyze) {
      toast({
        title: "Error",
        description: "Please provide both a keyword and content to analyze.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsAnalyzing(true);
      const analysis = await analyzeKeywordDensity(contentToAnalyze, keywordToAnalyze);
      setKeywordAnalysis(analysis);
      
      toast({
        title: "Keyword Analysis Complete",
        description: `Keyword "${keywordToAnalyze}" appears ${analysis.count} times (${analysis.density.toFixed(2)}%).`,
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "An error occurred while analyzing the keyword density.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO Analysis Tools</CardTitle>
        <CardDescription>
          Analyze and optimize your content for search engines
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-base font-medium">Keyword Density Analyzer</h3>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow">
                  <label className="text-sm font-medium">Keyword to Analyze</label>
                  <Input 
                    value={keywordToAnalyze} 
                    onChange={(e) => setKeywordToAnalyze(e.target.value)}
                    placeholder="Enter a keyword"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">&nbsp;</label>
                  <Button 
                    onClick={handleAnalyzeKeyword} 
                    className="w-full mt-1"
                    disabled={isAnalyzing || !keywordToAnalyze || !contentToAnalyze}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      'Analyze'
                    )}
                  </Button>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Content to Analyze</label>
                <Textarea 
                  value={contentToAnalyze} 
                  onChange={(e) => setContentToAnalyze(e.target.value)}
                  placeholder="Paste your content here to analyze keyword density"
                  rows={5}
                  className="mt-1"
                />
              </div>
              
              {keywordAnalysis && (
                <div className="p-4 bg-muted rounded-md">
                  <h4 className="font-medium mb-2">Analysis Results:</h4>
                  <p>Keyword: <span className="font-medium">{keywordAnalysis.keyword}</span></p>
                  <p>Occurrences: <span className="font-medium">{keywordAnalysis.count}</span></p>
                  <p>
                    Density: <span className="font-medium">{keywordAnalysis.density.toFixed(2)}%</span>
                    {keywordAnalysis.density < 1 && (
                      <span className="text-yellow-600 ml-2">(Consider increasing)</span>
                    )}
                    {keywordAnalysis.density > 4 && (
                      <span className="text-yellow-600 ml-2">(Consider reducing)</span>
                    )}
                    {keywordAnalysis.density >= 1 && keywordAnalysis.density <= 4 && (
                      <span className="text-green-600 ml-2">(Optimal range)</span>
                    )}
                  </p>
                </div>
              )}
              
              {keywordAnalysis && keywordAnalysis.suggestions.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Related Keywords:</h4>
                  <div className="flex flex-wrap gap-2">
                    {keywordAnalysis.suggestions.map((keyword, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SEOKeywordAnalyzer;
