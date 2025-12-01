import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';
import { note } from '../assets/data/Tour';
import Footer from '../components/Global/Footer';
import Note from '../components/Tour/Note';
import { bookTour, createMoMoPayment } from '../services/bookingService';
import { formatCurrency } from '../utils/formatCurrency';

Modal.setAppElement('#root'); // accessibility

export default function TourDetailPage() {
    const { id } = useParams();
    const [tour, setTour] = useState(null);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [qrUrl, setQrUrl] = useState('');
    const [bookingId, setBookingId] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("authToken");

        if (storedUser && token) {
            setUser(storedUser); // giờ setUser đã có
        }
    }, []);

    // Lấy chi tiết tour
    useEffect(() => {
        const fetchTour = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/tours/${id}`);
                setTour(res.data);
            } catch (error) {
                console.error("Lỗi khi lấy chi tiết tour:", error);
            }
        };
        fetchTour();
    }, [id]);

    // useEffect 2: check login từ localStorage
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("authToken");

        if (storedUser && token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(storedUser);
        } else {
            setUser(null);
        }
    }, []);

    // Sau cùng mới return
    if (!tour) return <div className="text-center mt-10">Đang tải...</div>;

    // handleBooking giữ nguyên
    // const handleBooking = async () => {
    //     setLoading(true);
    //     try {
    //         if (!user) throw new Error("Vui lòng đăng nhập để đặt tour.");

    //         const bookingData = {
    //             userId: user.id,
    //             serviceType: "TOUR",
    //             serviceId: id,
    //             bookingDate: new Date(),
    //             totalPrice: tour.price,
    //             status: "PENDING"
    //         };

    //         const bookingRes = await bookTour(bookingData);
    //         setBookingId(bookingRes.id);

    //         const qr = await createMoMoPayment(bookingRes.id);
    //         setQrUrl(qr);

    //         setModalOpen(true);
    //     } catch (error) {
    //         console.error("Lỗi đặt tour:", error);
    //         alert(error.message || "Đặt tour thất bại. Vui lòng thử lại.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const handleBooking = async () => {
        setLoading(true);
        try {
            if (!user) throw new Error("Vui lòng đăng nhập để đặt tour.");

            const bookingData = {
                userId: user.id,
                serviceType: "TOUR",
                serviceId: id,
                bookingDate: new Date(),
                totalPrice: tour.price,
                status: "PENDING"
            };

            // Tạo booking trước
            const bookingRes = await bookTour(bookingData);
            setBookingId(bookingRes.id);

            // Gọi backend tạo payment MoMo
            const momoRes = await createMoMoPayment(bookingRes.id);

            // Lấy payUrl từ response
            const payUrl = momoRes.payUrl;
            if (!payUrl) throw new Error("Không lấy được link thanh toán MoMo.");

            // Chuyển trình duyệt sang trang MoMo
            window.location.href = payUrl;

        } catch (error) {
            console.error("Lỗi đặt tour:", error);
            alert(error.message || "Đặt tour thất bại. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* <Header /> */}
            <div className='main flex justify-center'>
                <div className="main--wrapper w-10/12">
                    <div className="main__content">
                        <div className="main__content--wrapper flex mb-2.5 justify-between gap-5">

                            {/* Content left */}
                            <div className="content-left">
                                <div className="title my-5 h-[80px]">
                                    <h2 className="font-bold text-3xl mt-2.5">{tour.name}</h2>
                                </div>
                                <div className="img my-5 w-[800px] h-[460px]">
                                    <img className="w-full h-full object-cover shadow-lg" src={tour.imageUrl} alt={tour.name} />
                                </div>

                                {/* Thông tin thêm */}
                                <div className="more-infor my-5">
                                    <h2 className='flex justify-center font-bold text-3xl mb-5'>THÔNG TIN THÊM VỀ CHUYẾN ĐI</h2>
                                    <div className='more-infor__content mt-5 grid grid-cols-3 grid-rows-2 gap-2 gap-y-10 text-[18px] leading-6 px-4'>
                                        <div className="sightseeing">
                                            <i className='fa-solid fa-map text-blue-800 text-3xl'></i>
                                            <h2 className='font-bold m-1'>Điểm tham quan</h2>
                                            <p>{tour.description}</p>
                                        </div>
                                        <div className="food">
                                            <i className='fa-solid fa-utensils text-blue-800 text-3xl'></i>
                                            <h2 className='font-bold m-1'>Ẩm thực</h2>
                                            <p>Theo thực đơn</p>
                                        </div>
                                        <div className="suitable-object">
                                            <i className='fa-solid fa-people-group text-blue-800 text-3xl'></i>
                                            <h2 className='font-bold m-1'>Đối tượng thích hợp</h2>
                                            <p>Người lớn tuổi, trẻ nhỏ, gia đình nhiều thế hệ</p>
                                        </div>
                                        <div className="ideal-time">
                                            <i className='fa-solid fa-alarm-clock text-blue-800 text-3xl'></i>
                                            <h2 className='font-bold m-1'>Thời gian lí tưởng</h2>
                                            <p>Quanh năm</p>
                                        </div>
                                        <div className="vehicle">
                                            <i className='fa-solid fa-truck-plane text-blue-800 text-3xl'></i>
                                            <h2 className='font-bold m-1'>Phương tiện</h2>
                                            <p>Xe du lịch, máy bay</p>
                                        </div>
                                        <div className="promotion">
                                            <i className='fa-solid fa-tags text-blue-800 text-3xl'></i>
                                            <h2 className='font-bold m-1'>Khuyến mãi</h2>
                                            <p>Đã bao gồm ưu đãi trong giá tour</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Note */}
                                <div className="note">
                                    <h2 className='flex justify-center font-bold text-3xl mb-5'>NHỮNG THÔNG TIN CẦN LƯU Ý</h2>
                                    <div className='note__content grid grid-cols-2 text-[18px] gap-x-2.5'>
                                        {note.map((item, index) => (
                                            <Note item={item} key={index}></Note>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Content right */}
                            <div className="content-right">
                                <div className="content-right--wrapper p-5 sticky top-10 right-10 shadow-lg w-[400px] rounded-2xl">
                                    <div className="price my-2">
                                        <p className='font-semibold text-2xl mb-2'>Giá:</p>
                                        <h2 className='font-semibold text-4xl text-red-600 inline'>{formatCurrency(tour.price)}</h2>
                                        <span className='text-2xl'>/Khách</span>
                                    </div>
                                    <div className="infor flex flex-col gap-5 text-xl my-2">
                                        <p>
                                            <i className='fa-solid fa-ticket'></i> Mã tour: <span className='font-semibold text-blue-600'>{tour.id}</span>
                                        </p>
                                        <p>
                                            <i className='fa-solid fa-location-dot'></i> Khởi hành: <span className='font-semibold text-blue-600'>{tour.location}</span>
                                        </p>
                                        <p>
                                            <i className='fa-solid fa-plane-departure'></i> Ngày bắt đầu: <span className='font-semibold text-blue-600'>{tour.startDate}</span>
                                        </p>
                                        <p>
                                            <i className='fa-solid fa-clock-rotate-left'></i> Ngày kết thúc: <span className='font-semibold text-blue-600'>{tour.endDate}</span>
                                        </p>
                                        <p>
                                            <i className='fa-solid fa-person'></i> Số chỗ: <span className='font-semibold text-blue-600'>{tour.seats}</span>
                                        </p>
                                    </div>
                                    <div className="button mt-7">
                                        <button
                                            onClick={handleBooking}
                                            disabled={loading}
                                            className='text-white bg-red-600 w-full font-bold text-2xl p-2 rounded-2xl hover:bg-red-900'
                                        >
                                            {loading ? "Đang xử lý..." : "Đặt ngay"}
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
