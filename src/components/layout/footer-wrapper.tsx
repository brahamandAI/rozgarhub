"use client";

import { usePathname } from "next/navigation";
import Footer from "./footer";

export default function FooterWrapper() {
  const pathname = usePathname();
  
  // Only render Footer on the homepage
  if (pathname === "/") {
    return <Footer />;
  }
  
  return null;
} 