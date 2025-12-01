import React from "react";
import { Link } from "react-router-dom";

export default function HotelItem({hotel,checkInDate,checkOutDate,guests}){
    const checkIn = checkInDate || '';
    const checkOut = checkOutDate || '';
    const guestCount = guests || 1; 

    return (
        <div className="h-60 w-5xl p-2.5 hover:cursor-pointer">
            <div className="bg-gray-100 shadow-[0_0_5px_1px_gray] w-full h-full flex rounded-2xl overflow-hidden hover:shadow-[0_0_10px_2px_gray]">
                <div className="">
                    <img className="w-full h-full object-cover" src={hotel.imgUrl} alt={hotel.name}></img>
                </div>
                <div className="px-2.5 bg-white">
                    <h2 className="text-xl font-semibold">{hotel.name}</h2>
                    <p className="italic"><i className="fa-solid fa-location-crosshairs"></i> {hotel.address}</p>
                    <p><i className="fa-solid fa-map"></i> {hotel.location}</p>
                </div>
                <div className="flex justify-center items-center px-2.5">
                    <Link to={`/hotels/${hotel.id}?checkInDate=${checkIn}&checkOutDate=${checkOut}&guests=${guestCount}`}>
                        <button className="bg-blue-600 text-white text-2xl font-semibold w-68 h-10 rounded-2xl hover:bg-blue-800">Xem phòng</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}