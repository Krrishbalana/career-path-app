// src/App.jsx
import { useState } from "react";
import CareerForm from "./components/ CareerForm.jsx";
import SkillGapResult from "./components/SkillGapResult.jsx";
import NewsList from "./components/NewsList.jsx";

function App() {
  const [skillGapResult, setSkillGapResult] = useState(null);
  const [roadmapResult, setRoadmapResult] = useState(null);
  const [newsResult, setNewsResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async ({ targetRole, currentSkills }) => {
    if (!targetRole.trim()) {
      alert("Please enter a target role (e.g. Backend Developer)");
      return;
    }

    try {
      setLoading(true);
      console.log("Sending to backend:", { targetRole, currentSkills });

      // Skill-gap API
      const skillGapResponse = await fetch(
        "https://career-path-app-yu6i.onrender.com/api/skill-gap",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ targetRole, currentSkills }),
        }
      );
      const skillGapData = await skillGapResponse.json();
      setSkillGapResult(skillGapData);

      // Roadmap API
      const roadmapResponse = await fetch(
        "https://career-path-app-yu6i.onrender.com/api/roadmap",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ targetRole }),
        }
      );
      const roadmapData = await roadmapResponse.json();
      setRoadmapResult(roadmapData);

      // News API
      const newsResponse = await fetch(
        "https://career-path-app-yu6i.onrender.com/api/news"
      );
      const newsData = await newsResponse.json();
      setNewsResult(newsData);
    } catch (error) {
      console.error("Error calling APIs:", error);
      alert("Something went wrong while calling the APIs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-10 space-y-6">
        {/* Top: Form */}
        <CareerForm onSubmit={handleFormSubmit} />

        {/* Loading message */}
        {loading && (
          <p className="text-center text-sm text-blue-700 font-medium">
            Analyzing your career path... 🔄
          </p>
        )}

        {/* Middle: Skill Gap (left) + Roadmap (right) */}
        {(skillGapResult || roadmapResult) && (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] mt-4">
            {/* Left */}
            {skillGapResult && <SkillGapResult result={skillGapResult} />}

            {/* Right */}
            {roadmapResult && (
              <div className="bg-zinc-900 border border-zinc-700 rounded-2xl shadow-sm p-5 md:p-6 h-full text-slate-200">
                <h2 className="text-xl font-semibold text-slate-200 mb-3">
                  Career Roadmap
                </h2>

                <p className="text-sm text-slate-400 mb-3">
                  Target Role:{" "}
                  <span className="font-medium text-slate-200">
                    {roadmapResult.targetRole}
                  </span>
                </p>

                <div className="space-y-3">
                  {roadmapResult.phases?.map((phase, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-zinc-700 bg-zinc-800 p-3"
                    >
                      <h3 className="text-sm font-semibold text-slate-300 mb-1">
                        {phase.phase}
                      </h3>

                      <ul className="list-disc list-inside text-xs text-slate-400 space-y-0.5">
                        {phase.focus.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bottom: Latest Tech News */}
        {newsResult && (
          <div className="mt-6">
            <NewsList news={newsResult} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
