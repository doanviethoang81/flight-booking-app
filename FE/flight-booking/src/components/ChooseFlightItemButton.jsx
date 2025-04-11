import PropTypes from "prop-types";
import Swal from "sweetalert2";

export const ChooseFlightItem = ({ flight,selectedDeparture,roudTrip,onOutboundChange,onReturnChange,onDrawerChange }) => {
  const handleSelectFlight = (flight) => {
    if (roudTrip && !selectedDeparture) {
        onOutboundChange(flight);
    } else if (roudTrip && selectedDeparture) {
      const outboundArrivalTime = new Date(
        selectedDeparture.itineraries[0].segments[0]?.arrival.at
      );
      const returnDepartureTime = new Date(
        flight.itineraries[0].segments[0]?.departure.at
      );

      const timeDifference = returnDepartureTime - outboundArrivalTime;

      const sixHoursInMilliseconds = 6 * 60 * 60 * 1000;

      if (timeDifference < sixHoursInMilliseconds) {
        Swal.fire({
          icon: "info",
          title: "Rất tiếc không thể chọn chuyến bay này",
          text: "Để thuận tiện cho bạn, giờ khởi hành của chuyến bay về phải diễn ra ít nhất 6 tiếng sau khi chuyến bay đi đã hạ cánh.",
          confirmButtonText: "Đổi chuyến bay",
        });
        return;
      }

      onReturnChange(flight);
      onDrawerChange(true);
    } else {
        onOutboundChange(flight);
        onDrawerChange(true);
    }
  };
  return (
    <button
      className="bg-blue-500 hover:opacity-90 cursor-pointer text-white px-8 py-1 rounded font-semibold"
      onClick={() => handleSelectFlight(flight)}
    >
      Chọn
    </button>
  );
};
ChooseFlightItem.propTypes = {
  flight: PropTypes.object.isRequired,
  selectedDeparture: PropTypes.object.isRequired,
  roudTrip: PropTypes.bool.isRequired,
  onOutboundChange: PropTypes.func.isRequired,
  onReturnChange: PropTypes.func.isRequired,
  onDrawerChange: PropTypes.func.isRequired,
};
