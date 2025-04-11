import { useEffect, useRef, useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  Checkbox,
  InputAdornment,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { RiExchangeLine } from "react-icons/ri";
import { LuUsersRound } from "react-icons/lu";
import { RiWheelchairLine } from "react-icons/ri";
import AirportSelector from "./AirportSelector";
import FlightBookingList from "./FlightBookingList";
import axios from "axios";
import toast from "react-hot-toast";
export default function FilterFlight() {
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [hasRoundTrip, setHasRoundTrip] = useState(false);

  const [departure, setDeparture] = useState(null);
  const [destination, setDestination] = useState(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [totalPassenger, setTotalPassenger] = useState(1);
  const [departureDate, setDepartureDate] = useState(new Date().toISOString().split("T")[0]);
  const [returnDate, setReturnDate] = useState(
    new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // Ngày khởi hành + 3 ngày
      .toISOString()
      .split("T")[0]
  );  const [seatClass, setSeatClass] = useState("ECONOMY");
  const inputRef = useRef(null);
  const [passengersForm, setPassengersForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [airlinesDeparture,setAirlinesDeparture] = useState([]);
  const [airlinesReturn,setAirlinesReturn] = useState([]);

  const [messages, setMessages] = useState("");
  const [currentDepartureCity, setCurrentDepartureCity] = useState("");
  const [currentDestinationCity, setCurrentDestinationCity] = useState("");
  const handleSwap = () => {
    setDeparture((prev) => {
      const temp = destination;
      setDestination(prev);
      return temp;
    });
  };

  
  
  const handleCheckboxChange = (e) => {
    setIsRoundTrip(e.target.checked);
  };
  const token = localStorage.getItem("api_token");
  const [flightDepartureData, setFlightDepartureData] = useState([]);
  const [flightReturnData, setFlighReturnData] = useState([]);
  const fetchDeparture = async() => {
    setLoading(true);
    const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${departure.iataCode}&destinationLocationCode=${destination.iataCode}&departureDate=${departureDate}&adults=${adults}&children=${children}&infants=${infants}&travelClass=${seatClass}&nonStop=false&currencyCode=VND&max=250`;
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data;

      if (data?.data && data?.data.length > 0) {
        setFlightDepartureData(data.data);
        
        setAirlinesDeparture((prevAirlines) => {
          const newAirlines = new Set(Object.keys(prevAirlines)); // Lấy danh sách hãng đã có
        
          data.data.forEach((flight) => {
            flight.itineraries.forEach((itinerary) => {
              itinerary.segments.forEach((segment) => {
                newAirlines.add(segment.carrierCode); // Thêm carrierCode vào Set để loại bỏ trùng
              });
            });
          });
          const updatedAirlines = {};
          newAirlines.forEach((code) => {
            if (data.dictionaries.carriers[code]) {
              updatedAirlines[code] = data.dictionaries.carriers[code];
            }
          });
        
          return updatedAirlines;
        });
        setTotalPassenger(Number(adults)+Number(children)+Number(infants));
        setCurrentDepartureCity(departure?.address.cityName); 
        setCurrentDestinationCity(destination?.address.cityName);
        console.log("Kết quả chuyến bay:", data);
      } else {
        setMessages("Không có chuyến bay nào được tìm thấy.");
        setFlightDepartureData([]);
      }
    } catch (error) {
      console.error("Lỗi khi tìm chuyến bay:", error);
      setFlightDepartureData([]);
    } finally {
      setLoading(false);
    }
  }
  const fetchReturn = async() => {
    const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${destination.iataCode}&destinationLocationCode=${departure.iataCode}&departureDate=${returnDate}&adults=${adults}&children=${children}&infants=${infants}&travelClass=${seatClass}&nonStop=false&currencyCode=VND&max=250`;
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = response.data;

      if (data?.data && data?.data.length > 0) {
        setFlighReturnData(data.data);
       
        setAirlinesReturn((prevAirlines) => {
          const newAirlines = new Set(Object.keys(prevAirlines)); // Lấy danh sách hãng đã có
        
          data.data.forEach((flight) => {
            flight.itineraries.forEach((itinerary) => {
              itinerary.segments.forEach((segment) => {
                newAirlines.add(segment.carrierCode); // Thêm carrierCode vào Set để loại bỏ trùng
              });
            });
          });
          const updatedAirlines = {};
          newAirlines.forEach((code) => {
            if (data.dictionaries.carriers[code]) {
              updatedAirlines[code] = data.dictionaries.carriers[code];
            }
          });
        
          return updatedAirlines;
        });
        setTotalPassenger(Number(adults)+Number(children)+Number(infants));
        console.log("Kết quả chuyến bay:", data);
      } else {
        setMessages("Không có chuyến bay nào được tìm thấy.");
        setFlighReturnData([]);
      }
    } catch (error) {
      console.error("Lỗi khi tìm chuyến bay:", error);
      setFlighReturnData([]);
    } 
  }
  const handleSubmit = async () => {
    if (!token) {
      console.error("Chưa có token, không thể gọi API!");
      return;
    }
    if(!departure)
    {
      toast.error("Vui lòng chọn điểm đi!")
      return;
    }
    if(!destination)
      {
        toast.error("Vui lòng chọn điểm đến!")
        return;
      }
    if(departure.iataCode === destination.iataCode)
    {
      toast.error("Điểm đến và đi không thể trùng nhau!")
      return;
    }
    fetchDeparture();
    setHasRoundTrip(false)
    if(isRoundTrip)
    {
      fetchReturn();
      setHasRoundTrip(true)
    }
    
  };
  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setPassengersForm(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col items-center border-1  border-gray-400 rounded-md">
        <div className="bg-white p-6 rounded-lg shadow-md w-full grid grid-cols-3 gap-4">
          <div className="col-span-2 grid grid-cols-9 items-center">
            <div className="col-span-4">
              <AirportSelector
                label="Từ"
                name="departure"
                value={departure}
                onChange={(name, value) => setDeparture(value)}
              />
            </div>
            <div className="col-span-1 items-center text-center">
              <IconButton onClick={handleSwap}>
                <RiExchangeLine size={40} />
              </IconButton>
            </div>
            <div className="col-span-4">
              <AirportSelector
                label="Đến"
                name="destination"
                value={destination}
                onChange={(name, value) => setDestination(value)}
              />
            </div>
          </div>

          <div className="col-span-1 relative">
            <Typography className="font-semibold">Số hành khách</Typography>
            <TextField
              value={`${adults} người lớn, ${children} trẻ em, ${infants} em bé`}
              name="passengers"
              variant="standard"
              onClick={() => setPassengersForm(!passengersForm)}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LuUsersRound className="text-gray-500" size={25} />
                  </InputAdornment>
                ),
                sx: {
                  fontWeight: "bold",
                },
              }}
            />
            {passengersForm && (
              <div
                ref={inputRef}
                className="mt-4 absolute bg-white z-10 border-1 border-gray-300 rounded p-2"
              >
                <TextField
                  label="Người lớn"
                  name="adults"
                  type="number"
                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
                  fullWidth
                  margin="normal"
                  inputProps={{
                    min: 1, // Giá trị tối thiểu là 1
                  }}
                />
                <TextField
                  label="Trẻ em"
                  name="children"
                  type="number"
                  value={children}
                  onChange={(e) => setChildren(e.target.value)}
                  fullWidth
                  margin="normal"
                  inputProps={{
                    min: 0, // Giá trị tối thiểu là 1
                  }}
                />
                <TextField
                  label="Em bé"
                  name="infants"
                  type="number"
                  value={infants}
                  onChange={(e) => setInfants(e.target.value)}
                  fullWidth
                  margin="normal"
                  inputProps={{
                    min: 0, // Giá trị tối thiểu là 1
                  }}
                />
                {(Number(children)>0||Number(infants)>0) &&
                <div className="p-1">
                *Lưu ý: Giá sẽ thay đổi tùy theo nhóm tuổi. Trong kết quả tìm kiếm, chúng tôi sẽ hiển thị giá trung bình/người (tổng giá ÷ tổng số hành khách).
                </div>
                }
                <div className="mt-4 flex justify-end">
                  <Button
                    onClick={() => setPassengersForm(false)}
                    color="primary"
                  >
                    Xong
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="col-span-2 grid grid-cols-9 items-center mt-5">
            <div className="col-span-4">
              <Typography className="font-semibold">Ngày khởi hành</Typography>
              <TextField
                type="date"
                value={departureDate}
                name="departureDate"
                onChange={(e) => setDepartureDate(e.target.value)}
                variant="standard"
                fullWidth
                InputProps={{
                  sx: {
                    fontWeight: "bold",
                  },
                }}
              />
            </div>
            <div className="col-span-1"></div>
            <div className="col-span-4 flex flex-col">
              <div className="flex items-start">
                <Checkbox
                  checked={isRoundTrip}
                  onChange={handleCheckboxChange}
                  size="small"
                  sx={{ p: 0 }}
                />
                <Typography>Khứ hồi</Typography>
              </div>
              {isRoundTrip && (
                <TextField
                  type="date"
                  value={returnDate}
                  name="returnDate"
                  onChange={(e) => setReturnDate(e.target.value)}
                  variant="standard"
                  fullWidth
                  InputProps={{
                    sx: {
                      fontWeight: "bold",
                    },
                  }}
                />
              )}
            </div>
          </div>

          <div className="col-span-1 mt-5">
            <Typography className="font-semibold">Hạng ghế</Typography>
            <TextField
              select
              variant="standard"
              value={seatClass}
              name="seatClass"
              onChange={(e) => setSeatClass(e.target.value)}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RiWheelchairLine className="text-gray-500" size={25} />
                  </InputAdornment>
                ),
                sx: {
                  fontWeight: "bold",
                },
              }}
            >
              <MenuItem value="ECONOMY">Phổ thông</MenuItem>
              <MenuItem value="BUSINESS">Thương gia</MenuItem>
              <MenuItem value="FIRST">Hạng nhất</MenuItem>
            </TextField>
          </div>
          <div className="col-span-2"></div>
          <div className="col-span-1 text-right">
            <Button
              variant="contained"
              startIcon={<Search />}
              onClick={handleSubmit}
              fullWidth
            >
              Tìm chuyến bay
            </Button>
          </div>
        </div>
       
      </div>
      {loading ?
     <Box className="flex items-center justify-center mt-2">
     <CircularProgress />
   </Box>:  
      <FlightBookingList totalPassenger={totalPassenger} airlinesDeparture={airlinesDeparture} airlinesReturn={airlinesReturn} departureDate={departureDate} returnDate={returnDate} messages={messages} flightDepartureData={flightDepartureData} flightReturnData={flightReturnData} roudTrip={hasRoundTrip} departureCity={currentDepartureCity} arrivalCity={currentDestinationCity} />
    }
    </div>
  );
}
