import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logOut } from "../features/authSlice";
import { lazy, useState } from "react";
import { userDetails } from "../utils/common";
import { 
  BarChart3, 
  FileText, 
  Plus, 
  LogOut, 
  User, 
  Mail, 
  StickyNote,
  Settings,
  Home
} from "lucide-react";

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
{/* bg-gradient-to-b from-slate-900 to-slate-800 */}
      <aside className="w-72 bg-[#456882]   text-white shadow-2xl border-r border-slate-700 flex flex-col min-h-full">
        {/* Header */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center space-x-3 mb-4">
            {/*  bg-gradient-to-r from-blue-500 to-purple-600 */}
            <div className="p-2 rounded-xl bg-[#2A4759]">
              <StickyNote className="w-6 h-6 text-white" />
            </div>
            {/*  bg-gradient-to-r from-blue-400 to-purple-400 */}
            <h2 className="text-xl font-bold bg-white bg-clip-text text-transparent">
              Notes Hub
            </h2>
          </div>
          
          {/* User Profile */}
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
            <div className="flex items-center space-x-3 mb-3">
            {/* bg-gradient-to-r from-blue-500 to-purple-600 */}
              <div className="w-10 h-10 bg-[#2A4759]  rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                 {userDetails().username.toUpperCase()}
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  <Mail className="w-3 h-3 text-slate-400" />
                  <p className="text-xs text-slate-400 truncate">
                    {userDetails().email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link 
            to="/dashboard" 
            className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-slate-700/50 transition-all duration-200 group"
          >
            <div className="p-2 bg-slate-700/50 rounded-lg group-hover:bg-blue-500/20 transition-all duration-200">
              <BarChart3 className="w-5 h-5 text-slate-300 group-hover:text-blue-400" />
            </div>
            <span className="font-medium text-slate-300 group-hover:text-white">Dashboard</span>
          </Link>

          <Link 
            to="/notes" 
            className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-slate-700/50 transition-all duration-200 group"
          >
            <div className="p-2 bg-slate-700/50 rounded-lg group-hover:bg-green-500/20 transition-all duration-200">
              <FileText className="w-5 h-5 text-slate-300 group-hover:text-green-400" />
            </div>
            <span className="font-medium text-slate-300 group-hover:text-white">All Notes</span>
          </Link>

          <button
            onClick={addNewNote}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-slate-700/50 transition-all duration-200 group"
          >
            <div className="p-2 bg-slate-700/50 rounded-lg group-hover:bg-purple-500/20 transition-all duration-200">
              <Plus className="w-5 h-5 text-slate-300 group-hover:text-purple-400" />
            </div>
            <span className="font-medium text-slate-300 group-hover:text-white">New Note</span>
          </button>

          {/* Divider */}
          <div className="h-px bg-slate-700 my-4"></div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-500/10 transition-all duration-200 group"
          >
            <div className="p-2 bg-slate-700/50 rounded-lg group-hover:bg-red-500/20 transition-all duration-200">
              <LogOut className="w-5 h-5 text-slate-300 group-hover:text-red-400" />
            </div>
            <span className="font-medium text-slate-300 group-hover:text-red-400">Logout</span>
          </button>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center justify-center space-x-2 text-xs text-slate-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Online</span>
          </div>
        </div>
      </aside>
    </>
  );
}