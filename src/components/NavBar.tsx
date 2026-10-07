"use client";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function NavBar() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["experience", "skills", "education"];
      // Add an offset to trigger earlier when scrolling down (e.g. half the window height)
      const scrollPosition = window.scrollY + window.innerHeight / 3; 

      let currentSection = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            currentSection = section;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    setTimeout(handleScroll, 100); 
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="py-3 bg-white/80 dark:bg-zinc-950/80 sticky top-0 z-[100] backdrop-blur-md shadow-sm border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <a href="/" className="text-2xl font-black text-orange-500 tracking-tighter">
          vijay reddy.
        </a>
        <div className="flex gap-4 md:gap-6 items-center font-bold text-sm md:text-base">
          <a 
            href="#experience" 
            className={`hidden sm:block transition-colors ${activeSection === 'experience' ? 'text-orange-500' : 'text-zinc-500 dark:text-zinc-400 hover:text-orange-500'}`}
          >
            Experience
          </a>
          <a 
            href="#skills" 
            className={`hidden sm:block transition-colors ${activeSection === 'skills' ? 'text-orange-500' : 'text-zinc-500 dark:text-zinc-400 hover:text-orange-500'}`}
          >
            Skills
          </a>
          <a 
            href="#education" 
            className={`hidden sm:block transition-colors ${activeSection === 'education' ? 'text-orange-500' : 'text-zinc-500 dark:text-zinc-400 hover:text-orange-500'}`}
          >
            Education
          </a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
