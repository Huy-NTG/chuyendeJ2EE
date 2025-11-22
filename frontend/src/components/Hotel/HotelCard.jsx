import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";

export default function HotelCard({hotel}){
    return (
        <Link to={`/hotels/${hotel.id}`}>
            <div className="tour-card bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100">
                <div className="tour-card__image relative">
                    <img 
                        className="w-full h-48 object-cover" 
                        src={hotel.imgUrl} 
                        alt={hotel.name} 
                    />
                </div>
                <div className="tour-card__titlep-4 px-2">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 min-h-[50px] line-clamp-2 transition">
                        {hotel.name}
                    </h3>
                    <div className="text-sm text-gray-600 space-y-1">
                        <p>
                            {hotel.description}
                        </p>
                        <p>
                            <span className="font-semibold">Địa điểm:</span> {hotel.location}
                        </p>
                        <p>
                            <span className="font-semibold text-red-600">Còn:</span> {hotel.seats} chỗ
                        </p>
                    </div>
                </div>
                <div className="p-4 bg-gray-50 border-t flex items-center justify-between">
                    <div>
                        {hotel.pricePerNight && (
                            <p className="text-sm text-gray-500 line-through">
                                {formatCurrency(hotel.price)}
                            </p>
                        )}
                        {/* Giá chính thức */}
                        <p className="text-xl font-extrabold text-orange-600">
                            {formatCurrency(hotel.pricePerNight || hotel.pricePerNight)}
                        </p>
                    </div>
                    <button 
                        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition"
                        onClick={() => console.log('Đặt tour', hotel.id)} // Logic đặt tour
                    >
                        Đặt ngay
                    </button>
                </div>
            </div>
        </Link>
    )
}