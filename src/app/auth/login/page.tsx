"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if there's a user type in the URL query
    const params = new URLSearchParams(window.location.search);
    const userType = params.get("type");

    if (userType === "recruiter") {
      router.push("/auth/recruiter/login");
    } else {
      // Default to job seeker login
      router.push("/auth/jobseeker/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg text-slate-300">Redirecting to login page...</p>
        </motion.div>
    </div>
  );
} 