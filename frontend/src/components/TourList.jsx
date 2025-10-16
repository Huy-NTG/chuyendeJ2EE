// src/components/TourList.jsx

import React from 'react';
import TourCard from './TourCard'; // Import TourCard đã code
import { mockTours } from '../assets/data'; // Giả định mockTours nằm ở đây

export default function TourList() {
    return (
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-4 border-blue-600 pl-3">
                TOUR ƯU ĐÃI NỔI BẬT
            </h2>
            
            {/* Sử dụng Tailwind Grid để hiển thị nhiều TourCard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Lặp qua dữ liệu giả */}
                {mockTours.map(tour => (
                    <TourCard key={tour.id} tour={tour} />
                ))}
            </div>
        </div>
    );
}