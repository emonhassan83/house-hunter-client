import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";

const MainLayout = () => {
    return (
        <div>
            <Navbar/>
            <div className="h-[60vh]">
            <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default MainLayout;