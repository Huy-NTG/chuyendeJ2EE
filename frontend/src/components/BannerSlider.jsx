import React, { useState, useEffect } from 'react';

// Dữ liệu giả cho các slide banner
const bannerImages = [
    { id: 1, src: 'https://vietnamtouristvn.com/thumbs/1280x720x2/upload/product/maxresdefault-16757841233871805695951-6959.jpg', alt: 'Tour Thái Lan', link: '#' },
    { id: 2, src: 'https://owa.bestprice.vn/images/tours/large/tour-chau-au-5-nuoc-duc-luxembourg-phap-bi-ha-lan-9n8d-6572cdf08fed9-848x477.jpg', alt: 'Pháp', link: '#' },
    { id: 3, src: 'https://bizweb.dktcdn.net/100/539/761/files/du-lich-da-nang-cay-cau-vang.jpg?v=1742377468193', alt: 'Đà Nẵng', link: '#' },
];

export default function BannerSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToNext = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1
        );
    };

    // Để tự động chuyển slide, bạn có thể thêm useEffect và setInterval ở đây
// 👈 BƯỚC MỚI: Thêm useEffect để tự động chạy slide
    useEffect(() => {
        const intervalId = setInterval(() => {
            goToNext();
        }, 5000); // Tự động chuyển slide sau mỗi 5 giây (5000ms)

        // Dọn dẹp hàm khi component unmount
        return () => clearInterval(intervalId);
    }, [currentIndex]); // Chạy lại hiệu ứng khi currentIndex thay đổi (để reset timer nếu cần)
    // Hoặc [goToNext] nếu bạn muốn đảm bảo interval luôn sử dụng hàm goToNext mới nhất
    // Cách tốt nhất là truyền empty array [] nếu goToNext không thay đổi
    return (
        <div className="relative w-full overflow-hidden">
            {/* Vùng chứa các Slide */}
            <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {bannerImages.map((banner, ) => (
                    <div key={banner.id} className="min-w-full">
                        <a href={banner.link}>
                            <img 
                                src={banner.src} 
                                alt={banner.alt} 
                                className="w-full h-auto object-cover max-h-[450px]"
                            />
                        </a>
                    </div>
                ))}
            </div>

            {/* Mũi tên điều hướng (Arrows) */}
            <button 
                onClick={goToPrevious}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition z-10 hidden sm:block"
            >
                {'<'}
            </button>
            <button 
                onClick={goToNext}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition z-10 hidden sm:block"
            >
                {'>'}
            </button>

            {/* Chỉ báo (Dots) */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {bannerImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition ${
                            index === currentIndex ? 'bg-white' : 'bg-gray-400 hover:bg-gray-200'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}