"use client";

import { BarChart3, Briefcase, Settings, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Interface for dashboard stats and activity
interface DashboardData {
  stats: {
    activeListings: number;
    totalApplicants: number;
    pendingReviews: number;
    messages: number;
  };
  jobPostings: Array<{
    id: number;
    title: string;
    postedDate: string;
    applicantsCount: number;
  }>;
  activities: Array<{
    id: number;
    action: string;
    time: string;
    user: string;
  }>;
}

export default function RecruiterDashboardPage() {
  const [isNewUser, setIsNewUser] = useState(true);
  const [recruiterName, setRecruiterName] = useState("");
  const [recruiterCompany, setRecruiterCompany] = useState("");
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    stats: {
      activeListings: 0,
      totalApplicants: 0,
      pendingReviews: 0,
      messages: 0
    },
    jobPostings: [],
    activities: []
  });
  
  // Function to update dashboard data - this would be called after user actions
  const updateDashboardData = (newData: Partial<DashboardData>) => {
    const updatedData = { ...dashboardData, ...newData };
    // In a real app, this would be sent to an API
    localStorage.setItem('dashboardData', JSON.stringify(updatedData));
    setDashboardData(updatedData);
  };
  
  useEffect(() => {
    // Load recruiter information from localStorage
    try {
      // Load recruiter profile data
      const recruiterData = localStorage.getItem("currentRecruiter");
      if (recruiterData) {
        const parsedData = JSON.parse(recruiterData);
        setRecruiterName(parsedData.fullName || "");
        
        // Find company name if available
        const companyId = parsedData.companyId;
        if (companyId) {
          const companiesData = JSON.parse(localStorage.getItem("companies") || "[]");
          const company = companiesData.find((c: { id: number }) => c.id === companyId);
          if (company) {
            setRecruiterCompany(company.name || "");
          }
        }
      }
      
      // Load dashboard data from localStorage (would be from API in real app)
      const storedDashboardData = localStorage.getItem('dashboardData');
      if (storedDashboardData) {
        setDashboardData(JSON.parse(storedDashboardData));
        setIsNewUser(false);
      } else {
        // If no dashboard data, check if first login
        const isFirstLogin = sessionStorage.getItem("firstLogin");
        
        if (isFirstLogin === "true") {
          // Create initial dashboard data structure for new user
          const initialData: DashboardData = {
            stats: {
              activeListings: 0,
              totalApplicants: 0,
              pendingReviews: 0,
              messages: 0
            },
            jobPostings: [],
            activities: []
          };
          
          // Store initial data
          localStorage.setItem('dashboardData', JSON.stringify(initialData));
          setDashboardData(initialData);
          setIsNewUser(true);
          
          // Clear the first login flag after a delay
          const timer = setTimeout(() => {
            sessionStorage.setItem("firstLogin", "false");
          }, 10000); // Clear after 10 seconds
          
          return () => clearTimeout(timer);
        }
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }, []);

  // Convert dashboard data to display format
  const stats = [
    { name: "Active Listings", value: dashboardData.stats.activeListings, icon: <Briefcase className="h-6 w-6" />, color: "text-sky-500" },
    { name: "Total Applicants", value: dashboardData.stats.totalApplicants, icon: <Users className="h-6 w-6" />, color: "text-emerald-500" },
    { name: "Pending Reviews", value: dashboardData.stats.pendingReviews, icon: <Briefcase className="h-6 w-6" />, color: "text-amber-500" },
    { name: "Messages", value: dashboardData.stats.messages, icon: <Users className="h-6 w-6" />, color: "text-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Fixed height spacer to push content below navbar */}
      <div className="h-20"></div>
      
      <div className="p-4 md:p-8 mt-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-white">
              {recruiterName ? `Welcome, ${recruiterName}!` : 'Recruiter Dashboard'}
            </h1>
            <p className="text-slate-400">
              {recruiterCompany 
                ? `Manage job postings and candidates for ${recruiterCompany}.` 
                : 'Manage your job postings and candidates.'}
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-slate-800 p-6 rounded-lg shadow-lg hover:shadow-purple-500/30 transition-shadow duration-300"
              >
                <div className={`p-3 inline-block rounded-full bg-slate-700 mb-3 ${stat.color}`}>
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-semibold text-white">{stat.value}</h3>
                <p className="text-slate-400 text-sm">{stat.name}</p>
              </motion.div>
            ))}
          </div>

          {isNewUser && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 p-6 rounded-lg mb-8 border border-purple-500/20"
            >
              <h2 className="text-xl font-semibold text-white mb-2">Getting Started</h2>
              <p className="text-slate-300 mb-4">
                Welcome to your new recruiter dashboard! Here are a few steps to get started:
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                  <span>Complete your company profile</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                  <span>Post your first job</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                  <span>Browse potential candidates</span>
                </li>
              </ul>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Quick Actions & Recent Postings */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 bg-slate-800 p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <Link 
                  href="/dashboard/recruiter/post-job" 
                  className="block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-md text-center transition-colors"
                >
                  Post a New Job
                </Link>
                <Link href="/dashboard/recruiter/candidates" className="block bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-4 rounded-md text-center transition-colors">
                  Browse Candidates
                </Link>
              </div>

              <h2 className="text-xl font-semibold text-white mb-4">Recent Job Postings</h2>
              
              {dashboardData.jobPostings.length > 0 ? (
                <div className="space-y-3">
                  {dashboardData.jobPostings.map(job => (
                    <div key={job.id} className="bg-slate-700 p-4 rounded-md flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-white">{job.title}</h3>
                        <p className="text-xs text-slate-400">Posted {job.postedDate} - {job.applicantsCount} Applicants</p>
                      </div>
                      <Link href={`/dashboard/recruiter/jobs/${job.id}`} className="text-sm text-purple-400 hover:text-purple-300">
                        Manage
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-700/50 p-6 rounded-md text-center">
                  <Briefcase className="h-10 w-10 text-slate-500 mx-auto mb-3" />
                  <p className="text-slate-400">No job postings yet.</p>
                  <p className="text-xs text-slate-500 mt-1 mb-3">
                    When you post jobs, they will appear here.
                  </p>
                  <Link href="/dashboard/recruiter/post-job" className="inline-block text-sm text-purple-400 hover:text-purple-300 font-medium">
                    Post Your First Job →
                  </Link>
                </div>
              )}
            </motion.div>

            {/* Recent Activity */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-slate-800 p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
              
              {dashboardData.activities.length > 0 ? (
                <ul className="space-y-4">
                  {dashboardData.activities.map((activity) => (
                    <li key={activity.id} className="text-sm border-b border-slate-700 pb-2 last:border-b-0 last:pb-0">
                      <p className="text-slate-300">{activity.action} by <span className="font-medium text-purple-400">{activity.user}</span></p>
                      <p className="text-xs text-slate-500">{activity.time}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="bg-slate-700/50 p-6 rounded-md text-center">
                  <BarChart3 className="h-10 w-10 text-slate-500 mx-auto mb-3" />
                  <p className="text-slate-400">No recent activity.</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Activity will appear here as you interact with the platform.
                  </p>
                </div>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
} 