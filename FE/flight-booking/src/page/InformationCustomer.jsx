import { useState } from "react";

function InformationCustomer() {
    const [phone, setPhone] = useState("");
    const [customerData, setCustomerData] = useState(null);
    const [error, setError] = useState(null);
    const [expandedTicket, setExpandedTicket] = useState(null);

    const handleSearch = async () => {
        try {
            setError(null);
            setCustomerData(null);
            const response = await fetch(`http://localhost:8080/api/v1/nguoi_dat/${phone}`);
            if (!response.ok) {
                throw new Error("Không tìm thấy thông tin khách hàng");
            }
            const data = await response.json();
            setCustomerData(data);
        } catch (err) {
            setError(err.message);
        }
    };
    const formatVietnamTime = (dateString) => {
        const formatter = new Intl.DateTimeFormat('vi-VN', {
            timeZone: 'Asia/Ho_Chi_Minh',
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        return formatter.format(new Date(dateString));
    };


    return (
        <div className="flex justify-center items-center my-20 px-4 ">
            <div className="w-full max-w-lg bg-white p-8 border-blue-600 rounded-md shadow-blue-100 shadow-2xl">
                <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">🔍 Tìm kiếm vé </h2>

                <div className="mb-5">
                    <input
                        type="text"
                        placeholder="Nhập số điện thoại khách hàng..."
                        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-lg"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <button
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-300"
                    onClick={handleSearch}
                >
                    🔎 Tìm kiếm
                </button>

                {error && <p className="text-red-500 text-center mt-4 text-lg">{error}</p>}

                {customerData && (
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-700">👤 Thông tin khách hàng</h3>
                        <p><strong>Họ tên:</strong> {customerData.firstName} {customerData.lastName}</p>
                        <p><strong>Email:</strong> {customerData.email}</p>

                        <h3 className="text-xl font-semibold text-gray-700 mt-6">🎫 Danh sách vé</h3>
                        {customerData.ticketBookingList.map((booking, index) => (
                            <div key={index} className="mt-4 p-4 border rounded-lg bg-gray-50 shadow">
                                <p><strong>💳 Phương thức thanh toán:</strong> {booking["paymentMethod "] || "Không có dữ liệu"}</p>
                                <p><strong>📅 Ngày đặt:</strong> {booking.bookingDate}</p>
                                <p><strong>💰 Tổng tiền:</strong> {booking.totalMoney.toLocaleString()} VND</p>
                                <p><strong>✈️ Hãng bay:</strong> {booking.flight.airlineBrand}</p>
                                <p><strong>🛫 Khởi hành lúc:</strong> {formatVietnamTime(booking.flight.departureAt)}</p>
                                <p><strong>🛬 Đến lúc:</strong> {formatVietnamTime(booking.flight.arrivalAt)}</p>
                                <p><strong>🛫 Sân bay đi:</strong> {booking.flight.departureAirport}</p>
                                <p><strong>🛬 Sân bay đến:</strong> {booking.flight.arrivalAirport}</p>
                                <p><strong>🛬 Loại vé:</strong> {booking.ticketClass}</p>
                                <button
                                    className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                                    onClick={() => setExpandedTicket(expandedTicket === index ? null : index)}
                                >
                                    {expandedTicket === index ? "⬆ Ẩn chi tiết vé" : "⬇ Xem chi tiết vé"}
                                </button>

                                {expandedTicket === index && (
                                    <div className="mt-4 p-3 bg-white border rounded-lg">
                                        <h4 className="text-lg font-semibold">👥 Danh sách khách hàng</h4>
                                        {booking.customerList.map((customer, cIndex) => (
                                            <div key={cIndex} className="mt-2 p-2 bg-gray-100 rounded-lg">
                                                <p><strong>👤 Họ tên:</strong> {customer.passengers.title} {customer.passengers.firstName} {customer.passengers.lastName}</p>
                                                <p><strong>🎟️ Ngày sinh:</strong> {
                                                    new Date(customer.passengers.birthDate).toLocaleDateString('vi-VN', {
                                                        timeZone: 'Asia/Ho_Chi_Minh',
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric'
                                                    })
                                                }</p>
                                                <p><strong>🎟️ Mã vé:</strong> {customer.ticketCode}</p>
                                                <p><strong>💵 Giá vé:</strong> {customer.priceTicket.toLocaleString()} VND</p>
                                                <p><strong>🎟️ Ngày hết hạn:</strong> {formatVietnamTime(customer.passengers.expirationDate)}</p>
                                                <p><strong>🆔 Số giấy tờ:</strong> {customer.passengers.number}</p>
                                                <p><strong>🏳️ Quốc gia cấp:</strong> {customer.passengers.issuingCountry}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default InformationCustomer;
