import React from "react";
import "../styles/style.css";
import Header from "../components/Global/Header";
import Footer from "../components/Global/Footer";
import BannerSlider from "../components/Home/BannerSlider";
import SearchWidget from "../components/Home/SearchWidget";
import FavouritePlace from "../components/Home/FavouritePlace";
import TourSlider from "../components/Home/TourSlider";

export default function HomePage(){
    return (
        <div>
            <Header></Header>
            <div className="main flex-grow">
                <BannerSlider></BannerSlider>
                <div className="container mx-auto p-4 sm:p-6 lg:px-8 -mt-20 z-10 relative"> 
                    <SearchWidget />
                </div>
                <div className="fav__title mb-5 flex justify-center flex-col items-center">
                    <p className="flex justify-center text-4xl font-semibold text-blue-800 mb-5 relative pb-5">MỖI HÀNH TRÌNH - MỘT KỈ NIỆM ĐÁNG NHỚ
                        <span className="bottom-0 left-1/2 translate-x-[-50%] absolute w-6/12 bg-blue-800 h-[2px]"></span>
                    </p>
                    <p className="w-9/12 text-xl font-semibold leading-[35px]">Khám phá những hành trình độc đáo và tận hưởng dịch vụ du lịch chất lượng hàng đầu.
Với hệ thống tour phong phú, lịch trình linh hoạt và đội ngũ hỗ trợ tận tâm, chúng tôi cam kết mang đến cho bạn chuyến đi trọn vẹn nhất – từ khâu đặt tour đến khi trở về.
Hãy để chúng tôi đồng hành cùng bạn trên mọi nẻo đường khám phá thế giới!</p>
                </div>
                <div className="py-10 flex justify-center items-center p-5">
                    {/* <TourList></TourList> */}
                    <TourSlider/>
                </div>
                {/* Favourite place */}
                <FavouritePlace></FavouritePlace>
            </div>
            <Footer></Footer>

        </div>
    );
}