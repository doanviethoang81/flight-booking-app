import { Box, Button, Typography } from "@mui/material";
import { formatDate, formatTime } from "../helpers/apiHelper";
import { GoDotFill } from "react-icons/go";
import { IoAirplaneSharp } from "react-icons/io5";
import PropTypes from "prop-types";

export const SelectedFlight = ({
  flight,
  label,
  index,
  date,
  airlines,
  arrivalCity,
  departureCity,
  selectedDeparture,
  selectedReturn,
  onOutBoundFlightChange,
  onReturnFlightChange,
}) => {
  const segments = flight?.itineraries[0]?.segments ?? [];
  const departure = segments[0]?.departure;
  // const airlineCode=flight?.validatingAirlineCodes[0];
  const airlineCode = segments[0]?.carrierCode;
  const arrival = segments[segments.length - 1]?.arrival;
  const isDisabled =
    label === "Chuyến bay về" && !selectedDeparture && !selectedReturn;
  const isActive =
    label === "Chuyến bay đi" ? !selectedDeparture : !!selectedDeparture;
    const handleChangeFlight = (label) => {
        if (label === "Chuyến bay đi") {
            onOutBoundFlightChange(null);
        } else if (label === "Chuyến bay về") {
            onReturnFlightChange(null);
        }
      };
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
SelectedFlight.propTypes = {
  flight: PropTypes.object.isRequired,
  airlines: PropTypes.object.isRequired,
  arrivalCity: PropTypes.string.isRequired,
  departureCity: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  selectedDeparture: PropTypes.bool.isRequired,
  selectedReturn: PropTypes.bool.isRequired,
  onOutBoundFlightChange: PropTypes.func.isRequired,
  onReturnFlightChange: PropTypes.func.isRequired,
};
