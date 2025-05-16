"use client";

import { useTheme } from "next-themes";
import { useMemo } from "react";
import { motion } from "framer-motion";

interface HeroIllustrationProps {
  className?: string;
}

export const HeroIllustration = ({ className }: HeroIllustrationProps) => {
  const { theme } = useTheme();
  
  // Determine color palette based on theme
  const colors = useMemo(() => {
    if (theme === "dark") {
      return {
        primary: "#4C7BFB",
        secondary: "#1F2937",
        accent: "#3B82F6",
        outline: "#4B5563",
        light: "#6B7280",
        ultraLight: "#374151",
        paper: "#111827",
        soft: "#1F2937"
      };
    }
    
    return {
      primary: "#3B82F6",
      secondary: "#E5E7EB", 
      accent: "#2563EB",
      outline: "#D1D5DB",
      light: "#F3F4F6",
      ultraLight: "#F9FAFB",
      paper: "#FFFFFF",
      soft: "#F3F4F6"
    };
  }, [theme]);

  const fadeInAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.1, duration: 0.5 }
    })
  };

  return (
    <div className={className}>
      <svg
        viewBox="0 0 650 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background elements */}
        <motion.circle 
          cx="500" 
          cy="150" 
          r="50" 
          fill={colors.ultraLight}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <motion.circle 
          cx="120" 
          cy="400" 
          r="70" 
          fill={colors.soft}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <motion.rect 
          x="380" 
          y="320" 
          width="100" 
          height="100" 
          rx="20" 
          fill={colors.ultraLight}
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />

        {/* Office desk */}
        <motion.rect 
          x="180" 
          y="280" 
          width="260" 
          height="15" 
          rx="2" 
          fill={colors.secondary}
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeInAnimation}
        />
        <motion.rect 
          x="200" 
          y="295" 
          width="10" 
          height="100" 
          rx="2" 
          fill={colors.secondary}
          initial="hidden"
          animate="visible"
          custom={1.1}
          variants={fadeInAnimation}
        />
        <motion.rect 
          x="410" 
          y="295" 
          width="10" 
          height="100" 
          rx="2" 
          fill={colors.secondary}
          initial="hidden"
          animate="visible"
          custom={1.1}
          variants={fadeInAnimation}
        />

        {/* Computer */}
        <motion.g
          initial="hidden"
          animate="visible"
          custom={2}
          variants={fadeInAnimation}
        >
          <rect x="250" y="200" width="120" height="80" rx="4" fill={colors.outline} />
          <rect x="254" y="204" width="112" height="72" rx="2" fill={colors.primary} />
          <rect x="270" y="280" width="80" height="6" rx="2" fill={colors.secondary} />
          <rect x="290" y="286" width="40" height="10" rx="2" fill={colors.outline} />
        </motion.g>

        {/* Person 1 - job seeker */}
        <motion.g
          initial="hidden"
          animate="visible"
          custom={3}
          variants={fadeInAnimation}
        >
          {/* Head */}
          <circle cx="190" cy="190" r="25" fill={colors.light} />
          <circle cx="180" cy="185" r="3" fill={colors.secondary} />
          <circle cx="200" cy="185" r="3" fill={colors.secondary} />
          <path d="M185 195 Q190 200 195 195" stroke={colors.secondary} strokeWidth="2" strokeLinecap="round" />
          
          {/* Body */}
          <path d="M190 215 L190 250 L185 280" stroke={colors.primary} strokeWidth="10" strokeLinecap="round" />
          <path d="M190 230 L165 250" stroke={colors.primary} strokeWidth="8" strokeLinecap="round" />
          <path d="M190 230 L210 255" stroke={colors.primary} strokeWidth="8" strokeLinecap="round" />
          
          {/* Resume */}
          <rect x="145" y="240" width="30" height="40" rx="2" fill={colors.paper} stroke={colors.outline} strokeWidth="2" />
          <line x1="150" y1="250" x2="170" y2="250" stroke={colors.outline} strokeWidth="2" />
          <line x1="150" y1="258" x2="170" y2="258" stroke={colors.outline} strokeWidth="2" />
          <line x1="150" y1="266" x2="160" y2="266" stroke={colors.outline} strokeWidth="2" />
        </motion.g>

        {/* Person 2 - recruiter */}
        <motion.g
          initial="hidden"
          animate="visible"
          custom={4}
          variants={fadeInAnimation}
        >
          {/* Head */}
          <circle cx="450" cy="190" r="25" fill={colors.light} />
          <circle cx="440" cy="185" r="3" fill={colors.secondary} />
          <circle cx="460" cy="185" r="3" fill={colors.secondary} />
          <path d="M440 200 Q450 205 460 200" stroke={colors.secondary} strokeWidth="2" strokeLinecap="round" />
          
          {/* Body */}
          <path d="M450 215 L450 250 L465 280" stroke={colors.accent} strokeWidth="10" strokeLinecap="round" />
          <path d="M450 230 L425 250" stroke={colors.accent} strokeWidth="8" strokeLinecap="round" />
          <path d="M450 230 L480 245" stroke={colors.accent} strokeWidth="8" strokeLinecap="round" />
          
          {/* Documents */}
          <rect x="470" y="235" width="30" height="40" rx="2" fill={colors.paper} stroke={colors.outline} strokeWidth="2" />
          <line x1="475" y1="245" x2="495" y2="245" stroke={colors.accent} strokeWidth="2" />
          <line x1="475" y1="253" x2="495" y2="253" stroke={colors.accent} strokeWidth="2" />
          <line x1="475" y1="261" x2="485" y2="261" stroke={colors.accent} strokeWidth="2" />
        </motion.g>

        {/* Connection line between people */}
        <motion.path 
          d="M210 185 C260 150, 350 150, 430 185" 
          stroke={colors.primary} 
          strokeWidth="3" 
          strokeDasharray="6 4"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
        />

        {/* Icons over the connection */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <circle cx="260" cy="160" r="15" fill={colors.paper} />
          <path d="M255 160 L265 160 M260 155 L260 165" stroke={colors.primary} strokeWidth="2" />
        </motion.g>

        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2, duration: 0.5 }}
        >
          <circle cx="325" cy="145" r="15" fill={colors.paper} />
          <path d="M320 143 L330 147 L320 151" fill="none" stroke={colors.primary} strokeWidth="2" />
        </motion.g>

        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.4, duration: 0.5 }}
        >
          <circle cx="390" cy="160" r="15" fill={colors.paper} />
          <path d="M385 160 L395 160 M390 155 L390 165" stroke={colors.primary} strokeWidth="2" transform="rotate(45 390 160)" />
        </motion.g>

        {/* Stars/sparkles */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
        >
          <path d="M120 150 L120 160 M115 155 L125 155" stroke={colors.primary} strokeWidth="2" />
          <path d="M500 300 L500 310 M495 305 L505 305" stroke={colors.primary} strokeWidth="2" />
          <path d="M320 80 L320 90 M315 85 L325 85" stroke={colors.primary} strokeWidth="2" />
        </motion.g>
      </svg>
    </div>
  );
}; 