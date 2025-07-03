import mongoose, { Schema } from "mongoose";

const notesSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "users" },
  },
  { timestamps: true }
);

const Note = mongoose.model("Notes", notesSchema);
export default Note;
