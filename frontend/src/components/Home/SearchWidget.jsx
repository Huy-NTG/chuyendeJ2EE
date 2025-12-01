// src/components/SearchWidget.jsx
import React, { useState } from 'react';

export default function SearchWidget(){
    // State quản lý tab đang hoạt động: 'Tour', 'Khách sạn', 'Vé máy bay', 'Combo'
    const [activeTab, setActiveTab] = useState('Tour');
    
    // State cho Tour
    const [destination, setDestination] = useState('');
    const [startDate, setStartDate] = useState('');
    const [budget, setBudget] = useState('0');

    // State cho Khách sạn
    const [hotelLocation, setHotelLocation] = useState('');
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [guests, setGuests] = useState('1'); // Số khách

    // State cho Vé máy bay
    const [departureLocation, setDepartureLocation] = useState('');
    const [arrivalLocation, setArrivalLocation] = useState('');
    const [tripType, setTripType] = useState('Khứ hồi'); // 'Khứ hồi' hoặc 'Một chiều'
    const [flightGuests, setFlightGuests] = useState('1');

    const tabs = ['Tour', 'Khách sạn', 'Vé máy bay', 'Combo'];

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(`Đang tìm kiếm ${activeTab}...`);
        // Logic tìm kiếm sẽ sử dụng các state tương ứng với activeTab
        // (Bạn có thể mở rộng phần này sau)
    };

    const renderSearchFields = () => {
        const inputClass = "w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500";
        const labelClass = "block font-medium text-gray-700 mb-1 text-xl";
        const buttonClass = "h-[46px] px-8 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition min-w-[120px]";

        // Thẻ Button Submit chung cho tất cả các form
        const SearchButton = () => (
            <button 
                type="submit"
                className={buttonClass}
            >
                Tìm kiếm
            </button>
        );

        const requiredSpan = <span className='text-red-600 text-2xl'>*</span>;

        switch (activeTab) {
            case 'Tour':
                return (
                    <div className="flex flex-wrap items-end gap-4 p-6 bg-white rounded-b-lg shadow-lg">
                        <div className="flex-1 min-w-[200px]">
                            <label className={labelClass}>Bạn muốn đi đâu ? {requiredSpan}</label>
                            <input
                                type="text"
                                placeholder="Nhập tên điểm đến"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                className={inputClass}
                            />
                        </div>
                        <div className="flex-1 min-w-[150px]">
                            <label className={labelClass}>Ngày đi</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className={inputClass}
                            />
                        </div>
                        <div className="flex-1 min-w-[150px]">
                            <label className={labelClass}>Ngân sách</label>
                            <select
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                                className={`${inputClass} appearance-none bg-white`}
                            >
                                <option value="0">Chọn mức giá</option>
                                <option value="3000000">Dưới 3 triệu</option>
                                <option value="7000000">3 - 7 triệu</option>
                                <option value="15000000">7 - 15 triệu</option>
                                <option value="99999999">Trên 15 triệu</option>
                            </select>
                        </div>
                        <SearchButton />
                    </div>
                );

            case 'Khách sạn':
                return (
                    <div className="flex flex-wrap items-end gap-4 p-6 bg-white rounded-b-lg shadow-lg">
                        <div className="flex-2 min-w-[250px]">
                            <label className={labelClass}>Địa điểm {requiredSpan}</label>
                            <input
                                type="text"
                                placeholder="Nhập tên thành phố, khách sạn"
                                value={hotelLocation}
                                onChange={(e) => setHotelLocation(e.target.value)}
                                className={inputClass}
                            />
                        </div>
                        <div className="flex-1 min-w-[150px]">
                            <label className={labelClass}>Ngày nhận phòng</label>
                            <input
                                type="date"
                                value={checkInDate}
                                onChange={(e) => setCheckInDate(e.target.value)}
                                className={inputClass}
                            />
                        </div>
                        <div className="flex-1 min-w-[150px]">
                            <label className={labelClass}>Ngày trả phòng</label>
                            <input
                                type="date"
                                value={checkOutDate}
                                onChange={(e) => setCheckOutDate(e.target.value)}
                                className={inputClass}
                            />
                        </div>
                        <div className="flex-1 min-w-[100px]">
                            <label className={labelClass}>Số khách</label>
                            <input
                                type="number"
                                min="1"
                                value={guests}
                                onChange={(e) => setGuests(e.target.value)}
                                className={inputClass}
                            />
                        </div>
                        <SearchButton />
                    </div>
                );
            
            case 'Vé máy bay':
                return (
                    <div className="flex flex-wrap items-end gap-4 p-6 bg-white rounded-b-lg shadow-lg">
                        
                        {/* 1. KHỨ HỒI / MỘT CHIỀU */}
                        <div className="w-full mb-3 flex gap-4">
                            <label className="inline-flex items-center text-xl font-medium text-gray-700">
                                <input
                                    type="radio"
                                    name="tripType"
                                    value="Khứ hồi"
                                    checked={tripType === 'Khứ hồi'}
                                    onChange={(e) => setTripType(e.target.value)}
                                    className="form-radio h-5 w-5 text-blue-600"
                                />
                                <span className="ml-2">Khứ hồi</span>
                            </label>
                            <label className="inline-flex items-center text-xl font-medium text-gray-700">
                                <input
                                    type="radio"
                                    name="tripType"
                                    value="Một chiều"
                                    checked={tripType === 'Một chiều'}
                                    onChange={(e) => setTripType(e.target.value)}
                                    className="form-radio h-5 w-5 text-blue-600"
                                />
                                <span className="ml-2">Một chiều</span>
                            </label>
                        </div>

                        {/* 2. ĐIỂM ĐI VÀ ĐIỂM ĐẾN */}
                        <div className="flex-1 min-w-[200px]">
                            <label className={labelClass}>Từ {requiredSpan}</label>
                            <input
                                type="text"
                                placeholder="Thành phố hoặc sân bay"
                                value={departureLocation}
                                onChange={(e) => setDepartureLocation(e.target.value)}
                                className={inputClass}
                            />
                        </div>
                        <div className="flex-1 min-w-[200px]">
                            <label className={labelClass}>Đến {requiredSpan}</label>
                            <input
                                type="text"
                                placeholder="Thành phố hoặc sân bay"
                                value={arrivalLocation}
                                onChange={(e) => setArrivalLocation(e.target.value)}
                                className={inputClass}
                            />
                        </div>

                        {/* 3. NGÀY ĐI VÀ NGÀY VỀ (Có thể ẩn nếu chọn Một chiều) */}
                        <div className="flex-1 min-w-[150px]">
                            <label className={labelClass}>Ngày đi</label>
                            <input
                                type="date"
                                className={inputClass}
                            />
                        </div>
                        {tripType === 'Khứ hồi' && (
                            <div className="flex-1 min-w-[150px]">
                                <label className={labelClass}>Ngày về</label>
                                <input
                                    type="date"
                                    className={inputClass}
                                />
                            </div>
                        )}

                        {/* 4. SỐ KHÁCH */}
                        <div className="flex-1 min-w-[100px]">
                            <label className={labelClass}>Số khách</label>
                            <input
                                type="number"
                                min="1"
                                value={flightGuests}
                                onChange={(e) => setFlightGuests(e.target.value)}
                                className={inputClass}
                            />
                        </div>
                        <SearchButton />
                    </div>
                );
            
            case 'Combo':
                return <div className="p-6 bg-white rounded-b-lg shadow-lg">Combo: [Trường Điểm đến, Ngày đi, Khách sạn]</div>;
            
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:px-8 -mt-20 z-10 relative"> 
        <div className='flex justify-center'>
            <form onSubmit={handleSearch} className=' w-10/12'>
                <div className="flex bg-gray-100 rounded-t-lg p-2 shadow-md">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            type="button" // Ngăn chặn việc submit form khi click tab
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 font-semibold transition duration-150 ease-in-out ${
                                activeTab === tab
                                    ? 'bg-white text-blue-600 border-b-2 border-blue-600' // Tab active
                                    : 'text-gray-600 hover:bg-gray-200' // Tab inactive
                            } rounded-t-lg`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                {renderSearchFields()}
            </form>
        </div>
        </div>
    );
};
