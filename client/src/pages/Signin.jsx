import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authCheck } from "../features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Signin() {
  const navigator = useNavigate();
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
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
    if(userDetails.email=== ""|| userDetails.password=== ""  ){
      return toast.error("fill the all field")
    }
    const result = await dispatch(authCheck(userDetails)).unwrap();
    if (result.success) {
      localStorage.setItem("userDetails", JSON.stringify(result.userDetails));
      localStorage.setItem("token", result.token);
      toast.success(result.message);

      setTimeout(() => {
        navigator("/dashboard");
      }, 1000);
    } else {
      toast.error(result.error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#456882]
       //bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900
       relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0  opacity-20"></div>
        
        {/* <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
        </div> */}

        <div className="relative z-10 min-h-screen flex flex-col lg:flex-row">
          {/* Left Panel - Welcome Section */}
          <div className="lg:w-2/5 w-full flex flex-col justify-center items-center p-8 lg:p-12">
            <div className="text-center space-y-6 max-w-md">
              <div className="space-y-2">
                <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
                  Welcome Back
                </h1>
                <p className="text-lg text-gray-300">
                  New here? Join our community today
                </p>
              </div>
              
              <div className="pt-4">
                <Link to={'/register'}>
                  <button className="group relative bg-[#2A4759]  overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-2xl px-8 py-4 text-lg font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <span className="relative z-10">Sign up</span>
                    {/* bg-gradient-to-r from-blue-500 to-purple-600 */}
                    <div className="absolute inset-0  bg-[#2A4759] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Panel - Sign In Form */}
          <div className="lg:w-3/5 w-full flex justify-center items-center p-8 lg:p-12">
            <div className="w-full max-w-md">
              <div className="
              bg-white/10 
              backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 lg:p-10">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold text-white">
                      Welcome back...
                    </h2>
                    <p className="text-gray-300">
                      Enter your credentials to continue
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className= " placeholder-white w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
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
                      <label className="block text-sm font-medium text-gray-200 mb-2">
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
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 placeholder-white"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    {/* bg-gradient-to-r from-blue-600 to-purple-600 */}
                    <button
                      type="submit"
                      className="group relative w-full overflow-hidden   bg-[#222831] text-white py-3 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      {/*  bg-gradient-to-r from-blue-500 to-purple-500 */}
                      <span className="relative z-10">Sign in</span>
                      <div className="absolute inset-0  bg-[#2A4759]  opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>

                  {/* <div className="text-center pt-4">
                    <button type="button" className="text-sm text-gray-300 hover:text-white transition-colors duration-300">
                      Forgot your password?
                    </button>
                  </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;