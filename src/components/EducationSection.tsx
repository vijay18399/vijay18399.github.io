import { educationData } from "../data/data.json";

export default function EducationSection() {
  return (
    <div id="education" className="mt-20 pt-20 border-t border-zinc-200 dark:border-zinc-800 max-w-6xl mx-auto  mb-24">
      <h2 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tight mb-12">
        Education & Certifications
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-zinc-900 p-10 rounded-[24px] border-t-4 border-t-orange-500 shadow-sm border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow">
          <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-2">
            {educationData.degree.title}
          </h3>
          <p className="text-orange-500 font-bold mb-6 text-lg">
            {educationData.degree.institution}
          </p>
          {educationData.degree.gpa && (
            <span className="bg-zinc-100 dark:bg-zinc-950 text-zinc-500 dark:text-zinc-400 py-1.5 px-4 rounded-full text-sm font-bold">
              {educationData.degree.gpa}
            </span>
          )}
        </div>
        <div className="bg-white dark:bg-zinc-900 p-10 rounded-[24px] border-t-4 border-t-orange-500 shadow-sm border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow">
          <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-6">
            Certifications
          </h3>
          <ul className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg font-medium space-y-4">
            {educationData.certifications.map((cert, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-orange-500 font-black mt-1">✓</span> {cert}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
