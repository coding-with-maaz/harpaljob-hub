
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { User, Mail, LockKeyhole, Eye, EyeOff, Briefcase, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { setCredentials } from "@/lib/store/slices/authSlice";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";

const userFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  role: z.literal("user"),
});

const employerFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  companyName: z.string().min(2, { message: "Company name must be at least 2 characters" }),
  role: z.literal("employer"),
});

type UserFormValues = z.infer<typeof userFormSchema>;
type EmployerFormValues = z.infer<typeof employerFormSchema>;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<"user" | "employer">("user");
  const [showPassword, setShowPassword] = useState(false);

  const userForm = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "user",
    },
  });

  const employerForm = useForm<EmployerFormValues>({
    resolver: zodResolver(employerFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      companyName: "",
      role: "employer",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onUserSubmit = async (values: UserFormValues) => {
    handleRegistration(values);
  };

  const onEmployerSubmit = async (values: EmployerFormValues) => {
    handleRegistration(values);
  };

  const handleRegistration = async (values: UserFormValues | EmployerFormValues) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      if (data.success) {
        dispatch(
          setCredentials({
            token: data.data.token,
            user: data.data.user,
          })
        );

        toast({
          title: "Registration successful",
          description: "Your account has been created.",
        });

        // Redirect based on user role
        if (data.data.user.role === "employer") {
          navigate("/employer-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Please check your information and try again",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <SEOHead
        title="Sign Up | HarpalJob"
        description="Create a new account on HarpalJob to find jobs, track applications, and more."
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
                Create an account
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Join HarpalJob and start your journey
              </p>
            </div>

            <Card className="border-none shadow-lg">
              <CardHeader className="space-y-1">
                <Tabs 
                  defaultValue="user" 
                  value={activeTab} 
                  onValueChange={(value) => setActiveTab(value as "user" | "employer")}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="user" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>Job Seeker</span>
                    </TabsTrigger>
                    <TabsTrigger value="employer" className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      <span>Employer</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="user" className="mt-4">
                    <CardTitle className="text-xl">Job Seeker Registration</CardTitle>
                    <CardDescription>
                      Create an account to apply for jobs
                    </CardDescription>
                  </TabsContent>

                  <TabsContent value="employer" className="mt-4">
                    <CardTitle className="text-xl">Employer Registration</CardTitle>
                    <CardDescription>
                      Create an account to post jobs and find talent
                    </CardDescription>
                  </TabsContent>
                </Tabs>
              </CardHeader>

              <CardContent>
                {activeTab === "user" ? (
                  <Form {...userForm}>
                    <form onSubmit={userForm.handleSubmit(onUserSubmit)} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={userForm.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={userForm.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={userForm.control}
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
                        control={userForm.control}
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
                            <FormDescription>
                              Must be at least 6 characters
                            </FormDescription>
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full bg-job-blue hover:bg-job-indigo">
                        Create account
                      </Button>
                    </form>
                  </Form>
                ) : (
                  <Form {...employerForm}>
                    <form onSubmit={employerForm.handleSubmit(onEmployerSubmit)} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={employerForm.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={employerForm.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={employerForm.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                  placeholder="Acme Inc."
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
                        control={employerForm.control}
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
                        control={employerForm.control}
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
                            <FormDescription>
                              Must be at least 6 characters
                            </FormDescription>
                          </FormItem>
                        )}
                      />

                      <Button type="submit" className="w-full bg-job-blue hover:bg-job-indigo">
                        Create employer account
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 border-t pt-4">
                <div className="text-sm text-center">
                  Already have an account?{" "}
                  <Link to="/sign-in" className="font-semibold text-job-blue hover:underline">
                    Sign in
                  </Link>
                </div>
                <p className="text-xs text-center text-muted-foreground">
                  By creating an account, you agree to our{" "}
                  <Link to="/terms" className="underline underline-offset-4 hover:text-primary">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="underline underline-offset-4 hover:text-primary">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </CardFooter>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Register;
