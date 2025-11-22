const express = require("express");
const axios = require("axios");
const router = express.Router();

// GET /api/news
router.get("/", async (req, res) => {
  try {
    // 1. Top story IDs fetch karo
    const topStoriesURL =
      "https://hacker-news.firebaseio.com/v0/topstories.json";

    const { data: storyIDs } = await axios.get(topStoriesURL);

    // first 5 IDs
    const firstFive = storyIDs.slice(0, 5);

    let stories = [];

    // 2. Har story ki detail fetch karo
    for (let id of firstFive) {
      const storyURL = `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
      const { data } = await axios.get(storyURL);

      if (data) {
        stories.push({
          id: data.id,
          title: data.title,
          url: data.url || "No URL",
          score: data.score,
          time: data.time,
          type: data.type,
          by: data.by,
        });
      }
    }

    return res.json({
      count: stories.length,
      stories,
    });
  } catch (err) {
    console.error("Error in /api/news:", err);
    return res.status(500).json({ error: "Failed to fetch HackerNews data" });
  }
});

module.exports = router;
