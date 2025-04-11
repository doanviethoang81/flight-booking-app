import { memo } from "react";
import PropTypes from "prop-types";
import { DatePicker, Input, Select } from "antd";
import { useState } from "react";

function PassengerForm({ traveler, index, updatePassenger, allTravelers }) {
  const TravelTypeMap = (type, orderNumber) => {
    switch (type) {
      case "ADULT":
        return `Người lớn ${orderNumber}`;
      case "CHILD":
        return `Trẻ em ${orderNumber}`;
      case "HELD_INFANT":
        return `Em bé ${orderNumber}`;
      default:
        return "Không xác định";
    }
  };

  // Tính số thứ tự dựa trên loại hành khách
  const getOrderNumber = () => {
    // Đếm số hành khách cùng loại trước index hiện tại
    const sameTypeCount = allTravelers
      .slice(0, index + 1) // Lấy từ đầu đến vị trí hiện tại
      .filter((t) => t.travelerType === traveler.travelerType).length;
    return sameTypeCount;
  };

  const [passengerData, setPassengerData] = useState({
    title: "",
    lastName: "",
    firstName: "",
    birthDate: null,
    passport: {
      number: "",
      expirationDate: null,
      issuingCountry: "",
    },
    type:traveler.travelerType,
    priceTicket:traveler.price.total
  });

  const handleChange = (field, value) => {
    let updatedPassenger;
    if (field.startsWith("passport.")) {
      const passportField = field.split(".")[1];
      updatedPassenger = {
        ...passengerData,
        passport: {
          ...passengerData.passport,
          [passportField]: value,
        },
      };
    } else {
      updatedPassenger = { ...passengerData, [field]: value };
    }
    setPassengerData(updatedPassenger);
    updatePassenger(index, updatedPassenger);
  };

  const onChangeBirthDate = (date, dateString) => {
    handleChange("birthDate", dateString);
  };

  const onChangePassportExpiration = (date, dateString) => {
    handleChange("passport.expirationDate", dateString);
  };

  return (
    <div className="py-2 rounded-md bg-white">
      <span className="px-4 text-lg font-bold">Thông tin hành khách</span>
      <span className="text-sm block font-semibold px-4 py-2 bg-blue-100">
        {TravelTypeMap(traveler.travelerType, getOrderNumber())}
      </span>
      <div className="px-4 grid grid-cols-2 gap-5 mx-2 my-2">
        {traveler.travelerType === "ADULT" && (
          <div className="col-span-2 max-w-40">
            <span className="block text-sm mb-1 text-gray-500">Danh xưng</span>
            <Select
              style={{ width: 150 }}
              value={passengerData.title}
              onChange={(value) => handleChange("title", value)}
              options={[
                { value: "Ông", label: "Ông" },
                { value: "Bà", label: "Bà" },
                { value: "Cô", label: "Cô" },
              ]}
            />
          </div>
        )}
        <div className="col-span-1">
          <span className="block text-sm mb-1 text-gray-500">Họ (vd:Phan)</span>
          <Input
            allowClear
            value={passengerData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
          <span className="block text-sm mt-1 text-gray-500">
            như trên CMND (không dấu)
          </span>
        </div>
        <div className="col-span-1">
          <span className="block text-sm mb-1 text-gray-500">
            Tên Đệm & Tên (vd:The Quang)
          </span>
          <Input
            allowClear
            value={passengerData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
          <span className="block text-sm mt-1 text-gray-500">
            như trên CMND (không dấu)
          </span>
        </div>
        <div className="col-span-2">
          <span className="block text-sm mb-1 text-gray-500">Ngày sinh</span>
          <DatePicker onChange={onChangeBirthDate} />
        </div>
      </div>
      <div className="px-4">
        <span className="text-sm font-medium">Thông tin hộ chiếu</span>
        <div className="p-2 bg-blue-50 rounded flex items-center gap-2">
          <div className="w-1 bg-blue-400 block h-10"></div>
          <div className="flex flex-col gap-1">
            <span className="block text-xs text-blue-950">
              Nếu hành khách này chưa có hộ chiếu hoặc hộ chiếu đã hết hạn, bạn
              vẫn có thể tiếp tục đặt vé này.
            </span>
            <span className="block text-xs font-bold text-blue-950">
              Tìm hiểu thêm
            </span>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-5 mt-5">
          <div className="col-span-4">
            <span className="block text-sm mb-1 text-gray-500">
              Số hộ chiếu
            </span>
            <Input
              allowClear
              value={passengerData.passport.number}
              onChange={(e) => handleChange("passport.number", e.target.value)}
            />
          </div>
          <div className="col-span-2">
            <span className="block text-sm mb-1 text-gray-500">
              Quốc gia cấp
            </span>
            <Select
              style={{ width: "100%" }}
              value={passengerData.passport.issuingCountry}
              onChange={(value) =>
                handleChange("passport.issuingCountry", value)
              }
              options={[
                { value: "Việt Nam", label: "Việt Nam" },
                { value: "Hoa Kỳ", label: "Hoa Kỳ" },
                { value: "Nhật Bản", label: "Nhật Bản" },
              ]}
            />
          </div>
          <div className="col-span-2">
            <span className="block text-sm mb-1 text-gray-500">
              Ngày hết hạn
            </span>
            <DatePicker onChange={onChangePassportExpiration} placeholder=""/>
          </div>
        </div>
      </div>
    </div>
  );
}

PassengerForm.propTypes = {
  traveler: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  updatePassenger: PropTypes.func.isRequired,
  allTravelers: PropTypes.array.isRequired, // Thêm propTypes cho allTravelers
};

export default memo(PassengerForm);