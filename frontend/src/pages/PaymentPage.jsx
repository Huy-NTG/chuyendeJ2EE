import Header from "../components/Global/Header";
import Footer from "../components/Global/Footer";
import FlightPayment from "../components/Payment/FlightPayment";
import TourPayment from "../components/Payment/TourPayment";
import HotelPayment from "../components/Payment/HotelPayment";

import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";

export default function PaymentPage(){
    const { type } = useParams();
    const [titlePayment, setTitlePayment] = useState("");
    useEffect(() => {
        let title = "";
        switch (type) {
            case 'tour':
                title = "tour du lịch";
                break;
            case 'hotel':
                title = "khách sạn";
                break;
            case 'flight':
                title = "chuyến bay";
                break;
            default:
                title = "";
                break;
        }
        setTitlePayment(title);
    }, [type]);
    const renderPaymentContent = () => {
        switch (type) {
            case 'tour':
                return <TourPayment />; 
            case 'hotel':
                return <HotelPayment/>
            case 'flight':
                return <FlightPayment/>
            default:
                return <div className="text-xl p-10 text-red-500">Loại thanh toán không hợp lệ.</div>;
        }
    }
    return (
        <div>
            <Header></Header>
            <div className="main flex justify-center items-center p-5">
                <div className="main--wrapper w-10/12">
                    <div className="header p-5 justify-center items-center">
                        <div className="header--wrapper">
                            <div className="title">
                                <h2 className="flex justify-center items-center font-bold text-4xl text-blue-800">
                                    THANH TOÁN ĐẶT {titlePayment ? titlePayment.toLocaleUpperCase() : ''}
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        {renderPaymentContent()}
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}