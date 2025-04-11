import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function AirlineFilter({ airlines,onChange,reset,setReset }) {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const contentRef = useRef(null);

  const handleToggle = (code) => {
    setSelectedAirlines((prev) =>
      prev.includes(code) ? prev.filter((item) => item !== code) : [...prev, code]
    );
  };
  useEffect(() =>{
    onChange(selectedAirlines);
    window.scrollTo({ top: 0, behavior: "smooth" });
},[selectedAirlines,onChange])
useEffect(() => {
  if (reset) {
    setSelectedAirlines([]);
    setReset(!reset);
  }
}, [reset,setReset]);
  return (
    <div className={`mt-2`}>
      {/* Tiêu đề */}
      <div
        className="flex justify-between items-center cursor-pointer bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold">Hãng hàng không</span>
        <span className={`transition-transform duration-300 select-none ${isOpen ? "rotate-180" : "rotate-0"}`}>
            <RiArrowDropDownLine size={30}/>
        </span>
      </div>

      {/* Nội dung Accordion với hiệu ứng mở/đóng */}
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300  max-h-70 overflow-y-auto custom-scrollbar"
        style={{
          height: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="mt-2 space-y-2">
          {Object.entries(airlines).map(([code, name]) => (
            <label
              key={code}
              className="flex items-center space-x-3 hover:bg-gray-100  cursor-pointer p-2"
            >
              <input
                type="checkbox"
                checked={selectedAirlines.includes(code)}
                onChange={() => handleToggle(code)}
                className="w-4 h-4"
              />
              {/* Logo hãng hàng không */}
              <img
                src={`https://assets.duffel.com/img/airlines/for-light-background/full-color-logo/${code}.svg`}
                alt={name}
                width={30}
                height={30}
              />
              {/* Tên hãng */}
              <span className="font-semibold">{name}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

AirlineFilter.propTypes = {
  airlines: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  reset: PropTypes.bool.isRequired,
  setReset: PropTypes.func.isRequired,
};
