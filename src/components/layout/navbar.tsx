"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, X, Search, BriefcaseBusiness, Sun, Moon, User, 
  ChevronDown, FileText, Laptop, Clock, GraduationCap, Home,
  LayoutDashboard, Users, BookOpen, Briefcase, Building
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

type NavLinkWithDropdown = {
  name: string;
  href: string;
  icon?: React.ReactNode;
  dropdown?: { name: string; href: string; icon: React.ReactNode }[];
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  const handleMouseEnter = (name: string) => {
    setActiveDropdown(name);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const navLinks: NavLinkWithDropdown[] = [
    { name: "Home", href: "/", icon: <Home className="w-4 h-4 mr-1" /> },
    { 
      name: "Jobs", 
      href: "/jobs",
      icon: <Briefcase className="w-4 h-4 mr-1" />,
      dropdown: [
        { name: "All Jobs", href: "/jobs", icon: <BriefcaseBusiness className="w-4 h-4" /> },
        { name: "Remote Jobs", href: "/jobs/remote", icon: <Laptop className="w-4 h-4" /> },
        { name: "Full Time", href: "/jobs/full-time", icon: <Clock className="w-4 h-4" /> },
        { name: "Part Time", href: "/jobs/part-time", icon: <Clock className="w-4 h-4" /> },
        { name: "Internship", href: "/jobs/internship", icon: <GraduationCap className="w-4 h-4" /> },
      ] 
    },
    { name: "Companies", href: "/companies", icon: <Users className="w-4 h-4 mr-1" /> },
    { 
      name: "Resume Builder", 
      href: "/resume-builder",
      icon: <FileText className="w-4 h-4 mr-1" />,
      dropdown: [
        { name: "Create Resume", href: "/resume-builder/create", icon: <FileText className="w-4 h-4" /> },
        { name: "My Resumes", href: "/resume-builder/my-resumes", icon: <BookOpen className="w-4 h-4" /> },
        { name: "Templates", href: "/resume-builder/templates", icon: <FileText className="w-4 h-4" /> },
      ] 
    },
    { 
      name: "Dashboard", 
      href: "/dashboard/job-seeker",
      icon: <LayoutDashboard className="w-4 h-4 mr-1" />,
      dropdown: [
        { name: "Job Seeker Dashboard", href: "/dashboard/job-seeker", icon: <LayoutDashboard className="w-4 h-4" /> },
      ] 
    },
  ];

  const recruiterLinks: NavLinkWithDropdown = {
    name: "For Recruiters",
    href: "#", // Main link isn't directly navigable
    icon: <Building className="w-4 h-4 mr-1" />,
    dropdown: [
      { name: "Recruiter Login", href: "/auth/recruiter/login", icon: <User className="w-4 h-4" /> },
      { name: "Recruiter Register", href: "/auth/recruiter/register", icon: <User className="w-4 h-4" /> }, // Consider a different icon like UserPlus
      { name: "Recruiter Dashboard", href: "/dashboard/recruiter", icon: <LayoutDashboard className="w-4 h-4" /> },
    ]
  };

  const authLinks = [
    { name: "Login", href: "/auth/login" },
    { name: "Register", href: "/auth/register" },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      x: -20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: -10 },
    open: { opacity: 1, x: 0 },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, height: 0 },
    visible: { 
      opacity: 1, 
      y: 0,
      height: "auto",
      transition: {
        duration: 0.2
      }
    },
    exit: {
      opacity: 0,
      y: -5,
      height: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 backdrop-blur-md transition-all duration-300 ${
        scrolled 
          ? "py-2 shadow-md bg-background/95" 
          : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start">
            <div className="flex items-center space-x-2">
              <BriefcaseBusiness className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-foreground">
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  RozgarHub
                </span>
              </span>
            </div>
            <motion.p 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-xs text-muted-foreground ml-10 mt-0.5"
            >
              Where talent meets opportunity
            </motion.p>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center justify-between space-x-8">
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <div 
                  key={link.name} 
                  className="relative"
                  onMouseEnter={() => link.dropdown && handleMouseEnter(link.name)}
                  onMouseLeave={() => link.dropdown && handleMouseLeave()}
                >
                  {link.dropdown ? (
                    <>
                      <button
                        className={`text-sm font-medium transition-colors flex items-center space-x-1 group hover:text-primary ${
                          (pathname === link.href || pathname?.startsWith(link.href + "/")) && link.href !== "#"
                            ? "text-primary"
                            : "text-foreground/70"
                        }`}
                      >
                        {link.icon}
                        <span>{link.name}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform group-hover:text-primary ${
                          activeDropdown === link.name ? "rotate-180" : ""
                        }`} />
                      </button>
                      <AnimatePresence>
                        {activeDropdown === link.name && (
                          <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={dropdownVariants}
                            className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-background border border-border overflow-hidden z-50"
                          >
                            <div className="py-2">
                              {link.dropdown.map((item) => (
                                <Link
                                  key={item.name}
                                  href={item.href}
                                  className={`flex items-center space-x-3 px-4 py-3 text-sm hover:bg-muted transition-colors ${
                                    pathname === item.href
                                      ? "bg-primary/10 text-primary font-medium"
                                      : "text-foreground/80"
                                  }`}
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  {item.icon}
                                  <span>{item.name}</span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className={`text-sm font-medium transition-colors flex items-center hover:text-primary ${
                        pathname === link.href
                          ? "text-primary relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary"
                          : "text-foreground/70 hover:text-foreground"
                      }`}
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full p-2 hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            
            {/* Recruiter Links Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => recruiterLinks.dropdown && handleMouseEnter(recruiterLinks.name)}
              onMouseLeave={() => recruiterLinks.dropdown && handleMouseLeave()}
            >
              <button
                className={`text-sm font-medium transition-colors flex items-center space-x-1 group hover:text-primary ${
                  pathname?.startsWith("/auth/recruiter") || pathname?.startsWith("/dashboard/recruiter")
                    ? "text-primary"
                    : "text-foreground/70"
                }`}
              >
                {recruiterLinks.icon}
                <span>{recruiterLinks.name}</span>
                <ChevronDown className={`w-4 h-4 transition-transform group-hover:text-primary ${
                  activeDropdown === recruiterLinks.name ? "rotate-180" : ""
                }`} />
              </button>
              <AnimatePresence>
                {activeDropdown === recruiterLinks.name && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownVariants}
                    className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-background border border-border overflow-hidden z-50"
                  >
                    <div className="py-2">
                      {recruiterLinks.dropdown?.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`flex items-center space-x-3 px-4 py-3 text-sm hover:bg-muted transition-colors ${
                            pathname === item.href
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-foreground/80"
                          }`}
                          onClick={() => setActiveDropdown(null)}
                        >
                          {item.icon}
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="flex items-center space-x-3">
              {authLinks.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                    index === 0
                      ? "text-foreground hover:bg-muted"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-3 md:hidden">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden mt-4 py-4 border-t"
            >
              <motion.div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <motion.div key={link.name} variants={itemVariants}>
                    {link.dropdown ? (
                      <div 
                        className="space-y-2"
                      >
                        <button
                          className={`flex justify-between items-center w-full py-2 text-base ${
                            (pathname === link.href || pathname?.startsWith(link.href + "/")) && link.href !== "#"
                              ? "text-primary font-medium"
                              : "text-foreground/70"
                          }`}
                          onClick={() => { 
                            if (activeDropdown === link.name) {
                              handleMouseLeave(); 
                            } else {
                              handleMouseEnter(link.name); 
                            }
                          }}
                        >
                          <span className="flex items-center">
                            {link.icon && <span className="mr-2">{link.icon}</span>}
                            {link.name}
                          </span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${
                            activeDropdown === link.name ? "rotate-180" : ""
                          }`} />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === link.name && (
                            <motion.div
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              variants={dropdownVariants}
                              className="pl-4 border-l border-border space-y-2"
                            >
                              {link.dropdown.map((item) => (
                                <Link
                                  key={item.name}
                                  href={item.href}
                                  onClick={closeMenu} 
                                  className={`flex items-center space-x-3 py-2 text-sm ${
                                    pathname === item.href
                                      ? "text-primary font-medium"
                                      : "text-foreground/80"
                                  }`}
                                >
                                  {item.icon}
                                  <span>{item.name}</span>
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className={`flex items-center py-2 text-base ${
                          pathname === link.href
                            ? "text-primary font-medium"
                            : "text-foreground/70"
                        }`}
                      >
                        {link.icon && <span className="mr-2">{link.icon}</span>}
                        {link.name}
                      </Link>
                    )}
                  </motion.div>
                ))}

                {/* Recruiter Links for Mobile */}
                <motion.div variants={itemVariants}>
                  <div className="space-y-2">
                    <button
                      className={`flex justify-between items-center w-full py-2 text-base ${
                        pathname?.startsWith("/auth/recruiter") || pathname?.startsWith("/dashboard/recruiter")
                          ? "text-primary font-medium"
                          : "text-foreground/70"
                      }`}
                      onClick={() => { 
                        if (activeDropdown === recruiterLinks.name) {
                          handleMouseLeave();
                        } else {
                          handleMouseEnter(recruiterLinks.name);
                        }
                      }}
                    >
                      <span className="flex items-center">
                        {recruiterLinks.icon && <span className="mr-2">{recruiterLinks.icon}</span>}
                        {recruiterLinks.name}
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${
                        activeDropdown === recruiterLinks.name ? "rotate-180" : ""
                      }`} />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === recruiterLinks.name && (
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          variants={dropdownVariants}
                          className="pl-4 border-l border-border space-y-2"
                        >
                          {recruiterLinks.dropdown?.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={closeMenu}
                              className={`flex items-center space-x-3 py-2 text-sm ${
                                pathname === item.href
                                  ? "text-primary font-medium"
                                  : "text-foreground/80"
                              }`}
                            >
                              {item.icon}
                              <span>{item.name}</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                <div className="pt-4 mt-4 border-t flex flex-col space-y-3">
                  {authLinks.map((link, index) => (
                    <motion.div key={link.name} variants={itemVariants}>
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className={`block py-3 text-center rounded-lg text-base font-medium ${
                          index === 0
                            ? "border border-border hover:bg-muted"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar; 