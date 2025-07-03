import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNote } from "../features/noteSlice";

function NewNote({ onClose ,edit  }) {
  console.log(onClose);
  
  const [notesDetails, setNotesDetails] = useState({
    title: "",
    category: "",
    description: "",
  });
   const dispatch =useDispatch()
  const handleChange = (value, field) => {
    setNotesDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault(); // ✅ prevent page reload
    console.log("Note Submitted:", notesDetails); // ✅ log or dispatch

    if(notesDetails.title){
      const data= await dispatch(createNote(notesDetails)).unwrap();

    }
    // setNotesDetails({ title: "", category: "", description: "" });

    // ✅ Close modal if onClose is provided
    if (onClose) onClose(false);
  };

  return (
    <>
      <p className="text-2xl font-bold underline mb-6">{edit ? 'Edit' :'Add' } New Note</p>

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
          <input
            type="text"
            placeholder="Enter description"
            name="description"
            onChange={(e) => handleChange(e.target.value, "description")}
            value={notesDetails.description}
            className="ring-1 hover:ring-blue-300 hover:ring-2 hover:outline-none p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-[#4DA8DA] font-bold text-white py-2 rounded hover:bg-[#4DA8DA] transition"
        >
          {edit ? 'Update' :'Save' } Note
        </button>
      </form>
    </>
  );
}

export default NewNote;
