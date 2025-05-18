"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Briefcase, Users, BarChart3, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function RecruiterLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password, rememberMe });
    
    // Find recruiter in localStorage based on email
    let foundRecruiter = null;
    try {
      const recruiters = JSON.parse(localStorage.getItem('allRecruiters') || '[]');
      foundRecruiter = recruiters.find((r: any) => r.email === email);
      
      if (!foundRecruiter) {
        // For demo purposes, create a mock recruiter if none exists
        foundRecruiter = {
          email: email,
          fullName: email.split('@')[0],
          companyId: null
        };
        
        // Try to find matching company data
        const companies = JSON.parse(localStorage.getItem('companies') || '[]');
        if (companies.length > 0) {
          // Just assign first company for demo
          foundRecruiter.companyId = companies[0].id;
        }
      }
      
      // Save recruiter data in localStorage
      localStorage.setItem('currentRecruiter', JSON.stringify(foundRecruiter));
      
      // Set first login flag to show empty dashboard initially
      sessionStorage.setItem("firstLogin", "true");
    } catch (error) {
      console.error("Error processing recruiter data:", error);
    }
    
    // Redirect to recruiter dashboard
    router.push("/dashboard/recruiter");
  };
  
  const handleGoogleSignIn = () => {
    // Handle Google sign-in logic here
    console.log("Sign in with Google");
    
    // For demo, create a sample recruiter
    const sampleRecruiter = {
      email: "google-recruiter@example.com",
      fullName: "Google Recruiter",
      companyId: null
    };
    
    // Save recruiter data
    localStorage.setItem('currentRecruiter', JSON.stringify(sampleRecruiter));
    
    // Redirect to recruiter dashboard after successful sign-in
    router.push("/dashboard/recruiter");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 pt-24">
      <div className="grid md:grid-cols-2 gap-0 max-w-4xl w-full bg-slate-800 shadow-2xl rounded-lg overflow-hidden">
        {/* Left Side: Login Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-white">Recruiter Login</h1>
            <p className="text-slate-400 text-sm">
              Sign in to access your recruiter dashboard and manage your job listings.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                  Password
                </label>
                <Link href="/auth/forgot-password" passHref>
                  <span className="text-xs text-purple-400 hover:text-purple-300 cursor-pointer">
                    Forgot password?
                  </span>
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-400 hover:text-slate-200"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-300">
                  Remember me
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-white text-slate-900 font-semibold py-3 px-4 rounded-md hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-white transition-colors duration-150"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-4 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-800 text-slate-400">Or continue with</span>
            </div>
          </div>
          
          <div className="mt-4">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-slate-500 transition-colors duration-150"
            >
              <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                <path
                  d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                  fill="#EA4335"
                />
                <path
                  d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.08L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                  fill="#4285F4"
                />
                <path
                  d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                  fill="#FBBC05"
                />
                <path
                  d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.075C15.0054 18.785 13.6204 19.255 12.0004 19.255C8.8704 19.255 6.21537 17.145 5.2654 14.295L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                  fill="#34A853"
                />
              </svg>
              Sign in with Google
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-slate-400">
            Don't have a recruiter account?{' '}
            <Link href="/auth/recruiter/register" passHref>
              <span className="font-medium text-purple-400 hover:text-purple-300 cursor-pointer">
                Sign up
              </span>
            </Link>
          </p>
        </div>

        {/* Right Side: Feature Panel */}
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-8 md:p-12 flex flex-col justify-center rounded-r-lg md:rounded-r-lg rounded-l-lg md:rounded-l-none">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-white">Build Your Dream Team</h2>
            <p className="text-purple-200 mb-8 text-sm leading-relaxed">
              Access your recruiter dashboard to post jobs, manage applications, and connect with the best talent.
            </p>
            <ul className="space-y-6">
              <li className="flex items-start space-x-3">
                <div className="flex-shrink-0 bg-purple-500/30 p-2 rounded-full">
                  <Briefcase className="h-5 w-5 text-purple-200" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Post Unlimited Jobs</h3>
                  <p className="text-purple-200 text-xs">Create and manage job listings to find the perfect candidates.</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="flex-shrink-0 bg-purple-500/30 p-2 rounded-full">
                  <Users className="h-5 w-5 text-purple-200" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Talent Search</h3>
                  <p className="text-purple-200 text-xs">Browse our candidate database and filter by skills and experience.</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="flex-shrink-0 bg-purple-500/30 p-2 rounded-full">
                  <BarChart3 className="h-5 w-5 text-purple-200" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Analytics Dashboard</h3>
                  <p className="text-purple-200 text-xs">Track performance metrics and optimize your recruitment process.</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 