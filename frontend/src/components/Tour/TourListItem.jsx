import React, { useState, useEffect } from "react";
import TourItem from "./TourItem";
import { getAllTours } from "../../services/tourService";

export default function TourListItem({location,price,date}){
  const [allTours, setAllTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredTours, setFilteredTours] = useState([]);
  
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await getAllTours(); // gọi API
        setAllTours(response.data); // gán dữ liệu vào state
      } catch (error) {
        console.error("Lỗi khi tải danh sách tour:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  useEffect(() => {
    let toursToDisplay = [...allTours];
    
    if(location)
    toursToDisplay = toursToDisplay.filter(tour => 
        String(tour.location).toLowerCase() === String(location).toLowerCase());
  if (price) 
    switch (price) {
        case "under_5m":
            toursToDisplay = toursToDisplay.filter(tour => tour.price < 5000000);
            break;
        case "5-10m":
            toursToDisplay = toursToDisplay.filter(tour => 
                tour.price >= 5000000 && tour.price <= 10000000
            );
            break;
        case "10-20m":
            toursToDisplay = toursToDisplay.filter(tour => 
                tour.price > 10000000 && tour.price <= 20000000
            );
            break;
        case "over_20m":
            toursToDisplay = toursToDisplay.filter(tour => tour.price > 20000000);
            break;
        default:
            break;
    }
  
  if(date){
    const selectedDate = new Date(date).setHours();
    toursToDisplay = toursToDisplay.filter((tour) => {
      const tourDate = new Date(tour.startDate);
      return tourDate === selectedDate;
    });
  }
  setFilteredTours(toursToDisplay);
  }, [allTours,location,price,date]);
  if (loading)
    return <div className="text-center text-gray-500 py-10">Đang tải tour...</div>;
  if (filteredTours.length === 0) {
        return (
            <div className="text-center text-red-500 py-10 text-xl font-semibold">
                Không tìm thấy chương trình tour nào phù hợp với điều kiện lọc của quý khách. 😢
            </div>
        );
    }
       return (
             <div className="container mx-auto px-4">
                 <div className="w-full">
                     {filteredTours.map(tour => (
                         <TourItem key={tour.id} tour={tour} location={location}/>
                     ))}
                 </div>
             </div>
         );
}