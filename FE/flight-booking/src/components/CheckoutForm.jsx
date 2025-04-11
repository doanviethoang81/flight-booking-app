import {
  FormControl,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
// const countryCodes = [
//     { code: "+84", label: "VN" },
//     { code: "+1", label: "US" },
//     { code: "+44", label: "UK" },
//     { code: "+381", label: "RS" }, // Serbia
//   ];

export default function CheckoutForm() {
  const [countryCodes, setCountryCodes] = useState([]);
  useEffect(() => {
    fetch("/api/phone.json")
      .then((response) => response.json())
      .then((data) =>
        setCountryCodes(
          Object.entries(data).map(([code, label]) => ({ code, label }))
        )
      )
      .catch((error) => console.log("Error:", error))
      .finally(() => console.log("Fetch completed"));
  }, []);
  console.log(countryCodes);

  const [selectedCode, setSelectedCode] = useState({ code: "VN", label: "84" });
  return (
    <div className="px-4 py-6 rounded-md bg-white">
      <span className="text-lg font-bold">
        Thông tin liên hệ (nhận vé/phiếu thanh toán)
      </span>
      <div className="grid grid-cols-2 gap-5 mx-2 mt-2  ">
        <div className="col-span-1">
          <span className="block text-sm font-medium text-gray-700">Họ</span>
          <TextField variant="outlined" size="small" fullWidth />
        </div>
        <div className="col-span-1">
          <span className="block text-sm font-medium text-gray-700">
            Tên Đệm & Tên
          </span>
          <TextField variant="outlined" size="small" fullWidth />
        </div>
        <div className="col-span-1">
          <span className="block text-sm font-medium text-gray-700">
            Điện thoại di động
          </span>
          <TextField
            variant="outlined"
            placeholder="Nhập số điện thoại"
            fullWidth
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FormControl variant="standard" className="w-24">
                    <Select
                      size="small"
                      className="flex"
                      value={selectedCode}
                    >
                      {countryCodes.map((option) => (
                        <MenuItem
                          key={option.code}
                          value={option.code}
                        >
                            <div className="flex gap-1">

                          <img
                            src={`https://flagsapi.com/${option.code}/shiny/64.png`}
                            width={20}
                          />
                          <span> +{option.label}</span>
                            </div>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="col-span-1">
          <span className="block text-sm font-medium text-gray-700">Email</span>
          <TextField variant="outlined" size="small" fullWidth />
        </div>
      </div>
    </div>
  );
}
