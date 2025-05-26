"use client";

import Link from "next/link";
import { useState } from "react";
import { Briefcase, User, GraduationCap, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function JobSeekerLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password, rememberMe });
    
    // Find job seeker in localStorage based on email
    let foundJobSeeker = null;
    try {
      const jobSeekers = JSON.parse(localStorage.getItem('jobSeekers') || '[]');
      foundJobSeeker = jobSeekers.find((js: any) => js.email === email);
      
      if (!foundJobSeeker) {
        // For demo purposes, create a mock job seeker if none exists
        foundJobSeeker = {
          email: email,
          fullName: email.split('@')[0],
          currentJobTitle: "Software Developer",
          yearsOfExperience: "3-5",
          education: "bachelors",
          skills: ["JavaScript", "React", "Node.js"],
          location: "New York, NY, USA"
        };
      }
      
      // Save job seeker data in localStorage
      localStorage.setItem('currentJobSeeker', JSON.stringify(foundJobSeeker));
      
      // Set first login flag to show empty dashboard initially
      sessionStorage.setItem("firstLogin", "true");
    } catch (error) {
      console.error("Error processing job seeker data:", error);
    }
    
    // Redirect to job seeker dashboard
    router.push("/dashboard/jobseeker");
  };
  
  const handleGoogleSignIn = () => {
    // Handle Google sign-in logic here
    console.log("Sign in with Google");
    
    // For demo, create a sample job seeker
    const sampleJobSeeker = {
      email: "google-jobseeker@example.com",
      fullName: "Google Job Seeker",
      currentJobTitle: "Software Engineer",
      yearsOfExperience: "5-10",
      education: "masters",
      skills: ["Python", "Machine Learning", "Data Science"],
      location: "San Francisco, CA, USA"
    };
    
    // Save job seeker data
    localStorage.setItem('currentJobSeeker', JSON.stringify(sampleJobSeeker));
    
    // Redirect to job seeker dashboard after successful sign-in
    router.push("/dashboard/jobseeker");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 pt-24">
      <div className="grid md:grid-cols-2 gap-0 max-w-4xl w-full bg-slate-800 shadow-2xl rounded-lg overflow-hidden">
        {/* Left Side: Login Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-white">Job Seeker Login</h1>
            <p className="text-slate-400 text-sm">
              Sign in to access your job seeker dashboard and find your next opportunity.
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
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-4 pr-10 py-2.5 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
          
          <button
            onClick={handleGoogleSignIn}
            className="mt-4 w-full bg-slate-700 text-white font-semibold py-3 px-4 rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-slate-500 transition-colors duration-150 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </button>

          <p className="mt-8 text-center text-sm text-slate-400">
            Don't have a job seeker account?{' '}
            <Link href="/auth/jobseeker/register" passHref>
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
            <h2 className="text-3xl font-bold mb-6 text-white">Find Your Dream Job</h2>
            <p className="text-purple-200 mb-8 text-sm leading-relaxed">
              Access your job seeker dashboard to browse opportunities, track applications, and advance your career.
            </p>
            <ul className="space-y-6">
              <li className="flex items-start space-x-3">
                <div className="flex-shrink-0 bg-purple-500/30 p-2 rounded-full">
                  <Briefcase className="h-5 w-5 text-purple-200" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Job Search</h3>
                  <p className="text-purple-200 text-xs">Browse and apply to thousands of job listings from top companies.</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="flex-shrink-0 bg-purple-500/30 p-2 rounded-full">
                  <User className="h-5 w-5 text-purple-200" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Profile Visibility</h3>
                  <p className="text-purple-200 text-xs">Get noticed by recruiters and increase your chances of landing interviews.</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="flex-shrink-0 bg-purple-500/30 p-2 rounded-full">
                  <GraduationCap className="h-5 w-5 text-purple-200" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Career Growth</h3>
                  <p className="text-purple-200 text-xs">Access resources and tools to advance your career and develop new skills.</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 