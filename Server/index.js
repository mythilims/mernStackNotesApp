import express from "express";
import cors from "cors";
import dbConnect from "./lib/db.js";
import userRoute from "./routes/UserRoute.js";
import noteRoute from "./routes/noteRoute.js";
import protectedApi from "./middlewares/protectedApi.js";
const app = express();
const allowedOrigins = [
  "https://mernnotesappui.netlify.app",
  "http://localhost:5173"
];
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman or mobile apps)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
dbConnect();
app.use("/users", userRoute);
//protetedApi

app.use("/notes", protectedApi, noteRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`am a server and started PORT:${PORT}`);
});
