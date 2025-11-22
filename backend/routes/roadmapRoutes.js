const express = require("express");
const router = express.Router();
const roadmaps = require("../data/roadmaps");
const roleSkillsMap = require("../data/roleSkillsMap"); // same roles reuse

// same mapping as skill-gap
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

// POST /api/roadmap
router.post("/", (req, res) => {
  try {
    const { targetRole } = req.body;

    if (!targetRole) {
      return res.status(400).json({ error: "targetRole is required" });
    }

    const mappedRole = mapTargetRole(targetRole);
    const roadmapForRole = roadmaps[mappedRole];

    if (!roadmapForRole) {
      return res.status(400).json({
        error: "No roadmap defined for this role",
        supportedRoles: Object.keys(roadmaps),
      });
    }

    return res.json({
      targetRole: mappedRole,
      phases: roadmapForRole,
    });
  } catch (err) {
    console.error("Error in /api/roadmap:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
