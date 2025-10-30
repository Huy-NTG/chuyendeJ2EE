import React from "react";
import "../styles/style.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BannerSlider from "../components/BannerSlider";
import SearchWidget from "../components/SearchWidget";
import FavouritePlace from "../components/FavouritePlace";
import TourSlider from "../components/TourSlider";
import TourList from "../components/TourList";

export default function HomePage(){
    return (
        <div>
            <Header></Header>
            <div className="main flex-grow">
                <BannerSlider></BannerSlider>
                <div className="container mx-auto p-4 sm:p-6 lg:px-8 -mt-20 z-10 relative"> 
                    <SearchWidget />
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