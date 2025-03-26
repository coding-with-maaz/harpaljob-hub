
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./lib/store/store";
import Index from "./pages/Index";
import Jobs from "./pages/Jobs";
import JobCategories from "./pages/JobCategories";
import CategoryResults from "./pages/CategoryResults";
import JobDetail from "./pages/JobDetail";
import SavedJobs from "./pages/SavedJobs";
import Dashboard from "./pages/Dashboard";
import UserDashboard from "./pages/UserDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import MobileApp from "./pages/MobileApp";
import AdDemo from "./pages/AdDemo";
import NotFound from "./pages/NotFound";
import SEOAnalyzer from "./pages/SEOAnalyzer";
import SitemapPage from "./pages/SitemapPage";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/job-categories" element={<JobCategories />} />
              <Route path="/category/:categoryId" element={<CategoryResults />} />
              <Route path="/job/:id" element={<JobDetail />} />
              <Route path="/saved-jobs" element={<SavedJobs />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/employer-dashboard" element={<EmployerDashboard />} />
              <Route path="/mobile-app" element={<MobileApp />} />
              <Route path="/ad-demo" element={<AdDemo />} />
              <Route path="/seo-analyzer" element={<SEOAnalyzer />} />
              <Route path="/sitemap.xml" element={<SitemapPage />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
