import Navbar from "../componentsIntegrasi/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../componentsIntegrasi/Footer";

export default function Layout() {
    return(
        <>
            <Navbar />
            <Outlet />
            <Footer/>
        </>
    )
}