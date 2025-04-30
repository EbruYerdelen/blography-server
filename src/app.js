require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const AuthRoutes = require("./modules/auth/auth.route")
const PostRoutes = require("./modules/post/post.route")
const cron = require("node-cron");
const axios = require("axios");




const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "https://blography-client.vercel.app"], // Change to your frontend URL in production
    credentials: true, // Allows cookies to be sent with requests
  })
);

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));




app.use("/auth", AuthRoutes)
app.use("/post", PostRoutes)

//any type of req to any route will be catched by the root route handler,so place this below all your handlers because order of middleware execution matters
app.use("/", (req, res) => {
  res.send("Hello world")
})

app.get("/hello", (req, res) => {
  res.status(200).json({ status: "running" });
});

const serverUrl = process.env.SERVER_URL || "http://localhost:4000";
cron.schedule("*/10 * * * *", async () => {
  try {
    const response = await axios.get(`${serverUrl}/hello`);
    console.log("Cron job executed:", response.data);
  } catch (error) {
    console.error("Cron job failed:", error.message);
  }
});

module.exports = app; 
