import { experienceData } from "../data/data.json";

export default function ExperienceSection() {
  return (
    <div id="experience" className="mt-32 pt-20 border-t border-zinc-200 dark:border-zinc-700 max-w-6xl mx-auto px-6">
      <h2 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tight mb-12">Experience</h2>
      <div className="relative pl-6">
        <div className="absolute left-0 top-2 bottom-0 w-0.5 bg-zinc-200 dark:bg-zinc-800"></div>
        {experienceData.map((exp, index) => (
          <div key={index} className="relative mb-12 pl-8">
            <div
              className={`absolute -left-[29px] top-1.5 w-3 h-3 rounded-full ${index === 0
                  ? "bg-orange-500 border-4 border-white dark:border-zinc-950 ring-2 ring-orange-500 box-content"
                  : "bg-zinc-100 dark:bg-zinc-900 border-2 border-zinc-300 dark:border-zinc-700"
                }`}
            ></div>
            <span className="text-orange-500 font-bold text-sm tracking-widest uppercase block mb-1">
              {exp.date}
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-white m-0">
              {exp.role}
            </h3>
            <h4 className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 font-semibold mt-1 mb-4">
              {exp.company}
            </h4>
            <ul className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg font-medium  list-disc pl-5 space-y-2">
              {exp.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
