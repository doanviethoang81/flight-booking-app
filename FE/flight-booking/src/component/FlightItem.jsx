import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  Tooltip,
  Typography,
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
  return (
    <Card className="mb-3 w-full">
      <CardContent>
        <Box className="flex items-center justify-between">
          <Box className="flex flex-col">
            {/* {carrierCodes.length>1?'':
                     <> */}
            <Box className="flex gap-2 items-center">
              <img
                src={`https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/${airlineCode}.svg`}
                alt=""
                width={30}
              />
              <Box className="flex flex-col max-w-40">
                <Typography variant="caption" fontWeight={"bold"}>
                  {airlines[airlineCode]}
                </Typography>
              </Box>
            </Box>
            {anotherAirlineNames.length > 0 && (
              <Typography variant="caption" className="max-w-40">
                (một phần do{" "}
                {anotherAirlineNames
                  .toLocaleLowerCase()
                  .replace(/\b\w/g, (char) => char.toUpperCase())} {" "}
                điều hành)
              </Typography>
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
          </Box>
          <Box className="flex justify-between items-center">
            <Box className="flex flex-col items-center">
              <span className="font-bold">
                {formatTime(segments[0]?.departure.at)}
              </span>
              <Typography
                variant="caption"
                className="border-1 border-blue-400 text-blue-400 rounded-xl px-2 py-0.5"
              >
                {roudTrip && selectedDeparture ? arrivalCity : departureCity}
              </Typography>
            </Box>
            <Box className="flex items-center">
              {segmentsCount > 1 ? (
                <Box className="flex flex-col items-center">
                  <Typography
                    variant="body2"
                    className="text-gray-400 font-bold"
                  >
                    {duration}
                  </Typography>
                  <Box className="flex items-center">
                    <TfiLayoutLineSolid className="pr-0.5" />
                    <Tooltip
                      title={segments
                        .slice(0, segmentsCount)
                        .map((segment, i) => (
                          <div key={i}>
                            {segment.departure.iataCode} →{" "}
                            {segment.arrival.iataCode}:{" "}
                            {formatDateTime(segment.departure.at)} -{" "}
                            {formatDateTime(segment.arrival.at)}
                          </div>
                        ))}
                      arrow
                    >
                      <Typography variant="body2" className="cursor-pointer">
                        {segmentsCount - 1} điểm dừng
                      </Typography>
                    </Tooltip>
                    <LiaLongArrowAltRightSolid />
                  </Box>
                </Box>
              ) : (
                <Box className="flex flex-col items-center">
                  <Typography
                    variant="body2"
                    className="text-gray-400 font-bold"
                  >
                    {duration}
                  </Typography>
                  <Box className="flex items-center">
                    <TfiLayoutLineSolid className="pr-0.5" />
                    <Typography>Bay thẳng</Typography>
                    <LiaLongArrowAltRightSolid />
                  </Box>
                </Box>
              )}
            </Box>
            <Box className="flex flex-col items-center">
              <span className="font-bold">
                {" "}
                {formatTime(segments[segments.length - 1]?.arrival.at)}
              </span>
              <Typography
                variant="caption"
                className="border-1 border-blue-400 text-blue-400 rounded-xl px-2 py-0.5"
              >
                {roudTrip && selectedDeparture ? departureCity : arrivalCity}
              </Typography>
            </Box>
          </Box>

          <Box className="mt-2">
            <span className="font-semibold text-orange-500 text-sm">
              {" "}
              {formatVND(flight.price?.total / totalPassenger)}{" "}
              {flight.price?.currency}
            </span>
            <span>/khách</span>
          </Box>
        </Box>
      </CardContent>
      <Divider />
      <CardActions className="flex justify-between">
        <button
          className="cursor-pointer text-blue-500  px-2 font-bold"
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
      </CardActions>
    </Card>
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
