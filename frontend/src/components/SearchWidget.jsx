// src/components/SearchWidget.jsx
import React, { useState } from 'react';
// Nếu bạn sử dụng icon (ví dụ: react-icons), hãy import ở đây

const SearchWidget = () => {
  // State quản lý tab đang hoạt động: 'Tour', 'Hotel', 'Flight', 'Combo'
  const [activeTab, setActiveTab] = useState('Tour'); 
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [budget, setBudget] = useState('0');

  const tabs = ['Tour', 'Khách sạn', 'Vé máy bay', 'Combo'];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Đang tìm kiếm ${activeTab}...`);
    console.log('Thông tin tìm kiếm:', { destination, startDate, budget });
    // Nơi đây sẽ là logic gọi API để lấy kết quả tìm kiếm
  };

  // Hàm render các trường input khác nhau cho mỗi tab
  const renderSearchFields = () => {
    switch (activeTab) {
      case 'Tour':
        return (
          <div className="flex flex-wrap items-end gap-4 p-6 bg-white rounded-b-lg shadow-lg">
            
            {/* Input 1: Điểm đến */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Bạn muốn đi đâu?*</label>
              <input
                type="text"
                placeholder="Nhập tên điểm đến"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Input 2: Ngày đi */}
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Ngày đi</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Input 3: Ngân sách */}
            <div className="flex-1 min-w-[150px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Ngân sách</label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
              >
                <option value="0">Chọn mức giá</option>
                <option value="3000000">Dưới 3 triệu</option>
                <option value="7000000">3 - 7 triệu</option>
                <option value="15000000">7 - 15 triệu</option>
                <option value="99999999">Trên 15 triệu</option>
              </select>
            </div>
            
            {/* Nút Tìm kiếm */}
            <button 
              type="submit"
              className="h-[46px] px-8 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition min-w-[120px]"
            >
              Tìm kiếm
            </button>
          </div>
        );
      case 'Khách sạn':
        return <div className="p-6 bg-white rounded-b-lg shadow-lg">Khách sạn: [Trường check-in/check-out, Số lượng khách]</div>;
      case 'Vé máy bay':
        return <div className="p-6 bg-white rounded-b-lg shadow-lg">Vé máy bay: [Trường Điểm đi/Đến, Ngày đi/về]</div>;
      case 'Combo':
        return <div className="p-6 bg-white rounded-b-lg shadow-lg">Combo: [Trường Điểm đến, Ngày đi, Khách sạn]</div>;
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSearch}>
      {/* Tab Navigation */}
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
      
      {/* Form Input Fields */}
      {renderSearchFields()}
      
    </form>
  );
};

export default SearchWidget;