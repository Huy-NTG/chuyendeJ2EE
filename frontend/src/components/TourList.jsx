// src/components/TourList.jsx

import React, { useState, useEffect } from 'react';
import TourCard from './TourCard'; // Import TourCard đã code
import { getAllTours } from '../services/tourService';
import { mockTours } from '../assets/data'; // Giả định mockTours nằm ở đây

export default function TourList() {
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await getAllTours(); // gọi API
        console.log(response.data);
        setTours(response.data); // gán dữ liệu vào state
      } catch (error) {
        console.error("Lỗi khi tải danh sách tour:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500 py-10">Đang tải tour...</div>;
  }
    return (
        <div className="container mx-auto px-4">
            
            {/* Sử dụng Tailwind Grid để hiển thị nhiều TourCard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Lặp qua dữ liệu giả */}
                {tours.map(tour => (
                    <TourCard key={tour.id} tour={tour} />
                ))}
            </div>
        </div>
    );
}