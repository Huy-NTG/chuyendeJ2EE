import { Link, useParams, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/Global/Header";
import Footer from "../components/Global/Footer";
import { placeSlug } from "../assets/data/Tour";
import { useEffect, useState } from "react";
import { getAllFlights } from "../services/flightService";
import FlightItemList from "../components/Flight/FlightItemList";

export default function FlightPage(){
    const navigate = useNavigate();
    const { departure, arrival} = useParams();
    const [allFlights, setAllFlights] = useState([]);
    const [countChange, setCountChange] = useState(0);
    const [searchParams] = useSearchParams();
    const [selectedDeparture, setSelectedDeparture] = useState('');
    const [selectedArrival, setSelectedArrival] = useState('');
    const [selectedAirlines, setSelectedAirlines] = useState([]);

    const intialStartDaTe = searchParams.get('startDate');
    const intialGuests = searchParams.get('guests');
    const [selectedStartDate, setSelectedStartDate] = useState(intialStartDaTe);
    const [guests] = useState(intialGuests || 1);

    const [sortOption, setSortOption] = useState('date');
    
    const getLocationName = (slug) => {
        return placeSlug[slug] || 
            slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };
    const displayDeparture = getLocationName(departure);
    const displayArrival = getLocationName(arrival);
    const updateUrlAndNavigate = (key, value) => {
        const newSearchParams = new URLSearchParams(searchParams);
        if (value)
            newSearchParams.set(key, value);
        else
            newSearchParams.delete(key);
        navigate(`/flights/location/${departure}/${arrival}?${newSearchParams.toString()}`);
    };
    const handleChangeSelectedArrival = (event) => {
        const newLocationName = event.target.value;
        console.log("đây là điểm đến:",newLocationName);
        setSelectedArrival(newLocationName);
        if (newLocationName){
            const newSearchParams = new URLSearchParams(searchParams);
            navigate(`/flights/location/${departure}/${newLocationName}?${newSearchParams.toString()}`);
        }
    };
    const handleChangeSelectedDeparture = (event) => {
        const newLocationName = event.target.value;
        console.log("đây là điểm xuất phát:",newLocationName);
        setSelectedDeparture(newLocationName);
        if (newLocationName){
            const newSearchParams = new URLSearchParams(searchParams);
            navigate(`/flights/location/${newLocationName}/${arrival}?${newSearchParams.toString()}`);
        }
    };
    const handleChangeSelectedStartDate = (event) => {
        const newValue = event.target.value;
        setSelectedStartDate(newValue);
        updateUrlAndNavigate('startDate', newValue); // 👈 TỰ ĐỘNG ÁP DỤNG
    };
    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await getAllFlights();
                console.log(response.data);
                setAllFlights(response.data);
            } catch (error) {
                console.error("Lỗi khi tải danh sách chuyến bay: ",error);
            }
        };
        fetchFlights();
    },[]);

    const handleAirlineChange = (event) => {
        const airlineName = event.target.value;
        const isChecked = event.target.checked;
        
        const newSelectedAirlines = isChecked
            ? [...selectedAirlines, airlineName] 
            : selectedAirlines.filter((a) => a !== airlineName); 
        setSelectedAirlines(newSelectedAirlines);
    };

    const arrayDepartureLocations = allFlights.filter(flight => flight.fromLocation).map(flight => flight.fromLocation);
    const uniqueSetDeparture = new Set(arrayDepartureLocations);
    const arraySelectedDepartureLocations = [...uniqueSetDeparture];

    const arrayArrivalLocations = allFlights.filter(flight => flight.toLocation).map(flight => flight.toLocation);
    const uniqueSetArrival = new Set(arrayArrivalLocations);
    const arraySelectedArrivalLocations = [...uniqueSetArrival];

    const arrayAirnine = allFlights.filter(flight => flight.airline).map(flight => flight.airline);
    const uniqueSetAirline = new Set(arrayAirnine);
    const arraySelectedAirlines = [...uniqueSetAirline];
    return (
        <div>
            <Header></Header>
            <div className="main flex justify-center items-center p-5">
                <div className="main--wrapper w-10/12">
                    <div className="header p-5 justify-center items-center">
                        <div className="header--wrapper">
                            <div className="title mb-10">
                                <h2 className="flex justify-center items-center font-bold text-4xl text-blue-800">CHUYẾN BAY TỪ {displayDeparture.toLocaleUpperCase()} ĐẾN {displayArrival.toLocaleUpperCase()}</h2>
                            </div>
                            <div className="description flex justify-center">
                                <div className="w-6xl h-32 rounded-2xl shadow-[0__0_5px_1px_gray] p-5">
                                    <h2 className="text-blue-800 font-semibold text-xl mb-2">Thông tin chuyến bay:</h2>
                                    <div className="flex justify-between items-center text-xl">
                                        <p><i className="fa-solid fa-location"></i> Từ: {displayDeparture}</p>
                                        <p><i className="fa-solid fa-location"></i> Đến: {displayArrival}</p>
                                        <p><i className="fa-solid fa-calendar"></i> Ngày đi: {selectedStartDate}</p>
                                        <p><i className="fa-solid fa-people-group"></i> Số người: {guests}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="content--wrapper flex justify-between">
                            <div className="content-right w-[400px]">
                                <div className="content-right--wrapper sticky top-10">
                                    <h2 className="font-bold text-2xl">BỘ LỌC TÌM KIẾM</h2>
                                    <div className="main__content bg-gray-100 p-5">
                                        <div className="price mb-2">
                                        </div><div className="departure mb-2">
                                            <p className="font-semibold text-[18px]">Điểm xuất phát</p>
                                            <div className="departure">
                                                <select name="diemXuatPhat" id="diemXuatPhat"  value={selectedDeparture}
                                                    onChange={handleChangeSelectedDeparture} 
                                                    className="block w-full p-2 border border-gray-300 rounded-md">
                                                    <option value="" disabled>Chọn điểm xuất phát</option> 
                                                    {
                                                        arraySelectedDepartureLocations.map((value,index) => (
                                                        <option key={index} value={value}>{value}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="arrival mb-2">
                                            <p className="font-semibold text-[18px]">Điểm đến</p>
                                            <div className="arrival__section">
                                                <select name="diemDen" id="diemDen" value={selectedArrival}
                                                    onChange={handleChangeSelectedArrival} 
                                                    className="block w-full p-2 border border-gray-300 rounded-md">
                                                    <option value="" disabled>Chọn điểm đến</option> 
                                                    {
                                                        arraySelectedArrivalLocations.map((value,index) => (
                                                        <option key={index} value={value}>{value}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="mb-2">
                                            <p className="font-semibold text-[18px]">Hãng bay</p>
                                            <div className="">
                                                {arraySelectedAirlines.map((airline) => (
                                                    <div key={airline} className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            id={`airline-${airline}`}
                                                            name="airline"
                                                            value={airline} 
                                                            checked={selectedAirlines.includes(airline)} 
                                                            onChange={handleAirlineChange}
                                                            className="w-5 h-5 text-blue-600 cursor-pointer"
                                                        />
                                                        <p className="pl-2">{airline}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="start-date">
                                            <p className="font-semibold text-[18px]">Ngày khởi hành</p>
                                            <div className="start-date__input">
                                                <input 
                                                    onChange={handleChangeSelectedStartDate}
                                                    value={selectedStartDate}
                                                    className="w-full h-[45px] border-2 border-gray-300 rounded-md" type="date"></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="content-left flex-1 min-w-0">
                                <div className="content-left--wrapper flex justify-between">
                                    <h2 className="font-semibold text-xl">Chúng tôi tìm thấy <span className="text-blue-600 text-3xl">{countChange}</span> chuyến bay cho quý khách</h2>
                                    <div className="flex items-center">
                                        <h2 className="font-semibold text-xl mr-2">Sắp xếp theo</h2>
                                        <select onChange={(e) => setSortOption(e.target.value)} name="sort" className="block p-2 border border-gray-300 rounded-md ">
                                            <option value="date" defaultValue>Thời gian xuất phát sớm nhất</option>
                                            <option value="price-asc">Giá từ thấp đến cao</option>
                                            <option value="price-desc">Giá từ cao đến thấp</option>
                                        </select>
                                    </div>
                                </div>
                                <FlightItemList
                                    sort={sortOption} 
                                    departure={displayDeparture} 
                                    arrival={displayArrival} 
                                    airline={selectedAirlines}
                                    startDate={selectedStartDate}
                                    guests={guests}
                                    onCountChange={setCountChange}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}