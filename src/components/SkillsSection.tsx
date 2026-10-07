import { skillsData } from "../data/data.json";

export default function SkillsSection() {
  return (
    <div id="skills" className="mt-20 pt-18 bg-zinc-50 dark:bg-transparent rounded-[24px] flex flex-col gap-12 max-w-6xl mx-auto ">
      <div>
        <h2 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tight mb-4">
          Technologies I Work With
        </h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium max-w-2xl">
          Here are some of the technologies I’ve worked with over the years. Angular is where I have the most experience, and I’ve also worked with React, Node.js, and other tools across different projects.
        </p>
      </div>
      <div className="flex flex-col gap-10">
        {skillsData.map((group) => (
          <div key={group.category}>
            <h3 className="text-lg font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-6">
              {group.category}
            </h3>
            <div className="flex gap-4 flex-wrap">
              {group.skills.map((skill) => (
                <div key={skill.name} className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-3 px-6 rounded-xl text-lg font-bold border border-zinc-200 dark:border-zinc-800 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
                  {skill.icon && <i className={`${skill.icon} text-2xl`}></i>}
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
