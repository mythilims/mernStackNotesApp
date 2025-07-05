// components/Sidebar.js
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../features/authSlice";
import { lazy, useState } from "react";
import { userDetails } from "../utils/common";
const Modal = lazy(() => import("./modal"));
const NewNote = lazy(() => import("../pages/NewNote"));

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
        <NewNote editId={""} onClose={() => setShowModal(false)} />
      </Modal>

      <aside className=" text-sm md:text-base w-64 bg-[#4DA8DA] font-bold text-white p-4 z-20 relative">
        <div className="text-sm  ">
          <h2 className="text-xl ">
            <i className="fa fa-list	"></i> Notes Hub
          </h2>
          <div className="p-2">
            <p>User Name :{userDetails().username.toUpperCase()} </p>
            <p>Email :{userDetails().email} </p>
          </div>
        </div>
        <hr className="border-b border-2 border-white border-solid "></hr>

        <nav className="flex flex-col gap-2 m-1">
          <Link to="/dashboard" className="hover:underline">
            <i className="fa  fa-tachometer mr-2"></i> Dashboard
          </Link>
          <Link to="/notes" className="hover:underline">
            <i className="fa fa-sticky-note mr-2"></i> All Notes
          </Link>
          <button
            className="cursor-pointer	 text-left hover:underline"
            onClick={addNewNote}
          >
            <i className="fa fa-plus mr-2"></i> New Note
          </button>

          <button
            className=" cursor-pointer	 text-left hover:underline"
            onClick={handleLogout}
          >
            <i className="fa fa-sign-out mr-2"></i> Logout
          </button>
        </nav>
      </aside>
    </>
  );
}
