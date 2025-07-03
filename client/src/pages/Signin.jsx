import { useCallback, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {authCheck} from '../features/authSlice'
import { useNavigate } from "react-router-dom";
function Signin() {
  const  navigator=useNavigate()
  const [userDetails, setUserDetails] = useState({ email: "", password: "" });
  const handleUserDetails =useCallback((e,field) =>{
   setUserDetails((pre)=>({
    ...pre,
    [field]:e
   }))
 
  },[userDetails])
 const dispatch =useDispatch();
  const authDetails =useSelector(state =>state.auth);
  console.log(authDetails);
  
  const handleSubmit =async(e) =>{
    e.preventDefault();
    const result = await dispatch(authCheck(userDetails)).unwrap();
    console.log(result);
    if(result.success){
      localStorage.setItem("userDetails",JSON.stringify(result.userDetails));
      localStorage.setItem("token",result.token);
      navigator('/dashboard');

    }
  }

  return (
    <>
      <div className="h-screen bg-[#4DA8DA]">
        <div className="min-h-screen flex flex-col md:flex-row p-4 gap-4 ">
          <div className="rounded-sm shadow-lg md:w-2/7 w-full bg-[#F8FAFC] flex flex-col justify-center items-center p-6">
            <p className="mb-4 text-xl font-bold text-gray-800">Welcome</p>
            <button className="bg-[#578FCA] text-white rounded-sm shadow-lg px-6 py-2 text-md font-bold hover:bg-[#3674B5] transition">
              Sign up
            </button>
          </div>

          <div className="rounded-sm shadow-lg md:w-2/3 w-full bg-[#F8FAFC] flex justify-center items-center p-6">
            <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit}>
              <p className="text-center text-xl font-bold text-gray-800">
                Welcome back...
              </p>

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
                    handleUserDetails(e.target.value,'email');
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
                    handleUserDetails(e.target.value,'password');
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

export default Signin;
