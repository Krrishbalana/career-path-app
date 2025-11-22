const express = require("express");
const cors = require("cors");

const skillGapRoute = require("./routes/skillGapRoutes");
const roadmapRoute = require("./routes/roadmapRoutes");
const newsRoute = require("./routes/newsRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// register route
app.use("/api/skill-gap", skillGapRoute);
app.use("/api/roadmap", roadmapRoute);
app.use("/api/news", newsRoute);

app.get("/", (req, res) => {
  res.send("Backend server is running ✅");
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
