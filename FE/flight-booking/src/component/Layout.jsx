import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-800 text-white  text-center p-4">Header</header>

      {/* Nội dung chính */}
      <main className="flex-1 w-5xl mx-auto mt-2"> 
        <Outlet /> {/* Đây là nơi các trang con sẽ hiển thị */}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        Footer
      </footer>
    </div>
  );
};

export default Layout;
