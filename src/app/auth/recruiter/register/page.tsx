"use client";

import Link from "next/link";
import { useState } from "react";
import { Briefcase, Users, BarChart3, Eye, EyeOff, Building, User as UserIcon, Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";

export default function RecruiterRegisterPage() {
  const [companyName, setCompanyName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Handle registration logic here
    console.log({ companyName, fullName, email, password, agreeToTerms });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 pt-24">
      <div className="grid md:grid-cols-2 gap-0 max-w-4xl w-full bg-slate-800 shadow-2xl rounded-lg overflow-hidden">
        {/* Left Side: Registration Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-white">Create Recruiter Account</h1>
            <p className="text-slate-400 text-sm">
              Join RozgarHub to find the best talent for your company.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-slate-300 mb-1">
                Company Name
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                  placeholder="Your company's name"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-slate-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                 <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                  placeholder="Your full name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-400 hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                  placeholder="Confirm your password"
                />
                 <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-400 hover:text-slate-200"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-start">
              <input
                id="agree-to-terms"
                name="agree-to-terms"
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                required
                className="h-4 w-4 mt-0.5 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
              />
              <label htmlFor="agree-to-terms" className="ml-2 block text-xs text-slate-400">
                I agree to the RozgarHub{' '}
                <Link href="/terms-of-service" passHref><span className="text-purple-400 hover:text-purple-300 cursor-pointer">Terms of Service</span></Link>
                {' '}and{' '}
                <Link href="/privacy-policy" passHref><span className="text-purple-400 hover:text-purple-300 cursor-pointer">Privacy Policy</span></Link>.
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-white text-slate-900 font-semibold py-3 px-4 rounded-md hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-white transition-colors duration-150"
            >
              Create Account
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link href="/auth/recruiter/login" passHref>
              <span className="font-medium text-purple-400 hover:text-purple-300 cursor-pointer">
                Sign In
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