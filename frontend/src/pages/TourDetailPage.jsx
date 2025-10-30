import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getTourById } from '../services/tourService';

// Hàm format tiền tệ
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { 
        style: 'currency', currency: 'VND' 
    }).format(amount).replace('₫', ' ₫');
};

export default function TourDetailPage(){
    const { id } = useParams();
    const [tour, setTour] = useState(null);
    
    useEffect(() => {
        const fetchTour = async () => {
            try {
                const res = await getTourById(id);
                setTour(res.data);
                console.log(res.data);
            } catch (error) {
                console.error("Lỗi khi lấy chi tiết tour:", error);
            }
        };
        fetchTour();
    },[id]);
    if (!tour) return <div className="text-center mt-10">Đang tải...</div>;

    return (
        <div>
            <Header></Header>
            <div className='main flex justify-center'>
                <div className="main--wrapper w-10/12">
                    <div className="main__content">
                        <div className="main__content--wrapper flex mb-2.5 justify-between ">
                            <div className="content-left">
                                <div className="title mb-2.5">
                                    <h2 className="font-bold text-3xl mt-2.5">{tour.name}</h2>
                                </div>
                                <div className="img mt-2.5 w-[800px] h-[460px]">
                                    <img className='w-full h-full object-cover shadow-lg' src={tour.imageUrl}></img>
                                </div>
                                <div className="img mt-2.5 w-[800px] h-[460px]">
                                    <img className='w-full h-full object-cover shadow-lg' src={tour.imageUrl}></img>
                                </div>
                                <div className="img mt-2.5 w-[800px] h-[460px]">
                                    <img className='w-full h-full object-cover shadow-lg' src={tour.imageUrl}></img>
                                </div>
                                <div className="img mt-2.5 w-[800px] h-[460px]">
                                    <img className='w-full h-full object-cover shadow-lg' src={tour.imageUrl}></img>
                                </div>
                                <div className="special"></div>
                                <div className="more-infor">
                                    <p>{tour.description}</p>
                                </div>
                                <div className="schedule"></div>
                            </div> 
                            <div className="content-right ">
                                <div className="content-right--wrapper p-5 sticky top-10 right-10 shadow-lg w-[400px] rounded-2xl">
                                    <div className="price my-2">
                                        <p className='font-semibold text-2xl mb-2'>Giá:</p>
                                        <h2 className='font-semibold text-4xl text-red-600 inline'>{formatCurrency(tour.price)}</h2>
                                        <span className='text-2xl'>/Khách</span>
                                    </div>
                                    <div className="infor flex flex-col gap-5 text-xl my-2">
                                        <p>
                                            <i className='fa-solid fa-ticket'></i> Mã tour: <span className='font-semibold text-blue-600'>{tour.id}</span>
                                        </p>
                                        <p>
                                            <i className='fa-solid fa-location-dot'></i> Khởi hành: <span className='font-semibold text-blue-600'>{tour.location}</span>
                                        </p>
                                        <p>
                                            <i className='fa-solid fa-plane-departure'></i> Ngày bắt đầu: <span className='font-semibold text-blue-600'>{tour.startDate}</span>
                                        </p>
                                        <p>
                                            <i className='fa-solid fa-clock-rotate-left'></i> Ngày kết thúc: <span className='font-semibold text-blue-600'>{tour.endDate}</span>
                                        </p>
                                        <p>
                                            <i className='fa-solid fa-person'></i> Số chỗ: <span className='font-semibold text-blue-600'>{tour.seats}</span>
                                        </p>
                                    </div>
                                    <div className="button mt-7">
                                        <button className='text-white bg-red-600 w-full font-bold text-2xl p-2 rounded-2xl hover:bg-red-900'>Đặt ngay</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main__other"></div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}