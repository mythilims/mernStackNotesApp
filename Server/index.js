import express from "express";
import cors from "cors";
import dbConnect from "./lib/db.js";
import userRoute from "./routes/UserRoute.js";
import noteRoute from "./routes/noteRoute.js";
import protectedApi from "./middlewares/protectedApi.js";
const app = express();
app.use(cors({
  origin:"https://mernstacknotesapp-yjii.onrender.com",
  credentials:true
}))
app.use(express.json());
dbConnect();
app.use("/users", userRoute);
//protetedApi 

app.use('/notes',protectedApi,noteRoute)

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`am a server and started PORT:${PORT}`);
});
