"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setLoginError(null);
    
    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // For demo purposes, simulate a successful login with any valid input
      console.log("Login successful", data);
      
      // Save user data to localStorage
      const userData = {
        email: data.email,
        fullName: data.email.split("@")[0], // Use part of email as name for demo
      };
      localStorage.setItem("currentUser", JSON.stringify(userData));
      
      // Navigate to dashboard (for demo)
      window.location.href = "/dashboard";
    } catch (error) {
      setLoginError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 flex items-center justify-center">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 flex flex-col lg:flex-row items-center">
        {/* Left side content */}
        <motion.div 
          className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0 lg:pr-16"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Welcome Back to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              RojgarHub
            </span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
            Sign in to your account to access your profile, saved jobs, and continue your job search journey.
          </p>

          <div className="hidden lg:block">
            <div className="flex items-center mb-8">
              <div className="flex-grow h-0.5 bg-border"></div>
              <span className="px-4 text-muted-foreground">Features</span>
              <div className="flex-grow h-0.5 bg-border"></div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-medium text-foreground">
                    Easy Application
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Apply to jobs with just one click
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-medium text-foreground">
                    Job Alerts
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Get notified about new matching jobs
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-medium text-foreground">
                    Resume Builder
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Create and manage your professional resume
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-medium text-foreground">
                    Interview Prep
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Access resources to ace your interviews
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right side login form */}
        <motion.div 
          className="w-full lg:w-1/2 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-card border shadow-lg rounded-2xl p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Sign in to your account
              </h2>
              <p className="text-muted-foreground mt-2">
                Enter your email and password to access your account
              </p>
            </div>

            {loginError && (
              <div className="bg-destructive/10 text-destructive rounded-lg p-4 mb-6 flex items-start">
                <AlertCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-5">
                {/* Email field */}
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className={`pl-10 pr-4 py-3 w-full rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                        errors.email ? "border-destructive" : "border-border"
                      }`}
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1.5 text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password field */}
                <div>
                  <label 
                    htmlFor="password" 
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`pl-10 pr-12 py-3 w-full rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                        errors.password ? "border-destructive" : "border-border"
                      }`}
                      {...register("password")}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <Eye className="h-5 w-5 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1.5 text-sm text-destructive">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Remember me and forgot password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="rememberMe"
                      type="checkbox"
                      className="h-4 w-4 text-primary border-border rounded"
                      {...register("rememberMe")}
                    />
                    <label 
                      htmlFor="rememberMe" 
                      className="ml-2 block text-sm text-muted-foreground"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <Link 
                      href="/auth/reset-password" 
                      className="font-medium text-primary hover:text-primary/80"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                {/* Login button */}
                <Button 
                  type="submit" 
                  className="w-full py-6 rounded-lg font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>

                {/* Sign up link */}
                <div className="text-center mt-4">
                  <p className="text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link 
                      href="/auth/register" 
                      className="font-medium text-primary hover:text-primary/80"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </form>

            {/* Social login or divider */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-card text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="py-2.5 px-4 rounded-lg border border-border bg-card text-foreground hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 flex items-center justify-center"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" aria-hidden="true">
                    <path
                      d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                      fill="#EA4335"
                    />
                    <path
                      d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12.0004 24C15.2404 24 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24 12.0004 24Z"
                      fill="#34A853"
                    />
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  className="py-2.5 px-4 rounded-lg border border-border bg-card text-foreground hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 flex items-center justify-center"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2" aria-hidden="true">
                    <path
                      d="M16.6373 15.1137C16.6742 16.1025 16.882 17.0912 17.2606 18.0341C17.6393 18.977 18.1843 19.8295 18.8781 20.6089C19.572 21.3882 20.4047 21.9478 21.3408 22.2873C22.2769 22.6269 23.31 22.5784 24.0001 22.4284C24.0001 22.4284 24.0001 19.0569 24.0001 17.2284C24.0001 15.8137 23.7431 14.8989 22.7127 14.2193C21.6823 13.5397 18.5407 13.5682 17.2606 13.5682C15.9804 13.5682 16.0001 14.125 16.0001 14.125C16.0001 14.125 16.6004 14.125 16.6373 15.1137Z"
                      fill="#0866FF"
                    />
                    <path
                      d="M16.6373 15.1137C16.6742 16.1025 16.882 17.0912 17.2606 18.0341C17.6393 18.977 18.1843 19.8295 18.8781 20.6089C19.572 21.3882 20.4047 21.9478 21.3408 22.2873C22.2769 22.6269 23.31 22.5784 24.0001 22.4284"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M13.3092 17.9708C13.3092 17.9708 12.9978 16.9078 12.9013 16.3632C12.8049 15.8187 12.1857 14.5616 12.1857 14.5616L8.35302 14.2408L4.00098 14.1636C4.00098 14.1636 3.0788 14.7081 2.61784 15.3298C2.15689 15.9515 1.46502 17.8859 1.0364 19.1267C0.607784 20.3675 0.11055 22.4391 0.11055 22.4391H1.38457H4.72044H8.33941H12.9013H16.2337C16.2337 22.4391 16.3092 19.3061 16.3092 19.3061"
                      fill="#0866FF"
                    />
                    <path
                      d="M24 3.87736C24 3.87736 23.173 1.20788 22.2234 1.04117C21.2737 0.874465 18.8983 0.514465 17.7991 0.399936C16.6998 0.285408 14.1373 0.0569336 12.5348 0.0569336C10.9323 0.0569336 8.36974 0.285408 7.27047 0.399936C6.17121 0.514465 3.79138 0.874465 2.84515 1.04117C1.89891 1.20788 0.801688 1.8218 0.42181 2.52921C0.0419322 3.23661 0.136245 5.09077 0.136245 5.09077C0.136245 5.09077 0.217851 7.57499 1.19748 9.42915C2.17711 11.2833 2.82269 11.7306 4.00086 12.6411C5.17903 13.5516 6.35039 13.7639 7.54978 13.9305C8.74918 14.0971 11.4364 14.2866 13.0389 14.2866C14.6415 14.2866 17.3287 14.0971 18.5281 13.9305C19.7274 13.7639 20.8988 13.5516 22.077 12.6411C23.2552 11.7306 23.9007 11.2833 24.8804 9.42915C25.86 7.57499 25.9452 5.09077 25.9452 5.09077C25.9452 5.09077 26.0359 3.23661 25.656 2.52921C25.2762 1.8218 24.8532 3.87736 24 3.87736Z"
                      fill="#0866FF"
                    />
                    <path
                      d="M17.783 7.25047C17.9497 6.2445 17.5495 5.18174 16.6495 4.90995C15.7495 4.63815 13.0389 4.63816 12.5387 4.68122C12.0385 4.72428 10.9555 4.90302 10.9323 5.82013C10.9091 6.73723 10.9323 8.86027 10.9323 8.86027C10.9323 8.86027 10.8861 10.7906 11.0528 11.4296C11.2194 12.0687 11.7198 12.2212 12.4367 12.3073C13.1536 12.3934 14.9508 12.3073 15.6408 12.3073C16.3308 12.3073 17.4496 12.4795 17.6163 11.5623C17.783 10.6452 17.6163 8.2564 17.783 7.25047Z"
                      fill="white"
                    />
                    <path
                      d="M13.0002 7.09961V10.1426L15.4177 8.62111L13.0002 7.09961Z"
                      fill="#0866FF"
                    />
                  </svg>
                  Facebook
                </button>
              </div>
            </div>
          </div>

          {/* Recruiter login link */}
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Are you a recruiter?{" "}
              <Link 
                href="/auth/recruiter/login" 
                className="font-medium text-primary hover:text-primary/80"
              >
                Sign in to recruiter portal
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 