const express = require("express");
const router = express.Router();
const roleSkillsMap = require("../data/roleSkillsMap");

// convert user input role -> our internal key
function mapTargetRole(rawRole) {
  if (!rawRole) return null;

  const normalized = rawRole.trim().toLowerCase();

  const ROLE_ALIASES = {
    "frontend developer": "FrontendDeveloper",
    frontenddeveloper: "FrontendDeveloper",
    "backend developer": "Backend Developer",
    backenddeveloper: "Backend Developer",
    "data analyst": "Data Analyst",
    dataanalyst: "Data Analyst",
  };

  return ROLE_ALIASES[normalized] || rawRole;
}

// POST /api/skill-gap
router.post("/", (req, res) => {
  try {
    const { targetRole, currentSkills } = req.body;

    // 1) Basic validation
    if (!targetRole) {
      return res.status(400).json({ error: "targetRole is required" });
    }

    // 2) Map user role to our predefined key
    const mappedRole = mapTargetRole(targetRole);
    const requiredSkills = roleSkillsMap[mappedRole];

    if (!requiredSkills) {
      return res.status(400).json({
        error: "Unsupported role",
        supportedRoles: Object.keys(roleSkillsMap),
      });
    }

    // 3) Normalize currentSkills (string ya array dono support)
    let userSkillsArray = [];

    if (Array.isArray(currentSkills)) {
      userSkillsArray = currentSkills;
    } else if (typeof currentSkills === "string") {
      userSkillsArray = currentSkills.split(",");
    }

    const normalizedUserSkills = new Set(
      userSkillsArray
        .map((s) => s.trim().toLowerCase())
        .filter((s) => s.length > 0)
    );

    // 4) matchedSkills & missingSkills
    const matchedSkills = requiredSkills.filter((skill) =>
      normalizedUserSkills.has(skill.toLowerCase())
    );

    const missingSkills = requiredSkills.filter(
      (skill) => !normalizedUserSkills.has(skill.toLowerCase())
    );

    // 5) Suggested learning order (simple: requiredSkills in order)
    const suggestedLearningOrder = [...requiredSkills];

    // 6) Recommendations text
    const recommendations = [];

    if (missingSkills.length === 0) {
      recommendations.push(
        "You already have all core skills for this role. Focus on 2–3 strong projects and system design basics."
      );
    } else {
      recommendations.push(
        `Start with: ${missingSkills[0]} (it's a core skill for this role).`
      );

      if (missingSkills.length > 1) {
        recommendations.push(
          `Then cover: ${missingSkills.slice(1).join(", ")}.`
        );
      }

      recommendations.push(
        "Try to build 1–2 small projects that use these skills together to strengthen your profile."
      );
    }

    // 7) Final response
    return res.json({
      targetRole: mappedRole,
      requiredSkills,
      matchedSkills,
      missingSkills,
      recommendations,
      suggestedLearningOrder,
    });
  } catch (err) {
    console.error("Error in /api/skill-gap:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
