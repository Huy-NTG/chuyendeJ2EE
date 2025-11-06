import { useParams } from "react-router-dom";
import Header from "../components/Global/Header";
import Footer from "../components/Global/Footer";
import { placeSlug } from "../assets/data/Tour";
import TourListItem from "../components/Tour/TourListItem";
import { useState } from "react";

export default function TravelPage(){
    const { location: slug } = useParams(); 
    const {showBtn, setShowBtn} = useState(false);
    const { active, setActive} = useState(false);
    const price = [
        { label: 'Dưới 5 triệu', value: 'under_5m' },
        { label: 'Từ 5 - 10 triệu', value: '5-10m' },
        { label: 'Từ 10 - 20 triệu', value: '10-20m' },
        { label: 'Trên 20 triệu', value: 'over_20m' },
    ];
    const handleClick = () => {

    };    
    const displayLocation = placeSlug[slug] || slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
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
                                                <p className="font-bold text-blue-700 cursor-pointer">Xóa</p>
                                            </div>
                                            <div className="price__btn grid grid-cols-2 grid-rows-2 p-1 gap-x-6 gap-y-2">
                                                {price.map((data) => (
                                                    <button 
                                                        key={data.value} 
                                                        className="bg-white border-2 border-gray-200 rounded-md h-[40px] hover:border-blue-400 hover:bg-blue-200 hover:text-blue-800">{data.label}</button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="arrival mb-2">
                                            <p className="font-semibold text-[18px]">Điểm đến</p>
                                            <div className="arrival__section">
                                                <select name="diemDen" id="diemDen" class="block w-full p-2 border border-gray-300 rounded-md">
                                                    <option value="" disabled selected>Chọn điểm đến</option> 
                                                    <option value="hue">Huế</option>
                                                    <option value="da-nang">Đà Nẵng</option>
                                                    <option value="ha-noi">Hà Nội</option>
                                                    <option value="ho-chi-minh">Hồ Chí Minh</option>
                                                    <option value="nha-trang">Nha Trang</option>
                                                    <option value="phu-quoc">Phú Quốc</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="start-date">
                                            <p className="font-semibold text-[18px]">Ngày khởi hành</p>
                                            <div className="start-date__input">
                                                <input className="w-full h-[45px] border-2 border-gray-300 rounded-md" type="date"></input>
                                            </div>
                                        </div>
                                        <div className="mt-2.5">
                                            <button className="rounded-xl h-[35px] bg-blue-800 text-white w-full">Áp dụng</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="content-left">
                                <div className="content-left--wrapper flex justify-between">
                                    <h2 className="font-semibold text-xl">Chúng tôi tìm thấy <span className="text-blue-600 text-3xl">22</span> chương trình tour cho quý khách</h2>
                                    <div className="flex items-center">
                                        <h2 className="font-semibold text-xl mr-2">Sắp xếp theo</h2>
                                        <select name="sapxep" class="block p-2 border border-gray-300 rounded-md ">
                                            <option value="" disabled selected>Ngày khởi hành gần nhất</option>
                                            <option value="">Giá từ thấp đến cao</option>
                                            <option value="">Giá từ cao đến thấp</option>
                                        </select>
                                    </div>
                                </div>
                                <TourListItem location={displayLocation} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}