"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Filter, X, BriefcaseBusiness, DollarSign } from "lucide-react";
import { JobCard } from "@/components/job/JobCard";
import { Button } from "@/components/ui/button";

// Mock data for jobs
const MOCK_JOBS = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "New York, NY (Remote)",
    salary: "$120K - $150K",
    type: "Full-time",
    postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    tags: ["React", "TypeScript", "Next.js"],
    isFeatured: true,
  },
  {
    id: "2",
    title: "UX/UI Designer",
    company: "Design Masters",
    location: "San Francisco, CA",
    salary: "$90K - $120K",
    type: "Full-time",
    postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    tags: ["Figma", "UI/UX", "User Research"],
    isFeatured: true,
  },
  {
    id: "3",
    title: "DevOps Engineer",
    company: "Cloud Systems",
    location: "Remote",
    salary: "$130K - $160K",
    type: "Contract",
    postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    tags: ["AWS", "Kubernetes", "Docker", "CI/CD"],
    isFeatured: false,
  },
  {
    id: "4",
    title: "Backend Developer",
    company: "ServerTech",
    location: "Austin, TX",
    salary: "$100K - $130K",
    type: "Full-time",
    postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    tags: ["Node.js", "Express", "MongoDB", "API"],
    isFeatured: false,
  },
  {
    id: "5",
    title: "Mobile App Developer",
    company: "AppWorks",
    location: "Chicago, IL (Hybrid)",
    salary: "$110K - $140K",
    type: "Full-time",
    postedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    tags: ["React Native", "iOS", "Android", "Mobile"],
    isFeatured: false,
  },
  {
    id: "6",
    title: "Data Scientist",
    company: "DataMinds",
    location: "Boston, MA",
    salary: "$125K - $160K",
    type: "Full-time",
    postedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    tags: ["Python", "Machine Learning", "SQL", "Data Analysis"],
    isFeatured: false,
  },
  {
    id: "7",
    title: "Technical Writer",
    company: "DocuTech",
    location: "Remote",
    salary: "$80K - $100K",
    type: "Part-time",
    postedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
    tags: ["Documentation", "API Docs", "Technical Writing"],
    isFeatured: false,
  },
  {
    id: "8",
    title: "Product Manager",
    company: "ProductHub",
    location: "Seattle, WA",
    salary: "$130K - $160K",
    type: "Full-time",
    postedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(), // 8 days ago
    tags: ["Product Management", "Agile", "User Stories"],
    isFeatured: false,
  },
];

// Filter options
const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"];
const EXPERIENCE_LEVELS = ["Entry Level", "Mid Level", "Senior Level", "Director", "Executive"];
const SALARY_RANGES = ["$0 - $50K", "$50K - $100K", "$100K - $150K", "$150K+"];

export default function JobsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedExperienceLevels, setSelectedExperienceLevels] = useState<string[]>([]);
  const [selectedSalaryRanges, setSelectedSalaryRanges] = useState<string[]>([]);

  // Toggle job type selection
  const toggleJobType = (type: string) => {
    if (selectedJobTypes.includes(type)) {
      setSelectedJobTypes(selectedJobTypes.filter(t => t !== type));
    } else {
      setSelectedJobTypes([...selectedJobTypes, type]);
    }
  };

  // Toggle experience level selection
  const toggleExperience = (level: string) => {
    if (selectedExperienceLevels.includes(level)) {
      setSelectedExperienceLevels(selectedExperienceLevels.filter(l => l !== level));
    } else {
      setSelectedExperienceLevels([...selectedExperienceLevels, level]);
    }
  };

  // Toggle salary range selection
  const toggleSalaryRange = (range: string) => {
    if (selectedSalaryRanges.includes(range)) {
      setSelectedSalaryRanges(selectedSalaryRanges.filter(r => r !== range));
    } else {
      setSelectedSalaryRanges([...selectedSalaryRanges, range]);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setLocation("");
    setSelectedJobTypes([]);
    setSelectedExperienceLevels([]);
    setSelectedSalaryRanges([]);
  };

  // Filter jobs based on selections
  const filteredJobs = MOCK_JOBS.filter(job => {
    // Search term filter
    if (searchTerm && !job.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !job.company.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Location filter
    if (location && !job.location.toLowerCase().includes(location.toLowerCase())) {
      return false;
    }
    
    // Job type filter
    if (selectedJobTypes.length > 0 && !selectedJobTypes.includes(job.type)) {
      return false;
    }
    
    // For demo purposes, we'll skip actual experience level and salary filtering
    // since our mock data doesn't have those fields with matching formats
    
    return true;
  });

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Hero */}
        <div className="flex flex-col mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Find Your Dream Job
          </h1>
          <p className="text-muted-foreground mb-6">
            Browse through thousands of full-time and part-time jobs near you
          </p>
        </div>

        {/* Search */}
        <div className="bg-card rounded-2xl shadow-sm border p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder="Job title, skills, or company"
                className="w-full h-12 pl-10 pr-4 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-grow md:max-w-[280px] relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder="City, state, or remote"
                className="w-full h-12 pl-10 pr-4 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <Button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              variant="outline"
              className="md:w-auto h-12 px-6 rounded-xl border flex items-center gap-2"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
              {(selectedJobTypes.length > 0 || selectedExperienceLevels.length > 0 || selectedSalaryRanges.length > 0) && (
                <span className="ml-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {selectedJobTypes.length + selectedExperienceLevels.length + selectedSalaryRanges.length}
                </span>
              )}
            </Button>
          </div>

          {/* Filters */}
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 pt-6 border-t"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Job Types */}
                <div>
                  <h3 className="font-medium mb-3 text-foreground">Job Type</h3>
                  <div className="space-y-2">
                    {JOB_TYPES.map((type) => (
                      <label key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded text-primary border-input h-4 w-4"
                          checked={selectedJobTypes.includes(type)}
                          onChange={() => toggleJobType(type)}
                        />
                        <span className="ml-2 text-sm">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Experience Level */}
                <div>
                  <h3 className="font-medium mb-3 text-foreground">Experience Level</h3>
                  <div className="space-y-2">
                    {EXPERIENCE_LEVELS.map((level) => (
                      <label key={level} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded text-primary border-input h-4 w-4"
                          checked={selectedExperienceLevels.includes(level)}
                          onChange={() => toggleExperience(level)}
                        />
                        <span className="ml-2 text-sm">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Salary Range */}
                <div>
                  <h3 className="font-medium mb-3 text-foreground">Salary Range</h3>
                  <div className="space-y-2">
                    {SALARY_RANGES.map((range) => (
                      <label key={range} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded text-primary border-input h-4 w-4"
                          checked={selectedSalaryRanges.includes(range)}
                          onChange={() => toggleSalaryRange(range)}
                        />
                        <span className="ml-2 text-sm">{range}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6 pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={resetFilters}
                  className="mr-2"
                >
                  Reset
                </Button>
                <Button onClick={() => setIsFilterOpen(false)}>
                  Apply Filters
                </Button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Applied filters */}
        {(selectedJobTypes.length > 0 || selectedExperienceLevels.length > 0 || selectedSalaryRanges.length > 0) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedJobTypes.map(type => (
              <div 
                key={type} 
                className="bg-primary/10 text-primary rounded-full px-3 py-1.5 text-sm font-medium flex items-center"
              >
                <BriefcaseBusiness className="mr-1.5 h-3.5 w-3.5" />
                {type}
                <button 
                  onClick={() => toggleJobType(type)}
                  className="ml-1.5 rounded-full hover:bg-primary/20 p-0.5"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            
            {selectedSalaryRanges.map(range => (
              <div 
                key={range} 
                className="bg-primary/10 text-primary rounded-full px-3 py-1.5 text-sm font-medium flex items-center"
              >
                <DollarSign className="mr-1.5 h-3.5 w-3.5" />
                {range}
                <button 
                  onClick={() => toggleSalaryRange(range)}
                  className="ml-1.5 rounded-full hover:bg-primary/20 p-0.5"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Results info */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">
            Showing <span className="font-medium text-foreground">{filteredJobs.length}</span> jobs
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <select className="text-sm border rounded-md py-1.5 px-3 bg-background">
              <option>Most Relevant</option>
              <option>Newest</option>
              <option>Highest Salary</option>
            </select>
          </div>
        </div>

        {/* Job listings */}
        <div className="grid grid-cols-1 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <JobCard job={job} />
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20">
              <div className="bg-muted/30 inline-flex items-center justify-center w-16 h-16 rounded-full mb-4">
                <BriefcaseBusiness className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We couldn't find any jobs matching your search criteria. Try adjusting your filters or search terms.
              </p>
              <Button 
                variant="outline" 
                onClick={resetFilters}
                className="mt-6"
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredJobs.length > 0 && (
          <div className="mt-10 flex justify-center">
            <nav className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="px-4 py-2 rounded-lg"
                disabled
              >
                Previous
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
              >
                1
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="px-4 py-2 rounded-lg"
              >
                2
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="px-4 py-2 rounded-lg"
              >
                3
              </Button>
              <span className="px-2 text-muted-foreground">...</span>
              <Button 
                variant="outline" 
                size="sm" 
                className="px-4 py-2 rounded-lg"
              >
                10
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="px-4 py-2 rounded-lg"
              >
                Next
              </Button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
} 