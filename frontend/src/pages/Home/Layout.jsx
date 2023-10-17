import { Outlet } from "react-router-dom";
import Header from "../../components/public/Header";
import Footer from "../../components/public/Footer";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Layout = () => {
    return (
        <main>
            <ToastContainer />
            <Header />
            <Outlet />
            <Footer />
        </main>
    )
}

export default Layout