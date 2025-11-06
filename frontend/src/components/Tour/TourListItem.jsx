import React, { useState, useEffect } from "react";
import TourItem from "./TourItem";
import { getAllTours } from "../../services/tourService";

export default function TourListItem({location}){
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
                 <div className="w-full">
                     {toursToDisplay.map(tour => (
                         <TourItem key={tour.id} tour={tour} location={location}/>
                     ))}
                 </div>
             </div>
         );
}