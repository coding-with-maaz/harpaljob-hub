
import React, { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, MailCheck, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/lib/store/slices/authSlice";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";

enum VerificationStatus {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
  EXPIRED = "expired"
}

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [status, setStatus] = useState<VerificationStatus>(VerificationStatus.LOADING);
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token || !email) {
        setStatus(VerificationStatus.ERROR);
        setMessage("Invalid verification link. Please request a new verification email.");
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/auth/verify-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, email }),
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 410) {
            setStatus(VerificationStatus.EXPIRED);
            setMessage("Verification link has expired. Please request a new verification email.");
          } else {
            setStatus(VerificationStatus.ERROR);
            setMessage(data.message || "Verification failed. Please try again.");
          }
          return;
        }

        // Verification successful
        setStatus(VerificationStatus.SUCCESS);
        setMessage("Your email has been successfully verified!");
        
        // If login token is provided, log the user in
        if (data.data && data.data.token && data.data.user) {
          dispatch(
            setCredentials({
              token: data.data.token,
              user: data.data.user,
            })
          );
          
          // Show success toast
          toast({
            title: "Email verified",
            description: "Your account has been verified successfully.",
          });
          
          // Redirect after a short delay
          setTimeout(() => {
            if (data.data.user.role === "employer") {
              navigate("/employer-dashboard");
            } else {
              navigate("/user-dashboard");
            }
          }, 2000);
        }
      } catch (error) {
        console.error("Email verification error:", error);
        setStatus(VerificationStatus.ERROR);
        setMessage("An error occurred during verification. Please try again later.");
      }
    };

    verifyEmail();
  }, [token, email, navigate, dispatch]);

  const handleResendVerification = async () => {
    if (!email) return;
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/auth/resend-verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: "Failed to resend verification",
          description: data.message || "Please try again later.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Verification email sent",
        description: "Please check your inbox for the verification link.",
      });
    } catch (error) {
      console.error("Resend verification error:", error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const renderContent = () => {
    switch (status) {
      case VerificationStatus.LOADING:
        return (
          <div className="flex flex-col items-center py-8 text-center">
            <Loader2 className="h-16 w-16 text-job-blue animate-spin mb-4" />
            <p className="text-lg text-gray-600">Verifying your email address...</p>
          </div>
        );
      
      case VerificationStatus.SUCCESS:
        return (
          <div className="flex flex-col items-center py-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <p className="text-lg text-gray-600">{message}</p>
            <p className="mt-4 text-sm text-gray-500">You will be redirected to your dashboard shortly.</p>
          </div>
        );
      
      case VerificationStatus.ERROR:
        return (
          <div className="flex flex-col items-center py-8 text-center">
            <XCircle className="h-16 w-16 text-red-500 mb-4" />
            <p className="text-lg text-gray-600">{message}</p>
            <div className="mt-6">
              <Button onClick={() => navigate("/sign-in")} variant="outline" className="mr-2">
                Back to Sign In
              </Button>
              {email && (
                <Button onClick={handleResendVerification} className="bg-job-blue hover:bg-job-indigo">
                  Resend Verification
                </Button>
              )}
            </div>
          </div>
        );
      
      case VerificationStatus.EXPIRED:
        return (
          <div className="flex flex-col items-center py-8 text-center">
            <XCircle className="h-16 w-16 text-amber-500 mb-4" />
            <p className="text-lg text-gray-600">{message}</p>
            {email && (
              <Button 
                onClick={handleResendVerification} 
                className="mt-6 bg-job-blue hover:bg-job-indigo"
              >
                Send New Verification Link
              </Button>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      <SEOHead
        title="Verify Email | HarpalJob"
        description="Verify your email address to complete your HarpalJob account registration."
      />
      <div className="flex min-h-screen flex-col">
        <main className="flex-1 flex items-center justify-center px-6 py-12 bg-gradient-to-tr from-blue-50 to-slate-50">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <Link 
                to="/" 
                className="inline-flex items-center text-2xl font-bold text-job-blue mb-2"
              >
                HarpalJob
              </Link>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Email Verification
              </h1>
            </div>

            <Card className="border-none shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl flex items-center justify-center gap-2">
                  <MailCheck className="h-5 w-5" />
                  Verify Your Email
                </CardTitle>
                <CardDescription>
                  Complete your account setup by verifying your email address
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderContent()}
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 border-t pt-4">
                <div className="text-xs text-center text-muted-foreground">
                  If you're having trouble, please contact our support team for assistance.
                </div>
              </CardFooter>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default VerifyEmail;
