import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ReviewFlight } from "../components/ReviewFlight";
import { formatVND } from "../helpers/apiHelper";
import ContactForm from "../components/ContactForm";
import PassengerForm from "../components/PassengerForm";
import toast from "react-hot-toast";
import axios from "axios";  // Importing axios to make the API request

export default function CheckoutPage() {
  const location = useLocation();
  const {
    selectedDeparture,
    selectedReturn,
    arrivalCity,
    departureCity,
    airlinesDeparture,
    airlinesReturn,
    totalPrice,
    totalPassenger,
  } = location.state || {};

  const [formData, setFormData] = useState({
    contactInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    passengers: [],
    flightTickets: {
      departure: {
        departureAirport: selectedDeparture?.itineraries[0].segments[0].departure.iataCode,
        arrivalAirport: selectedDeparture?.itineraries[0].segments[0].arrival.iataCode,
        airlineBrand: selectedDeparture?.itineraries[0].segments[0].carrierCode,
        departureAt: selectedDeparture?.itineraries[0].segments[0].departure.at,
        arrivalAt: selectedDeparture?.itineraries[0].segments[0].arrival.at,
      },
      return: selectedReturn
        ? {
          departureAirport: selectedReturn?.itineraries[0].segments[0].departure.iataCode,
          arrivalAirport: selectedReturn?.itineraries[0].segments[0].arrival.iataCode,
          airlineBrand: selectedReturn?.itineraries[0].segments[0].carrierCode,
          departureAt: selectedReturn?.itineraries[0].segments[0].departure.at,
          arrivalAt: selectedReturn?.itineraries[0].segments[0].arrival.at,
        }
        : null,
    },
    classType: selectedDeparture?.travelerPricings[0].fareOption,
    total: totalPrice,
  });

  const updateContactInfo = (contactData) => {
    setFormData((prev) => ({
      ...prev,
      contactInfo: contactData,
    }));
  };

  const updatePassenger = (index, passengerData) => {
    setFormData((prev) => {
      const newPassengers = [...prev.passengers];
      newPassengers[index] = passengerData;
      return { ...prev, passengers: newPassengers };
    });
  };

  const handleSubmit = async () => {
    if (formData.contactInfo.firstName === "") {
      toast.error("Vui lòng nhập tên người liên hệ!");
      return;
    }
    if (formData.contactInfo.email === "") {
      toast.error("Vui lòng nhập email!");
      return;
    }
    if (formData.contactInfo.phone === "") {
      toast.error("Vui lòng nhập số điện thoại!");
      return;
    }
    if (formData.passengers.length < totalPassenger) {
      toast.error("Vui lòng nhập đầy đủ thông tin hành khách!");
      return;
    }
    for (let i = 0; i < formData.passengers.length; i++) {
      const passenger = formData.passengers[i];

      if (
        !passenger ||
        (!["CHILD", "HELD_INFANT"].includes(passenger.type) && !passenger.title?.trim()) || // Chỉ kiểm tra title nếu không phải child hoặc infant
        !passenger.firstName?.trim() ||
        !passenger.lastName?.trim() ||
        !passenger.birthDate
      ) {
        toast.error(`Vui lòng nhập đầy đủ thông tin hành khách ${i + 1}!`);
        return;
      }

      // Kiểm tra thông tin hộ chiếu (bắt buộc)
      if (
        !passenger.passport.number?.trim() ||
        !passenger.passport.expirationDate ||
        !passenger.passport.issuingCountry?.trim()
      ) {
        toast.error(`Vui lòng nhập đầy đủ thông tin hộ chiếu của hành khách ${i + 1}!`);
        return;
      }
    }

    // Prepare the data to send
    const requestData = {
      contactInfo: formData.contactInfo,
      passengers: formData.passengers,
      flightTickets: formData.flightTickets,
      classType: formData.classType,
      total: formData.total,
    };
    console.log("Dữ liệu gửi lên API:", JSON.stringify(requestData, null, 2));

    try {
      const response = await axios.post("http://localhost:8080/api/v1/nguoi_dat/dat-ve", requestData, {
        withCredentials: true,
      });

      document.write(response.data); // Hiển thị trang HTML từ BE
    } catch (error) {
      console.error("Lỗi khi đặt vé: ", error);
    }

    // try {
    //   const response = await axios.post("http://localhost:8080/api/v1/nguoi_dat/dat-ve", requestData);
    //   if (response.status === 200) {
    //     toast.success(" Gửi dữ liệu thành công!");
    //   } else {
    //     toast.error("Gửi dữ liệu thất bại !");
    //   }
    // } catch (error) {
    //   toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    //   console.error("Error submitting data: ", error);
    // }


  };


  return (
    <div  className="-mt-20 bg-white grid grid-cols-8 gap-5 w-full">
      <div className="col-span-5 flex flex-col gap-5">
        <ContactForm setContactInfo={updateContactInfo} />
        <div className="mt-0">
        {selectedDeparture.travelerPricings.map((traveler, index) => (
          <PassengerForm
            key={index}
            traveler={traveler}
            index={index}
            updatePassenger={updatePassenger}
            allTravelers={selectedDeparture.travelerPricings}
          />
          
        ))}
       </div> 
        
      </div>
      <div className="col-span-3 bg-white px-4 py-2 rounded-md h-fit sticky top-5">
        <span className="text-lg font-bold">Tóm tắt chuyến bay</span>
        <ReviewFlight
          type={"checkout"}
          flight={selectedDeparture}
          arrivalCity={arrivalCity}
          label={"Chuyến bay đi"}
          index={1}
          airlines={airlinesDeparture}
          departureCity={departureCity}
        />
        {selectedReturn && (
          <ReviewFlight
            type={"checkout"}
            flight={selectedReturn}
            arrivalCity={departureCity}
            label={"Chuyến bay về"}
            index={2}
            airlines={airlinesReturn}
            departureCity={arrivalCity}
          />
        )}
        <div className="flex items-center justify-between">
          <span className="font-semibold">Giá bạn phải trả</span>
          <span className="text-orange-500 font-semibold">{formatVND(totalPrice)} VND</span>
        </div>
        <button
          className="w-full mt-2 px-2 py-1 rounded text-white bg-blue-500 hover:opacity-90 cursor-pointer font-semibold"
          onClick={handleSubmit}
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
}
