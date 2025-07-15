import React, { lazy, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, getNotes } from "../features/noteSlice";
const NewNote = lazy(() => import("../pages/NewNote"));
const Modal = lazy(() => import("../components/modal"));
import toast from "react-hot-toast";
import { Search, Plus, Edit3, Trash2, StickyNote, Clock, Filter } from "lucide-react";

function NotesList() {
  const [showModal, setShowModal] = useState(false);
  const [editId, setEdit] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    async function getFetch() {
      await dispatch(getNotes());
    }
    getFetch();
  }, [dispatch]);
  
  const { data, error, loading } = useSelector((state) => state.notes);
  
  const addNewNote = () => {
    setShowModal(true);
  };
  
  const handleDelete = useCallback(
    async (e, id) => {
      e.preventDefault();
      try {
        let data = await dispatch(deleteNote(id));
        if (data) {
          toast.success("Note deleted");
        }
      } catch (e) {
        toast.error(e.message);
      }
    },
    [dispatch]
  );
  
  const editDelete = useCallback(
    (e, id) => {
      setEdit(id);
      setShowModal(true);
    },
    [showModal]
  );
  
  const debounce = (fun, deley) => {
    let time;
    return function (...args) {
      clearTimeout(time);
      time = setTimeout(() => {
        fun.apply(this, args);
      }, deley);
    };
  };
  
  const handleSearch = debounce((value) => {
    dispatch(getNotes(value));
  }, 2000);

  const handleSeachSet = useCallback((e) => {
    setSearchValue(e.target.value);
    handleSearch(e.target.value);
  }, []);

  const colors = [
    'bg-gradient-to-br from-yellow-100 to-yellow-200 border-yellow-300',
    'bg-gradient-to-br from-pink-100 to-pink-200 border-pink-300',
    'bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300',
    'bg-gradient-to-br from-green-100 to-green-200 border-green-300',
    'bg-gradient-to-br from-purple-100 to-purple-200 border-purple-300',
    'bg-gradient-to-br from-orange-100 to-orange-200 border-orange-300',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <NewNote onClose={() => setShowModal(false)} editId={editId} />
      </Modal>
      
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                {/* bg-gradient-to-r from-purple-500 to-indigo-600 */}
                <div className="p-2  bg-[#2A4759]  rounded-xl">
                  <StickyNote className="w-6 h-6 text-white" />
                </div>
                {/*  bg-gradient-to-r from-purple-600 to-indigo-600 */}
                <h1 className="text-2xl font-bold bg-black bg-clip-text text-transparent">
                  Notes
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  placeholder="Search your notes..."
                  name="search"
                  value={searchValue}
                  className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                  onChange={handleSeachSet}
                />
              </div>
              {/* bg-gradient-to-r from-purple-500 to-indigo-600 */}
              <button
                className="flex bg-[#2A4759] items-center space-x-2 px-4 py-2  text-white font-medium rounded-full hover:from-purple-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={addNewNote}
              >
                <Plus className="w-4 h-4" />
                <span>New</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 border-t-purple-600"></div>
              <p className="text-gray-600 font-medium">Loading your notes...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mb-6">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">!</span>
              </div>
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Notes Grid - Uniform Size */}
        {data.length > 0 && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map((item, index) => (
              <div
                key={item._id}
                className={` text-white group relative bg-[#456882]  border-2 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-80 flex flex-col`}
              >
                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200 shadow-md"
                    onClick={(e) => editDelete(e, item._id)}
                    title="Edit note"
                  >
                    <Edit3 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200 shadow-md"
                    onClick={(e) => handleDelete(e, item._id)}
                    title="Delete note"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
                
                {/* Note Content */}
                <div className="text-whitepr-16 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-white mb-3 leading-tight line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-white text-sm leading-relaxed whitespace-pre-wrap line-clamp-6">
                      {item.description}
                    </p>
                  </div>
                </div>
                
                {/* Note Footer */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-300/50">
                  <div className="flex items-center space-x-1 text-xs text-white">
                    <Clock className="w-3 h-3" />
                    <span>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Today'}</span>
                  </div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full opacity-60"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {data.length === 0 && !loading && (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="mb-8">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <StickyNote className="w-16 h-16 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">No notes yet</h3>
                <p className="text-gray-600 text-lg mb-8">
                  Start capturing your thoughts and ideas
                </p>
              </div>
              <button
                className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-full hover:from-purple-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl mx-auto"
                onClick={addNewNote}
              >
                <Plus className="w-5 h-5" />
                <span>Create your first note</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-6 {
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default React.memo(NotesList);