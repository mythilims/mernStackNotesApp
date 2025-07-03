// components/Sidebar.js
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../features/authSlice";
import Modal from "./modal";
import { useState } from "react";
import NewNote from "../pages/NewNote";

export default function Sidebar() {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    dispatch(logOut());
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");

    navigate("/login");
  };
  const addNewNote = () => {
    setShowModal(true);
  };
  return (
    <>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <NewNote edit={false} />
      </Modal>
      <aside className=" text-sm md:text-base w-64 bg-[#4DA8DA] font-bold text-white p-4 z-20 relative">
        <h2 className="text-xl mb-4">📝 Notes Hub</h2>
        <nav className="flex flex-col gap-2">
          <Link to="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link to="/notes" className="hover:underline">
            All Notes
          </Link>
          <button
            className="cursor-pointer	 text-left hover:underline"
            onClick={addNewNote}
          >
            New Note +
          </button>

          {/* <Link to="/addNote" className="hover:underline">New Note +</Link> */}
          <button
            className=" cursor-pointer	 text-left hover:underline"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
}
