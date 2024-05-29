import { Outlet } from "react-router-dom";
import SideBar from "../components/DashBoard/SideBar/SideBar";

const DashBoardLayout = () => {
    return (
        <div className="relative md:flex min-h-screen ">
            {/* sidebar */}
            <SideBar></SideBar>
            <div className="flex-1 md:ml-64">
                <div className="p-4">
                    {/* dashboard content */}
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default DashBoardLayout;