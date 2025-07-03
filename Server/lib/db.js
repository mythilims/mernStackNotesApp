import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
let uri =process.env.MONGO_URI;
const dbConnect = async () => {
  try {
    await mongoose.connect(uri);
    console.log("am a mongoose connected");
  } catch (e) {
    console.log("not connected mongoose");
  }
};

export default dbConnect;
