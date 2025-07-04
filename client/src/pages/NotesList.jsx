import React, { lazy, useEffect, useState,useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, getNotes } from "../features/noteSlice";
const   NewNote =lazy(()=> import ( "../pages/NewNote"));
const  Modal = lazy(()=> import ("../components/modal"));
import toast from "react-hot-toast";

  function NotesList() {
  const [showModal, setShowModal] = useState(false);
  const [editId, setEdit] = useState("");

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
  const handleDelete = useCallback(async (e, id) => {
    e.preventDefault();
    try {
      let data = await dispatch(deleteNote(id));
      if (data) {
        toast.success("Note deleted");
      }
    } catch (e) {
      toast.error(e.message);
    }
  },[dispatch]);
  const editDelete = useCallback((e, id) => {
    setEdit(id);
    setShowModal(true);
  },[showModal]);

  return (
    <div className="p-3">
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <NewNote  onClose={() => setShowModal(false)} editId={editId} />
      </Modal>
      <div className="flex gap-6 my-2">
        <p className="text-2xl font-bold underline p-2 text-sm md:text-base">
          Notes List
        </p>
        <button
          className=" text-sm md:text-base  cursor-pointer	 text-left hover:underline rounded sm:rounded-sm bg-[#4DA8DA] p-2 font-bold"
          onClick={addNewNote}
        >
          New Note +
        </button>
      </div>
      <hr
        className="border-b border-2 border-[#4DA8DA] border-solid
"
      ></hr>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2">
        {data.length > 0 &&
          !loading &&
          data.map((item) => (
            <div
              key={item._id}
              className="line-clamp-3 bg-white rounded p-4 shadow hover:shadow-md transition w-full max-w-full  h-80 sm:h-50 break-words whitespace-normal"
            >
              <div className="flex items-center justify-between mb-2">
                <h1 className="font-bold text-lg underline">{item.title}</h1>
                <div className="flex flex-col sm:flex-row gap-2 sm:justify-start sm:items-start my-3">
                  <button
                    className="cursor-pointer	 text-left hover:underline rounded bg-[#4DA8DA] p-2 font-bold text-white"
                    onClick={(e) => editDelete(e, item._id)}
                  >
                    <i
                      class="hover:underline fa fa-pencil-square-o cursor-pointer	 "
                      aria-hidden="true "
                    ></i>
                  </button>
                  <button
                    className=" cursor-pointer	text-left hover:underline rounded-sm shadow-sm bg-red-400 p-2 font-bold text-white"
                    onClick={(e) => handleDelete(e, item._id)}
                  >
                    <i
                      className="hover:underline cursor-pointer	 fa  fa-trash-o"
                      aria-hidden="true"
                    ></i>
                  </button>
                </div>
              </div>

              {/* Content preview */}
              <p className="text-sm ">{item.description}</p>
            </div>
          ))}
      </div>
      <div>{loading && <p>{error}</p>}</div>
    </div>
  );
}


export default React.memo(NotesList);