"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Briefcase, 
  Building, 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign, 
  Globe, 
  Laptop, 
  GraduationCap,
  ChevronDown,
  Save,
  X,
  Plus,
  Trash2
} from "lucide-react";

export default function PostJobPage() {
  const router = useRouter();
  const [recruiterData, setRecruiterData] = useState<any>(null);
  const [companyData, setCompanyData] = useState<any>(null);
  const [jobPosted, setJobPosted] = useState(false);
  
  // Job form data
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [locationType, setLocationType] = useState("onsite");
  const [employmentType, setEmploymentType] = useState("full-time");
  const [experienceLevel, setExperienceLevel] = useState("entry");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [salaryCurrency, setSalaryCurrency] = useState("INR");
  const [salaryPeriod, setSalaryPeriod] = useState("annual");
  const [description, setDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState<string[]>([""]);
  const [requirements, setRequirements] = useState<string[]>([""]);
  const [benefits, setBenefits] = useState<string[]>([""]);
  const [applicationDeadline, setApplicationDeadline] = useState("");
  const [applicationUrl, setApplicationUrl] = useState("");
  const [formError, setFormError] = useState("");
  
  useEffect(() => {
    // Get recruiter data
    const recruiterDataStr = localStorage.getItem("currentRecruiter");
    if (recruiterDataStr) {
      try {
        const recruiter = JSON.parse(recruiterDataStr);
        setRecruiterData(recruiter);
        
        // Get company data if company ID exists
        if (recruiter.companyId) {
          const companiesDataStr = localStorage.getItem("companies");
          if (companiesDataStr) {
            const companies = JSON.parse(companiesDataStr);
            const company = companies.find((c: any) => c.id === recruiter.companyId);
            if (company) {
              setCompanyData(company);
            }
          }
        }
      } catch (error) {
        console.error("Error loading recruiter data:", error);
      }
    } else {
      // Redirect to login if not logged in
      router.push("/auth/recruiter/login");
    }
  }, [router]);
  
  // Handle list item changes (responsibilities, requirements, benefits)
  const handleListItemChange = (
    index: number, 
    value: string, 
    listType: "responsibilities" | "requirements" | "benefits"
  ) => {
    if (listType === "responsibilities") {
      const newResponsibilities = [...responsibilities];
      newResponsibilities[index] = value;
      setResponsibilities(newResponsibilities);
    } else if (listType === "requirements") {
      const newRequirements = [...requirements];
      newRequirements[index] = value;
      setRequirements(newRequirements);
    } else if (listType === "benefits") {
      const newBenefits = [...benefits];
      newBenefits[index] = value;
      setBenefits(newBenefits);
    }
  };
  
  // Add new item to list
  const addListItem = (listType: "responsibilities" | "requirements" | "benefits") => {
    if (listType === "responsibilities") {
      setResponsibilities([...responsibilities, ""]);
    } else if (listType === "requirements") {
      setRequirements([...requirements, ""]);
    } else if (listType === "benefits") {
      setBenefits([...benefits, ""]);
    }
  };
  
  // Remove item from list
  const removeListItem = (
    index: number, 
    listType: "responsibilities" | "requirements" | "benefits"
  ) => {
    if (listType === "responsibilities" && responsibilities.length > 1) {
      const newResponsibilities = [...responsibilities];
      newResponsibilities.splice(index, 1);
      setResponsibilities(newResponsibilities);
    } else if (listType === "requirements" && requirements.length > 1) {
      const newRequirements = [...requirements];
      newRequirements.splice(index, 1);
      setRequirements(newRequirements);
    } else if (listType === "benefits" && benefits.length > 1) {
      const newBenefits = [...benefits];
      newBenefits.splice(index, 1);
      setBenefits(newBenefits);
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!title || !location || !description) {
      setFormError("Please fill in all required fields");
      return;
    }
    
    // Prepare job data
    const jobData = {
      id: Date.now(), // Use timestamp as ID
      title,
      department,
      company: companyData ? companyData.name : (recruiterData ? recruiterData.fullName + "'s Company" : "Company"),
      companyId: companyData ? companyData.id : null,
      location,
      locationType,
      employmentType,
      experienceLevel,
      salary: {
        min: salaryMin ? parseInt(salaryMin) : null,
        max: salaryMax ? parseInt(salaryMax) : null,
        currency: salaryCurrency,
        period: salaryPeriod
      },
      description,
      responsibilities: responsibilities.filter(item => item.trim() !== ""),
      requirements: requirements.filter(item => item.trim() !== ""),
      benefits: benefits.filter(item => item.trim() !== ""),
      applicationDeadline,
      applicationUrl,
      postedDate: new Date().toISOString(),
      postedBy: recruiterData ? recruiterData.id : null,
      applicantsCount: 0
    };
    
    // Save job to localStorage
    try {
      const jobsDataStr = localStorage.getItem("jobs");
      const jobs = jobsDataStr ? JSON.parse(jobsDataStr) : [];
      jobs.push(jobData);
      localStorage.setItem("jobs", JSON.stringify(jobs));
      
      // Update company job count if company exists
      if (companyData) {
        const companiesDataStr = localStorage.getItem("companies");
        if (companiesDataStr) {
          const companies = JSON.parse(companiesDataStr);
          const companyIndex = companies.findIndex((c: any) => c.id === companyData.id);
          if (companyIndex !== -1) {
            companies[companyIndex].jobCount = (companies[companyIndex].jobCount || 0) + 1;
            localStorage.setItem("companies", JSON.stringify(companies));
            
            // Update local company data
            setCompanyData({
              ...companyData,
              jobCount: (companyData.jobCount || 0) + 1
            });
          }
        }
      }
      
      // Add to dashboard data
      const dashboardDataStr = localStorage.getItem("dashboardData");
      if (dashboardDataStr) {
        const dashboardData = JSON.parse(dashboardDataStr);
        
        // Update stats
        if (dashboardData.stats) {
          dashboardData.stats.activeListings = (dashboardData.stats.activeListings || 0) + 1;
        }
        
        // Add to job postings
        if (dashboardData.jobPostings) {
          dashboardData.jobPostings.unshift({
            id: jobData.id,
            title: jobData.title,
            postedDate: new Date().toLocaleDateString(),
            applicantsCount: 0
          });
        }
        
        // Add activity
        if (dashboardData.activities) {
          dashboardData.activities.unshift({
            id: Date.now(),
            action: `Job listing '${jobData.title}' published`,
            time: "Just now",
            user: "You"
          });
        }
        
        localStorage.setItem("dashboardData", JSON.stringify(dashboardData));
      }
      
      // Show success message
      setJobPosted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setJobPosted(false);
        router.push("/dashboard/recruiter");
      }, 3000);
    } catch (error) {
      console.error("Error saving job data:", error);
      setFormError("Error saving job. Please try again.");
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Fixed height spacer to push content below navbar */}
      <div className="h-20"></div>
      
      <div className="p-4 md:p-8 mt-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-white">Post a New Job</h1>
              <Link 
                href="/dashboard/recruiter" 
                className="flex items-center text-sm text-slate-400 hover:text-white transition-colors"
              >
                <ChevronDown className="h-4 w-4 rotate-90 mr-1" />
                Back to Dashboard
              </Link>
            </div>
            <p className="text-slate-400 mt-2">
              {companyData ? `Create a job posting for ${companyData.name}` : "Create a new job posting"}
            </p>
          </motion.div>

          {/* Success message */}
          {jobPosted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-green-500/20 border border-green-500/30 text-green-400 p-4 rounded-lg mb-6 flex items-center"
            >
              <div className="flex-shrink-0 rounded-full p-1 bg-green-500/20 mr-3">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-medium">Job posted successfully!</p>
                <p className="text-sm opacity-80">Redirecting to dashboard...</p>
              </div>
            </motion.div>
          )}

          {/* Error message */}
          {formError && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-red-500/20 border border-red-500/30 text-red-400 p-4 rounded-lg mb-6 flex items-center"
            >
              <div className="flex-shrink-0 rounded-full p-1 bg-red-500/20 mr-3">
                <X className="w-5 h-5 text-red-500" />
              </div>
              <p className="font-medium">{formError}</p>
            </motion.div>
          )}

          {/* Job Post Form */}
          <form onSubmit={handleSubmit} className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 border-b border-slate-700">
              <h2 className="text-xl font-semibold text-white mb-1">Job Details</h2>
              <p className="text-slate-400 text-sm">Fill in the details of the job posting</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic job information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1">
                    Job Title <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                      placeholder="e.g. Frontend Developer"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-slate-300 mb-1">
                    Department
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      id="department"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                      placeholder="e.g. Engineering"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-slate-300 mb-1">
                    Location <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                      placeholder="e.g. Mumbai, India"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="locationType" className="block text-sm font-medium text-slate-300 mb-1">
                    Location Type
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <select
                      id="locationType"
                      value={locationType}
                      onChange={(e) => setLocationType(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors appearance-none"
                    >
                      <option value="onsite">On-site</option>
                      <option value="remote">Remote</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="employmentType" className="block text-sm font-medium text-slate-300 mb-1">
                    Employment Type
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <select
                      id="employmentType"
                      value={employmentType}
                      onChange={(e) => setEmploymentType(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors appearance-none"
                    >
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="temporary">Temporary</option>
                      <option value="internship">Internship</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label htmlFor="experienceLevel" className="block text-sm font-medium text-slate-300 mb-1">
                    Experience Level
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <select
                      id="experienceLevel"
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors appearance-none"
                    >
                      <option value="entry">Entry Level</option>
                      <option value="junior">Junior</option>
                      <option value="mid">Mid Level</option>
                      <option value="senior">Senior</option>
                      <option value="executive">Executive</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Salary information */}
              <div className="pt-4 border-t border-slate-700">
                <h3 className="text-lg font-medium text-white mb-3">Salary Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label htmlFor="salaryMin" className="block text-sm font-medium text-slate-300 mb-1">
                      Minimum Salary
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type="number"
                        id="salaryMin"
                        value={salaryMin}
                        onChange={(e) => setSalaryMin(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                        placeholder="Min"
                        min="0"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="salaryMax" className="block text-sm font-medium text-slate-300 mb-1">
                      Maximum Salary
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type="number"
                        id="salaryMax"
                        value={salaryMax}
                        onChange={(e) => setSalaryMax(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                        placeholder="Max"
                        min="0"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="salaryCurrency" className="block text-sm font-medium text-slate-300 mb-1">
                      Currency
                    </label>
                    <div className="relative">
                      <select
                        id="salaryCurrency"
                        value={salaryCurrency}
                        onChange={(e) => setSalaryCurrency(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors appearance-none"
                      >
                        <option value="INR">INR (₹)</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="salaryPeriod" className="block text-sm font-medium text-slate-300 mb-1">
                      Period
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <select
                        id="salaryPeriod"
                        value={salaryPeriod}
                        onChange={(e) => setSalaryPeriod(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors appearance-none"
                      >
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="annual">Annual</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Job description */}
              <div className="pt-4 border-t border-slate-700">
                <h3 className="text-lg font-medium text-white mb-3">Job Description</h3>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-1">
                    Description <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={5}
                    className="w-full px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                    placeholder="Describe the job position, role, and company culture..."
                  ></textarea>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="pt-4 border-t border-slate-700">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium text-white">Responsibilities</h3>
                  <button
                    type="button"
                    onClick={() => addListItem("responsibilities")}
                    className="flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Responsibility
                  </button>
                </div>
                
                <div className="space-y-3">
                  {responsibilities.map((responsibility, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={responsibility}
                        onChange={(e) => handleListItemChange(index, e.target.value, "responsibilities")}
                        className="flex-1 px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                        placeholder="Enter a responsibility"
                      />
                      {responsibilities.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeListItem(index, "responsibilities")}
                          className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="pt-4 border-t border-slate-700">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium text-white">Requirements</h3>
                  <button
                    type="button"
                    onClick={() => addListItem("requirements")}
                    className="flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Requirement
                  </button>
                </div>
                
                <div className="space-y-3">
                  {requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={requirement}
                        onChange={(e) => handleListItemChange(index, e.target.value, "requirements")}
                        className="flex-1 px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                        placeholder="Enter a requirement"
                      />
                      {requirements.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeListItem(index, "requirements")}
                          className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="pt-4 border-t border-slate-700">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium text-white">Benefits</h3>
                  <button
                    type="button"
                    onClick={() => addListItem("benefits")}
                    className="flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Benefit
                  </button>
                </div>
                
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={benefit}
                        onChange={(e) => handleListItemChange(index, e.target.value, "benefits")}
                        className="flex-1 px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                        placeholder="Enter a benefit"
                      />
                      {benefits.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeListItem(index, "benefits")}
                          className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Application details */}
              <div className="pt-4 border-t border-slate-700">
                <h3 className="text-lg font-medium text-white mb-3">Application Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="applicationDeadline" className="block text-sm font-medium text-slate-300 mb-1">
                      Application Deadline
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type="date"
                        id="applicationDeadline"
                        value={applicationDeadline}
                        onChange={(e) => setApplicationDeadline(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="applicationUrl" className="block text-sm font-medium text-slate-300 mb-1">
                      External Application URL (Optional)
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type="url"
                        id="applicationUrl"
                        value={applicationUrl}
                        onChange={(e) => setApplicationUrl(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-700 border border-slate-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                        placeholder="https://example.com/apply"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit button */}
            <div className="px-6 py-4 bg-slate-700/30 flex justify-end">
              <button
                type="submit"
                className="flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors"
              >
                <Save className="h-5 w-5 mr-2" />
                Post Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 