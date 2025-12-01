import React, { useState, useEffect } from "react";
import { getAllHotels } from "../../services/hotelService";
import HotelItem from "./HotelItem";

export default function HotelListItem({location,onCountChange,checkInDate,checkOutDate,guests}){
  const [allHotels, setAllHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredHotels, setFilteredHotels] = useState([]);
  
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await getAllHotels(); // gọi API
        setAllHotels(response.data); // gán dữ liệu vào state
      } catch (error) {
        console.error("Lỗi khi tải danh sách hotel:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHotels();
  }, []);

  useEffect(() => {
    let hotelsToDisplay = [...allHotels];
    if(location)
    hotelsToDisplay = hotelsToDisplay.filter(hotel => 
        String(hotel.location).toLowerCase() === String(location).toLowerCase());
  setFilteredHotels(hotelsToDisplay);
  onCountChange(filteredHotels.length);
  }, [allHotels,location]);
  if (loading)
    return <div className="text-center text-gray-500 py-10">Đang tải hotel...</div>;
  if (filteredHotels.length === 0) {
        return (
            <div className="text-center text-red-500 py-10 text-xl font-semibold">
                Không tìm thấy chỗ nghỉ nào phù hợp với điều kiện lọc của quý khách. 😢
            </div>
        );
    }
       return (
             <div className="container mx-auto px-4">
                 <div className="w-full">
                     {filteredHotels.map(hotel => (
                         <HotelItem 
                          guests={guests}
                          checkInDate={checkInDate} 
                          checkOutDate={checkOutDate} 
                          key={hotel.id} hotel={hotel}/>
                     ))}
                 </div>
             </div>
         );
}