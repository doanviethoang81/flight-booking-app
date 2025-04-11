import React from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import BookIcon from "@mui/icons-material/Book";

const destinations = [
  { name: "Bali", country: "Indonesia", image: "https://ik.imagekit.io/tvlk/blog/2022/12/dia-diem-du-lich-bali-1.jpg?tr=q-70,c-at_max,w-500,h-300,dpr-2" },
  { name: "Bangkok", country: "Thái Lan", image: "https://longphutravel.com/uploads/gallery/bangkok-pattaya-2023/thai-lan-bangkok-pattaya-bay-thang-tu-tpho-chi-minh-longphutourist-00.jpg" },
  { name: "Seoul", country: "Hàn Quốc", image: "https://ik.imagekit.io/tvlk/blog/2022/07/du-lich-seoul-tu-tuc-1.jpg" },
  { name: "Istanbul", country: "Thổ Nhĩ Kỳ", image: "https://vietourist.com.vn/public/frontend/uploads/files/tour/Cappadocia-du-lich-tho-nhi-ky.jpg" },
  { name: "Liverpool", country: "Anh", image: "https://deviet.vn/wp-content/uploads/2019/04/vuong-quoc-anh.jpg" },
];

const TravelGuide = () => {
  return (
    <>
      <Box className="w-full text-center my-2">
        <Typography variant="h5" fontWeight="bold" className="flex items-center justify-left gap-2">
          <BookIcon color="primary" /> Cẩm nang du lịch
        </Typography>
        <Box className="flex gap-6 justify-center mt-5">
          {destinations.map((destination, index) => (
            <Card key={index} className="w-64 shadow-lg rounded-lg overflow-hidden relative">
              <CardMedia component="img" image={destination.image} alt={destination.name} sx={{ height: 280, objectFit: "cover" }} />
              <CardContent
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  color: "white",
                  backgroundColor: "transparent", 
                  backdropFilter: "blur(5px)", 
                  textAlign: "center",
                }}
              >
                <Typography variant="subtitle1" fontWeight="bold">{destination.name}</Typography>
                <Typography variant="body2">{destination.country}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      <Box className="text-center mt-3">
  <Typography
    variant="body1"
    className="text-blue-500 font-bold font-semibold inline-block cursor-pointer px-6 py-3 rounded-lg hover:bg-blue-500 hover:text-white transition duration-300">
       <strong>Xem thêm</strong> →
     </Typography>
   </Box>
   </>
  );
};

export default TravelGuide;
