import { Input } from "antd";
import PropTypes from "prop-types";
import { useState } from "react";

export default function ContactForm({ setContactInfo }) {
  const [contactData, setContactData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleChange = (field, value) => {
    const updatedContact = { ...contactData, [field]: value };
    setContactData(updatedContact);
    setContactInfo(updatedContact); // Gửi dữ liệu lên CheckoutPage
  };
  return (
    <div className="px-4 py-2 rounded-md bg-white">
      <span className="text-lg font-bold">
        Thông tin liên hệ (nhận vé/phiếu thanh toán)
      </span>
      <div className="grid grid-cols-2 gap-5 mx-2 my-2  ">
        <div className="col-span-1">
          <span className="block text-sm mb-1 text-gray-500">Họ (vd:Phan)</span>
          <Input
            allowClear
            value={contactData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
          <span className="block text-sm mt-1 text-gray-500">
            như trên CMND (không dấu)
          </span>
        </div>
        <div className="col-span-1">
          <span className="block text-sm mb-1 text-gray-500">
            Tên Đệm & Tên (vd:The Quang)
          </span>
          <Input
            allowClear
            value={contactData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
          <span className="block text-sm mt-1 text-gray-500">
            như trên CMND (không dấu)
          </span>
        </div>
        <div className="col-span-1">
          <span className="block text-sm mb-1 text-gray-500">
            Điện thoại di động
          </span>
          <Input
            allowClear
            value={contactData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          <span className="block text-sm mt-1 text-gray-500">
            VD: 09012345678
          </span>
        </div>
        <div className="col-span-1">
          <span className="block text-sm mb-1 text-gray-500">Email</span>
          <Input
            allowClear
            value={contactData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <span className="block text-sm mt-1 text-gray-500">
            VD: example@gmail.com
          </span>
        </div>
      </div>
    </div>
  );
}
ContactForm.propTypes = {
  setContactInfo: PropTypes.func.isRequired,
};
