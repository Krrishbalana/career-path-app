function SkillGapResult({ result }) {
  if (!result) return null;

  const {
    targetRole,
    matchedSkills,
    missingSkills,
    recommendations,
    suggestedLearningOrder,
  } = result;

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-2xl shadow-sm p-5 md:p-6 h-full flex flex-col text-slate-200">
      <h2 className="text-xl font-semibold text-slate-200 mb-3">
        Skill Gap Analysis
      </h2>

      <p className="text-sm text-slate-400 mb-4">
        Target Role:{" "}
        <span className="font-medium text-slate-200">{targetRole}</span>
      </p>

      {/* Matched skills */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-300 mb-1">
          Matched Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {matchedSkills?.length ? (
            matchedSkills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-full bg-emerald-900/30 text-emerald-300 text-xs font-medium border border-emerald-800"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-xs text-slate-500">
              No matched skills found yet.
            </p>
          )}
        </div>
      </div>

      {/* Missing skills */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-300 mb-1">
          Missing Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {missingSkills?.length ? (
            missingSkills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-full bg-red-900/30 text-red-300 text-xs font-medium border border-red-800"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-xs text-slate-500">
              You have all the core skills for this role.
            </p>
          )}
        </div>
      </div>

      {/* Recommendations */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-300 mb-1">
          Recommendations
        </h3>
        <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
          {recommendations?.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Learning order */}
      <div className="mt-auto">
        <h3 className="text-sm font-semibold text-slate-300 mb-1">
          Suggested Learning Order
        </h3>
        <ol className="list-decimal list-inside text-xs text-slate-400 space-y-1">
          {suggestedLearningOrder?.map((skill, idx) => (
            <li key={idx}>{skill}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default SkillGapResult;
