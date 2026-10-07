"use client";

import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight mb-2">
            Vijay Reddy
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium">
            Senior Front-End Developer
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/vijay18399"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-orange-500 transition-colors"
            aria-label="GitHub"
          >
            <i className="ph-fill ph-github-logo text-3xl"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/vijay18399/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-orange-500 transition-colors"
            aria-label="LinkedIn"
          >
            <i className="ph-fill ph-linkedin-logo text-3xl"></i>
          </a>
          <a
            href="mailto:vijayreddy18399@gmail.com"
            className="text-zinc-400 hover:text-orange-500 transition-colors"
            aria-label="Email"
          >
            <i className="ph-fill ph-envelope-simple text-3xl"></i>
          </a>
        </div>
      </div>

      <div className="border-t border-zinc-200 dark:border-zinc-800/50">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-500 dark:text-zinc-500 font-medium">
            &copy; {currentYear} Vijay Reddy. All rights reserved.
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-500 font-medium">
            Designed & Built with <i className="ph-fill ph-heart text-orange-500 align-middle"></i>
          </p>
        </div>
      </div>
    </footer>
  );
}
