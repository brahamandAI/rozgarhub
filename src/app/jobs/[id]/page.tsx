"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Briefcase, MapPin, Calendar, Building, Clock, DollarSign, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { JobLogo } from "@/components/ui/JobLogo";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Job interface
interface Job {
  id: string | number;
  title: string;
  company: string;
  companyId?: number;
  logo?: string;
  location: string;
  locationType?: string;
  salary?: string | {
    min: number | null;
    max: number | null;
    currency: string;
    period: string;
  };
  employmentType?: string;
  type?: string;
  experienceLevel?: string;
  postedAt?: string;
  postedDate?: string;
  tags?: string[];
  description?: string;
  responsibilities?: string[];
  requirements?: string[];
  benefits?: string[];
  applicationDeadline?: string;
  applicationUrl?: string;
  applicantsCount?: number;
}

// Resume interface
interface Resume {
  id: number;
  name: string;
  lastModified: string;
  template: string;
  jobApplications: number;
  data: any;
}

export default function JobDetailPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params?.id;
  
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState<number | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [applicationMessage, setApplicationMessage] = useState("");
  const [showResumeSelector, setShowResumeSelector] = useState(false);

  // Fetch job data and saved resumes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch job data
        const jobsDataStr = localStorage.getItem("jobs");
        if (jobsDataStr) {
          const jobs = JSON.parse(jobsDataStr);
          const foundJob = jobs.find((j: Job) => j.id.toString() === jobId);
          if (foundJob) {
            setJob(foundJob);
          }
        }
        
        // Fetch saved resumes
        const savedResumesStr = localStorage.getItem("savedResumes");
        if (savedResumesStr) {
          const savedResumes = JSON.parse(savedResumesStr);
          setResumes(savedResumes);
          if (savedResumes.length > 0) {
            setSelectedResumeId(savedResumes[0].id); // Select first resume by default
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (jobId) {
      fetchData();
    }
  }, [jobId]);

  // Handle one-click apply
  const handleOneClickApply = () => {
    if (resumes.length === 0) {
      // No saved resumes, redirect to resume builder
      router.push("/resume-builder/create");
      return;
    }
    
    if (resumes.length === 1) {
      // If user has only one resume, apply directly
      applyWithResume(resumes[0].id);
    } else {
      // If user has multiple resumes, show resume selector
      setShowResumeSelector(true);
    }
  };
  
  // Apply with selected resume
  const applyWithResume = (resumeId: number) => {
    setApplicationStatus("loading");
    setShowApplyModal(true);
    
    // Simulate API call
    setTimeout(() => {
      try {
        // Get selected resume
        const selectedResume = resumes.find(resume => resume.id === resumeId);
        if (!selectedResume || !job) {
          throw new Error("Resume or job not found");
        }
        
        // Get existing applications
        const applicationsStr = localStorage.getItem("applications");
        const applications = applicationsStr ? JSON.parse(applicationsStr) : [];
        
        // Create new application
        const newApplication = {
          id: Date.now(),
          jobId: job.id,
          jobTitle: job.title,
          company: job.company,
          location: job.location,
          resumeId: selectedResume.id,
          resumeName: selectedResume.name,
          applicationDate: new Date().toISOString(),
          status: "Applied"
        };
        
        // Add to applications
        applications.push(newApplication);
        localStorage.setItem("applications", JSON.stringify(applications));
        
        // Update resume job applications count
        const updatedResumes = resumes.map(resume => {
          if (resume.id === selectedResume.id) {
            return {
              ...resume,
              jobApplications: (resume.jobApplications || 0) + 1
            };
          }
          return resume;
        });
        localStorage.setItem("savedResumes", JSON.stringify(updatedResumes));
        
        // Update job applicants count
        if (job) {
          const jobsDataStr = localStorage.getItem("jobs");
          if (jobsDataStr) {
            const jobs = JSON.parse(jobsDataStr);
            const updatedJobs = jobs.map((j: Job) => {
              if (j.id.toString() === job.id.toString()) {
                return {
                  ...j,
                  applicantsCount: (j.applicantsCount || 0) + 1
                };
              }
              return j;
            });
            localStorage.setItem("jobs", JSON.stringify(updatedJobs));
          }
        }
        
        // Update dashboard activity
        const dashboardDataStr = localStorage.getItem("dashboardData");
        if (dashboardDataStr) {
          const dashboardData = JSON.parse(dashboardDataStr);
          if (dashboardData.activities) {
            dashboardData.activities.unshift({
              id: Date.now(),
              action: `Applied to '${job.title}' at ${job.company}`,
              time: "Just now",
              user: "You"
            });
            localStorage.setItem("dashboardData", JSON.stringify(dashboardData));
          }
        }
        
        setApplicationStatus("success");
        setApplicationMessage("Application submitted successfully!");
      } catch (error) {
        console.error("Error applying for job:", error);
        setApplicationStatus("error");
        setApplicationMessage("Failed to submit application. Please try again.");
      }
    }, 1500);
  };
  
  // Format salary display
  const formatSalary = (salary: any) => {
    if (typeof salary === 'string') return salary;
    
    if (salary && typeof salary === 'object') {
      const { min, max, currency, period } = salary;
      let salaryText = '';
      
      if (min && max) {
        salaryText = `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}`;
      } else if (min) {
        salaryText = `${currency} ${min.toLocaleString()}+`;
      } else if (max) {
        salaryText = `Up to ${currency} ${max.toLocaleString()}`;
      }
      
      if (period) {
        salaryText += ` per ${period === 'annual' ? 'year' : period}`;
      }
      
      return salaryText;
    }
    
    return 'Salary not specified';
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!job) {
    return (
      <div className="min-h-screen pt-28 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center py-20">
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
              <XCircle className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
            <p className="text-muted-foreground mb-8">The job you're looking for doesn't exist or has been removed.</p>
            <Link href="/jobs">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Jobs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <main className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Back button */}
        <div className="mb-6">
          <Link href="/jobs" className="inline-flex items-center text-sm font-medium hover:text-primary transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Jobs
          </Link>
        </div>
        
        {/* Job Header */}
        <div className="bg-card border border-border rounded-xl p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Job Logo */}
            <div className="flex-shrink-0">
              {job.logo ? (
                <Image 
                  src={job.logo} 
                  alt={`${job.company} logo`} 
                  width={80} 
                  height={80}
                  className="bg-background rounded-lg object-contain p-2 border"
                />
              ) : (
                <JobLogo 
                  name={job.company} 
                  size="lg" 
                />
              )}
            </div>
            
            {/* Job Info */}
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold">{job.title}</h1>
              
              <div className="flex items-center mt-2 text-muted-foreground">
                <Building className="w-4 h-4 mr-1.5 flex-shrink-0" />
                <span className="text-base">{job.company}</span>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0" />
                  <span>{job.location}</span>
                  {job.locationType && <span> • {job.locationType}</span>}
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Briefcase className="w-4 h-4 mr-1.5 flex-shrink-0" />
                  <span>{job.employmentType || job.type}</span>
                </div>
                
                {job.experienceLevel && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>{job.experienceLevel} level</span>
                  </div>
                )}
                
                {(job.postedAt || job.postedDate) && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1.5 flex-shrink-0" />
                    <span>Posted {job.postedAt || job.postedDate}</span>
                  </div>
                )}
              </div>
              
              {job.salary && (
                <div className="mt-4 flex items-center">
                  <DollarSign className="w-4 h-4 mr-1.5 text-muted-foreground flex-shrink-0" />
                  <span className="text-base font-medium">{formatSalary(job.salary)}</span>
                </div>
              )}
              
              {job.tags && job.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {job.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            {/* Apply Button */}
            <div className="w-full md:w-auto">
              <Button 
                onClick={handleOneClickApply}
                size="lg" 
                className="w-full md:w-auto px-8"
              >
                Apply Now
              </Button>
              {resumes.length === 0 && (
                <p className="text-xs text-muted-foreground mt-2 text-center md:text-right">
                  No resume found. You'll be redirected to create one.
                </p>
              )}
              {resumes.length === 1 && (
                <p className="text-xs text-muted-foreground mt-2 text-center md:text-right">
                  One-click apply with your resume
                </p>
              )}
              {resumes.length > 1 && (
                <p className="text-xs text-muted-foreground mt-2 text-center md:text-right">
                  Choose from {resumes.length} saved resumes
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* Job Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Description */}
            {job.description && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-line">{job.description}</p>
                </div>
              </div>
            )}
            
            {/* Responsibilities */}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Responsibilities</h2>
                <ul className="list-disc list-inside space-y-2">
                  {job.responsibilities.map((item, index) => (
                    <li key={index} className="text-muted-foreground">{item}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                <ul className="list-disc list-inside space-y-2">
                  {job.requirements.map((item, index) => (
                    <li key={index} className="text-muted-foreground">{item}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Benefits */}
            {job.benefits && job.benefits.length > 0 && (
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-xl font-semibold mb-4">Benefits</h2>
                <ul className="list-disc list-inside space-y-2">
                  {job.benefits.map((item, index) => (
                    <li key={index} className="text-muted-foreground">{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Application Details */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Application Details</h2>
              
              <div className="space-y-4">
                {job.applicationDeadline && (
                  <div>
                    <h3 className="text-sm font-medium">Deadline</h3>
                    <p className="text-muted-foreground flex items-center mt-1">
                      <Calendar className="w-4 h-4 mr-1.5 flex-shrink-0" />
                      {job.applicationDeadline}
                    </p>
                  </div>
                )}
                
                {job.applicantsCount !== undefined && (
                  <div>
                    <h3 className="text-sm font-medium">Applications</h3>
                    <p className="text-muted-foreground mt-1">
                      {job.applicantsCount} {job.applicantsCount === 1 ? 'applicant' : 'applicants'} so far
                    </p>
                  </div>
                )}
                
                {job.applicationUrl && (
                  <div>
                    <h3 className="text-sm font-medium">External Application</h3>
                    <a 
                      href={job.applicationUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline mt-1 inline-block"
                    >
                      Apply on company website
                    </a>
                  </div>
                )}
              </div>
              
              <Button
                onClick={handleOneClickApply}
                className="w-full mt-6"
              >
                Apply with Resume
              </Button>
            </div>
            
            {/* Company Information */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">About the Company</h2>
              <Link 
                href={job.companyId ? `/companies/${job.companyId}` : '#'} 
                className="flex items-center hover:text-primary transition-colors"
              >
                <div className="flex-shrink-0 mr-3">
                  {job.logo ? (
                    <Image 
                      src={job.logo} 
                      alt={`${job.company} logo`} 
                      width={40} 
                      height={40}
                      className="bg-background rounded-lg object-contain p-1 border"
                    />
                  ) : (
                    <JobLogo 
                      name={job.company} 
                      size="sm" 
                    />
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{job.company}</h3>
                  <p className="text-sm text-muted-foreground">View company profile</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Resume Selector Modal */}
      {showResumeSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">Choose a Resume</h2>
            <div className="max-h-96 overflow-y-auto">
              {resumes.map(resume => (
                <div 
                  key={resume.id}
                  onClick={() => setSelectedResumeId(resume.id)}
                  className={`p-4 border rounded-lg mb-3 cursor-pointer ${
                    selectedResumeId === resume.id ? 'border-primary bg-primary/10' : 'border-border'
                  }`}
                >
                  <div className="flex items-center">
                    <div className="flex-1">
                      <h3 className="font-medium">{resume.name}</h3>
                      <p className="text-sm text-muted-foreground">Last modified: {resume.lastModified}</p>
                    </div>
                    {selectedResumeId === resume.id && (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowResumeSelector(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1"
                onClick={() => {
                  if (selectedResumeId) {
                    applyWithResume(selectedResumeId);
                    setShowResumeSelector(false);
                  }
                }}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
      
      {/* Application Status Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-xl max-w-md w-full p-6 text-center"
          >
            {applicationStatus === "loading" && (
              <>
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-6"></div>
                <h2 className="text-xl font-semibold mb-2">Submitting Application</h2>
                <p className="text-muted-foreground">Please wait while we submit your application...</p>
              </>
            )}
            
            {applicationStatus === "success" && (
              <>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Application Submitted!</h2>
                <p className="text-muted-foreground mb-6">{applicationMessage}</p>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      setShowApplyModal(false);
                      router.push("/dashboard/job-seeker");
                    }}
                  >
                    View Applications
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => setShowApplyModal(false)}
                  >
                    Close
                  </Button>
                </div>
              </>
            )}
            
            {applicationStatus === "error" && (
              <>
                <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-6">
                  <XCircle className="h-10 w-10 text-destructive" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Application Failed</h2>
                <p className="text-muted-foreground mb-6">{applicationMessage}</p>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setShowApplyModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      setApplicationStatus("loading");
                      applyWithResume(selectedResumeId!);
                    }}
                  >
                    Try Again
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </main>
  );
} 