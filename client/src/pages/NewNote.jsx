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
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          {editId ? "Edit" : "Create"} Note
        </h2>
        {/* bg-gradient-to-r from-blue-500 to-purple-600 */}
        <div className="w-12 h-0.5  bg-[#2A4759] mx-auto rounded-full"></div>
      </div>

      <div
        className="flex flex-col gap-3 w-full max-w-sm mx-auto bg-gradient-to-br from-white to-gray-50 p-4 rounded-lg shadow-md border border-gray-100"
      >
        <div className="flex flex-col space-y-1">
          <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter your note title..."
            value={notesDetails.title}
            name="title"
            onChange={(e) => handleChange(e.target.value, "title")}
            className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none p-2 rounded transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-gray-400 resize-none text-sm"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
            Category
          </label>
          <input
            type="text"
            placeholder="Enter category (e.g., Work, Personal)..."
            name="category"
            onChange={(e) => handleChange(e.target.value, "category")}
            value={notesDetails.category}
            className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none p-2 rounded transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-gray-400 resize-none text-sm"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
            Description
          </label>
          <textarea
            type="text"
            placeholder="Write your note description here..."
            name="description"
            rows="3"
            onChange={(e) => handleChange(e.target.value, "description")}
            value={notesDetails.description}
            className="border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none p-2 rounded transition-all duration-300 bg-white/80 backdrop-blur-sm placeholder-gray-400 resize-none text-sm"
          />
        </div>
{/*  bg-gradient-to-r from-blue-600 to-purple-600 */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="mt-3 bg-[#2A4759] hover:from-blue-700 hover:to-purple-700 font-bold text-white py-2 px-4 rounded shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 text-sm"
        >
          {editId ? "Update" : "Save"} Note
        </button>
      </div>
    </>
  );
}

export default React.memo(NewNote);