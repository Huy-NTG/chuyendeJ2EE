import {  useEffect, useState } from "react"
import FlightItem from "./FlightItem"
import { getAllFlights } from "../../services/flightService";

export default function FlightItemList({departure,arrival,airline,onCountChange,sort,startDate,guests}){
    const [allFlights, setAllFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterFlights, setFilterFlights] = useState([]);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await getAllFlights();
                setAllFlights(response.data);
            } catch (error) {
                console.error("Lỗi khi tải danh sách chuyến bay: ",error);
            } finally {
                setLoading(false);
            }
        };
        fetchFlights();
    },[]);

    useEffect(() => {
        let flightsToDisplay = [...allFlights];
        if (departure)
            flightsToDisplay = flightsToDisplay.filter(flight => 
        String(flight.fromLocation).toLocaleLowerCase() === String(departure).toLocaleLowerCase());
        if (arrival)
            flightsToDisplay = flightsToDisplay.filter(flight => 
        String(flight.toLocation).toLocaleLowerCase() === String(arrival).toLocaleLowerCase());
        if (airline && airline.length > 0)
            flightsToDisplay = flightsToDisplay.filter(flight => 
                airline.map(a => a.toLocaleLowerCase()).includes(String(flight.airline).toLocaleLowerCase())
            );
        if (startDate) {
            const selectedDateTimestamp = new Date(startDate);
            selectedDateTimestamp.setHours(0, 0, 0, 0); 
            const normalizedSelectedDate = selectedDateTimestamp.getTime(); 
            flightsToDisplay = flightsToDisplay.filter((flight) => {
                const flightDate = new Date(flight.departureTime);
                flightDate.setHours(0, 0, 0, 0); 
                const normalizedFlightDate = flightDate.getTime(); 
                return normalizedFlightDate === normalizedSelectedDate;
            });
        }
        if (sort === "date")
            flightsToDisplay.sort((a,b) => Date(a.startDate) - new Date(b.startDate));
        else if (sort === "price-asc")
            flightsToDisplay.sort((a,b) => a.price - b.price);
        else if (sort === "price-desc")
            flightsToDisplay.sort((a,b) => b.price - a.price);
        setFilterFlights(flightsToDisplay);
        onCountChange(flightsToDisplay.length);
    },[allFlights,departure,arrival,airline,sort]);
    if (loading)
        return <div className="text-center text-gray-500 py-10">Đang tải chuyến bay...</div>;
    if (filterFlights.length === 0){
        return(
            <div className="text-center text-red-500 py-10 text-xl font-semibold">
                Không tìm thấy chuyến bay nào phù hợp với điều kiện lọc của quý khách. 😢
            </div>
        )
    }
    return (
        <div className="container mx-auto px-4">
            <div className="w-full">
                {filterFlights.map(flight => (
                    <FlightItem key={flight.id} guests={guests} flight={flight}/>
                ))}
            </div>
        </div>
    )
}