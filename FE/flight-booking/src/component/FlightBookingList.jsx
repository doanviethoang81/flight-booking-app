import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Divider,
  Drawer,
  Button,
} from "@mui/material";
import { formatDate, formatTime, formatVND } from "../helpers/apiHelper";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { Close } from "@mui/icons-material";
import { IoAirplaneSharp } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import AirlineFilter from "./AirlineFIlter";
import { FlightItem } from "./FlightItem";
import { ReviewFlight } from "./ReviewFlight";
import { useNavigate } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Select } from "antd";
// import { SelectedFlight } from "./SelectedFlight";

export default function FlightBookingList({
  flightDepartureData,
  flightReturnData,
  roudTrip,
  departureCity,
  arrivalCity,
  messages,
  departureDate,
  returnDate,
  totalPassenger,
  airlinesDeparture,
  airlinesReturn,
}) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedDeparture, setselectedDeparture] = useState(null);
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [sortPrice, setSortPrice] = useState("");
  const [sortTime, setSortTime] = useState("");
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [filteredFlightDepartureData, setFilteredFlightDepartureData] =
    useState(flightDepartureData);
  const [filteredFlightReturnData, setFilteredFlightReturnData] =
    useState(flightReturnData);
  const navigate = useNavigate();
  const handleSelectAirline = (selectedAirlines) => {
    setSelectedAirlines(selectedAirlines);
  };
  useEffect(() => {
    const filteredFlightDepartureData = flightDepartureData.filter(
      (flight) =>
        selectedAirlines.length === 0 ||
        flight.itineraries[0].segments.some((segment) =>
          selectedAirlines.includes(segment.carrierCode)
        )
    );

    // Sắp xếp theo giá và thời gian
    const sortedFlightDepartureData = [...filteredFlightDepartureData]
      .sort((a, b) => {
        const priceA = parseFloat(a.price?.total || 0);
        const priceB = parseFloat(b.price?.total || 0);
        return sortPrice === ""
          ? null
          : sortPrice === "asc"
          ? priceA - priceB
          : priceB - priceA;
      })
      .sort((a, b) => {
        const departureA = new Date(
          a.itineraries[0].segments[0]?.departure.at
        ).getTime();
        const departureB = new Date(
          b.itineraries[0].segments[0]?.departure.at
        ).getTime();
        const arrivalA = new Date(
          a.itineraries[0].segments[
            a.itineraries[0].segments.length - 1
          ]?.arrival.at
        ).getTime();
        const arrivalB = new Date(
          b.itineraries[0].segments[
            b.itineraries[0].segments.length - 1
          ]?.arrival.at
        ).getTime();

        if (sortTime === "departure_asc") return departureA - departureB;
        if (sortTime === "departure_desc") return departureB - departureA;
        if (sortTime === "arrival_asc") return arrivalA - arrivalB;
        if (sortTime === "arrival_desc") return arrivalB - arrivalA;
        return 0;
      });

    // Lọc danh sách chuyến bay về theo hãng đã chọn
    const filteredFlightReturnData = flightReturnData.filter(
      (flight) =>
        selectedAirlines.length === 0 ||
        flight.itineraries[0].segments.some((segment) =>
          selectedAirlines.includes(segment.carrierCode)
        )
    );

    const sortedFlightReturnData = [...filteredFlightReturnData]
      .sort((a, b) => {
        const priceA = parseFloat(a.price?.total || 0);
        const priceB = parseFloat(b.price?.total || 0);
        return sortPrice === ""
          ? null
          : sortPrice === "asc"
          ? priceA - priceB
          : priceB - priceA;
      })
      .sort((a, b) => {
        const departureA = new Date(
          a.itineraries[0].segments[0]?.departure.at
        ).getTime();
        const departureB = new Date(
          b.itineraries[0].segments[0]?.departure.at
        ).getTime();
        const arrivalA = new Date(
          a.itineraries[0].segments[
            a.itineraries[0].segments.length - 1
          ]?.arrival.at
        ).getTime();
        const arrivalB = new Date(
          b.itineraries[0].segments[
            b.itineraries[0].segments.length - 1
          ]?.arrival.at
        ).getTime();

        if (sortTime === "departure_asc") return departureA - departureB;
        if (sortTime === "departure_desc") return departureB - departureA;
        if (sortTime === "arrival_asc") return arrivalA - arrivalB;
        if (sortTime === "arrival_desc") return arrivalB - arrivalA;
        return 0;
      });

    // Cập nhật danh sách đã lọc vào state hoặc dùng trực tiếp trong render
    setFilteredFlightDepartureData(sortedFlightDepartureData);
    setFilteredFlightReturnData(sortedFlightReturnData);
  }, [
    selectedAirlines,
    flightDepartureData,
    flightReturnData,
    sortPrice,
    sortTime,
  ]);
  const handleDraweChange = (drawer) => {
    setOpenDrawer(drawer);
  };
  const handleOutBoundChange = (outBoundFlight) => {
    setselectedDeparture(outBoundFlight);
  };
  const handleReturnChange = (returnFlight) => {
    setSelectedReturn(returnFlight);
  };

  const handleChangeFlight = (label) => {
    if (label === "Chuyến bay đi") {
      setselectedDeparture(null);
    } else if (label === "Chuyến bay về") {
      setSelectedReturn(null);
    }
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };
  const renderSelectedFlight = (flight, label, index, date, airlines) => {
    const segments = flight?.itineraries[0]?.segments ?? [];
    const departure = segments[0]?.departure;
    const airlineCode = segments[0]?.carrierCode;
    const arrival = segments[segments.length - 1]?.arrival;
    const isDisabled =
      label === "Chuyến bay về" && !selectedDeparture && !selectedReturn;
    const isActive =
      label === "Chuyến bay đi" ? !selectedDeparture : !!selectedDeparture;
    return (
      <Box
        sx={{
          padding: 1,
          backgroundColor: "#fff",
          opacity: isDisabled ? 0.5 : 1,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          mb={1}
          sx={{
            borderLeft: `4px solid ${isActive ? "#007bff" : "none"}`,
          }}
        >
          {index && (
            <Typography
              sx={{
                width: 24,
                height: 24,
                backgroundColor: "#007bff",
                color: "#fff",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: "bold",
                mx: 1,
              }}
            >
              {index}
            </Typography>
          )}
          <Box className="flex flex-col">
            <Typography variant="caption">{formatDate(date)}</Typography>
            <Typography variant="body2" fontWeight={"bold"}>
              {index === 1 ? (
                <>
                  {departureCity} → {arrivalCity}
                </>
              ) : (
                <>
                  {arrivalCity} → {departureCity}
                </>
              )}
            </Typography>
          </Box>
        </Box>
        {flight && (
          <>
            <Box className="pl-2 flex gap-3 items-center mb-2">
              <img
                src={`https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/${airlineCode}.svg`}
                alt=""
                width={30}
              />
              <span className="font-semibold">{airlines[airlineCode]}</span>
            </Box>

            <Box className="flex items-center pl-2 gap-2 mb-2">
              <Typography variant="body2" className="flex flex-col">
                <span className="font-bold">{formatTime(departure?.at)} </span>
                <span className="px-1.5 bg-gray-100 rounded-4xl text-gray-500 font-bold">
                  {departure?.iataCode}{" "}
                </span>
              </Typography>
              <Box className="flex items-center">
                <GoDotFill size={10} className="text-gray-300" />
                <IoAirplaneSharp className="text-gray-300" />
                <GoDotFill size={10} className="text-gray-300" />
              </Box>

              <Typography variant="body2" className="flex flex-col">
                <span className="font-bold">{formatTime(arrival?.at)} </span>
                <span className="px-1.5 bg-gray-100 rounded-4xl text-gray-500 font-bold">
                  {arrival?.iataCode}{" "}
                </span>
              </Typography>
            </Box>
            <Button
              variant="outlined"
              fullWidth
              onClick={() => handleChangeFlight(label)}
            >
              Đổi {label}
            </Button>
          </>
        )}
      </Box>
    );
  };
  return (
    <Box className="mt-2 w-full flex flex-col">
      {(roudTrip && selectedDeparture
        ? filteredFlightReturnData // When round trip and outbound is selected, show return flights
        : filteredFlightDepartureData
      ).length > 0 ? ( // If not a round trip or no outbound selected, show departure flights
        <Box>
          <Box className="flex justify-between items-center">
            <Typography variant="h6" fontWeight={"bold"} mb={1}>
              Tổng số chuyến bay:{" "}
              {
                (roudTrip && selectedDeparture
                  ? filteredFlightReturnData // When round trip and outbound is selected, show return flights
                  : filteredFlightDepartureData
                ).length // If not a round trip or no outbound selected, show departure flights
              }
            </Typography>
            <Box>
            <Select
                  placeholder="Sắp xếp theo giá"
                  optionFilterProp="label"
                  onChange={setSortPrice}
                  style={{
                    marginRight:5,
                    minWidth: 150,
                  }}
                  options={[
                    {
                      value: "asc",
                      label: "Giá tăng dần",
                    },
                    {
                      value: "desc",
                      label: "Giảm giảm dần",
                    },
                  ]}
                />
                 <Select
                  placeholder="Sắp xếp hành trình bay"
                  optionFilterProp="label"
                  onChange={setSortTime}
                  style={{
                    minWidth: 190,
                  }}
                  options={[
                    {
                      value: "departure_asc",
                      label: "Cất cánh sớm nhất",
                    },
                    {
                      value: "departure_desc",
                      label: "Cất cánh muộn nhất",
                    },
                    {
                      value: "arrival_asc",
                      label: "Hạ cánh muộn nhất",
                    },
                    {
                      value: "arrival_desc",
                      label: "Hạ cánh muộn nhất",
                    },
                  ]}
                />
            </Box>
          </Box>
          <Box className=" gap-3 w-full relative grid grid-cols-9">
            {/* Left panel for selected flights */}
            <Box className="col-span-3">
              {/* sticky top-3 */}
              {roudTrip && (
                <Box className="bg-white rounded-md shadow-md">
                  <Box className="flex p-2 items-center justify-between">
                    <Box className="flex gap-1 items-center">
                      <BiSolidPlaneAlt className="text-gray-500" size={25} />
                      <Typography variant="h6">Chuyến bay của bạn</Typography>
                    </Box>
                  </Box>
                  {renderSelectedFlight(
                    selectedDeparture,
                    "Chuyến bay đi",
                    1,
                    departureDate,
                    airlinesDeparture
                  )}
                  {/* <SelectedFlight flight={selectedDeparture} label={"Chuyến bay đi"} index={1}
                     date={departureDate} airlines={airlines} selectedDeparture={selectedDeparture} selectedReturn={selectedReturn} onOutBoundFlightChange={handleOutBoundChange} 
                     onReturnFlightChange={handleReturnChange}
                     arrivalCity={arrivalCity} departureCity={departureCity}
                    /> */}
                  <Divider />
                  {renderSelectedFlight(
                    selectedReturn,
                    "Chuyến bay về",
                    2,
                    returnDate,
                    airlinesReturn
                  )}
                  {/* <SelectedFlight flight={selectedReturn} label={"Chuyến bay về"} index={2}
                     date={departureDate} airlines={airlines} selectedDeparture={selectedDeparture} selectedReturn={selectedReturn} onOutBoundFlightChange={handleOutBoundChange} 
                     onReturnFlightChange={handleReturnChange}
                     arrivalCity={arrivalCity} departureCity={departureCity}
                    /> */}
                  {selectedDeparture && selectedReturn && (
                    <>
                      <Divider />
                      <Box className="p-2 bg-gray-50 rounded-md flex justify-between items-center">
                        <Box>
                          <Typography variant="body1"> Giá tiền</Typography>
                          <span className="text-orange-500 font-semibold">
                            {" "}
                            {formatVND(
                              roudTrip
                                ? (Number(selectedDeparture?.price.total) +
                                    Number(selectedReturn?.price.total)) /
                                    totalPassenger
                                : selectedDeparture?.price.total /
                                    totalPassenger
                            )}{" "}
                            VND
                          </span>
                          <span>/khách</span>
                        </Box>
                        <RiArrowDropDownLine size={30} />
                      </Box>
                    </>
                  )}
                </Box>
              )}
              <Box className="p-2">
                <Box className="mt-2 flex justify-between">
                  <span>Bộ lọc</span>
                  <span
                    className="hover:text-blue-500 cursor-pointer"
                    onClick={() => setSelectedAirlines([])}
                  >
                    Đặt lại
                  </span>
                </Box>
                <AirlineFilter
                  airlines={
                    selectedDeparture && roudTrip
                      ? airlinesReturn
                      : airlinesDeparture
                  }
                  onChange={handleSelectAirline}
                />
              </Box>
            </Box>
            <Box className={`flex flex-col flex-1 col-span-6`}>
              {(roudTrip && selectedDeparture
                ? filteredFlightReturnData // When round trip and outbound is selected, show return flights
                : filteredFlightDepartureData
              ) // If not a round trip or no outbound selected, show departure flights
                .map((flight, index) => {
                  // const itineraryIndex = selectedDeparture && roudTrip ? 1 : 0;
                  return (
                    <FlightItem
                      key={index}
                      flight={flight}
                      airlines={
                        roudTrip && selectedDeparture
                          ? airlinesReturn
                          : airlinesDeparture
                      }
                      selectedDeparture={selectedDeparture}
                      arrivalCity={arrivalCity}
                      departureCity={departureCity}
                      totalPassenger={totalPassenger}
                      onDrawerChange={handleDraweChange}
                      onOutboundChange={handleOutBoundChange}
                      onReturnChange={handleReturnChange}
                      roudTrip={roudTrip}
                    />
                  );
                })}
            </Box>
          </Box>
        </Box>
      ) : (
        messages
      )}
      <Drawer anchor="right" open={openDrawer} onClose={handleCloseDrawer}>
        <Box sx={{ width: 600 }}>
          <Box className="">
            <Box className="flex gap-2 px-5 py-4 border-b-1 border-gray-300">
              <button
                onClick={() => setOpenDrawer(false)}
                className="rounded-md bg-gray-100 px-2 py-1 hover:bg-gray-200 cursor-pointer"
              >
                <Close className="text-gray-400" />
              </button>
              <Typography variant="h6">Xem lại chuyến bay của bạn</Typography>
            </Box>
            <Box className="mt-3 mx-5">
              <ReviewFlight
                flight={selectedDeparture}
                arrivalCity={arrivalCity}
                departureCity={departureCity}
                label={"Khởi hành"}
                index={1}
                airlines={airlinesDeparture}
              />
              {roudTrip && (
                <ReviewFlight
                  flight={selectedReturn}
                  arrivalCity={arrivalCity}
                  departureCity={departureCity}
                  label={"Chuyến về"}
                  index={2}
                  airlines={airlinesReturn}
                />
              )}
            </Box>
          </Box>
          <Box className="absolute bottom-0 rounded-t-2xl bg-blue-500 w-full px-2 py-5 flex items-center justify-between">
            <span className="text-white font-bold">
              {formatVND(
                roudTrip
                  ? (Number(selectedDeparture?.price.total) +
                      Number(selectedReturn?.price.total)) /
                      totalPassenger
                  : selectedDeparture?.price.total / totalPassenger
              )}{" "}
              VND/Khách
            </span>
            <button
              onClick={() =>
                navigate("/checkout", {
                  state: {
                    arrivalCity,
                    departureCity,
                    airlinesDeparture,
                    airlinesReturn,
                    selectedDeparture,
                    selectedReturn: roudTrip ? selectedReturn : null,
                    totalPrice: roudTrip
                    ? (Number(selectedDeparture?.price.total) +
                        Number(selectedReturn?.price.total)) 
                    : selectedDeparture?.price.total
                  },
                })
              }
              className="bg-white text-blue-400 px-6 py-2 rounded-3xl cursor-pointer hover:bg-gray-50 font-bold"
            >
              Tiếp tục
            </button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}
FlightBookingList.propTypes = {
  flightDepartureData: PropTypes.array.isRequired,
  flightReturnData: PropTypes.array.isRequired,
  roudTrip: PropTypes.bool.isRequired,
  departureCity: PropTypes.string.isRequired,
  arrivalCity: PropTypes.string.isRequired,
  messages: PropTypes.string.isRequired,
  departureDate: PropTypes.string.isRequired,
  returnDate: PropTypes.string.isRequired,
  totalPassenger: PropTypes.number.isRequired,
  airlinesDeparture: PropTypes.array.isRequired,
  airlinesReturn: PropTypes.array.isRequired,
};
