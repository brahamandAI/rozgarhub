"use client";

import { BarChart3, Briefcase, Settings, Users } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function RecruiterDashboardPage() {
  // Mock data - replace with actual data fetching
  const stats = [
    { name: "Active Listings", value: 12, icon: <Briefcase className="h-6 w-6" />, color: "text-sky-500" },
    { name: "Total Applicants", value: 345, icon: <Users className="h-6 w-6" />, color: "text-emerald-500" },
    { name: "Pending Reviews", value: 23, icon: <Briefcase className="h-6 w-6" />, color: "text-amber-500" }, // Consider a more specific icon
    { name: "Messages", value: 7, icon: <Users className="h-6 w-6" />, color: "text-purple-500" }, // Consider a MessageSquare icon
  ];

  const recentActivities = [
    { action: "New applicant for Senior Developer", time: "2 hours ago", user: "John Doe" },
    { action: "Job listing 'UX Designer' published", time: "1 day ago", user: "You" },
    { action: "Message received from candidate", time: "2 days ago", user: "Jane Smith" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white">Recruiter Dashboard</h1>
          <p className="text-slate-400">Manage your job postings and candidates.</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions & Recent Postings */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 bg-slate-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <Link href="/recruiters/jobs/post" className="block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-md text-center transition-colors">
                Post a New Job
              </Link>
              <Link href="/recruiters/candidates" className="block bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-4 rounded-md text-center transition-colors">
                Browse Candidates
              </Link>
            </div>

            <h2 className="text-xl font-semibold text-white mb-4">Recent Job Postings</h2>
            <div className="space-y-3">
              {/* Replace with actual data */}
              {[1,2,3].map(i => (
                <div key={i} className="bg-slate-700 p-4 rounded-md flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-white">Senior Frontend Developer</h3>
                    <p className="text-xs text-slate-400">Posted 3 days ago - 25 Applicants</p>
                  </div>
                  <Link href={`/recruiters/jobs/manage/${i}`} className="text-sm text-purple-400 hover:text-purple-300">
                    Manage
                  </Link>
                </div>
              ))}
              {/* Placeholder if no jobs */}
              {/* <p className="text-slate-400">No recent job postings.</p> */}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-slate-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
            <ul className="space-y-4">
              {recentActivities.map((activity, index) => (
                <li key={index} className="text-sm border-b border-slate-700 pb-2 last:border-b-0 last:pb-0">
                  <p className="text-slate-300">{activity.action} by <span className="font-medium text-purple-400">{activity.user}</span></p>
                  <p className="text-xs text-slate-500">{activity.time}</p>
                </li>
              ))}
            </ul>
            {recentActivities.length === 0 && (
                <p className="text-slate-400">No recent activity to display.</p>
            )}
          </motion.div>
        </div>

      </div>
    </div>
  );
} 