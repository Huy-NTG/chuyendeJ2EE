import React from "react";
import "../styles/style.css";
import Header from "../components/Global/Header";
import Footer from "../components/Global/Footer";
import BannerSlider from "../components/Home/BannerSlider";
import SearchWidget from "../components/Home/SearchWidget";
import FavouritePlace from "../components/Home/FavouritePlace";
import TourSlider from "../components/Home/TourSlider";
import HotelSlider from "../components/Home/HotelSlider";

export default function HomePage(){
    return (
        <div>
            <Header></Header>
            <div className="main">
                <BannerSlider></BannerSlider>
                <SearchWidget />
                <TourSlider/>
                <FavouritePlace></FavouritePlace>
                <HotelSlider></HotelSlider>
            </div>
            <Footer></Footer>

        </div>
    );
}