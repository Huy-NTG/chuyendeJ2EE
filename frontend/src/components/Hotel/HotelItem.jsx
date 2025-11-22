import React from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import { Link } from "react-router-dom";

export default function HotelItem(hotel){
    return (
        <div className="flex my-10 rounded-2xl border-gray-200 border-2 overflow-hidden gap-5 hover:shadow-lg hover:cursor-pointer">
            <div className="content-left w-[400px] ">
                <div className="content-left--wrapper">
                    <img className="w-full h-[250px] object-cover" src={hotel.imgUrl} alt={hotel.name}></img>
                </div>
            </div>
            <div className="content-right flex flex-col justify-between p-2 w-[60%]">
                <div className="content-right--wrapper flex flex-col h-full"> 
                    <h2 className="font-semibold text-2xl mb-2">{hotel.name}</h2>
                    <div className="main__content grid grid-cols-2 gap-y-0 grow">
                        <div className="tour">
                            <p className="flex items-center whitespace-nowrap text-xl">
                                <i className="fa-solid fa-ticket"></i> Mã tour: {hotel.id}
                            </p>                                    
                        </div>      
                        <div className="tour">
                            <p className="flex items-center whitespace-nowrap text-xl">
                                <i className="fa-solid fa-location-dot"></i>  
                                Khởi hành: {hotel.location}
                            </p>                                    
                        </div> 
                        <div className="tour">
                            <p className="flex items-center whitespace-nowrap text-xl">
                                <i className="fa-solid fa-plane-departure"></i>  
                                Khởi hành: {hotel.startDate}
                            </p>                                    
                        </div> 
                        <div className="tour">
                            <p className="flex items-center whitespace-nowrap text-xl">
                                <i className="fa-solid fa-ticket"></i>  
                                Kết thúc: {hotel.endDate}
                            </p>                                    
                        </div> 
                        <div className="tour">
                            <p className="flex items-center whitespace-nowrap text-xl">
                                <i className="fa-solid fa-person"></i>  
                                Số chỗ: {hotel.seats}
                            </p>                                    
                        </div> 
                    </div>
                    <div className="tour--footer flex justify-between">
                        <div className="footer-left">
                            <p>Giá từ: </p>
                            <p className="text-2xl font-extrabold text-orange-600">
                                {formatCurrency(hotel.price || hotel.price)}
                            </p>
                        </div>
                        <div className="footer-right">
                            <Link to={`/hotels/${hotel.id}`}>
                                <button className="right-0 bottom-0 bg-blue-600 text-white rounded-md px-4 py-2 hover:cursor-pointe hover:bg-red-600">Đặt phòng</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}