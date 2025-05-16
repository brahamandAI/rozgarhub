"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Download, 
  Copy, 
  EyeIcon, 
  Plus,
  CalendarClock,
  ArrowUpDown,
  FolderOpen
} from "lucide-react";
import Link from "next/link";

type Resume = {
  id: number;
  name: string;
  lastModified: string;
  template: string;
  jobApplications: number;
};

export default function MyResumesPage() {
  const [sortBy, setSortBy] = useState("recent");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load saved resumes from local storage on component mount
  useEffect(() => {
    const loadSavedResumes = () => {
      setIsLoading(true);
      try {
        const savedResumes = localStorage.getItem('savedResumes');
        if (savedResumes) {
          setResumes(JSON.parse(savedResumes));
        }
      } catch (error) {
        console.error('Error loading saved resumes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSavedResumes();
  }, []);
  
  // Sort resumes based on selected sort option
  const sortedResumes = [...resumes].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
      case "oldest":
        return new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime();
      case "name-az":
        return a.name.localeCompare(b.name);
      case "name-za":
        return b.name.localeCompare(a.name);
      case "applications":
        return b.jobApplications - a.jobApplications;
      default:
        return 0;
    }
  });
  
  // Format date string to readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const toggleMenu = (id: number) => {
    setActiveMenu(activeMenu === id ? null : id);
  };
  
  const confirmDelete = (id: number) => {
    setShowDeleteConfirm(id);
    setActiveMenu(null);
  };
  
  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  };
  
  const handleDelete = (id: number) => {
    // Filter out the deleted resume
    const updatedResumes = resumes.filter(resume => resume.id !== id);
    
    // Update state and local storage
    setResumes(updatedResumes);
    localStorage.setItem('savedResumes', JSON.stringify(updatedResumes));
    
    setShowDeleteConfirm(null);
  };
  
  const handleDuplicate = (id: number) => {
    const resumeToDuplicate = resumes.find(resume => resume.id === id);
    
    if (resumeToDuplicate) {
      // Create duplicate with new ID and modified name
      const newResume = {
        ...resumeToDuplicate,
        id: Date.now(), // Use timestamp as new ID
        name: `${resumeToDuplicate.name} (Copy)`,
        lastModified: new Date().toISOString().split('T')[0],
      };
      
      const updatedResumes = [...resumes, newResume];
      
      // Update state and local storage
      setResumes(updatedResumes);
      localStorage.setItem('savedResumes', JSON.stringify(updatedResumes));
    }
    
    setActiveMenu(null);
  };

  return (
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold">My Resumes</h1>
            <p className="text-muted-foreground mt-2">
              Manage and organize all your saved resumes
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 md:mt-0"
          >
            <Link
              href="/resume-builder/create"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Resume
            </Link>
          </motion.div>
        </div>
        
        {/* Filters and Sorting */}
        {resumes.length > 0 && (
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm font-medium">
              {resumes.length} {resumes.length === 1 ? 'Resume' : 'Resumes'}
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm bg-background border border-border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest</option>
                <option value="name-az">Name (A-Z)</option>
                <option value="name-za">Name (Z-A)</option>
                <option value="applications">Job Applications</option>
              </select>
            </div>
          </div>
        )}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your resumes...</p>
          </div>
        )}
        
        {/* Resumes List */}
        {!isLoading && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {sortedResumes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedResumes.map((resume) => (
                  <motion.div
                    key={resume.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                    className="bg-background border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {showDeleteConfirm === resume.id ? (
                      <div className="p-6">
                        <p className="text-center mb-4">Are you sure you want to delete this resume?</p>
                        <div className="flex justify-center space-x-3">
                          <button
                            onClick={() => handleDelete(resume.id)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          >
                            Delete
                          </button>
                          <button
                            onClick={cancelDelete}
                            className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="relative h-48 bg-muted flex items-center justify-center border-b border-border">
                          <FileText className="w-16 h-16 text-primary/40" />
                          <div className="absolute top-3 right-3">
                            <div className="relative">
                              <button
                                onClick={() => toggleMenu(resume.id)}
                                className="p-1 rounded-full hover:bg-background/80"
                              >
                                <MoreVertical className="w-5 h-5" />
                              </button>
                              
                              {activeMenu === resume.id && (
                                <div className="absolute right-0 mt-1 w-48 bg-background border border-border rounded-lg shadow-lg overflow-hidden z-10">
                                  <div className="py-1">
                                    <Link
                                      href={`/resume-builder/edit/${resume.id}`}
                                      className="flex items-center px-4 py-2 text-sm hover:bg-muted"
                                    >
                                      <Edit2 className="w-4 h-4 mr-3" />
                                      Edit
                                    </Link>
                                    <Link
                                      href={`/resume-builder/preview/${resume.id}`}
                                      className="flex items-center px-4 py-2 text-sm hover:bg-muted"
                                    >
                                      <EyeIcon className="w-4 h-4 mr-3" />
                                      Preview
                                    </Link>
                                    <button
                                      onClick={() => handleDuplicate(resume.id)}
                                      className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-muted"
                                    >
                                      <Copy className="w-4 h-4 mr-3" />
                                      Duplicate
                                    </button>
                                    <button
                                      className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-muted"
                                    >
                                      <Download className="w-4 h-4 mr-3" />
                                      Download PDF
                                    </button>
                                    <div className="border-t border-border my-1"></div>
                                    <button
                                      onClick={() => confirmDelete(resume.id)}
                                      className="flex items-center w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-muted"
                                    >
                                      <Trash2 className="w-4 h-4 mr-3" />
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <h3 className="font-medium text-lg truncate">{resume.name}</h3>
                          <div className="mt-2 flex flex-col space-y-1">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <CalendarClock className="w-3.5 h-3.5 mr-1.5" />
                              Last modified: {formatDate(resume.lastModified)}
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <FileText className="w-3.5 h-3.5 mr-1.5" />
                              Template: {resume.template}
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <ArrowUpDown className="w-3.5 h-3.5 mr-1.5" />
                              {resume.jobApplications} job applications
                            </div>
                          </div>
                          
                          <div className="mt-4 flex space-x-2">
                            <Link
                              href={`/resume-builder/edit/${resume.id}`}
                              className="flex-1 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-md text-center hover:bg-primary/20 transition-colors"
                            >
                              Edit
                            </Link>
                            <button
                              className="flex-1 py-1.5 bg-muted text-foreground text-sm font-medium rounded-md hover:bg-muted/80 transition-colors"
                            >
                              Download
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-background border border-border rounded-xl">
                <FolderOpen className="w-16 h-16 mx-auto text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-medium">No resumes yet</h3>
                <p className="mt-1 text-muted-foreground">Create your first resume to get started</p>
                <Link
                  href="/resume-builder/create"
                  className="mt-6 inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create New Resume
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
} 