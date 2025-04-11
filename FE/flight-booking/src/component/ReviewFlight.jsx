import { Box, Divider, Typography } from "@mui/material";
import { formatDate, formatTime } from "../helpers/apiHelper";
import PropTypes from "prop-types";
import { MinusOutlined, SwapRightOutlined } from "@ant-design/icons";

export const ReviewFlight = ({
  flight,
  label,
  index,
  airlines,
  arrivalCity,
  departureCity,
  type,
}) => {
  if (!flight) return null;
  const segments = flight?.itineraries[0]?.segments ?? [];
  const departure = segments[0]?.departure;
  const arrival = segments[segments.length - 1]?.arrival;
  const stops = segments.length - 1;
  const stopText = stops === 0 ? "Bay thẳng" : `${stops} điểm dừng`;
  const airlineCode = segments[0]?.carrierCode;
  return (
    <Box
      sx={{
        borderRadius: 2,
        border: "1px solid #ddd",
        padding: 2,
        marginBottom: 1,
        backgroundColor: "#fff",
      }}
    >
      {/* Header */}
      <Box display="flex" alignItems="center" gap={1} mb={1}>
        <Typography
          sx={{
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "14px",
            fontWeight: "bold",
          }}
          className="bg-green-50 text-green-400"
        >
          {label}
        </Typography>
        {type!=='checkout'&&
        <Typography variant="body2">
          {index === 1 ? (
            <>
              {departureCity} → {arrivalCity},
            </>
          ) : (
            <>
              {arrivalCity} → {departureCity},
            </>
          )}
        </Typography>
        }
        <Typography>{formatDate(departure?.at)}</Typography>
      </Box>
      <Divider />
      {flight && (
        <Box className="flex my-2 py-2 items-center justify-between flex-wrap">
          <Box className={`flex items-center gap-2 ${type==='checkout' && 'w-full mb-1'}`}>
            <img
              src={`https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/${airlineCode}.svg`}
              alt=""
              width={30}
            />
            <span className={`font-semibold ${type==='checkout' && 'text-xs'}`}>{airlines[airlineCode]}</span>
          </Box>
          <Box className="flex items-center gap-2 justify-center">
            <Typography variant="body2" className="flex flex-col justify-center items-center">
              <span className="font-bold">{formatTime(departure?.at)} </span>
              <span className="px-1.5 bg-gray-100 rounded-4xl text-gray-500">
                {type ==='checkout'?
                <>
                {departureCity}
                </>:
                departure?.iataCode
              }
              </span>
            </Typography>
            <Box className="flex items-center">
              <MinusOutlined  className="text-gray-300 pr-1" />
              <Typography>{stopText}</Typography>
              <SwapRightOutlined className="text-gray-300" />
            </Box>

            <Typography variant="body2" className="flex flex-col justify-center items-center">
              <span className="font-bold">{formatTime(arrival?.at)} </span>
              <span className="px-1.5 bg-gray-100 rounded-4xl text-gray-500">
              {type ==='checkout'?
                <>
                {arrivalCity} 
                </>:
                arrival?.iataCode
              }
              </span>
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};
ReviewFlight.propTypes = {
  flight: PropTypes.object.isRequired,
  airlines: PropTypes.object.isRequired,
  arrivalCity: PropTypes.string.isRequired,
  departureCity: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
