import React from "react";
// import "../styles/reset.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BannerSlider from "../components/BannerSlider";
import TourList from "../components/TourList";
import SearchWidget from "../components/SearchWidget";

export default function HomePage(){
    return (
        <div>
            <Header></Header>
            <div className="main flex-grow">
                <BannerSlider></BannerSlider>
                <div className="container mx-auto p-4 sm:p-6 lg:px-8 -mt-20 z-10 relative"> 
                    <SearchWidget />
                </div>
                <div className="py-10">
                    <TourList />
                </div>
            </div>
            <Footer></Footer>

        </div>
    );
}