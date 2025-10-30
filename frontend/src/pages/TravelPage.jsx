import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { searchTours } from "../services/tourService";
import TourList from "../components/TourList";
import Header from "../components/Header";
import Footer from "../components/Footer";


export default function TravelPage(){
    const [tours, setTours] = useState([]);
    const { location } = useParams();
    useEffect(() => {
        const fetchTour = async () => {
            try {
                const res = await searchTours(location);
                setTours(res.data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách tour: ", error);
            }
        };
        fetchTour();
    },[location]);

    return (
        <div>
            <Header></Header>
            <div className="main flex justify-center items-center p-5">
                <div className="main--wrapper w-10/12">
                    <div className="header p-5 justify-center items-center">
                        <div className="header--wrapper">
                            <div className="title">
                                <h2 className="flex justify-center items-center font-bold text-4xl text-blue-800">DU LỊCH {location.toLocaleUpperCase()}</h2>
                            </div>
                            <div className="description">
                                <p></p>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="content--wrapper">
                            <div className="content-left">
                                <TourList tours={tours}/>
                            </div>
                            <div className="content-right"></div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}