import { useState } from "react";

const SKILL_SUGGESTIONS = {
  "Backend Developer": ["Java", "Spring Boot", "SQL", "APIs", "Git"],
  "Frontend Developer": ["HTML", "CSS", "JavaScript", "React", "Git"],
  "Data Analyst": ["Excel", "SQL", "Python", "Dashboards", "Statistics"],
};

function CareerForm({ onSubmit }) {
  const [targetRole, setTargetRole] = useState("");
  const [currentSkills, setCurrentSkills] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ targetRole, currentSkills });
  };

  const handleAddSkill = (skill) => {
    // currentSkills string ko array me convert karo
    const parts = currentSkills
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    // duplicate mat add karo
    if (!parts.includes(skill)) {
      parts.push(skill);
    }

    setCurrentSkills(parts.join(", "));
  };

  const suggestionsForRole =
    (targetRole && SKILL_SUGGESTIONS[targetRole]) || [];

  return (
    <div className="bg-zinc-900 backdrop-blur border border-zinc-700 rounded-2xl shadow-sm p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-100">
          Career Path Planner
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Enter your target role and current skills to see your skill gap, a
          step-by-step roadmap, and the latest tech news.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Target Role (Dropdown) */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-200">
            Target Role
          </label>
          <select
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-slate-100 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="" disabled>
              Select your target role
            </option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Data Analyst">Data Analyst</option>
          </select>
          <p className="text-xs text-slate-500">
            Choose a role to get a tailored skill-gap analysis and roadmap.
          </p>
        </div>

        {/* Current Skills */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-200">
            Current Skills
          </label>
          <input
            type="text"
            placeholder="e.g. Java, SQL, Git"
            value={currentSkills}
            onChange={(e) => setCurrentSkills(e.target.value)}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <p className="text-xs text-slate-500">
            Add comma-separated skills that you already know, or pick from
            suggestions below.
          </p>

          {/* Skill suggestions based on role */}
          {suggestionsForRole.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {suggestionsForRole.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => handleAddSkill(skill)}
                  className="px-2.5 py-1 rounded-full border border-zinc-600 bg-zinc-800 text-[11px] text-slate-200 hover:bg-zinc-700 hover:border-zinc-500 transition"
                >
                  + {skill}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full md:w-auto inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 active:bg-blue-800 transition"
        >
          Analyze My Career Path
        </button>
      </form>
    </div>
  );
}

export default CareerForm;
