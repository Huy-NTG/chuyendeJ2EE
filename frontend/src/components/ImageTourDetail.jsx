import React, { useState } from "react";

// Dữ liệu ảnh mẫu (Placeholder Images) - Được export để có thể dùng trong TourDetail
export const MOCK_IMAGES = [
  'https://bizweb.dktcdn.net/100/539/761/files/du-lich-da-nang-cay-cau-vang.jpg?v=1742377468193',
  'https://bizweb.dktcdn.net/100/539/761/files/du-lich-da-nang-cay-cau-vang.jpg?v=1742377468193',
  'https://bizweb.dktcdn.net/100/539/761/files/du-lich-da-nang-cay-cau-vang.jpg?v=1742377468193',
  'https://bizweb.dktcdn.net/100/539/761/files/du-lich-da-nang-cay-cau-vang.jpg?v=1742377468193',
  'https://bizweb.dktcdn.net/100/539/761/files/du-lich-da-nang-cay-cau-vang.jpg?v=1742377468193',
  'https://bizweb.dktcdn.net/100/539/761/files/du-lich-da-nang-cay-cau-vang.jpg?v=1742377468193',
];

// Giới hạn số lượng ảnh nhỏ hiển thị trước khi chuyển sang overlay
const MAX_VISIBLE_THUMBNAILS = 4;

// Component Thumbnail - Hiển thị ảnh nhỏ và logic overlay (+X)
const Thumbnail = ({ image, index, isLast, remainingCount, mainImage, setMainImage }) => {
    const isOverlayThumbnail = isLast && remainingCount > 0;
    
    // Tạo lớp phủ (Overlay) cho ảnh cuối cùng
    const Overlay = () => (
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg text-white font-bold text-sm pointer-events-none">
        +{remainingCount}
      </div>
    );

    const isActive = image === mainImage;

    return (
      <div 
        // Đảm bảo chiều cao cố định cho ảnh nhỏ và hiệu ứng hover
        className={`relative w-full h-20 sm:h-24 cursor-pointer transition duration-300 ${isActive ? 'ring-4 ring-indigo-500 ring-offset-2' : 'hover:opacity-80'}`}
        onClick={() => setMainImage(image)}
      >
        <img 
          src={image} 
          alt={`Thumbnail ${index + 1}`} 
          className="w-full h-full object-cover rounded-lg"
          // Fallback image in case the URL fails
          onError={(e) => { e.target.src = 'https://placehold.co/100x100/ef4444/ffffff?text=Loi' }}
        />
        {isOverlayThumbnail && <Overlay />}
      </div>
    );
};

// Component chính: TourImageGallery - Chịu trách nhiệm hiển thị gallery ảnh
const TourImageGallery = ({ images }) => {
    
    // Thêm kiểm tra an toàn cho mảng images (Sửa lỗi 'Cannot read properties of undefined')
    if (!images || images.length === 0) {
        return (
            <div className="flex items-center justify-center h-64 w-full bg-gray-100 border border-dashed rounded-xl text-gray-500 text-center p-4">
                Hình ảnh tour đang được tải hoặc không có sẵn.
            </div>
        );
    }

    // Logic quản lý trạng thái ảnh chính và tính toán ảnh dư
    const [mainImage, setMainImage] = useState(images[0]);
    const remainingCount = images.length - MAX_VISIBLE_THUMBNAILS;
    const visibleThumbnails = images.slice(0, MAX_VISIBLE_THUMBNAILS);

    return (
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            
            {/* Cột 1: Ảnh Nhỏ (Thumbnails) - Chiếm 1/6 (col-span-1) */}
            <div className="img-left flex md:flex-col space-x-3 md:space-x-0 md:gap-3 overflow-x-auto md:overflow-y-hidden md:col-span-1">
                {visibleThumbnails.map((image, index) => (
                    <Thumbnail 
                        key={index}
                        image={image}
                        index={index}
                        isLast={index === MAX_VISIBLE_THUMBNAILS - 1 && remainingCount > 0}
                        remainingCount={remainingCount}
                        mainImage={mainImage}
                        setMainImage={setMainImage}
                    />
                ))}
            </div>

            {/* Cột 2: Ảnh Lớn Chính - Chiếm 5/6 (col-span-5) */}
            <div className="img-right md:col-span-5 relative rounded-xl overflow-hidden shadow-lg bg-gray-200">
                <img 
                    src={mainImage} 
                    alt="Ảnh Chính Tour" 
                    className="w-full h-full object-cover aspect-[4/3] transition-opacity duration-500"
                    onError={(e) => { e.target.src = 'https://placehold.co/800x600/ef4444/ffffff?text=Loi+Tai+Anh' }}
                />
                <div className="absolute top-0 right-0 bg-indigo-600/90 text-white px-3 py-1 text-xs rounded-bl-lg font-semibold">
                    {`Tổng cộng ${images.length} ảnh`}
                </div>
            </div>
        </div>
    );
};
export default TourImageGallery;
