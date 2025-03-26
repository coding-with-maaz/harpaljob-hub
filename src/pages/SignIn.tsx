
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { User, LockKeyhole, Mail, Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { setCredentials } from "@/lib/store/slices/authSlice";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (data.success) {
        dispatch(
          setCredentials({
            token: data.data.token,
            user: data.data.user,
          })
        );

        toast({
          title: "Login successful",
          description: "Welcome back!",
        });

        // Redirect based on user role
        if (data.data.user.role === "employer") {
          navigate("/employer-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <SEOHead
        title="Sign In | HarpalJob"
        description="Sign in to your HarpalJob account to access job listings, applications, and more."
      />
      <div className="flex min-h-screen flex-col">
        <main className="flex-1 flex items-center justify-center px-6 py-12 bg-gradient-to-tr from-blue-50 to-slate-50">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <Link 
                to="/" 
                className="inline-flex items-center text-2xl font-bold text-job-blue mb-2"
              >
                HarpalJob
              </Link>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Welcome back
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Sign in to access your account
              </p>
            </div>

            <Card className="border-none shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="text-xl">Sign in</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="you@example.com"
                                className="pl-10"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <LockKeyhole className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="••••••"
                                type={showPassword ? "text" : "password"}
                                className="pl-10"
                                {...field}
                              />
                              <button
                                type="button"
                                className="absolute right-3 top-2.5 text-muted-foreground"
                                onClick={togglePasswordVisibility}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4" />
                                ) : (
                                  <Eye className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full bg-job-blue hover:bg-job-indigo">
                      Sign in
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 border-t pt-4">
                <div className="text-sm text-center text-muted-foreground">
                  <Link to="/forgot-password" className="text-job-blue hover:underline">
                    Forgot your password?
                  </Link>
                </div>
                <div className="w-full flex items-center gap-2">
                  <div className="h-px flex-1 bg-muted"></div>
                  <span className="text-xs text-muted-foreground">OR</span>
                  <div className="h-px flex-1 bg-muted"></div>
                </div>
                <div className="text-sm text-center">
                  Don't have an account yet?{" "}
                  <Link to="/register" className="font-semibold text-job-blue hover:underline">
                    Sign up
                  </Link>
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

export default SignIn;
