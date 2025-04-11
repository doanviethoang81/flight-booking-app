// src/page/FlightList.jsx
import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

const FlightList = () => {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/admin/chuyen-bay")
            .then((res) => res.json())
            .then((data) => setFlights(data))
            .catch((err) => console.error("Lỗi:", err));
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    return (
        <div className="min-h-screen bg-white p-6">
            <h1 className="text-4xl font-bold text-center text-grey mb-8">
                ✈️ Danh Sách Chuyến Bay
            </h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {flights.map((flight) => (
                    <div
                        key={flight.id}
                        className="bg-white rounded-3xl shadow-xl p-6 border-2 border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    >
                        <div className="text-2xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                            <span className="text-xl text-indigo-600">✈️</span>
                            <span>
                                {flight.sanBayDi} → {flight.sanBayDen}
                            </span>
                        </div>
                        <div className="text-sm text-gray-500 mb-2">
                            <span className="font-medium">🕒 Giờ đi:</span>{" "}
                            <span className="text-black">{formatDate(flight.ngayGioDi)}</span>
                        </div>
                        <div className="text-sm text-gray-500 mb-2">
                            <span className="font-medium">🕓 Giờ đến:</span>{" "}
                            <span className="text-black">{formatDate(flight.ngayGioDen)}</span>
                        </div>
                        <div className="text-sm text-gray-500 mb-2">
                            <span className="font-medium">🏢 Hãng bay:</span>{" "}
                            <span className="font-semibold text-indigo-700">{flight.hangBay}</span>
                        </div>
                        <div className="text-sm text-gray-400 mt-4 text-center">
                            <span className="text-xs">
                                Cập nhật:{" "}
                                {formatDistanceToNow(new Date(flight.ngayGioDi), {
                                    addSuffix: true,
                                    locale: vi,
                                })}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FlightList;
