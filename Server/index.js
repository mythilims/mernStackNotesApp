import express from "express";
import cors from "cors";
import dbConnect from "./lib/db.js";
import userRoute from "./routes/UserRoute.js";
import noteRoute from "./routes/noteRoute.js";
import protectedApi from "./middlewares/protectedApi.js";
import path from 'path'
const app = express();
app.use(cors())
app.use(express.json());
dbConnect();
app.use("/users", userRoute);
//protetedApi 
app.use('/notes',protectedApi,noteRoute)

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`am a server and started PORT:${PORT}`);
});
