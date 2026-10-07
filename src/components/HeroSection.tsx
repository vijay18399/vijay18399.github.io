import Image from "next/image";
import { heroData } from "../data/data.json";
import profilePic from "../profile.jpg";

export default function HeroSection() {
  return (
    <header className="flex flex-col-reverse md:flex-row items-center gap-12 py-16 px-6 max-w-6xl mx-auto">
      <div className="flex-1 flex flex-col gap-4">
        <div className="inline-flex items-center gap-2 bg-orange-500/10 text-zinc-800 dark:text-zinc-200 font-bold py-1.5 px-4 rounded-full text-sm border border-orange-500/20 self-start">
          <i className="ph-bold ph-map-pin text-orange-500"></i> {heroData.location}
          <span className="text-zinc-400">|</span> {heroData.experience}
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl md:text-6xl font-black leading-tight text-zinc-900 dark:text-white m-0">
            {heroData.greeting}
          </h1>
          <h2 className="text-l md:text-3xl font-extrabold text-orange-500 m-0 leading-snug tracking-tight">
            {heroData.highlight}
          </h2>
        </div>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 font-semibold max-w-xl leading-relaxed">
          {heroData.description}
        </p>
        <div className="pt-4 flex flex-wrap gap-4">
          <a href="/VijayReddyMedapati.pdf" target="_blank" rel="noopener noreferrer" className="bg-orange-500 text-white font-bold py-4 px-8 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:shadow-[0_15px_40px_-5px_rgba(0,0,0,0.15)] transition-all duration-300 text-lg inline-flex items-center gap-2">
            View Resume <i className="ph-bold ph-file-pdf"></i>
          </a>
          <a href={heroData.linkedinUrl} target="_blank" rel="noopener noreferrer" className="bg-transparent text-orange-500 border-2 border-orange-500/30 font-bold py-4 px-8 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:bg-orange-500 hover:text-white transition-all duration-300 text-lg inline-flex items-center gap-2">
            <i className="ph-bold ph-linkedin-logo"></i> LinkedIn
          </a>
        </div>
      </div>
      <div className="flex-1 relative flex justify-center items-center mt-10 md:mt-0">
        <div className="absolute inset-0 bg-orange-500 opacity-10 rounded-[100px] rotate-6 scale-105"></div>
        <div className="absolute inset-0 bg-orange-500 opacity-10 rounded-full -rotate-6 scale-95 translate-x-4"></div>

        <div className="relative bg-white dark:bg-zinc-800 p-2 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-black/5 dark:border-white/5 transition-all duration-500 w-full max-w-xs aspect-square flex items-center justify-center rounded-[32px] hover:-translate-y-1.5 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] group">
          <div className="z-10 w-full h-full relative overflow-hidden rounded-[28px]">
            <Image
              className="h-full w-full object-cover rounded-[inherit] shadow-md contrast-110 saturate-120 transition-transform duration-500 group-hover:scale-105"
              src={profilePic}
              alt="Vijay Reddy"
              placeholder="blur"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
