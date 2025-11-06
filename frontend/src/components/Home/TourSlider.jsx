import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TourCard from "../Tour/TourCard";
import { getAllTours } from '../../services/tourService';

export default function TourSlider() {
    const sliderRef = useRef(null);
    const scrollLeft = () => {
        sliderRef.current.scrollBy({ left: -800, behavior: "smooth" });
    };
    const scrollRight = () => {
        sliderRef.current.scrollBy({ left: 800, behavior: "smooth" });
    };
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
        <div className="relative w-10/12 my-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-blue-800">Tour nổi bật</h2>
            </div>
            <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-blue-100 z-10">
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            <div
                ref={sliderRef}
                className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar px-8"
            >
                {tours.slice(0, 8).map((tour) => (
                <div key={tour.id} className="flex-none w-1/4 min-w-[250px]">
                    <TourCard tour={tour} />
                </div>
                ))}
            </div>
            <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-blue-100 z-10"
            >
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    );
}
