import {
  Divider,
} from "@mui/material";
import {
  formatDateTime,
  formatDuration,
  formatTime,
  formatVND,
} from "../helpers/apiHelper";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import PropTypes from "prop-types";
import { ChooseFlightItem } from "./ChooseFlightItemButton";
import WorkOutlinedIcon from "@mui/icons-material/WorkOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import { Popover } from "antd";
export const FlightItem = ({
  flight,
  airlines,
  roudTrip,
  selectedDeparture,
  arrivalCity,
  departureCity,
  totalPassenger,
  onOutboundChange,
  onReturnChange,
  onDrawerChange,
}) => {
  const segments = flight.itineraries[0]?.segments ?? [];
  // const airlineCode=flight.validatingAirlineCodes[0];
  const airlineCode = segments[0].carrierCode;
  const duration = formatDuration(segments[0].duration);
  const carrierCodes = [
    ...new Set(
      segments
        .map((segment) => segment.carrierCode) // Get all carrier codes from segments
        .filter((code) => code !== airlineCode) // Exclude the airlineCode from the list
    ),
  ];
  const anotherAirlineNames = [
    ...new Set(carrierCodes.map((code) => airlines[code] ?? "Không xác định")),
  ].join(", ");
  const amenitiesList =
    flight?.travelerPricings?.[0]?.fareDetailsBySegment?.flatMap(
      (segment) => segment.amenities ?? []
    );
  const mapAmenity = (amenity) => {
    switch (amenity) {
      case "BAGGAGE":
        return <WorkOutlinedIcon fontSize="15" className="text-gray-300" />;
      case "MEAL":
        return (
          <RestaurantOutlinedIcon fontSize="15" className="text-gray-300" />
        );
      case "ENTERTAINMENT":
        return <LiveTvOutlinedIcon fontSize="15" className="text-gray-300" />;
      default:
        return;
    }
  };
  const validAmenities = [
    ...new Set(amenitiesList.map((amenity) => amenity.amenityType)),
  ]
    .map((type) => mapAmenity(type))
    .filter(Boolean);
  const segmentsCount = segments.length;
  const content = segments.slice(0, segmentsCount).map((segment, i) => (
    <div key={i}>
      {segment.departure.iataCode} → {segment.arrival.iataCode}:{" "}
      {formatDateTime(segment.departure.at)} -{" "}
      {formatDateTime(segment.arrival.at)}
    </div>
  ));
  return (
    <div className="mb-3 w-full bg-white rounded p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <img
              src={`https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/${airlineCode}.svg`}
              alt=""
              width={30}
            />
            <div className="max-w-40 text-sm font-semibold">
              {airlines[airlineCode]}
            </div>
          </div>
          {anotherAirlineNames.length > 0 && (
            <div className="max-w-40 text-xs">
              (một phần do{" "}
              {anotherAirlineNames
                .toLocaleLowerCase()
                .replace(/\b\w/g, (char) => char.toUpperCase())}{" "}
              điều hành)
            </div>
          )}
          {validAmenities.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1 border-gray-200 border-1 rounded-3xl px-3 py-1 items-center w-fit cursor-pointer">
              {validAmenities.map((amenity, index) => (
                <div className="flex items-center" key={index}>
                  {amenity}
                </div>
              ))}
            </div>
          )}

          {/* </>} */}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center">
            <div className="font-bold text-sm">
              {formatTime(segments[0]?.departure.at)}
            </div>
            <div
              className="border-1 border-blue-400 text-blue-400 rounded-xl px-2 py-0.5 text-sm"
            >
              {roudTrip && selectedDeparture ? arrivalCity : departureCity}
            </div>
          </div>
          <div className="flex items-center">
            {segmentsCount > 1 ? (
              <div className="flex flex-col items-center">
                <div
                  className="text-gray-400 font-semibold text-sm"
                >
                  {duration}
                </div>
                <div className="flex items-center">
                  <TfiLayoutLineSolid className="pr-0.5" />
                  <Popover content={content} placement="bottom">
                    <div className="cursor-pointer tex-sm">
                      {segmentsCount - 1} điểm dừng
                    </div>
                  </Popover>
                  <LiaLongArrowAltRightSolid />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div
                  className="text-gray-400 font-semibold text-sm"
                >
                  {duration}
                </div>
                <div className="flex items-center">
                  <TfiLayoutLineSolid className="pr-0.5" />
                  <div>Bay thẳng</div>
                  <LiaLongArrowAltRightSolid />
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center">
            <div className="font-bold text-sm">
              {formatTime(segments[segments.length - 1]?.arrival.at)}
            </div>
            <div
              className="border-1 border-blue-400 text-blue-400 rounded-xl px-2 py-0.5 text-sm"
            >
              {roudTrip && selectedDeparture ? departureCity : arrivalCity}
            </div>
          </div>
        </div>

        <div className="mt-2">
          <span className="font-semibold text-orange-500 text-sm">
            {formatVND(flight.price?.total / totalPassenger)}{" "}
            {flight.price?.currency}
          </span>
          <span>/khách</span>
        </div>
      </div>
      <Divider />
      <div className="flex justify-between mt-2">
        <button
          className="cursor-pointer text-blue-500 font-semibold"
        // onClick={() => handleSelectFlight(flight)}
        >
          Chi tiết
        </button>
        <ChooseFlightItem
          flight={flight}
          selectedDeparture={selectedDeparture}
          onDrawerChange={onDrawerChange}
          onOutboundChange={onOutboundChange}
          onReturnChange={onReturnChange}
          roudTrip={roudTrip}
        />
      </div>
    </div>
  );
};
FlightItem.propTypes = {
  flight: PropTypes.object.isRequired,
  airlines: PropTypes.object.isRequired,
  roudTrip: PropTypes.bool.isRequired,
  selectedDeparture: PropTypes.object.isRequired,
  selectedReturn: PropTypes.object.isRequired,
  arrivalCity: PropTypes.string.isRequired,
  departureCity: PropTypes.string.isRequired,
  totalPassenger: PropTypes.number.isRequired,
  onOutboundChange: PropTypes.func.isRequired,
  onReturnChange: PropTypes.func.isRequired,
  onDrawerChange: PropTypes.func.isRequired,
};
