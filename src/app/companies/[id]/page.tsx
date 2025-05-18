"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  Building, 
  MapPin, 
  Briefcase, 
  Users, 
  Globe, 
  ChevronDown, 
  Calendar, 
  Mail, 
  Phone,
  ArrowLeft,
  ExternalLink,
  Clock
} from "lucide-react";

// Company interface
interface Company {
  id: number;
  name: string;
  logo?: string;
  hasLogo?: boolean;
  industry: string;
  location: string;
  description: string;
  jobCount: number;
  website?: string;
  size?: string;
  founded?: string;
  employees?: string;
  headquarters?: string;
  specialties?: string[];
  about?: string;
}

// Job interface
interface Job {
  id: number;
  title: string;
  department?: string;
  company: string;
  companyId: number;
  location: string;
  locationType: string;
  employmentType: string;
  experienceLevel: string;
  salary: {
    min: number | null;
    max: number | null;
    currency: string;
    period: string;
  };
  description: string;
  postedDate: string;
  applicantsCount: number;
}

export default function CompanyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const companyId = parseInt(params.id as string);
  
  const [company, setCompany] = useState<Company | null>(null);
  const [companyJobs, setCompanyJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Fetch company details
    try {
      const companiesData = localStorage.getItem("companies");
      if (companiesData) {
        const companies = JSON.parse(companiesData);
        const foundCompany = companies.find((c: Company) => c.id === companyId);
        
        if (foundCompany) {
          setCompany(foundCompany);
          
          // Fetch jobs for this company
          const jobsData = localStorage.getItem("jobs");
          if (jobsData) {
            const jobs = JSON.parse(jobsData);
            const filteredJobs = jobs.filter((job: Job) => job.companyId === companyId);
            setCompanyJobs(filteredJobs);
          }
        } else {
          setError("Company not found");
        }
      } else {
        setError("No companies data available");
      }
    } catch (error) {
      console.error("Error fetching company data:", error);
      setError("Error loading company data");
    } finally {
      setLoading(false);
    }
  }, [companyId]);
  
  // Function to format date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (error) {
      return dateString;
    }
  };
  
  // Format salary range
  const formatSalary = (salary: Job['salary']) => {
    const { min, max, currency, period } = salary;
    
    let displayCurrency = '';
    switch(currency) {
      case 'USD':
        displayCurrency = '$';
        break;
      case 'EUR':
        displayCurrency = '€';
        break;
      case 'GBP':
        displayCurrency = '£';
        break;
      case 'INR':
      default:
        displayCurrency = '₹';
        break;
    }
    
    let displayPeriod = '';
    switch(period) {
      case 'hourly':
        displayPeriod = '/hr';
        break;
      case 'daily':
        displayPeriod = '/day';
        break;
      case 'weekly':
        displayPeriod = '/week';
        break;
      case 'monthly':
        displayPeriod = '/month';
        break;
      case 'annual':
      default:
        displayPeriod = '/year';
        break;
    }
    
    if (min && max) {
      return `${displayCurrency}${min.toLocaleString()} - ${displayCurrency}${max.toLocaleString()}${displayPeriod}`;
    } else if (min) {
      return `${displayCurrency}${min.toLocaleString()}${displayPeriod}`;
    } else if (max) {
      return `Up to ${displayCurrency}${max.toLocaleString()}${displayPeriod}`;
    } else {
      return 'Not specified';
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  
  if (error || !company) {
    return (
      <div className="min-h-screen bg-slate-900 text-white pt-32">
        <div className="max-w-4xl mx-auto p-8 text-center">
          <Building className="h-16 w-16 text-slate-700 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-4">Company Not Found</h1>
          <p className="text-slate-400 mb-8">{error || "The company you're looking for doesn't exist or has been removed."}</p>
          <Link 
            href="/companies" 
            className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Companies
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Fixed height spacer to push content below navbar */}
      <div className="h-20"></div>
      
      <div className="p-4 md:p-8 mt-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb navigation */}
          <div className="mb-8">
            <Link 
              href="/companies" 
              className="flex items-center text-sm text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Back to Companies</span>
            </Link>
          </div>

          {/* Company header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-slate-800 rounded-lg overflow-hidden shadow-lg"
          >
            <div className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center">
                <div className="w-20 h-20 bg-slate-700 rounded-lg flex items-center justify-center mr-6 mb-4 md:mb-0 flex-shrink-0">
                  {company.hasLogo || company.logo ? (
                    <img src={company.logo} alt={`${company.name} logo`} className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <Building className="h-12 w-12 text-purple-400" />
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{company.name}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1 text-purple-400" />
                      <span>{company.industry}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-purple-400" />
                      <span>{company.location}</span>
                    </div>
                    {company.size && (
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-purple-400" />
                        <span>{company.size}</span>
                      </div>
                    )}
                    {company.website && (
                      <a 
                        href={company.website.startsWith('http') ? company.website : `https://${company.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center hover:text-purple-400 transition-colors"
                      >
                        <Globe className="h-4 w-4 mr-1 text-purple-400" />
                        <span>{company.website.replace(/^https?:\/\//, '')}</span>
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Company info */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* About */}
              <div className="bg-slate-800 rounded-lg p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-white mb-4">About {company.name}</h2>
                <p className="text-slate-300 whitespace-pre-line">
                  {company.about || company.description}
                </p>
                
                {company.specialties && company.specialties.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-white mb-3">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {company.specialties.map((specialty, index) => (
                        <span 
                          key={index} 
                          className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Job postings */}
              <div className="bg-slate-800 rounded-lg p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white">Open Positions</h2>
                  <span className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm">
                    {companyJobs.length} jobs
                  </span>
                </div>
                
                {companyJobs.length > 0 ? (
                  <div className="space-y-4">
                    {companyJobs.map((job) => (
                      <div 
                        key={job.id}
                        className="p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                      >
                        <Link href={`/jobs/${job.id}`} className="block">
                          <h3 className="text-lg font-medium text-white mb-2">{job.title}</h3>
                          
                          <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-slate-300 mb-3">
                            {job.department && (
                              <div className="flex items-center">
                                <Briefcase className="h-4 w-4 mr-1 text-slate-400" />
                                <span>{job.department}</span>
                              </div>
                            )}
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1 text-slate-400" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-slate-400" />
                              <span>{job.employmentType.replace('-', ' ')}</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-purple-400">
                              {formatSalary(job.salary)}
                            </div>
                            <div className="text-xs text-slate-400">
                              Posted {formatDate(job.postedDate)}
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-slate-700/50 p-6 rounded-md text-center">
                    <Briefcase className="h-10 w-10 text-slate-500 mx-auto mb-3" />
                    <p className="text-slate-400">No open positions at the moment.</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Check back later for new opportunities.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
            
            {/* Company details sidebar */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-8"
            >
              {/* Company overview */}
              <div className="bg-slate-800 rounded-lg p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-white mb-4">Company Overview</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-slate-400">Industry</h3>
                    <p className="text-white">{company.industry}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-slate-400">Location</h3>
                    <p className="text-white">{company.location}</p>
                  </div>
                  
                  {company.size && (
                    <div>
                      <h3 className="text-sm font-medium text-slate-400">Company Size</h3>
                      <p className="text-white">{company.size}</p>
                    </div>
                  )}
                  
                  {company.founded && (
                    <div>
                      <h3 className="text-sm font-medium text-slate-400">Founded</h3>
                      <p className="text-white">{company.founded}</p>
                    </div>
                  )}
                  
                  {company.headquarters && (
                    <div>
                      <h3 className="text-sm font-medium text-slate-400">Headquarters</h3>
                      <p className="text-white">{company.headquarters}</p>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-sm font-medium text-slate-400">Job Openings</h3>
                    <p className="text-white">{company.jobCount || companyJobs.length} open positions</p>
                  </div>
                </div>
              </div>
              
              {/* Contact info */}
              <div className="bg-slate-800 rounded-lg p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-white mb-4">Contact Information</h2>
                
                {company.website && (
                  <div className="flex items-start mb-4">
                    <Globe className="h-5 w-5 text-purple-400 mt-0.5 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-slate-400">Website</h3>
                      <a 
                        href={company.website.startsWith('http') ? company.website : `https://${company.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white hover:text-purple-400 transition-colors flex items-center"
                      >
                        <span>{company.website.replace(/^https?:\/\//, '')}</span>
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-purple-400 mt-0.5 mr-3" />
                  <div>
                    <h3 className="text-sm font-medium text-slate-400">Address</h3>
                    <p className="text-white">{company.location}</p>
                  </div>
                </div>
              </div>
              
              {/* Similar companies - would be implemented with real data */}
              <div className="bg-slate-800 rounded-lg p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-white mb-4">Similar Companies</h2>
                <p className="text-slate-400 text-sm">Companies in {company.industry}</p>
                
                <Link 
                  href="/companies" 
                  className="inline-block mt-4 text-sm text-purple-400 hover:text-purple-300"
                >
                  View all companies
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 