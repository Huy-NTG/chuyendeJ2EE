import { Link, useParams, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/Global/Header";
import Footer from "../components/Global/Footer";
import { placeSlug } from "../assets/data/Tour";
import { useEffect, useState } from "react";
import HotelListItem from "../components/Hotel/HotelListItem";
import { getAllHotels } from "../services/hotelService";
import { slugify } from "../utils/stringUtils";

export default function HotelPage(){
    const navigate = useNavigate();
    const { location : slug } = useParams(); 
    const [allHotels, setAllHotels] = useState([]);
    const [countChange, setCountChange] = useState(0);
    const [searchParams] = useSearchParams();

    const intialCheckInDate = searchParams.get('checkInDate');
    const intialCheckOutDate = searchParams.get('checkOutDate');
    const intialGuests = searchParams.get('guests');

    const [selectedLocation, setSelectedLocation] = useState(slug || "");
    const [selectedCheckInDate] = useState(intialCheckInDate || null);
    const [selectedCheckOutDate] = useState(intialCheckOutDate || null);
    const [guests] = useState(intialGuests || 1);

    const handleChangeSelectedLocation = (event) => {
        const newValue = event.target.value;
        console.log(newValue);
        setSelectedLocation(newValue);
        if (newValue){
                    // Đây là thay đổi URL Path, vẫn giữ nguyên cách cũ nhưng không cần query string lúc này
                     // Vì các tham số khác sẽ bị mất nếu không gán lại, bạn nên dùng cách sau:
                     const newSearchParams = new URLSearchParams(searchParams);
                     navigate(`/hotels/location/${slugify(newValue)}?${newSearchParams.toString()}`);
                }
        }
    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await getAllHotels();
                setAllHotels(response.data);
            } catch (error) {
                console.error("Lỗi khi tải danh sách hotel: ",error);
            }
        };
        fetchHotels();
    },[]);
    const arrayLocations = allHotels.filter(hotel => hotel.location).map(hotel => hotel.location);
    const uniqueSet = new Set(arrayLocations);
    const arraySelectedLocations = [...uniqueSet];
    let displayLocation = "";
    if(!selectedLocation)
        displayLocation = placeSlug[slug] || 
        slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    else
        displayLocation = placeSlug[selectedLocation] || 
        selectedLocation.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return (
        <div>
            <Header></Header>
            <div className="main flex justify-center items-center p-5">
                <div className="main--wrapper w-10/12">
                    <div className="header p-5 justify-center items-center">
                        <div className="header--wrapper">
                            <div className="title mb-10">
                                <h2 className="flex justify-center items-center font-bold text-4xl text-blue-800">KHÁCH SẠN Ở {displayLocation.toLocaleUpperCase()}</h2>
                            </div>
                            <div className="description flex justify-center">
                                <div className="w-6xl h-32 rounded-2xl shadow-[0__0_5px_1px_gray] p-5">
                                    <h2 className="text-blue-800 font-semibold text-xl mb-2">Thông tin khách sạn:</h2>
                                    <div className="flex justify-between items-center text-xl">
                                        <p><i className="fa-solid fa-map"></i> Địa điểm: {displayLocation}</p>
                                        <p><i className="fa-solid fa-calendar-check"></i> Ngày nhận phòng: {selectedCheckInDate}</p>
                                        <p><i className="fa-solid fa-calendar"></i> Ngày trả phòng: {selectedCheckOutDate}</p>
                                        <p><i className="fa-solid fa-people-group"></i> Số người: {guests}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="content--wrapper flex justify-between">
                            <div className="content-right w-[400px]">
                                <div className="content-right--wrapper sticky top-10">
                                    <h2 className="font-bold text-2xl">BỘ LỌC TÌM KIẾM</h2>
                                    <div className="main__content bg-gray-100 p-5">
                                        <div className="price mb-2">
                                            {/* <div className="title w-full flex justify-between items-center">
                                                <p className="font-semibold text-[18px]">Ngân sách</p>
                                            </div>
                                            <div className="price__btn">
                                                <input type="range" className="w-full text-blue-500"></input>
                                            </div> */}
                                        </div>
                                        <div className="arrival mb-2">
                                            <p className="font-semibold text-[18px]">Điểm đến</p>
                                            <div className="arrival__section">
                                                <select name="diemDen" id="diemDen" value={selectedLocation} 
                                                    onChange={handleChangeSelectedLocation} 
                                                    className="block w-full p-2 border border-gray-300 rounded-md">
                                                    <option value="" disabled>Chọn điểm đến</option> 
                                                    {
                                                        arraySelectedLocations.map((value,index) => (
                                                        <option key={index} value={value}>{value}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="content-left flex-1 min-w-0">
                                <div className="content-left--wrapper flex justify-between">
                                    <h2 className="font-semibold text-xl">Chúng tôi tìm thấy <span className="text-blue-600 text-3xl">{countChange}</span> chỗ nghỉ cho quý khách</h2>
                                </div>
                                <HotelListItem 
                                    location={displayLocation} 
                                    checkInDate={selectedCheckInDate}
                                    checkOutDate={selectedCheckOutDate}
                                    guests={guests}
                                    onCountChange={setCountChange}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}