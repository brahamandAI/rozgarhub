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
        primary: "#4C7BFB", // Main interactive elements, buttons
        secondary: "#1F2937", // Darker UI elements, text, stick figure outline
        accent: "#3B82F6", // Secondary interactive elements, highlights
        outline: "#4B5563", // Borders, outlines for objects
        light: "#6B7280", // Lighter UI elements, stick figure fill
        ultraLight: "#374151", // Background shapes, subtle details
        paper: "#111827", // Resume/document background
        soft: "#1F2937" // Softer background elements
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

  const vibrantEntryAnimation = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: custom * 0.15, duration: 0.6, ease: "easeOut" }
    })
  };

  const popInAnimation = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: custom * 0.1, duration: 0.4, type: "spring", stiffness: 200, damping: 12 }
    })
  };
  
  const subtleBobbingAnimation = {
    y: ["0px", "-3px", "0px"],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
    }
  };

  return (
    <div className={className}>
      <svg
        viewBox="0 0 650 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background elements - slightly more dynamic entry */}
        <motion.circle 
          cx="500" 
          cy="150" 
          r="50" 
          fill={colors.ultraLight}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "circOut" }}
        />
        <motion.circle 
          cx="120" 
          cy="400" 
          r="70" 
          fill={colors.soft}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "circOut" }}
        />
        <motion.rect 
          x="380" 
          y="320" 
          width="100" 
          height="100" 
          rx="20" 
          fill={colors.ultraLight}
          initial={{ scale: 0, rotate: -15, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "anticipate" }}
        />

        {/* Office desk - using vibrant entry */}
        <motion.rect 
          x="180" 
          y="280" 
          width="260" 
          height="15" 
          rx="2" 
          fill={colors.secondary}
          initial="hidden"
          animate="visible"
          custom={1} // Staggering delay
          variants={vibrantEntryAnimation}
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
          custom={1.2} // Staggering delay
          variants={vibrantEntryAnimation}
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
          custom={1.2} // Staggering delay
          variants={vibrantEntryAnimation}
        />

        {/* Computer - using vibrant entry */}
        <motion.g
          initial="hidden"
          animate="visible"
          custom={2} // Staggering delay
          variants={vibrantEntryAnimation}
        >
          <rect x="250" y="200" width="120" height="80" rx="4" fill={colors.outline} />
          <rect x="254" y="204" width="112" height="72" rx="2" fill={colors.primary} />
          {/* Screen glow */}
          <motion.rect 
            x="256" y="206" width="108" height="68" rx="1" fill={colors.primary}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <rect x="270" y="280" width="80" height="6" rx="2" fill={colors.secondary} />
          <rect x="290" y="286" width="40" height="10" rx="2" fill={colors.outline} />
        </motion.g>

        {/* Person 1 - job seeker - vibrant entry and bobbing */}
        <motion.g
          initial="hidden"
          animate="visible"
          custom={3} // Staggering delay
          variants={vibrantEntryAnimation}
          
        >
          <motion.g animate={subtleBobbingAnimation} style={{ originX: "190px", originY: "280px" }}>
            {/* Head */}
            <circle cx="190" cy="190" r="25" fill={colors.light} />
            <circle cx="180" cy="185" r="3" fill={colors.secondary} /> {/* Eye */}
            <circle cx="200" cy="185" r="3" fill={colors.secondary} /> {/* Eye */}
            <motion.path 
              d="M185 195 Q190 200 195 195" stroke={colors.secondary} strokeWidth="2" strokeLinecap="round" 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 3 * 0.15 + 0.5 }} // After body entry
            /> {/* Smile */}
            
            {/* Body */}
            <path d="M190 215 L190 250 L185 280" stroke={colors.primary} strokeWidth="10" strokeLinecap="round" />
            <path d="M190 230 L165 250" stroke={colors.primary} strokeWidth="8" strokeLinecap="round" /> {/* Arm */}
            <path d="M190 230 L210 255" stroke={colors.primary} strokeWidth="8" strokeLinecap="round" /> {/* Arm */}
            
            {/* Resume - slight lift animation */}
            <motion.g
              initial={{ y: 5, opacity: 0}}
              animate={{ y: 0, opacity: 1}}
              transition={{ delay: 3 * 0.15 + 0.3 }}
            >
              <rect x="145" y="240" width="30" height="40" rx="2" fill={colors.paper} stroke={colors.outline} strokeWidth="2" />
              <line x1="150" y1="250" x2="170" y2="250" stroke={colors.outline} strokeWidth="1.5" />
              <line x1="150" y1="258" x2="170" y2="258" stroke={colors.outline} strokeWidth="1.5" />
              <line x1="150" y1="266" x2="160" y2="266" stroke={colors.outline} strokeWidth="1.5" />
            </motion.g>
          </motion.g>
        </motion.g>

        {/* Person 2 - recruiter - vibrant entry and bobbing */}
        <motion.g
          initial="hidden"
          animate="visible"
          custom={3.5} // Staggering delay, slightly after person 1
          variants={vibrantEntryAnimation}
        >
          <motion.g animate={subtleBobbingAnimation} style={{ originX: "450px", originY: "280px" }}>
            {/* Head */}
            <circle cx="450" cy="190" r="25" fill={colors.light} />
            <circle cx="440" cy="185" r="3" fill={colors.secondary} /> {/* Eye */}
            <circle cx="460" cy="185" r="3" fill={colors.secondary} /> {/* Eye */}
            <motion.path 
              d="M440 200 Q450 205 460 200" stroke={colors.secondary} strokeWidth="2" strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 3.5 * 0.15 + 0.5 }} // After body entry
            /> {/* Smile */}
            
            {/* Body */}
            <path d="M450 215 L450 250 L465 280" stroke={colors.accent} strokeWidth="10" strokeLinecap="round" />
            <path d="M450 230 L425 250" stroke={colors.accent} strokeWidth="8" strokeLinecap="round" /> {/* Arm */}
            <path d="M450 230 L480 245" stroke={colors.accent} strokeWidth="8" strokeLinecap="round" /> {/* Arm */}
            
            {/* Documents - slight lift animation */}
             <motion.g
              initial={{ y: 5, opacity: 0}}
              animate={{ y: 0, opacity: 1}}
              transition={{ delay: 3.5 * 0.15 + 0.3 }}
            >
              <rect x="470" y="235" width="30" height="40" rx="2" fill={colors.paper} stroke={colors.outline} strokeWidth="2" />
              <line x1="475" y1="245" x2="495" y2="245" stroke={colors.accent} strokeWidth="1.5" />
              <line x1="475" y1="253" x2="495" y2="253" stroke={colors.accent} strokeWidth="1.5" />
              <line x1="475" y1="261" x2="485" y2="261" stroke={colors.accent} strokeWidth="1.5" />
            </motion.g>
          </motion.g>
        </motion.g>

        {/* Connection line between people - more dynamic draw and pulse */}
        <motion.path 
          d="M210 185 C260 150, 350 150, 430 185" 
          stroke={colors.primary} 
          strokeWidth="3.5" // Slightly thicker
          strokeDasharray="8 6" // Adjusted dash array
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 1,
          }}
          transition={{ duration: 1.2, delay: 1.5, ease: "easeInOut" }} // Starts after characters are mostly visible
        >
          {/* Pulsing effect for the line */}
           <animate
            attributeName="strokeDashoffset"
            values="0;28;0" // 28 is approx (8+6)*2
            dur="2s"
            repeatCount="indefinite"
            begin="2.7s" // Start after initial draw
          />
        </motion.path>

        {/* Icons over the connection - pop-in animation, better icons might be needed */}
        {/* Icon 1: Search/Magnifying Glass (representing job discovery) */}
        <motion.g
          initial="hidden"
          animate="visible"
          custom={1} // Custom delay for popInAnimation
          variants={popInAnimation}
          transform="translate(250 150)" // Centering the group for easier icon placement
        >
          <motion.circle cx="0" cy="0" r="16" fill={colors.paper} stroke={colors.primary} strokeWidth="1.5" />
          <motion.g transform="scale(0.7)"> {/* Scale down icon */}
            {/* Magnifying glass */}
            <circle cx="-3" cy="-3" r="7" stroke={colors.primary} strokeWidth="2" fill="none"/>
            <line x1="1" y1="1" x2="7" y2="7" stroke={colors.primary} strokeWidth="2" strokeLinecap="round"/>
          </motion.g>
        </motion.g>

        {/* Icon 2: Handshake (representing agreement/hiring) */}
         <motion.g
          initial="hidden"
          animate="visible"
          custom={1.5} // Custom delay for popInAnimation
          variants={popInAnimation}
          transform="translate(325 135)" // Centering the group
        >
          <motion.circle cx="0" cy="0" r="16" fill={colors.paper} stroke={colors.primary} strokeWidth="1.5" />
           <motion.g transform="scale(0.65) translate(0, 2)"> {/* Scale and adjust icon */}
            {/* Simple Handshake Icon */}
            <path d="M-10 0 Q-5 -5 0 0 L5 5 M0 0 Q5 5 10 0" stroke={colors.primary} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M-10 -5 L-5 -10 M5 10 L10 5" stroke={colors.primary} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          </motion.g>
        </motion.g>

        {/* Icon 3: Briefcase/Document (representing offer/job role) */}
        <motion.g
          initial="hidden"
          animate="visible"
          custom={2} // Custom delay for popInAnimation
          variants={popInAnimation}
          transform="translate(400 150)" // Centering the group
        >
          <motion.circle cx="0" cy="0" r="16" fill={colors.paper} stroke={colors.primary} strokeWidth="1.5"/>
          <motion.g transform="scale(0.7)"> {/* Scale down icon */}
            {/* Briefcase Icon */}
            <rect x="-8" y="-6" width="16" height="12" rx="2" stroke={colors.primary} strokeWidth="2" fill="none"/>
            <path d="M-4 -6 V -9 H 4 V -6" stroke={colors.primary} strokeWidth="2" fill="none"/>
            <line x1="0" y1="-2" x2="0" y2="2" stroke={colors.primary} strokeWidth="1.5"/>
          </motion.g>
        </motion.g>

        {/* Stars/sparkles - more dynamic and varied */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, repeatDelay: 1.5, delay: 0.5 }}
        >
          {/* Star 1 */}
          <path d="M120 150 L120 160 M115 155 L125 155" stroke={colors.accent} strokeWidth="2.5" />
        </motion.g>
         <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0] }}
          transition={{ repeat: Infinity, duration: 2, repeatDelay: 1, delay: 1 }}
        >
          {/* Star 2 */}
          <path d="M500 300 L500 310 M495 305 L505 305" stroke={colors.primary} strokeWidth="2" transform="rotate(45 500 300)" />
        </motion.g>
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.9, 0] }}
          transition={{ repeat: Infinity, duration: 3, repeatDelay: 2, delay: 1.5 }}
        >
          {/* Star 3 */}
          <path d="M320 80 L320 90 M315 85 L325 85" stroke={colors.accent} strokeWidth="2.5" />
        </motion.g>
      </svg>
    </div>
  );
}; 