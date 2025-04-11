import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Divider, Drawer } from "@mui/material";
import { formatDate, formatTime, formatVND } from "../helpers/apiHelper";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { Close } from "@mui/icons-material";
import { IoAirplaneSharp } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import AirlineFilter from "./AirlineFIlter";
import { FlightItem } from "./FlightItem";
import { ReviewFlight } from "./ReviewFlight";
import { useNavigate } from "react-router-dom";
// import { RiArrowDropDownLine } from "react-icons/ri";
import { Empty, Select } from "antd";
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
  console.log(selectedAirlines);

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
  const [resetFiltersFlag, setResetFiltersFlag] = useState(false);

  const resetFilters = () => {
    setSelectedAirlines([]);
    setSortPrice("");
    setSortTime("");
    setResetFiltersFlag((prev) => !prev); // Toggle the reset flag
  };

  console.log(selectedAirlines);

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
      <div
        className={`p-1 bg-white ${isDisabled ? "opacity-50" : "opacity-100"}`}
      >
        <div
          className={`flex items-center mb-1 border-l-3 border-transparent mx-1 ${
            isActive && "!border-blue-500"
          }`}
        >
          {index && (
            <div className="w-6 h-6 bg-blue-500 text-white rounded flex items-center justify-center text-sm font-bold mx-1">
              {index}
            </div>
          )}
          <div>
            <div className="text-xs">{formatDate(date)}</div>
            <div className="text-xs font-bold">
              {index === 1 ? (
                <>
                  {departureCity} → {arrivalCity}
                </>
              ) : (
                <>
                  {arrivalCity} → {departureCity}
                </>
              )}
            </div>
          </div>
        </div>
        {flight && (
          <div>
            <div className="pl-2 flex gap-3 items-center mb-2">
              <img
                src={`https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/${airlineCode}.svg`}
                alt=""
                width={30}
              />
              <span className="font-semibold">{airlines[airlineCode]}</span>
            </div>
            <div className="flex items-center pl-2 gap-2 mb-2">
              <div className="flex flex-col items-center">
                <div className="font-bold text-sm">
                  {formatTime(departure?.at)}{" "}
                </div>
                <div className="px-1.5 text-sm bg-gray-100 rounded-4xl text-gray-500 font-bold">
                  {departure?.iataCode}{" "}
                </div>
              </div>
              <div className="flex items-center">
                <GoDotFill size={10} className="text-gray-300" />
                <IoAirplaneSharp className="text-gray-300" />
                <GoDotFill size={10} className="text-gray-300" />
              </div>

              <div className="flex flex-col items-center">
                <div className="font-bold text-sm">
                  {formatTime(arrival?.at)}{" "}
                </div>
                <div className="px-1.5 text-sm bg-gray-100 rounded-4xl text-gray-500 font-bold">
                  {arrival?.iataCode}{" "}
                </div>
              </div>
            </div>
            <button
              className="w-full border-1 border-blue-500 p-1 rounded text-blue-400 font-semibold hover:bg-blue-50 cursor-pointer"
              onClick={() => handleChangeFlight(label)}
            >
              Đổi {label}
            </button>
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="mt-2">
      {(roudTrip && selectedDeparture
        ? filteredFlightReturnData // When round trip and outbound is selected, show return flights
        : filteredFlightDepartureData
      ).length > 0 ? ( // If not a round trip or no outbound selected, show departure flights
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-md font-bold text-blue-500">
              Tổng số chuyến bay được tìm thấy:{" "}
              {
                (roudTrip && selectedDeparture
                  ? filteredFlightReturnData // When round trip and outbound is selected, show return flights
                  : filteredFlightDepartureData
                ).length // If not a round trip or no outbound selected, show departure flights
              }
            </span>
            <div>
              <Select
                optionFilterProp="label"
                onChange={setSortPrice}
                value={sortPrice || "Sắp xếp theo giá"}
                style={{
                  marginRight: 5,
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
                optionFilterProp="label"
                onChange={setSortTime}
                value={sortTime || "Sắp xếp hành trình bay"}
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
                    label: "Hạ cánh sớm nhất",
                  },
                  {
                    value: "arrival_desc",
                    label: "Hạ cánh muộn nhất",
                  },
                ]}
              />
            </div>
          </div>
          <div className="gap-3 w-full relative grid grid-cols-9">
            {/* Left panel for selected flights */}
            <div className="col-span-3">
              {/* sticky top-3 */}
              {roudTrip && (
                <div className="bg-white rounded-md p-1">
                  <div className="flex p-2 items-center justify-between">
                    <div className="flex gap-1 items-center">
                      <BiSolidPlaneAlt className="text-gray-500" size={25} />
                      <div className="text-lg font-semibold">
                        Chuyến bay của bạn
                      </div>
                    </div>
                  </div>
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
                  <Divider sx={{ mb: 1 }} />
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
                      <Divider sx={{mt:1}}/>
                      <div className="p-2 rounded-md flex justify-between items-center">
                        <div>
                          <div className="text-md font-semibold"> Giá tiền</div>
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
                        </div>
                        {/* <RiArrowDropDownLine size={30} /> */}
                      </div>
                    </>
                  )}
                </div>
              )}
              <div className="mt-2">
                <div className="flex justify-between">
                  <span className="font-semibold">Bộ lọc:</span>
                  <span
                    className="text-blue-500 cursor-pointer font-semibold"
                    onClick={resetFilters}
                  >
                    Đặt lại
                  </span>
                </div>
                <AirlineFilter
                  airlines={
                    selectedDeparture && roudTrip
                      ? airlinesReturn
                      : airlinesDeparture
                  }
                  reset={resetFiltersFlag}
                  onChange={handleSelectAirline}
                  setReset={setResetFiltersFlag}
                />
              </div>
            </div>
            <div className={`flex flex-col col-span-6`}>
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
            </div>
          </div>
        </div>
      ) : (
        messages && <Empty description={messages} />
      )}
      <Drawer anchor="right" open={openDrawer} onClose={handleCloseDrawer}>
        <div className="w-xl flex gap-2 px-5 py-4 border-b-1 border-gray-300">
          <button
            onClick={() => setOpenDrawer(false)}
            className="rounded-md bg-gray-100 px-2 py-1 hover:bg-gray-200 cursor-pointer"
          >
            <Close className="text-gray-400" />
          </button>
          <div className="text-lg font-semibold">
            Xem lại chuyến bay của bạn
          </div>
        </div>
        <div className="mt-3 mx-5">
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
        </div>
        <div className="absolute bottom-0 rounded-t-2xl bg-blue-500 w-full px-2 py-5 flex items-center justify-between">
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
                    ? Number(selectedDeparture?.price.total) +
                      Number(selectedReturn?.price.total)
                    : selectedDeparture?.price.total,
                    totalPassenger:totalPassenger
                },
              })
            }
            className="bg-white text-blue-400 px-6 py-2 rounded-3xl cursor-pointer hover:bg-gray-50 font-bold"
          >
            Tiếp tục
          </button>
        </div>
      </Drawer>
    </div>
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
