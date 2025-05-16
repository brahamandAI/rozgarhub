"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Plus, 
  ChevronDown, 
  Image, 
  Building, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Languages, 
  Code,
  Mail,
  Phone,
  Globe,
  MapPin
} from "lucide-react";
import Link from "next/link";

export default function CreateResumePage() {
  const [activeSection, setActiveSection] = useState("personal");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [formData, setFormData] = useState({
    personal: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      title: "",
      linkedin: "",
      summary: ""
    },
    education: [
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        description: ""
      }
    ],
    experience: [
      {
        company: "",
        position: "",
        location: "",
        startDate: "",
        endDate: "",
        description: ""
      }
    ],
    skills: ["", "", ""],
    languages: ["", ""],
    achievements: ["", ""]
  });

  const toggleSection = (section: string) => {
    setExpanded(expanded === section ? null : section);
  };

  const handleInputChange = (
    section: string, 
    field: string, 
    value: string, 
    index: number = 0
  ) => {
    setFormData(prev => {
      const newData = {...prev};
      
      if (section === "personal") {
        newData.personal = {
          ...newData.personal,
          [field]: value
        };
      } else if (section === "education") {
        newData.education[index] = {
          ...newData.education[index],
          [field]: value
        };
      } else if (section === "experience") {
        newData.experience[index] = {
          ...newData.experience[index],
          [field]: value
        };
      } else if (section === "skills" || section === "languages" || section === "achievements") {
        newData[section][index] = value;
      }
      
      return newData;
    });
  };

  const addListItem = (section: string) => {
    setFormData(prev => {
      const newData = {...prev};
      
      if (section === "education") {
        newData.education.push({
          institution: "",
          degree: "",
          fieldOfStudy: "",
          startDate: "",
          endDate: "",
          description: ""
        });
      } else if (section === "experience") {
        newData.experience.push({
          company: "",
          position: "",
          location: "",
          startDate: "",
          endDate: "",
          description: ""
        });
      } else if (section === "skills" || section === "languages" || section === "achievements") {
        newData[section].push("");
      }
      
      return newData;
    });
  };

  const saveResume = () => {
    try {
      // Create a resume object to save
      const resumeToSave = {
        id: Date.now(),
        name: `${formData.personal.firstName} ${formData.personal.lastName}'s Resume` || "Untitled Resume",
        lastModified: new Date().toISOString().split('T')[0],
        template: templates.find(t => t.id === selectedTemplate)?.name || "Professional",
        jobApplications: 0,
        data: formData
      };
      
      // Get existing saved resumes
      const existingResumes = localStorage.getItem('savedResumes');
      const allResumes = existingResumes ? JSON.parse(existingResumes) : [];
      
      // Add new resume
      allResumes.push(resumeToSave);
      
      // Save back to localStorage
      localStorage.setItem('savedResumes', JSON.stringify(allResumes));
      
      alert("Resume saved successfully!");
    } catch (error) {
      console.error("Error saving resume:", error);
      alert("Error saving resume. Please try again.");
    }
  };

  const sections = [
    { id: "personal", name: "Personal Information", icon: <FileText className="w-5 h-5" /> },
    { id: "education", name: "Education", icon: <GraduationCap className="w-5 h-5" /> },
    { id: "experience", name: "Work Experience", icon: <Briefcase className="w-5 h-5" /> },
    { id: "skills", name: "Skills", icon: <Code className="w-5 h-5" /> },
    { id: "languages", name: "Languages", icon: <Languages className="w-5 h-5" /> },
    { id: "achievements", name: "Achievements", icon: <Award className="w-5 h-5" /> },
  ];

  // Template data with real images
  const templates = [
    { id: 1, name: "Professional", thumbnail: "https://templates.finaldoc.co/Professional-Resume-Template.png", color: "blue" },
    { id: 2, name: "Modern", thumbnail: "https://templates.finaldoc.co/Modern-Resume-Template.png", color: "teal" },
    { id: 3, name: "Minimalist", thumbnail: "https://templates.finaldoc.co/Minimal-Resume-Template.png", color: "gray" },
    { id: 4, name: "Creative", thumbnail: "https://templates.finaldoc.co/Creative-Resume-Template.png", color: "purple" },
  ];

  return (
    <main className="pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header with action buttons */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Resume Builder</h1>
          <div className="flex gap-3">
            <button 
              onClick={() => setActiveSection("templates")}
              className="px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              Change Template
            </button>
            <button 
              onClick={saveResume}
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              Save Resume
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Sections and Form */}
          <div className="lg:col-span-5 space-y-6">
            {/* Section Tabs */}
            <div className="bg-muted/30 rounded-lg p-1 flex overflow-x-auto">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex-1 whitespace-nowrap px-3 py-2 rounded-md text-sm font-medium ${
                    activeSection === section.id 
                      ? "bg-background text-foreground shadow-sm" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {section.name}
                </button>
              ))}
            </div>

            {/* Form Fields for Selected Section */}
            <div className="bg-background border border-border rounded-xl p-5">
              {activeSection === "personal" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">First Name</label>
                        <input
                          type="text"
                          className="w-full p-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                          placeholder="First Name"
                          value={formData.personal.firstName}
                          onChange={(e) => handleInputChange('personal', 'firstName', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Last Name</label>
                        <input
                          type="text"
                          className="w-full p-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                          placeholder="Last Name"
                          value={formData.personal.lastName}
                          onChange={(e) => handleInputChange('personal', 'lastName', e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Professional Title</label>
                      <input
                        type="text"
                        className="w-full p-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="e.g. Frontend Developer"
                        value={formData.personal.title}
                        onChange={(e) => handleInputChange('personal', 'title', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        className="w-full p-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="email@example.com"
                        value={formData.personal.email}
                        onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      <input
                        type="tel"
                        className="w-full p-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="+1 (555) 123-4567"
                        value={formData.personal.phone}
                        onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">LinkedIn (optional)</label>
                      <input
                        type="url"
                        className="w-full p-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="linkedin.com/in/yourprofile"
                        value={formData.personal.linkedin}
                        onChange={(e) => handleInputChange('personal', 'linkedin', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Summary/Bio</label>
                      <textarea
                        rows={4}
                        className="w-full p-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="A brief overview of your professional background..."
                        value={formData.personal.summary}
                        onChange={(e) => handleInputChange('personal', 'summary', e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === "education" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {formData.education.map((edu, index) => (
                    <div key={index} className="space-y-3 p-3 border border-border rounded-lg">
                      <div>
                        <label className="block text-sm font-medium mb-1">Institution</label>
                        <input
                          type="text"
                          className="w-full p-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                          placeholder="University/School Name"
                          value={edu.institution}
                          onChange={(e) => handleInputChange('education', 'institution', e.target.value, index)}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">Degree</label>
                          <input
                            type="text"
                            className="w-full p-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                            placeholder="e.g. Bachelor of Science"
                            value={edu.degree}
                            onChange={(e) => handleInputChange('education', 'degree', e.target.value, index)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Field of Study</label>
                          <input
                            type="text"
                            className="w-full p-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                            placeholder="e.g. Computer Science"
                            value={edu.fieldOfStudy}
                            onChange={(e) => handleInputChange('education', 'fieldOfStudy', e.target.value, index)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">Start Date</label>
                          <input
                            type="month"
                            className="w-full p-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                            value={edu.startDate}
                            onChange={(e) => handleInputChange('education', 'startDate', e.target.value, index)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">End Date (or Expected)</label>
                          <input
                            type="month"
                            className="w-full p-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                            value={edu.endDate}
                            onChange={(e) => handleInputChange('education', 'endDate', e.target.value, index)}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Description (optional)</label>
                        <textarea
                          rows={2}
                          className="w-full p-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                          placeholder="Relevant coursework, achievements, etc."
                          value={edu.description}
                          onChange={(e) => handleInputChange('education', 'description', e.target.value, index)}
                        ></textarea>
                      </div>
                    </div>
                  ))}

                  <button 
                    onClick={() => addListItem('education')}
                    className="w-full bg-primary/10 text-primary hover:bg-primary/20 rounded-lg py-2 font-medium flex items-center justify-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Another Education</span>
                  </button>
                </motion.div>
              )}

              {activeSection === "experience" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {formData.experience.map((exp, index) => (
                    <div key={index} className="space-y-3 p-3 border border-border rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">Position</label>
                          <input
                            type="text"
                            className="w-full p-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                            placeholder="Job Title"
                            value={exp.position}
                            onChange={(e) => handleInputChange('experience', 'position', e.target.value, index)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Company</label>
                          <input
                            type="text"
                            className="w-full p-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                            placeholder="Company Name"
                            value={exp.company}
                            onChange={(e) => handleInputChange('experience', 'company', e.target.value, index)}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Location</label>
                        <input
                          type="text"
                          className="w-full p-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                          placeholder="City, Country or Remote"
                          value={exp.location}
                          onChange={(e) => handleInputChange('experience', 'location', e.target.value, index)}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">Start Date</label>
                          <input
                            type="month"
                            className="w-full p-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                            value={exp.startDate}
                            onChange={(e) => handleInputChange('experience', 'startDate', e.target.value, index)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">End Date (or Current)</label>
                          <input
                            type="month"
                            className="w-full p-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                            value={exp.endDate}
                            onChange={(e) => handleInputChange('experience', 'endDate', e.target.value, index)}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                          rows={2}
                          className="w-full p-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                          placeholder="Describe your responsibilities and achievements"
                          value={exp.description}
                          onChange={(e) => handleInputChange('experience', 'description', e.target.value, index)}
                        ></textarea>
                      </div>
                    </div>
                  ))}

                  <button 
                    onClick={() => addListItem('experience')}
                    className="w-full bg-primary/10 text-primary hover:bg-primary/20 rounded-lg py-2 font-medium flex items-center justify-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Another Experience</span>
                  </button>
                </motion.div>
              )}

              {activeSection === "skills" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="relative">
                      <input
                        type="text"
                        className="w-full p-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder={`Skill ${index + 1} (e.g. JavaScript, Project Management)`}
                        value={skill}
                        onChange={(e) => handleInputChange('skills', index.toString(), e.target.value, index)}
                      />
                      <select 
                        className="absolute right-2 top-2 bg-muted/30 border border-border rounded px-2 py-1 text-xs"
                        onChange={(e) => {}}
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate" selected>Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="expert">Expert</option>
                      </select>
                    </div>
                  ))}

                  <button 
                    onClick={() => addListItem('skills')}
                    className="w-full bg-primary/10 text-primary hover:bg-primary/20 rounded-lg py-2 font-medium flex items-center justify-center space-x-2 mt-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Skill</span>
                  </button>
                </motion.div>
              )}

              {activeSection === "languages" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  {formData.languages.map((language, index) => (
                    <div key={index}>
                      <input
                        type="text"
                        className="w-full p-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder={`Language ${index + 1} (e.g. English - Native)`}
                        value={language}
                        onChange={(e) => handleInputChange('languages', index.toString(), e.target.value, index)}
                      />
                    </div>
                  ))}

                  <button 
                    onClick={() => addListItem('languages')}
                    className="w-full bg-primary/10 text-primary hover:bg-primary/20 rounded-lg py-2 font-medium flex items-center justify-center space-x-2 mt-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Language</span>
                  </button>
                </motion.div>
              )}

              {activeSection === "achievements" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  {formData.achievements.map((achievement, index) => (
                    <div key={index}>
                      <input
                        type="text"
                        className="w-full p-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder={`Achievement ${index + 1}`}
                        value={achievement}
                        onChange={(e) => handleInputChange('achievements', index.toString(), e.target.value, index)}
                      />
                    </div>
                  ))}

                  <button 
                    onClick={() => addListItem('achievements')}
                    className="w-full bg-primary/10 text-primary hover:bg-primary/20 rounded-lg py-2 font-medium flex items-center justify-center space-x-2 mt-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Achievement</span>
                  </button>
                </motion.div>
              )}
              
              {activeSection === "templates" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-medium">Choose a Template</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {templates.map((template) => (
                      <div 
                        key={template.id}
                        className={`border ${selectedTemplate === template.id ? 'border-primary ring-1 ring-primary' : 'border-border'} rounded-lg overflow-hidden cursor-pointer transition-colors`}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <div className="h-28 bg-muted overflow-hidden">
                          {template.thumbnail && (
                            <img 
                              src={template.thumbnail} 
                              alt={template.name} 
                              className="h-full w-full object-cover object-top"
                              onError={(e) => {
                                // Fallback if image fails to load
                                const target = e.currentTarget;
                                target.onerror = null;
                                target.src = "https://placehold.co/200x100/e2e8f0/94a3b8?text=" + template.name;
                              }} 
                            />
                          )}
                        </div>
                        <div className="p-1.5 text-center text-sm">{template.name}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Resume Preview */}
          <div className="lg:col-span-7">
            <div className="sticky top-20">
              <div className="bg-background border border-border rounded-xl overflow-hidden">
                <div className="p-4 border-b border-border bg-muted/30">
                  <h2 className="font-medium">Resume Preview</h2>
                </div>
                <div className="p-6 max-h-[800px] overflow-y-auto">
                  {/* Dynamic Resume Preview Based on Selected Template */}
                  <div className={`resume-preview template-${selectedTemplate} bg-white text-black p-6 rounded-md shadow-sm`}>
                    {/* Header with Name and Title */}
                    {(formData.personal.firstName || formData.personal.lastName) ? (
                      <div className="mb-6">
                        <h1 className="text-2xl md:text-3xl font-bold text-black">
                          {formData.personal.firstName} {formData.personal.lastName}
                        </h1>
                        {formData.personal.title && (
                          <p className="text-lg text-gray-600 mt-1">{formData.personal.title}</p>
                        )}
                        
                        {/* Contact Information */}
                        <div className="flex flex-wrap gap-3 mt-3 text-sm">
                          {formData.personal.email && (
                            <div className="flex items-center">
                              <Mail className="w-4 h-4 mr-1 text-gray-500" />
                              <span className="text-gray-700">{formData.personal.email}</span>
                            </div>
                          )}
                          
                          {formData.personal.phone && (
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 mr-1 text-gray-500" />
                              <span className="text-gray-700">{formData.personal.phone}</span>
                            </div>
                          )}
                          
                          {formData.personal.linkedin && (
                            <div className="flex items-center">
                              <Globe className="w-4 h-4 mr-1 text-gray-500" />
                              <span className="text-gray-700">{formData.personal.linkedin}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="mb-6">
                        <div className="h-7 bg-gray-200 rounded-lg w-2/3 mb-2"></div>
                        <div className="h-5 bg-gray-200 rounded-lg w-1/3 mb-3"></div>
                        <div className="flex gap-2">
                          <div className="h-4 bg-gray-200 rounded-lg w-1/4"></div>
                          <div className="h-4 bg-gray-200 rounded-lg w-1/4"></div>
                        </div>
                      </div>
                    )}
                    
                    {/* Divider */}
                    <div className="h-0.5 bg-gray-200 w-full my-4"></div>
                    
                    {/* Summary Section */}
                    {formData.personal.summary && (
                      <div className="mb-6">
                        <p className="text-sm text-gray-700">{formData.personal.summary}</p>
                      </div>
                    )}
                    
                    {/* Experience Section */}
                    {formData.experience.some(exp => exp.position || exp.company) && (
                      <div className="mb-6">
                        <h2 className="text-lg font-semibold text-black mb-3">Experience</h2>
                        {formData.experience.map((exp, index) => (
                          (exp.position || exp.company) ? (
                            <div key={index} className="mb-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium text-black">{exp.position}</p>
                                  <p className="text-sm text-gray-700">{exp.company}</p>
                                  {exp.location && (
                                    <div className="flex items-center text-sm text-gray-600 mt-0.5">
                                      <MapPin className="w-3 h-3 mr-1" />
                                      <span>{exp.location}</span>
                                    </div>
                                  )}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {exp.startDate && exp.endDate ? (
                                    <span>{new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - {new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</span>
                                  ) : exp.startDate ? (
                                    <span>{new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - Present</span>
                                  ) : null}
                                </div>
                              </div>
                              {exp.description && (
                                <p className="text-sm text-gray-700 mt-1.5">{exp.description}</p>
                              )}
                            </div>
                          ) : null
                        ))}
                      </div>
                    )}
                    
                    {/* Education Section */}
                    {formData.education.some(edu => edu.institution || edu.degree) && (
                      <div className="mb-6">
                        <h2 className="text-lg font-semibold text-black mb-3">Education</h2>
                        {formData.education.map((edu, index) => (
                          (edu.institution || edu.degree) ? (
                            <div key={index} className="mb-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium text-black">{edu.degree}</p>
                                  <p className="text-sm text-gray-700">{edu.institution}{edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ''}</p>
                                </div>
                                <div className="text-sm text-gray-600">
                                  {edu.startDate && edu.endDate ? (
                                    <span>{new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - {new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</span>
                                  ) : edu.startDate ? (
                                    <span>{new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} - Present</span>
                                  ) : null}
                                </div>
                              </div>
                              {edu.description && (
                                <p className="text-sm text-gray-700 mt-1.5">{edu.description}</p>
                              )}
                            </div>
                          ) : null
                        ))}
                      </div>
                    )}
                    
                    {/* Skills Section */}
                    {formData.skills.some(skill => skill) && (
                      <div className="mb-6">
                        <h2 className="text-lg font-semibold text-black mb-3">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                          {formData.skills.map((skill, index) => (
                            skill ? (
                              <span key={index} className="text-sm bg-gray-100 text-gray-800 px-3 py-1 rounded-full">{skill}</span>
                            ) : null
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Languages Section */}
                    {formData.languages.some(lang => lang) && (
                      <div className="mb-6">
                        <h2 className="text-lg font-semibold text-black mb-3">Languages</h2>
                        <div className="flex flex-wrap gap-x-4 gap-y-2">
                          {formData.languages.map((lang, index) => (
                            lang ? <div key={index} className="text-sm text-gray-700">{lang}</div> : null
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Achievements Section */}
                    {formData.achievements.some(achievement => achievement) && (
                      <div className="mb-6">
                        <h2 className="text-lg font-semibold text-black mb-3">Achievements</h2>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          {formData.achievements.map((achievement, index) => (
                            achievement ? <li key={index} className="text-gray-700">{achievement}</li> : null
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex space-x-2">
          <Link
            href={`/resume-builder/create?template=${selectedTemplate}`}
            className="w-full py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-md text-center hover:bg-primary/90 transition-colors"
          >
            Use Template
          </Link>
        </div>
      </div>
    </main>
  );
} 