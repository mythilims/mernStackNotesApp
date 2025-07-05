import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authCheck, register } from "../features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function Register() {
  const navigator = useNavigate();
  const [userDetails, setUserDetails] = useState({ email: "", password: "",username:'' });
  const handleUserDetails = useCallback(
    (e, field) => {
      setUserDetails((pre) => ({
        ...pre,
        [field]: e,
      }));
    },
    [userDetails]
  );
  const dispatch = useDispatch();
  const authDetails = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(register(userDetails)).unwrap();
    if (result.success) {
    //   localStorage.setItem("userDetails", JSON.stringify(result.userDetails));
    //   localStorage.setItem("token", result.token);
      toast.success(result.message);

      setTimeout(() => {
        navigator("/login");
      }, 1000);
    } else {
      toast.error(result.error);
    }
  };

  return (
    <>
      <div className="h-screen bg-[#4DA8DA]">
        <div className="min-h-screen flex flex-col md:flex-row p-4 gap-4 ">
          <div className="rounded-sm shadow-lg md:w-2/7 w-full bg-[#F8FAFC] flex flex-col justify-center items-center p-6">
            <p className="mb-4 text-xl font-bold text-gray-800">Welcome</p>
           
             <Link to={'/login'}>

            <button className="bg-[#578FCA] text-white rounded-sm shadow-lg px-6 py-2 text-md font-bold hover:bg-[#3674B5] transition">
              Login
            </button>
            </Link>
          </div>

          <div className="rounded-sm shadow-lg md:w-2/3 w-full bg-[#F8FAFC] flex justify-center items-center p-6">
            <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit}>
              <p className="text-center text-xl font-bold text-gray-800">
                Welcome to...
              </p>
              <div>
                <label className="block font-semibold text-base mb-1">
                  Username
                </label>
                <input
                  type="text"
                  className="ring-1 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  value={userDetails.username}
                  id="username"
                  name="username"
                  onChange={(e) => {
                    handleUserDetails(e.target.value, "username");
                  }}
                  placeholder="Enter your Username"
                />
              </div>
              <div>
                <label className="block font-semibold text-base mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="ring-1 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  value={userDetails.email}
                  id="email"
                  name="name"
                  onChange={(e) => {
                    handleUserDetails(e.target.value, "email");
                  }}
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block font-semibold text-base mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={userDetails.password}
                  onChange={(e) => {
                    handleUserDetails(e.target.value, "password");
                  }}
                  className="ring-1 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                className="rounded bg-[#578FCA] text-white py-2 px-4 w-full font-bold hover:bg-[#3674B5] transition"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
