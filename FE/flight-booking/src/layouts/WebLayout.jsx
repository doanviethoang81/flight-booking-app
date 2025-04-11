import {Outlet} from "react-router-dom";
import ScrollTop from "../components/ScrollTop";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const WebLayout = () => {
  return (
    <div className="overflow-hidden flex flex-col min-h-screen relative">
      <Header />
      <main className="flex-1 w-full p-20 bg-gray-100">
        <Outlet />
      </main>
      <Footer />
      <ScrollTop />
    </div>
  );
};

export default WebLayout;
