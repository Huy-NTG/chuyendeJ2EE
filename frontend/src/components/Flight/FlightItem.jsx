import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";

export default function FlightItem({ flight,guests }) {
    const departureDate = new Date(flight.departureTime);
    const arrivalDate = new Date(flight.arrivalTime);

    const formattedDepartureTime = departureDate.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const formattedArrivalTime = arrivalDate.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    
    const formattedDepartureDate = departureDate.toLocaleDateString('vi-VN');
    const isNextDayArrival = departureDate.getDate() !== arrivalDate.getDate();

    const durationMs = arrivalDate.getTime() - departureDate.getTime();
    const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
    const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    const formattedDuration = `${durationHours}h ${durationMinutes}m`;

    return (
        <div className="border border-gray-200 rounded-lg p-4 my-4 shadow-sm hover:shadow-md transition duration-200 ease-in-out bg-white">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-8 flex-1">
                    <div className="text-center w-[120px]">
                        <p className="text-3xl font-extrabold text-blue-700">{formattedDepartureTime}</p>
                        <p className="text-sm text-gray-500 font-semibold mt-1">{flight.fromLocation}</p>
                        <p className="text-xs text-gray-400 mt-1">{formattedDepartureDate}</p>
                    </div>
                    <div className="flex flex-col items-center min-w-[150px]">
                        <p className="text-sm text-gray-500 mb-1 font-semibold">
                            {formattedDuration}
                        </p>
                        <div className="w-full h-1 bg-gray-300 relative">
                            <div className="absolute top-1/2 left-0 w-3 h-3 bg-blue-500 rounded-full transform -translate-y-1/2"></div>
                            <div className="absolute top-1/2 right-0 w-3 h-3 bg-blue-500 rounded-full transform -translate-y-1/2"></div>
                            <svg className="absolute right-0 top-1/2 w-4 h-4 text-blue-500 transform -translate-y-1/2 translate-x-1/2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Bay thẳng</p>
                        {isNextDayArrival && (
                            <p className="text-xs text-red-500 mt-1 font-semibold">Đến ngày hôm sau</p>
                        )}
                    </div>
                    <div className="text-center w-[120px]">
                        <p className="text-3xl font-extrabold text-blue-700">{formattedArrivalTime}</p>
                        <p className="text-sm text-gray-500 font-semibold mt-1">{flight.toLocation}</p>
                         <p className="text-xs text-gray-400 mt-1">
                            {isNextDayArrival ? `(${arrivalDate.toLocaleDateString('vi-VN')})` : ''}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-10 pl-6 border-l border-gray-100 min-w-[300px] justify-end">
                    <div className="flex flex-col items-start">
                        <p className="text-xl font-semibold text-gray-700">{flight.airline}</p>
                    </div>
                    <div className="flex flex-col items-end">
                        <p className="text-2xl font-bold text-red-600 mb-2">
                            {formatCurrency(flight.price)}
                        </p>
                        <Link to={`/payment/flight?flightId=${flight.id}&from=${flight.fromLocation}&to=${flight.toLocation}$startDate=${flight.departureTime}&guests=${guests}`}>
                            <button className="bg-red-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-800 transition duration-150 shadow-md">
                                Chọn vé
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}