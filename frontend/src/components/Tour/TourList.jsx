import React, { useState, useEffect } from 'react';
import TourCard from './TourCard'; // Import TourCard đã code
import { getAllTours} from '../../services/tourService';

export default function TourList({location}) {
  const [allTours, setAllTours] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await getAllTours(); // gọi API
        console.log(response.data);
        setAllTours(response.data); // gán dữ liệu vào state
      } catch (error) {
        console.error("Lỗi khi tải danh sách tour:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);
  let toursToDisplay = [];
  console.log(location);
  if(location){
    toursToDisplay = allTours.filter(tour => 
        String(tour.location).toLowerCase() === String(location).toLowerCase());
    console.log(toursToDisplay);
    }
  else 
    toursToDisplay = allTours;
  if (loading)
    return <div className="text-center text-gray-500 py-10">Đang tải tour...</div>;
  return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {toursToDisplay.map(tour => ( 
                    <TourCard key={tour.id} tour={tour} location={location}/>
                ))}
            </div>
        </div>
    );
}