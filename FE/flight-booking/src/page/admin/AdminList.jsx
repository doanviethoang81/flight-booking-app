import { useEffect, useState } from "react";

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const adminsPerPage = 10; // Number of admins per page

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/admin/nguoi_dat/role/ROLE_ADMIN")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch admins");
        }
        return response.json();
      })
      .then((data) => {
        setAdmins(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  // Calculate admins to display on the current page
  const lastIndex = currentPage * adminsPerPage;
  const firstIndex = lastIndex - adminsPerPage;
  const currentAdmins = admins.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(admins.length / adminsPerPage);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl text-blue-600 font-bold mb-4 text-center">Danh Sách Admin</h2>
      <table className="w-full border-collapse border border-gray-300 shadow-md">
        <thead>
          <tr className="bg-blue-600">
            <th className="border p-3 text-white">ID</th>
            <th className="border p-3 text-white">Họ và Tên</th>
            <th className="border p-3 text-white">Số Điện Thoại</th>
            <th className="border p-3 text-white">Email</th>
            <th className="border p-3 text-white">Trạng Thái</th>
            <th className="border p-3 text-white">Provider</th>
          </tr>
        </thead>
        <tbody>
          {currentAdmins.map((admin) => (
            <tr key={admin.id} className="hover:bg-gray-100">
              <td className="border p-3 text-center">{admin.id}</td>
              <td className="border p-3">{admin.ho}{admin.ten}</td>
              
              <td className="border p-3 text-center">{admin.soDienThoai || "N/A"}</td>
              <td className="border p-3">{admin.email}</td>
              <td className="border p-3 text-center">
                {admin.enable ? "✅ Hoạt động" : "❌ Không hoạt động"}
              </td>
              <td className="border p-3 text-center">{admin.provider}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-5">
        <button
          className={`px-4 py-2 mx-2 border rounded ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
          }`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Trang trước
        </button>
        <span className="px-4 py-2 border bg-gray-100">
          {currentPage} / {totalPages}
        </span>
        <button
          className={`px-4 py-2 mx-2 border rounded ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"
          }`}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default AdminList;