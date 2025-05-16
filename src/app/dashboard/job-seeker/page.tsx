"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  BookmarkCheck, 
  BellRing, 
  Calendar, 
  BarChart3, 
  ExternalLink, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  PieChart, 
  UserRound, 
  Building, 
  FileText, 
  PanelRight,
  ChevronRight,
  Mail,
  PhoneCall,
  Eye,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

export default function JobSeekerDashboardPage() {
  // Mock data for the dashboard
  const profileCompletion = 75;
  const applications = [
    { 
      id: 1, 
      position: "Senior Frontend Developer", 
      company: "TechCorp Global", 
      location: "Remote",
      status: "Interview", 
      date: "2023-08-15",
      logo: "/placeholder.png"
    },
    { 
      id: 2, 
      position: "UX Designer", 
      company: "DesignHub", 
      location: "San Francisco, CA",
      status: "Applied", 
      date: "2023-09-01",
      logo: "/placeholder.png"
    },
    { 
      id: 3, 
      position: "Product Manager", 
      company: "InnovateTech", 
      location: "New York, NY",
      status: "Rejected", 
      date: "2023-07-28",
      logo: "/placeholder.png"
    },
  ];
  
  const savedJobs = [
    { 
      id: 1, 
      position: "Backend Developer", 
      company: "CloudSys", 
      location: "Remote",
      salary: "$120,000 - $150,000",
      posted: "3 days ago",
      logo: "/placeholder.png"
    },
    { 
      id: 2, 
      position: "Marketing Director", 
      company: "BrandGrowth", 
      location: "Chicago, IL",
      salary: "$140,000 - $160,000",
      posted: "1 day ago",
      logo: "/placeholder.png"
    },
  ];
  
  const upcomingInterviews = [
    {
      id: 1,
      company: "TechCorp Global",
      position: "Senior Frontend Developer",
      date: "2023-09-20T14:30:00",
      type: "Technical Interview",
      location: "Virtual (Zoom)",
    }
  ];

  const stats = [
    { name: "Applied Jobs", value: 12, icon: <Briefcase className="h-5 w-5" />, change: "+3", color: "blue" },
    { name: "Interviews", value: 4, icon: <MessageSquare className="h-5 w-5" />, change: "+1", color: "green" },
    { name: "Saved Jobs", value: 18, icon: <BookmarkCheck className="h-5 w-5" />, change: "+6", color: "purple" },
    { name: "Profile Views", value: 32, icon: <Eye className="h-5 w-5" />, change: "+8", color: "amber" },
  ];
  
  // Format date string to readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Format interview date and time
  const formatInterviewDateTime = (dateTimeString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    return new Date(dateTimeString).toLocaleString(undefined, options);
  };
  
  // Calculate days remaining until interview
  const getDaysUntil = (dateTimeString: string) => {
    const today = new Date();
    const interviewDate = new Date(dateTimeString);
    
    // Set hours to 0 for both dates to calculate just days
    today.setHours(0, 0, 0, 0);
    const interviewDateCopy = new Date(interviewDate);
    interviewDateCopy.setHours(0, 0, 0, 0);
    
    // Calculate difference in milliseconds and convert to days
    const diffTime = interviewDateCopy.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    return `In ${diffDays} days`;
  };
  
  // Get status style
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "Interview":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Offer":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "Rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400";
    }
  };

  return (
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
            <p className="text-muted-foreground">
              Hello, John! Here's an overview of your job search activity.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 md:mt-0 flex space-x-3"
          >
            <Link
              href="/jobs"
              className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Find Jobs
            </Link>
            
            <button className="px-4 py-2 border border-border bg-background hover:bg-muted font-medium rounded-lg transition-colors flex items-center">
              <BellRing className="w-4 h-4 mr-1.5" />
              <span>Alerts</span>
            </button>
          </motion.div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-background border border-border rounded-xl p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center bg-${stat.color}-100 dark:bg-${stat.color}-900/30`}>
                  {stat.icon}
                </div>
                <span className={`text-xs font-medium flex items-center ${
                  stat.change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {stat.change} this week
                </span>
              </div>
              <div className="mt-3">
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className="text-muted-foreground text-sm">{stat.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Completion */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-background border border-border rounded-xl p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Profile Completion</h2>
                <Link
                  href="/profile"
                  className="text-primary hover:text-primary/80 text-sm font-medium inline-flex items-center"
                >
                  <span>Edit Profile</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-primary">
                      {profileCompletion}% Complete
                    </span>
                  </div>
                </div>
                <div className="flex h-2 mb-4 overflow-hidden rounded bg-primary/10">
                  <div
                    style={{ width: `${profileCompletion}%` }}
                    className="bg-primary"
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 relative mt-1">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Personal Information</p>
                    <p className="text-xs text-muted-foreground">Basic contact details</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 relative mt-1">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Education</p>
                    <p className="text-xs text-muted-foreground">Academic background</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 relative mt-1">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Work Experience</p>
                    <p className="text-xs text-muted-foreground">Previous employment</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 relative mt-1">
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Skills & Endorsements</p>
                    <p className="text-xs text-muted-foreground">Add 3 more skills</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Recent Applications */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-background border border-border rounded-xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Recent Applications</h2>
                <Link
                  href="/dashboard/job-seeker/applications"
                  className="text-primary hover:text-primary/80 text-sm font-medium inline-flex items-center"
                >
                  <span>View All</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              
              {applications.length > 0 ? (
                <div className="space-y-4">
                  {applications.map((application) => (
                    <div 
                      key={application.id}
                      className="flex items-center p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Building className="h-6 w-6 text-primary" />
                      </div>
                      
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium">{application.position}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span>{application.company}</span>
                          <span className="mx-1.5">•</span>
                          <span>{application.location}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end ml-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle(application.status)}`}>
                          {application.status}
                        </span>
                        <span className="text-xs text-muted-foreground mt-1">
                          {formatDate(application.date)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Briefcase className="h-10 w-10 mx-auto text-muted-foreground/50" />
                  <p className="mt-2 text-muted-foreground">No applications yet</p>
                </div>
              )}
            </motion.div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-8">
            {/* Upcoming Interviews */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-background border border-border rounded-xl p-6"
            >
              <h2 className="text-lg font-semibold mb-6">Upcoming Interviews</h2>
              
              {upcomingInterviews.length > 0 ? (
                <div className="space-y-4">
                  {upcomingInterviews.map((interview) => (
                    <div 
                      key={interview.id}
                      className="border border-border bg-background rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{interview.position}</h3>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          {getDaysUntil(interview.date)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mt-1">{interview.company}</p>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{formatInterviewDateTime(interview.date)}</span>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{interview.type}</span>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{interview.location}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex space-x-2">
                        <button className="flex-1 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-md text-center hover:bg-primary/90 transition-colors">
                          Prepare
                        </button>
                        
                        <button className="flex-1 py-1.5 bg-muted text-foreground text-sm font-medium rounded-md text-center hover:bg-muted/80 transition-colors">
                          Reschedule
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Calendar className="h-10 w-10 mx-auto text-muted-foreground/50" />
                  <p className="mt-2 text-muted-foreground">No upcoming interviews</p>
                </div>
              )}
            </motion.div>
            
            {/* Saved Jobs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-background border border-border rounded-xl p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Saved Jobs</h2>
                <Link
                  href="/dashboard/job-seeker/saved"
                  className="text-primary hover:text-primary/80 text-sm font-medium inline-flex items-center"
                >
                  <span>View All</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              
              {savedJobs.length > 0 ? (
                <div className="space-y-4">
                  {savedJobs.map((job) => (
                    <div 
                      key={job.id}
                      className="flex items-start p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Building className="h-5 w-5 text-primary" />
                      </div>
                      
                      <div className="ml-3">
                        <h3 className="font-medium text-sm">{job.position}</h3>
                        <p className="text-xs text-muted-foreground">{job.company} • {job.location}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs font-medium">{job.salary}</span>
                          <span className="text-xs text-muted-foreground">{job.posted}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <BookmarkCheck className="h-10 w-10 mx-auto text-muted-foreground/50" />
                  <p className="mt-2 text-muted-foreground">No saved jobs</p>
                </div>
              )}
            </motion.div>
            
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-background border border-border rounded-xl p-6"
            >
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              
              <div className="space-y-3">
                <Link 
                  href="/resume-builder"
                  className="flex items-center p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <span className="font-medium text-sm">Update Resume</span>
                  </div>
                  <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground" />
                </Link>
                
                <Link 
                  href="/jobs/search"
                  className="flex items-center p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Briefcase className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="ml-3">
                    <span className="font-medium text-sm">Advanced Job Search</span>
                  </div>
                  <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground" />
                </Link>
                
                <Link 
                  href="/dashboard/job-seeker/settings"
                  className="flex items-center p-3 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <BellRing className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="ml-3">
                    <span className="font-medium text-sm">Job Alert Settings</span>
                  </div>
                  <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
} 