export default function Modal({ isOpen, onClose, children }) {
  console.log(onClose);
  
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center  "
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
