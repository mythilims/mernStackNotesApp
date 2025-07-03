import isValidId from "../middlewares/collectionIdCheck.js";
import Note from "../models/notesModal.js";

import express from "express";
const noteRoute = express.Router();

noteRoute.get("/", async (req, res) => {
  console.log(req.query);
  
  const notes = await Note.find({userId:req.query.userId}).populate("userId","username email");
  try {
    res.status(200).json({ data: notes, message: "success", error: "" ,success:true});
  } catch (e) {
    res.status(500).json({ data: [], message: "", error: "fail",success:false });
  }
});

noteRoute.post("/", async (req, res) => {
  const { title, description, category,userId } = req.body;
  const note = new Note({
    title,
    description,
    category,
    userId
  });
  try {
    await note.save();
    res.status(200).json({ message: "note added", success: true, error: "" });
  } catch (e) {
    res.status(500).json({
      message: "note not added",
      success: false,
      error: "server error",
      success:false
    });
  }
});

noteRoute.put("/:id", isValidId,async (req, res) => {
  const { body, params } = req;
  const updateNotes = await Note.findOneAndUpdate(
    { _id: params.id },
    { $set: body },
    { new: true }
  );
  try {
    res.status(200).json({ message: "note updated", data: updateNotes,success:true });
  } catch (e) {
    res.status(500).json({ message: "", error: e ,success:false});
  }
});

noteRoute.get("/:id", isValidId,async (req, res) => {
  try {
    const notes = await Note.findById(req.params.id);
    res.status(200).json({ data: notes, message: "success", error: "" });
  } catch (e) {
    res.status(500).json({ data: [], message: "", error: "fail" });
  }
});

noteRoute.delete("/:id", isValidId,async (req, res) => {
  try {
      await Note.findOneAndDelete({ _id: req.params.id });
    res.status(200).json({ message: "note deleted",success:true });
  } catch (e) {
    res.status(500).json({ message: " deleted fail" ,success:true});
  }
});

export default noteRoute;
