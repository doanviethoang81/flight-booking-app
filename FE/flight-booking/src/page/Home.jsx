import React from "react";
import { useSearchParams } from "react-router-dom";
import FilterFlight from "../component/FilterFlight";

export default function Home() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status"); // Lấy giá trị "status" từ URL

  return (
    <>
      <h1>Home Page</h1>
      {status && <p>Trạng thái thanh toán: {status}</p>}
      <FilterFlight />
    </>
  );
}
