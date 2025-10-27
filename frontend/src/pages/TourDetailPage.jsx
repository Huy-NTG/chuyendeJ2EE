import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { mockTours } from '../assets/data';
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
                        <div className="main__content--wrapper flex mb-2.5">
                            <div className="content-left">
                                <div className="title mb-2.5">
                                    <h2 className="font-bold text-3xl mt-2.5">{tour.name}</h2>
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
                            <div className="content-right"></div>
                        </div>
                    </div>
                    <div className="main__other"></div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}