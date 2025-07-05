import React,{ useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createNote, getByNote, updateNote } from "../features/noteSlice";
import toast from "react-hot-toast";
function NewNote({ onClose, editId }) {

  const [notesDetails, setNotesDetails] = useState({
    title: "",
    category: "",
    description: "",
    id: "",
  });
  const dispatch = useDispatch();
  const handleChange = (value, field) => {
    setNotesDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ prevent page reload
    console.log("Note Submitted:", notesDetails); // ✅ log or dispatch

    if (
      notesDetails.title &&
      notesDetails.description &&
      notesDetails.category
    ) {
      if (editId) {
        const data = await dispatch(updateNote(notesDetails)).unwrap();
        if (data) {
          toast.success("Note updated successfully ");
          if (onClose) onClose(false);
        } else {
          if (onClose) onClose(false);
        }
      } else {
        const data = await dispatch(createNote(notesDetails)).unwrap();
        if (data) {
          toast.success("Note add successfully ");
          if (onClose) onClose(false);
        } else {
          if (onClose) onClose(false);
        }
      }
    } else {
      toast.error("fill the all field");
    }
  };

  useEffect(() => {
    if(editId){
    async function getNoteById() {
      try {
        let res = await dispatch(getByNote(editId)).unwrap();
        let data = res.data;
        setNotesDetails((pre) => ({
          ...pre,
          title: data.title,
          description: data.description,
          category: data.category,
          id: data._id,
        }));
      } catch (e) {
        toast.error(e.message);
      }
    }
    getNoteById();
  }
  }, [editId]);

  return (
    <>
      <p className="text-2xl font-bold underline mb-6">
        {editId ? "Edit" : "Add"} New Note
      </p>

      <form
        className="flex flex-col gap-4 w-full max-w-md bg-white  p-2 rounded"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Title</label>
          <input
            type="text"
            placeholder="Enter title"
            value={notesDetails.title}
            name="title"
            onChange={(e) => handleChange(e.target.value, "title")}
            className="ring-1 hover:ring-blue-300 hover:ring-2 hover:outline-none p-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Category</label>
          <input
            type="text"
            placeholder="Enter category"
            name="category"
            onChange={(e) => handleChange(e.target.value, "category")}
            value={notesDetails.category}
            className="ring-1 hover:ring-blue-300 hover:ring-2 hover:outline-none p-2 rounded"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Description</label>
          <textarea
            type="text"
            placeholder="Enter description"
            name="description"
            row="2"
            onChange={(e) => handleChange(e.target.value, "description")}
            value={notesDetails.description}
            className="ring-1 hover:ring-blue-300 hover:ring-2 hover:outline-none p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-[#4DA8DA] font-bold text-white py-2 rounded hover:bg-[#4DA8DA] transition"
        >
          {editId ? "Update" : "Save"} Note
        </button>
      </form>
    </>
  );
}

export default React.memo(NewNote);
