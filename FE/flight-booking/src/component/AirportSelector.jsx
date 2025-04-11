import { useState, useCallback, useEffect } from "react";
import { TextField, CircularProgress, Typography, InputAdornment, Autocomplete, Box } from "@mui/material";
import { TbPlaneDeparture, TbPlaneInflight } from "react-icons/tb";
import { debounce } from "lodash";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { PiCityFill } from "react-icons/pi";
import PropTypes from "prop-types";

const AIRPORTS_URL = "https://test.api.amadeus.com/v1/reference-data/locations?subType=AIRPORT,CITY&keyword=";

export default function AirportSelector({ label, value, onChange, name }) {
  const [loading, setLoading] = useState(false);
  const [airportOptions, setAirportOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  console.log(value);

  // Vietnamese Airlines list (sample, you can expand this as needed)
  const vietnamAirportCity = [
    { iataCode: 'SGN', name: 'Tan Son Nhat Intl', address: { cityName: 'TP HCM',countryName:'Việt Nam' } },  // SGN - Ho Chi Minh
    { iataCode: 'HAN', name: 'Noi Bai Intl', address: { cityName: 'Hà Nội',countryName:'Việt Nam' } },                   // HAN - Hanoi
    { iataCode: 'PQC', name: 'Phu Quoc Island Intl', address: { cityName: 'Phú Quốc',countryName:'Việt Nam' } },        // PQC - Phu Quoc
    { iataCode: 'HUI', name: 'Phu Bai Intl', address: { cityName: 'Huế',countryName:'Việt Nam' } },                     // HUI - Hue
    { iataCode: 'DAD', name: 'Da Nang Intl.', address: { cityName: 'Đà Nẵng',countryName:'Việt Nam' } },                // DAD - Da Nang
    { iataCode: 'VCL', name: 'Chu Lai Intl.', address: { cityName: 'Chu Lai',countryName:'Việt Nam' } },                // VCL - Quang Nam
    { iataCode: 'CXR', name: 'Cam Ranh Intl', address: { cityName: 'Nha Trang',countryName:'Việt Nam' } },              // CXR - Nha Trang
    { iataCode: 'VII', name: 'Vinh Airport', address: { cityName: 'Vinh',countryName:'Việt Nam' } },                    // VII - Vinh
    { iataCode: 'UIH', name: 'Phu Cat', address: { cityName: 'Qui Nhơn',countryName:'Việt Nam' } },                    // UIH - Qui Nhon
    { iataCode: 'TBB', name: 'Dong Tac', address: { cityName: 'Tuy Hòa',countryName:'Việt Nam' } },                   // TBB - Tuy Hoa
    { iataCode: 'VCA', name: 'Can Tho Intl', address: { cityName: 'Cần Thơ',countryName:'Việt Nam' } }                  // VCA - Can Tho
  ];
  
  

  useEffect(() => {
    if (value && value.address && value.iataCode) {
      setInputValue(`${value.address.cityName} (${value.iataCode})`);
    } else {
      setInputValue("");
    }
  }, [value]);

  const fetchAirports = useCallback(
    debounce(async (searchTerm) => {
      if (!searchTerm) {
        setAirportOptions([]);
        return;
      }
      const token = localStorage.getItem("api_token"); // Lấy token mới nhất
      setLoading(true);
      try {
        const response = await fetch(`${AIRPORTS_URL}${searchTerm}&sort=analytics.travelers.score`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setAirportOptions(data?.data || []);
      } catch (error) {
        console.error("Error fetching airport data:", error);
        setAirportOptions([]);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  const handleOptionSelect = (event, selectedOption) => {
    if (selectedOption) {
      setInputValue(`${selectedOption.address?.cityName || ''} (${selectedOption.iataCode})`);
      onChange(name, selectedOption);
    }
  };
console.log(airportOptions);

  return (
    <div>
      <Typography className="font-semibold">{label}</Typography>
      <Autocomplete
        freeSolo
        filterOptions={(x) => x}
        options={[ ...airportOptions,...vietnamAirportCity]} // Combine Vietnamese airlines with fetched airports
        getOptionLabel={(option) => option?.id ? `${option.address.cityName} (${option.iataCode})` : ""}
        renderOption={(props, option) => (
          <li {...props} key={option.id}>
            <Box className="flex flex-col cursor-pointer">
              <Box className="flex items-center">
                {option.subType==='AIRPORT' ? (
                  <BiSolidPlaneAlt className="text-gray-500 mr-2" size={20} />
                ) : (
                  <PiCityFill className="text-gray-500 mr-2" size={20} />
                )}
                <Box className="flex flex-col">

                <Typography>{option.name} ({option.iataCode})</Typography>
                <Typography variant="caption">{option.address.cityName}, {option.address.countryName}</Typography>
                </Box>

              </Box>
            </Box>
          </li>
        )}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          fetchAirports(newInputValue);
        }}
        onChange={(event, newValue) => {
          if (!newValue) {
            onChange(name, null);
          } else {
            handleOptionSelect(event, newValue);
          }
        }}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            fullWidth
            placeholder="Nhập sân bay hoặc thành phố..."
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  {name === 'departure' ? <TbPlaneDeparture className="text-gray-500" size={25} /> : <TbPlaneInflight className="text-gray-500" size={25} />}
                </InputAdornment>
              ),
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
              sx: { fontWeight: "bold" },
            }}
          />
        )}
      />
    </div>
  );
}

AirportSelector.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
