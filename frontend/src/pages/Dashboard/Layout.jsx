import { Outlet } from "react-router-dom";
import Header from "../../components/dashboard/Header";
import Footer from "../../components/dashboard/Footer";


const DashLayout = () => {
    return (
        <section className="dashboard">
            <Header />
            <Outlet />
            <Footer />
        </section>
    )
}

export default DashLayout