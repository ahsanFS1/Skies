
const mongoose = require("mongoose")
const weatherRoutes = require('./routes/weatherRoute')
const authorizationRoutes = require('./routes/authorizationRoute')
const express = require('express');
const cors = require("cors")
require("dotenv").config();
const app = express();
const port = 5000;
// Define a route for the root URL

app.use(cors());
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));
app.use(express.json())

app.use("/api/weather",weatherRoutes)
app.use("/api/auth",authorizationRoutes)
// POST /api/insights
app.post("/api/insights", async (req, res) => {
  const { weather } = req.body;
  const summary = `Provide a brief insight about the following weather, and give recommendations about planning my day, "Summarize the following weather data as if you're a friendly weather app. Be informative and clear, avoid chatbot phrases like 'Okay' or 'Here's a summary'. Write in natural language, and do not use markdown syntax. Here is the data:" \n\n${JSON.stringify(
    weather,
    null,
    
  )}`;
  console.log("AI")
  try {
    const geminiResponse = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBPyyy7zDryYoRa4eE_d5cgnbwhFw3_rDM ", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: summary }] }],
      }),
    });
    console.log("AI2")
    const data = await geminiResponse.json();
    console.log("data: ",data)
    const insight =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "No insight available";

    res.json({ insight });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch Gemini insight" });
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});