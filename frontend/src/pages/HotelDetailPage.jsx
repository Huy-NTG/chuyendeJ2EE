import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../components/Global/Footer";
import Header from "../components/Global/Header";
import { useEffect, useState } from "react";
import { getHotelById } from "../services/hotelService";
import RoomList from "../components/Hotel/RoomList";

export default function HotelDetailPage(){
    // const [selectedFilters, setSelectedFilters] = useState([]);
    const { id_hotel } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [ hotel, setHotel] = useState(null);
    
    const initialCheckIn = searchParams.get('checkInDate') || '';
    const initialCheckOut = searchParams.get('checkOutDate') || '';
    const initialGuestCount = searchParams.get('guests') || '1'; // Giữ là string cho input type="number"
    
    const [checkInDate, setCheckInDate] = useState(initialCheckIn);
    const [checkOutDate, setCheckOutDate] = useState(initialCheckOut);
    const [guestCount, setGuestCount] = useState(initialGuestCount);
    const updateSearchParams = (newCheckIn, newCheckOut, newGuests) => {
        const newSearchParams = new URLSearchParams(searchParams);
        
        // Cập nhật giá trị mới vào URL search parameters
        newSearchParams.set('checkInDate', newCheckIn);
        newSearchParams.set('checkOutDate', newCheckOut);
        newSearchParams.set('guests', newGuests);
        
        // Cập nhật URL (không reload trang)
        setSearchParams(newSearchParams, { replace: true });
    };

    // Hàm xử lý thay đổi ngày nhận phòng
    const handleCheckInChange = (e) => {
        const newCheckIn = e.target.value;
        setCheckInDate(newCheckIn);
        updateSearchParams(newCheckIn, checkOutDate, guestCount);
    };

    // Hàm xử lý thay đổi ngày trả phòng
    const handleCheckOutChange = (e) => {
        const newCheckOut = e.target.value;
        setCheckOutDate(newCheckOut);
        updateSearchParams(checkInDate, newCheckOut, guestCount);
    };

    // Hàm xử lý thay đổi số lượng khách
    const handleGuestCountChange = (e) => {
        const newGuests = e.target.value;
        // Đảm bảo giá trị là số dương
        const validGuests = Math.max(1, parseInt(newGuests) || 1).toString(); 
        setGuestCount(validGuests);
        updateSearchParams(checkInDate, checkOutDate, validGuests);
    };
    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const response = await getHotelById(id_hotel);
                console.log(response.data)
                setHotel(response.data);
            } catch (error) {
                console.error("Lỗi khi lấy chi tiết hotel: ",error);
            }
        };
        fetchHotel()
    },[id_hotel]);
    const roomListProps = {
        hotelId: id_hotel,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        guests: parseInt(guestCount) || 1, // Truyền sang dạng số cho RoomList
    };
     if (!hotel) return <div className="text-center mt-10">Đang tải...</div>;
    return (
        <div>
            <Header></Header>
            <div className="main p-10 box-border flex justify-center">
                <div className="main--wrapper w-10/12">
                    <div className="header">
                        <div className="header--wrapper">
                            <h2 className="font-bold text-3xl mt-2.5">{hotel.name}</h2>
                            <p className="text-xl"><i className="fa-solid fa-map"></i> {hotel.address}</p>
                        </div>
                        <div className="flex justify-between">
                            <div className="img my-5 ">
                                {hotel.images.map((img,index) => (
                                    <div key={index} className="mb-2.5">
                                        <img className="w-auto h-[460px] object-cover shadow-lg" src={img.imgUrl}></img>
                                        <p className="italic flex justify-center">{img.name}</p>
                                    </div>
                                ))}
                            </div>
                            {/* ✅ THAY ĐỔI: Thêm col-span-full để chiếm trọn 3 cột */}
                            <div className="description"> 
                                <div className="w-full max-w-6xl rounded-2xl shadow-[0__0_5px_1px_gray] p-5 sticky top-20 h-60"> 
                                    <h2 className="text-blue-800 font-semibold text-2xl mb-2">Thông tin khách sạn:</h2>
                                    {/* ✅ HIỂN THỊ INPUT CHO NGÀY THÁNG */}
                                    <div className="text-xl flex-col justify-between items-center space-y-4">
                                {/* Ngày nhận phòng */}
                                        <div className='flex items-center space-x-2'>
                                            <p><i className="fa-solid fa-calendar-check"></i> Ngày nhận phòng:</p>
                                            <input
                                                type="date"
                                                value={checkInDate}
                                                onChange={handleCheckInChange}
                                                required
                                                className="p-1 border border-gray-300 rounded text-base"
                                            />
                                        </div>
                                {/* Ngày trả phòng */}
                                        <div className='flex items-center space-x-2'>
                                            <p><i className="fa-solid fa-calendar"></i> Ngày trả phòng:</p>
                                            <input
                                                type="date"
                                                value={checkOutDate}
                                                onChange={handleCheckOutChange}
                                                required
                                                className="p-1 border border-gray-300 rounded text-base"
                                            />
                                        </div>
                                {/* Số người */}
                                        <div className='flex items-center space-x-2'> {/* ✅ KHU VỰC THAY THẾ CHO P CHỈ ĐỂ HIỂN THỊ */}
                                            <p><i className="fa-solid fa-people-group"></i> Số người:</p>
                                            <input
                                                type="number"
                                                value={guestCount}
                                                onChange={handleGuestCountChange}
                                                min="1"
                                                required
                                                className="p-1 border border-gray-300 rounded text-base w-20 text-center"
                                            />
                                        </div>
                                    </div>    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="navbar">
                        <div className="navbar--wrapper flex">
                            <div className="intro">
                                <div className="intro--wrapper">
                                    <div className="title">
                                        <h2>Giới thiệu</h2>
                                    </div>
                                    <div className="content">
                                        <p>{hotel.description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="map"></div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="content--wrapper">
                            <div className="title flex justify-center h-20 items-center">
                                <h2 className="font-bold text-3xl">DANH SÁCH PHÒNG</h2>
                            </div>
                            <div className="list-room">
                                <RoomList
                                    hotelId={roomListProps.hotelId}
                                    checkInDate={roomListProps.checkInDate}
                                    checkOutDate={roomListProps.checkOutDate}
                                    guests={roomListProps.guests}/>
                            </div>
                        </div>
                    </div>
                    <div className="footer flex justify-center items-center mt-5">
                        <div className="">
                            <h2 className="font-bold text-3xl mb-5 flex justify-center">QUY ĐỊNH CHỖ NGHỈ</h2>
                            <div className="border-2 border-blue-300 p-5 rounded-2xl text-xl">
                                <p className="font-bold">Trẻ em và giường phụ</p>
                                <p>Giường phụ tùy thuộc vào loại phòng bạn chọn, xin vui lòng kiểm tra thông tin phòng để biết thêm chi tiết.
                                <br/>
                                Tất cả trẻ em đều được chào đón.
                                </p>
                                <div className="flex h-46 leading-7 justify-between w-[1000px]">
                                    <div className="border-2 rounded-md border-blue-800">
                                        <p className="flex justify-center items-center font-bold bg-blue-800 text-white h-15"><i className="fa-solid fa-children"></i> Độ tuổi trẻ em: 0-0 tuổi</p>
                                        <p className="px-5">Ở miễn phí nếu sử dụng giường có sẵn</p>
                                        <p className="px-5">Nếu cần một giường phụ thì sẽ phụ thu thêm.</p>
                                    </div>
                                    <div className="border-2 rounded-md border-blue-800">
                                        <p className="flex justify-center items-center font-bold bg-blue-800 text-white h-15"><i className="fa-solid fa-people-group"></i> Những khách từ 4 tuổi trở lên tính là người lớn</p>
                                        <p className="px-5">Cần đặt thêm một giường phụ và sẽ phụ thu thêm.</p>
                                    </div>
                                </div>
                                <p className="font-bold">Quy định hủy phòng</p>
                                <p>Bất kỳ việc hủy phòng nào ghi nhận được trong vòng 10 ngày trước ngày đến sẽ phải trả phí cho toàn bộ thời gian ở. Không đến khách sạn hoặc chỗ nghỉ sẽ được giải quyết như là Vắng Mặt và sẽ phải trả một khoản tiền là 100% giá trị đặt phòng (Quy định của khách sạn)..</p>
                                <p className="font-bold">Quy định khác</p>
                                <ul className="list-disc pl-5">
                                    <li>Đối với đặt phòng trả tiền tại khách sạn, khách cần liên hệ chỗ nghỉ trước để xác nhận thời gian nhận phòng. Nếu không, chỗ nghỉ có thể bác bỏ việc đặt phòng.</li>
                                    <li>Khi đặt trên 5 phòng, chính sách và điều khoản bổ sung có thể được áp dụng.</li>
                                </ul>
                                <p className="font-bold text-red-500">Lưu ý của khách sạn</p>
                                <ul className=" list-disc pl-5">
                                    <li>Đối với khách nước ngoài, chỉ chấp nhận giấy tờ chứng minh nhân thân là hộ chiếu.</li>
                                    <li>Trẻ em từ 12 tuổi trở lên phải sử dụng Giường phụ với giá 900.000 VND/giường/đêm bao gồm bữa sáng.</li>
                                    <li>Trẻ em từ 4 – 6 tuổi sẽ bị tính phí 200.000 VND mỗi trẻ mỗi đêm không bao gồm Giường phụ, trả tiền tại chỗ nghỉ.</li>
                                    <li>Trẻ em từ 7 – 11 tuổi sẽ bị tính phí 280.000 VND mỗi trẻ mỗi đêm không bao gồm Giường phụ, trả tiền tại chỗ nghỉ.</li>
                                    <li>Chỉ chấp nhận giấy tờ tùy thân là hộ chiếu và thị thực hợp lệ đối với khách nước ngoài.</li>
                                    <li>Giường phụ của chỗ nghỉ là giường Sofa.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}