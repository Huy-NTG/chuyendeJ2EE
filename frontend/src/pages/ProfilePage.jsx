import BookingList from "../components/Booking/BookingList";
import Footer from "../components/Global/Footer";
import Header from "../components/Global/Header";
import PersonalInformation from "../components/Profile/PersonalInformation ";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function ProfilePage(){
    const { currentUser, logout } = useCurrentUser(); // Nhận hàm logout
        
    const handleLogout = () => {
        logout(); // Gọi hàm logout từ hook
        window.location.href = '/'; // Chuyển hướng
    };
    // ...
        
    return (
        <div>
            <Header></Header>
            <div className="main flex justify-center p-5"> 
                <div className="main--wrapper w-11/12 max-w-7xl">
                    
                    {/* CẢI TIẾN: Thêm nút Đăng xuất ở góc phải của phần tiêu đề */}
                    <div className="header flex justify-between items-center p-5">
                        <div className="flex-1"></div> {/* Khoảng trắng bên trái */}
                        
                        {/* Tiêu đề chính */}
                        <div className="flex-initial">
                            <h2 className="text-4xl font-bold text-blue-800">THÔNG TIN KHÁCH HÀNG</h2>
                        </div>
                        
                        {/* Nút Đăng xuất ở góc phải */}
                        <div className="flex-1 flex justify-end">
                            {currentUser && ( // Chỉ hiện nút khi người dùng đã đăng nhập
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 shadow-md flex items-center gap-2"
                                >
                                    {/* Icon Logout (Giả định) */}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3-9 3 3m0 0-3 3m3-3H9" />
                                    </svg>
                                    Đăng xuất
                                </button>
                            )}
                        </div>
                    </div>
                    
                    {/* CỘT NỘI DUNG */}
                    <div className="content flex flex-col md:flex-row gap-8">
                        <PersonalInformation user={currentUser}/> 
                        <BookingList/>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}