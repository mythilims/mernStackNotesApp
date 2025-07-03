import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";




function Layout (){
    return (
        <>
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="bg-[#F8FAFC] flex-1 p-4">
              <Outlet />
            </div>
        </div>
        </>
    )
}

export default Layout;
