import isValidId from "../middlewares/collectionIdCheck.js";
import Note from "../models/notesModal.js";
import mongoose from "mongoose";
import express from "express";
const noteRoute = express.Router();

noteRoute.get("/", async (req, res) => {
  console.log(req.query);
  const {userId,title} =req.query;
  let filter ={
    ...(userId && {userId}),
    ...(title && {title:{$regex:title,$options:"i"}})
  }
  const notes = await Note.find(filter).populate(
    "userId",
    "username email"
  );
  try {
    res
      .status(200)
      .json({ data: notes, message: "success", error: "", success: true });
  } catch (e) {
    res
      .status(500)
      .json({ data: [], message: "", error: "fail", success: false });
  }
});

noteRoute.post("/", async (req, res) => {
  const { title, description, category, userId } = req.body;
  const note = new Note({
    title,
    description,
    category,
    userId,
  });
  try {
    await note.save();
    res.status(200).json({ message: "note added", success: true, error: "" });
  } catch (e) {
    res.status(500).json({
      message: "note not added",
      success: false,
      error: "server error",
      success: false,
    });
  }
});

noteRoute.get("/days", async (req, res) => {
  try {
    const user = req.query.userId;
    const objectId = new mongoose.Types.ObjectId(user);
    const notes = await Note.aggregate([
      {
        $match: { userId: objectId }, 
      },
      {
        $group: {
          _id: "$category", 
          description:{$first:'$description'},
          category:{$first:'$category'},
          count: { $sum: 1 }, 
        },
      }
    ]);

    return res.status(200).json({ success: true, data: notes });
  } catch (e) {
    console.error("Error:", e.message);
    return res.status(500).json({ success: false, data: [], error: e.message });
  }
});

noteRoute.put("/:id", isValidId, async (req, res) => {

  const { body, params } = req;
  const updateNotes = await Note.findOneAndUpdate(
    { _id: params.id },
    { $set: body },
    { new: true }
  );
  try {
    res
      .status(200)
      .json({ message: "note updated", data: updateNotes, success: true });
  } catch (e) {
    res.status(500).json({ message: "", error: e, success: false });
  }
});

noteRoute.get("/:id", isValidId, async (req, res) => {
  console.log("3");

  try {
    const notes = await Note.findById(req.params.id);
    res.status(200).json({ data: notes, message: "success", error: "" });
  } catch (e) {
    res.status(500).json({ data: [], message: "", error: "fail" });
  }
});

noteRoute.delete("/:id", isValidId, async (req, res) => {
  console.log("4");

  try {
    await Note.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "note deleted", success: true });
  } catch (e) {
    res.status(500).json({ message: " deleted fail", success: true });
  }
});

export default noteRoute;
