import { useParams } from "react-router-dom";
import Footer from "../components/Global/Footer";
import Header from "../components/Global/Header";
import { useEffect, useState } from "react";
import { getHotelById } from "../services/hotelService";
import RoomList from "../components/Hotel/RoomList";

export default function HotelDetailPage(){
    const [selectedFilters, setSelectedFilters] = useState([]);
    const { id_hotel } = useParams();
    const [ hotel, setHotel] = useState(null);
    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const response = await getHotelById(id_hotel);
                console.log(response.data)
                setHotel(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy chi tiết hotel: ",error);
            }
        };
        fetchHotel()
    },[id_hotel]);
    const handleFilterClick = (filtername) => {
        if (selectedFilters.includes(filtername))
            setSelectedFilters(selectedFilters.filter(filter => filter !== filtername));
        else
            setSelectedFilters([...selectedFilters, filtername]);
    }
    const isActive = (filtername) => selectedFilters.includes(filtername);
    const baseClass = "btn h-[35px] border-2 border-gray-800 rounded-2xl px-2";
     if (!hotel) return <div className="text-center mt-10">Đang tải...</div>;
    return (
        <div>
            <Header></Header>
            <div className="main p-10 box-border flex justify-center">
                <div className="main--wrapper w-10/12">
                    <div className="header">
                        <div className="header--wrapper">
                            <h2 className="font-bold text-3xl mt-2.5">{hotel.name}</h2>
                        </div>
                        <div className="img my-5 ">
                            {hotel.images.map((img,index) => (

                            <img key={index} className="w-[800px] h-[460px] object-cover shadow-lg" src={img.imgUrl}></img>
                            ))}
                        </div>
                    </div>
                    <div className="navbar">
                        <div className="navbar--wrapper flex">
                            <div className="intro">
                                <div className="intro--wrapper">
                                    <div className="title">
                                        <h2>Giới thiệu</h2>
                                    </div>
                                    <div className="content">
                                        <p>{hotel.description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="map"></div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="content--wrapper">
                            <div className="title flex justify-center h-20 items-center">
                                <h2 className="font-bold text-3xl">DANH SÁCH PHÒNG</h2>
                            </div>
                            <div className="filter bg-gray-100 rounded-xl p-2">
                                <div className="filter-header flex justify-between mb-5">
                                    <p className="font-semibold text-xl">
                                        <i className="fa-solid - fa-sliders"></i>
                                        Chọn lọc:
                                    </p>
                                    <button onClick={() => setSelectedFilters([])} className=" hover:text-red-500 italic">Xóa</button>
                                </div>
                                <div className="filter-list flex gap-1.5">
                                    <button
                                    onClick={() => handleFilterClick('Tiêu chuẩn')}
                                    className={`${baseClass}
                                    ${isActive('Tiêu chuẩn') ? 'bg-blue-900 text-white border-blue-900' : ' hover:bg-blue-900 hover:text-white hover:border-blue-900'
                                    }`}>Tiêu chuẩn</button>
                                    <button
                                    onClick={() => handleFilterClick('Tiêu chuẩn 1')}
                                    className={`${baseClass}
                                    ${isActive('Tiêu chuẩn 1') ? 'bg-blue-900 text-white border-blue-900' : ' hover:bg-blue-900 hover:text-white hover:border-blue-900'
                                    }`}>Tiêu chuẩn 1</button>
                                    <button
                                    onClick={() => handleFilterClick('Tiêu chuẩn 2')}
                                    className={`${baseClass}
                                    ${isActive('Tiêu chuẩn 2') ? 'bg-blue-900 text-white border-blue-900' : ' hover:bg-blue-900 hover:text-white hover:border-blue-900'
                                    }`}>Tiêu chuẩn 2</button>
                                    <button
                                    onClick={() => handleFilterClick('Tiêu chuẩn 3')}
                                    className={`${baseClass}
                                    ${isActive('Tiêu chuẩn 3') ? 'bg-blue-900 text-white border-blue-900' : ' hover:bg-blue-900 hover:text-white hover:border-blue-900'
                                    }`}>Tiêu chuẩn 3</button>
                                </div>
                                
                            </div>
                            <div className="list-room">
                                <RoomList></RoomList>
                            </div>
                        </div>
                    </div>
                    <div className="footer"></div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}