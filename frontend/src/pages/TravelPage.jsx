import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "../components/Global/Header";
import Footer from "../components/Global/Footer";
import { placeSlug } from "../assets/data/Tour";
import TourListItem from "../components/Tour/TourListItem";
import { useEffect, useState } from "react";
import { getAllTours } from "../services/tourService";
import { slugify } from "../utils/stringUtils";

export default function TravelPage(){
    const navigate = useNavigate();
    const { location : slug } = useParams(); 
    const [selectedPrice,setSelectedPrice] = useState(null);
    const [allTours, setAllTours] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const price = [
        { label: 'Dưới 5 triệu', value: 'under_5m' },
        { label: 'Từ 5 - 10 triệu', value: '5-10m' },
        { label: 'Từ 10 - 20 triệu', value: '10-20m' },
        { label: 'Trên 20 triệu', value: 'over_20m' },
    ];
    const handlePriceClick = (value) => {
        setSelectedPrice(value);
    };    
    const handleClearPrice = () => {
        setSelectedPrice(null);
    };
    const handleChangeSelectedLocation = (event) =>{
        const newValue = event.target.value;
        setSelectedLocation(newValue);
        if (newValue)
            navigate(`/tours/location/${slugify(newValue)}`);
    };
    const handleChangeSelectedDate = (event) => {
        const newValue = event.target.value;
        setSelectedDate(newValue);
        console.log(`"Ngày khởi hành:",${newValue}`);
    };
    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await getAllTours();
                setAllTours(response.data);
            } catch (error) {
                console.error("Lỗi khi tải danh sách tour: ",error);
            }
        };
        fetchTours();
    },[]);

    const arrayLocations = allTours.filter(tour => tour.location).map(tour => tour.location);
    // tạo Set từ mảng để loại bỏ sự trùng lập
    const uniqueSet = new Set(arrayLocations);
    // chuyển Set lại thành mảng 
    const arraySelectedLocations = [...uniqueSet];
    const isPriceFilterActive = selectedPrice !== null;
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
                            <div className="title">
                                <h2 className="flex justify-center items-center font-bold text-4xl text-blue-800">DU LỊCH {displayLocation.toLocaleUpperCase()}</h2>
                            </div>
                            <div className="description">
                                <p></p>
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
                                            <div className="title w-full flex justify-between items-center">
                                                <p className="font-semibold text-[18px]">Ngân sách</p>
                                                <p className="hidden font-bold text-blue-700 cursor-pointer">Xóa</p>
                                                <button 
                                                    className={`font-bold text-sm cursor-pointer transition duration-300 ${
                                                        isPriceFilterActive ? 'text-red-600 hover:text-red-800' : 'text-gray-500 hover:text-gray-600 hidden'
                                                    }`}
                                                    onClick={handleClearPrice}
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                            <div className="price__btn grid grid-cols-2 grid-rows-2 p-1 gap-x-6 gap-y-2">
                                                {price.map((data) => (
                                                    <button 
                                                        key={data.value} 
                                                        onClick={() => handlePriceClick(data.value)}
                                                        className={` rounded-md h-[40px] 
                                                            ${selectedPrice === data.value 
                                                            ? 'bg-blue-600 text-white border-blue-600 font-semibold shadow-md' 
                                                            : 'bg-white border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-200 hover:text-blue-800'}`}>
                                                                {data.label}
                                                    </button>
                                                ))}
                                            </div>
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
                                        <div className="start-date">
                                            <p className="font-semibold text-[18px]">Ngày khởi hành</p>
                                            <div className="start-date__input">
                                                <input 
                                                    onChange={handleChangeSelectedDate}
                                                    value={selectedDate}
                                                    className="w-full h-[45px] border-2 border-gray-300 rounded-md" type="date"></input>
                                            </div>
                                        </div>
                                        <div className="mt-2.5">
                                            <button className="rounded-xl h-[35px] bg-blue-800 text-white w-full hover:bg-blue-900">Áp dụng</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="content-left flex-1 min-w-0">
                                <div className="content-left--wrapper flex justify-between">
                                    <h2 className="font-semibold text-xl">Chúng tôi tìm thấy <span className="text-blue-600 text-3xl">22</span> chương trình tour cho quý khách</h2>
                                    <div className="flex items-center">
                                        <h2 className="font-semibold text-xl mr-2">Sắp xếp theo</h2>
                                        <select name="sapxep" className="block p-2 border border-gray-300 rounded-md ">
                                            <option value="" disabled>Ngày khởi hành gần nhất</option>
                                            <option value="">Giá từ thấp đến cao</option>
                                            <option value="">Giá từ cao đến thấp</option>
                                        </select>
                                    </div>
                                </div>
                                <TourListItem location={displayLocation} price={selectedPrice} date={selectedDate}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}