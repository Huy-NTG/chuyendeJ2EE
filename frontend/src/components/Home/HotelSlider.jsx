import React, { useState, useRef, useEffect} from "react";
import { getAllHotels } from "../../services/hotelService";
import HotelCard from "../Hotel/HotelCard";


export default function HotelSlider(){
    const sliderRef = useRef(null);
        const scrollLeft = () => {
            sliderRef.current.scrollBy({ left: -800, behavior: "smooth" });
        };
        const scrollRight = () => {
            sliderRef.current.scrollBy({ left: 800, behavior: "smooth" });
        };
        const [hotels, setHotels] = useState([]);
        const [loading, setLoading] = useState(true);
    
        useEffect(() => {
            const fetchTours = async () => {
                try {
                    const response = await getAllHotels(); // gọi API
                    console.log(response.data);
                    setHotels(response.data); // gán dữ liệu vào state
                } catch (error) {
                    console.error("Lỗi khi tải danh sách hotel:", error);
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
            <div>
                <div className="fav__title mb-5 flex justify-center flex-col items-center">
                    <h2 className="flex justify-center text-4xl font-semibold text-blue-800 mb-5 relative pb-5">NGHỈ DƯỠNG ĐỈNH CAO-TRẢI NGHIỆM ĐÁNG NHỚ
                        <span className="bottom-0 left-1/2 translate-x-[-50%] absolute w-6/12 bg-blue-800 h-0.5"></span>
                    </h2>
                    <p className="w-9/12 text-xl font-semibold leading-[35px]">Tại đây, bạn có thể dễ dàng tìm thấy những khách sạn và khu nghỉ dưỡng chất lượng cao, được chọn lọc kỹ lưỡng tại các điểm đến du lịch nổi tiếng.
Từ khách sạn ven biển sang trọng đến khu nghỉ dưỡng giữa núi rừng yên bình, mỗi nơi đều mang đến không gian nghỉ dưỡng thoải mái, tiện nghi và dịch vụ tận tâm.
Hãy để chúng tôi giúp bạn tìm ra nơi dừng chân hoàn hảo cho chuyến đi đáng nhớ của mình!
                    </p>
                </div>
                <div className="py-10 flex justify-center items-center p-5">
                    <div className="relative w-10/12 my-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-blue-800">Khách sạn tiêu biểu</h2>
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
                            {hotels.slice(0, 8).map((hotel) => (
                            <div key={hotel.id} className="flex-none w-1/4 min-w-[250px]">
                                <HotelCard hotel={hotel} />
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
                </div>
            </div>
        );
}