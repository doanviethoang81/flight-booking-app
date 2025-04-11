import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const ListCustomer = () => {
    const [bookings, setBookings] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            axios.get("http://localhost:8080/api/v1/admin/thong_tin_dat_ve", {
              headers: {
                Authorization: `Bearer ${token}`  // Thêm token vào header
              }
            })
        //axios.get("http://localhost:8080/api/v1/admin/thong_tin_dat_ve")
            .then(response => setBookings(response.data))
            .catch(error => console.error("Error fetching data:", error));
        } else {
            console.error('No token found');
          }
    }, []);

    const toggleDetails = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };
    console.log(bookings);
    return (
        <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Danh sách người đặt vé</h1>
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left font-semibold">Tên</th>
                            <th className="px-6 py-3">Số điện thoại</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Ngày đặt</th>
                            <th className="px-6 py-3">Tổng tiền</th>
                            <th className="px-6 py-3">Trạng thái</th>
                            <th className="px-6 py-3">Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {bookings.map((booking, index) => (
                            <React.Fragment key={index}>
                                <tr className="hover:bg-gray-100 transition duration-200">
                                    <td className="px-6 py-4">{booking.firstName} {booking.lastName}</td>
                                    <td className="px-6 py-4">{booking.phone}</td>
                                    <td className="px-6 py-4">{booking.email}</td>
                                    <td className="px-6 py-4">{booking.bookingDate}</td>
                                    <td className="px-6 py-4 font-bold text-green-600">{booking.total.toLocaleString()} VND</td>
                                    <td className="px-6 py-4 text-blue-600 font-semibold">{booking.paymentStatus}</td>
                                    <td className="px-6 py-4 text-center">
                                        <button
                                            onClick={() => toggleDetails(index)}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md flex items-center justify-center space-x-2 hover:bg-blue-700 transition-all">
                                            <span>{expandedIndex === index ? "Ẩn" : "Xem"}</span>
                                            {expandedIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                                        </button>
                                    </td>
                                </tr>
                                {expandedIndex === index && (
                                    <tr>
                                        <td colSpan="7" className="p-6 bg-gray-50">
                                            <h2 className="font-semibold text-lg mb-4">Chi tiết vé</h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {booking.ticketBookingList.map((ticket, idx) => (
                                                    <div key={idx} className="p-4 border rounded-lg bg-white shadow-lg">
                                                        <p className="text-gray-700"><strong>Mã vé:</strong> {ticket.ticketCode}</p>
                                                        <p className="text-gray-700"><strong>Hành khách:</strong> {ticket.passengers.title} {ticket.passengers.firstName} {ticket.passengers.lastName}</p>
                                                        <p className="text-gray-700"><strong>Loại vé:</strong> {ticket.passengers.type}</p>
                                                        <p className="text-gray-700"><strong>Giá vé:</strong> {ticket.priceTicket.toLocaleString()} VND</p>
                                                        <p className="text-gray-700"><strong>Số hộ chiếu:</strong> {ticket.passengers.number || "N/A"} ({ticket.passengers.issuingCountry || "Không xác định"})</p>


                                                        {booking.flight?.length > 0 && (
                                                            <>
                                                                <p className="text-gray-700"><strong>Chuyến bay đi:</strong> {booking.flight[0].departureAirport} → {booking.flight[0].arrivalAirport}</p>
                                                                <p className="text-gray-700"><strong>Chuyến bay về:</strong> {booking.flight.length > 1 ? `${booking.flight[1].departureAirport} → ${booking.flight[1].arrivalAirport}` : "Không có"}</p>
                                                            </>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ListCustomer;
