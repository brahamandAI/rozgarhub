"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  UserRound, 
  Mail, 
  PhoneCall, 
  Briefcase, 
  GraduationCap, 
  MapPin,
  Linkedin,
  Github,
  Globe,
  Award,
  Languages,
  FileText,
  Edit,
  Upload,
  Download,
  Clock
} from "lucide-react";

interface JobSeeker {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  currentJobTitle: string;
  yearsOfExperience: string;
  education: string;
  skills: string[];
  resume: string;
  city: string;
  state: string;
  country: string;
  bio: string;
  linkedinUrl: string;
  githubUrl: string;
  portfolioUrl: string;
  preferredJobTypes: string[];
  expectedSalary: string;
  noticePeriod: string;
  languages: string[];
  certifications: string[];
}

export default function JobSeekerProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<JobSeeker | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userDataStr = localStorage.getItem('currentJobSeeker');
        if (!userDataStr) {
          router.push("/auth/jobseeker/login");
          return;
        }

        const userData = JSON.parse(userDataStr);
        
        // Fetch complete profile data
        const response = await fetch(`/api/jobseeker/profile?email=${userData.email}`);
        if (response.ok) {
          const profileData = await response.json();
          setProfile(profileData);
        } else {
          throw new Error("Failed to load profile");
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [router]);

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setResumeFile(file);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('email', profile?.email || '');

      const response = await fetch('/api/jobseeker/resume/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(prev => prev ? { ...prev, resume: data.resumeUrl } : null);
      } else {
        throw new Error('Failed to upload resume');
      }
    } catch (error) {
      console.error('Error uploading resume:', error);
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-1">Profile</h1>
              <p className="text-muted-foreground">
                View and manage your professional profile
              </p>
            </div>
            <Link
              href="/dashboard/job-seeker/profile/edit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Basic Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-background border border-border rounded-xl p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-24 h-24 bg-purple-600/10 rounded-full flex items-center justify-center mb-4">
                  <UserRound className="w-12 h-12 text-purple-400" />
                </div>
                <h2 className="text-xl font-semibold mb-1">{profile?.fullName}</h2>
                <p className="text-muted-foreground">{profile?.currentJobTitle}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">{profile?.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <PhoneCall className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">{profile?.phone || "Not provided"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {profile?.city && profile?.country 
                      ? `${profile.city}, ${profile.country}`
                      : "Location not specified"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="text-lg font-medium mb-4">Resume</h3>
              <div className="space-y-4">
                {profile?.resume ? (
                  <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-purple-400" />
                      <span className="text-muted-foreground">Current Resume</span>
                    </div>
                    <a
                      href={profile.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                    </a>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4">
                    No resume uploaded yet
                  </p>
                )}

                <div className="relative">
                  <input
                    type="file"
                    id="resume-upload"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isUploading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-5 h-5" />
                        Upload Resume
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Detailed Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="text-lg font-medium mb-4">About</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {profile?.bio || "No bio added yet. Add a bio to help recruiters know more about you."}
              </p>
            </div>

            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="text-lg font-medium mb-4">Professional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Education</p>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium">{profile?.education || "Not specified"}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Experience</p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <span className="font-medium">{profile?.yearsOfExperience || "Not specified"}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Expected Salary</p>
                  <span className="font-medium">{profile?.expectedSalary || "Not specified"}</span>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Notice Period</p>
                  <span className="font-medium">{profile?.noticePeriod || "Not specified"}</span>
                </div>
              </div>
            </div>

            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="text-lg font-medium mb-4">Skills & Expertise</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Technical Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {profile?.skills?.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-600/10 text-purple-400 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                    {(!profile?.skills || profile.skills.length === 0) && (
                      <span className="text-muted-foreground">No skills added yet</span>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Languages</p>
                  <div className="flex flex-wrap gap-2">
                    {profile?.languages?.map((language, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-600/10 text-purple-400 rounded-full text-sm"
                      >
                        {language}
                      </span>
                    ))}
                    {(!profile?.languages || profile.languages.length === 0) && (
                      <span className="text-muted-foreground">No languages added yet</span>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Certifications</p>
                  <div className="space-y-2">
                    {profile?.certifications?.map((cert, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-muted-foreground" />
                        <span className="text-muted-foreground">{cert}</span>
                      </div>
                    ))}
                    {(!profile?.certifications || profile.certifications.length === 0) && (
                      <span className="text-muted-foreground">No certifications added yet</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="text-lg font-medium mb-4">Social Links</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Linkedin className="w-5 h-5 text-muted-foreground" />
                  <a
                    href={profile?.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    {profile?.linkedinUrl || "LinkedIn profile not added"}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Github className="w-5 h-5 text-muted-foreground" />
                  <a
                    href={profile?.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    {profile?.githubUrl || "GitHub profile not added"}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <a
                    href={profile?.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    {profile?.portfolioUrl || "Portfolio website not added"}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
} 