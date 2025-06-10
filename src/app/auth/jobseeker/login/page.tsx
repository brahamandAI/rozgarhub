"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Mail, Lock, Loader2, Eye, EyeOff, Briefcase, User, GraduationCap } from "lucide-react";

export default function JobSeekerLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/jobseeker/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Store user data in localStorage
        localStorage.setItem("currentJobSeeker", JSON.stringify(data.user));
        
        // Update last login time
        await fetch("/api/auth/jobseeker/update-last-login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        toast.success("Login successful! Redirecting to dashboard...");
        router.push("/dashboard/job-seeker");
      } else {
        toast.error(data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 pt-24">
      <div className="grid md:grid-cols-2 gap-0 max-w-4xl w-full bg-slate-800 shadow-2xl rounded-lg overflow-hidden">
        {/* Left Side: Login Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2 text-white">Welcome Back</h1>
            <p className="text-slate-400 text-sm">
              Sign in to your RozgarHub account to continue your job search.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                placeholder="Enter your email"
                  disabled={isLoading}
              />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                  disabled={isLoading}
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
                  className="h-4 w-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
                  disabled={isLoading}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-purple-400 hover:text-purple-300">
                  Forgot your password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-slate-900 font-semibold py-3 px-4 rounded-md hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-white transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 text-center text-sm text-slate-400"
          >
            Don't have an account?{" "}
            <a href="/auth/jobseeker/register" className="font-medium text-purple-400 hover:text-purple-300">
              Create one
            </a>
          </motion.div>
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
              Join RozgarHub to access thousands of job opportunities and advance your career.
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