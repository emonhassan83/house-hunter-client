import { useEffect, useState } from "react";
// import { useGetAllHousesQuery } from "../../../redux/features/ownerHouse/ownerHouseApi";
import axios from "axios";
import HouseCard from "../../../components/house/HouseCard";

const Banner = () => {
  //    const {houses, isLoading, error} = useGetAllHousesQuery();
  const [houses, setHouses] = useState({});

  useEffect(() => {
    const url = "http://localhost:5000/api/house-owner/all-owner-houses";

    axios
      .get(url)
      .then((response) => {
        setHouses(response.data);
      })
      .catch((error) => {
        console.error("Axios error:", error);
      });
  }, []);
//   console.log(houses);
  return (
    <div className="max-w-[2520px] xl:px-20 md:px-6 sm:px-2 lg:py-2 w-full px-4  mx-auto">
      <h1 className="text-2xl font-semibold text-center">All Houses</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 my-6">
        {houses &&
          houses?.data?.map((house) => (
            <HouseCard key={house._id} house={house} />
          ))}
      </div>
    </div>
  );
};

export default Banner;
