import React, { useState} from "react";
import vietnamFlag from "../../assets/images/vietnam-flag.png";
import logo from "../../assets/images/logo.jpg";
import { placeData } from "../../assets/data/Tour";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { slugify } from "../../utils/stringUtils";
import { useCurrentUser } from "../../hooks/useCurrentUser";

export default function Header(){
    const [showNavPlace, setShowNavPlace] = useState(false);
    const [activeType, setActiveType] = useState(null);

    const [showForm, setShowForm] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const toggleNavPlace = (type) => {
        if (activeType === type) {
        setShowNavPlace(false);
        setActiveType(null);
        } else {
        setActiveType(type);
        setShowNavPlace(true);
        }
    };
    const selectedData = placeData.find((p) => p.type === activeType);
    const { currentUser } = useCurrentUser() || {};
    console.log(currentUser);
    const isAuthenticated = !!currentUser && !!currentUser.id;
    const currentUserId = currentUser ? currentUser.id : null;
    return (
            <div className="header ">
                <div className="header--wrapper flex justify-center items-center flex-col">
                    <div className="sub__header h-8 w-12/12 flex items-center justify-center flex-row bg-blue-300" >
                        <div className="sub__header--wrapper w-10/12 flex justify-between">
                            <div className="sub__header-left">
                                <i className="fa-solid fa-phone text-black mr-1"></i>
                                <p className="text-red-600 inline font-bold">0798980217</p>
                                <span className="text-black"> - </span>
                                <small className="text-black">Từ 8:00 - 23:00 hằng ngày</small>
                            </div>
                            <div className="sub__header-right flex gap-1.5 ">
                                <div className="navLangCur flex gap-1 items-center justify-between">
                                    <img src={vietnamFlag} alt="VietNam Flag" className="w-5 h-5 object-cover rounded-sm"></img>
                                    <span className="text-black"> | </span>
                                    <span className="text-black"> VND </span>
                                </div>
                                <div
                                    title={isAuthenticated ? "Xem hồ sơ cá nhân" : "Đăng nhập / Đăng ký"}
                                    className="navProfile hover:cursor-pointer hover:bg-white" 
                                >
                                    {isAuthenticated ? (
                                        <Link to={`/profile/user/${currentUserId}`}>
                                            <i className="fa-solid fa-user text-black"></i>
                                        </Link>
                                    ) : (
                                        <div onClick={() => setShowForm(true)} className="flex items-center justify-center h-full w-full">
                                            <i className="fa-solid fa-user text-black"></i>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main_header w-12/12 flex items-center flex-row justify-center">
                        <div className="main__header--wrapper flex justify-between w-10/12 relative">
                            <div className="main__header-left p-1">
                                <Link to="/"> 
                                    <img src={logo} className="h-16 w-48 cursor-pointer" alt="logo" />
                                </Link>
                            </div>
                            <div className="main__header-right w-2/4 flex items-center justify-end">
                                <ul className="main_header--list w-auto flex justify-between items-center text-black text-xl font-semibold gap-5">
                                    <li 
                                        onClick={() => toggleNavPlace("Quốc tế")}
                                        className="hover:rounded-md hover:bg-gray-100 p-1.5 hover:cursor-pointer h-auto hover:text-blue-600">Quốc tế</li>
                                    <li
                                        onClick={() => toggleNavPlace("Trong nước")}
                                        className="hover:rounded-md hover:bg-gray-100 p-1.5 hover:cursor-pointer h-auto hover:text-blue-600">Trong nước</li>
                                    <li><i className="fa-solid fa-list font-thin p-1.5 hover:cursor-pointer h-auto hover:text-blue-600"></i></li>
                                </ul>
                                <div className={`navPlace absolute top-full left-[76.5px] w-10/12 bg-white shadow-[0_0_10px_rgba(0,0,0,0.15)] 
                                    p-8 rounded-2xl transform transition-all duration-500 ease-out origin-top 
                                    ${showNavPlace ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'} z-50`}>
                                {selectedData && (
                                    <div className="navPlace--wrapper">
                                        <button 
                                            onClick={() => setShowNavPlace(false)}
                                            className="fa-solid fa-x text-black top-3 right-3 absolute"></button>
                                        <div className="navPlace--wrapper__content flex justify-between items-center">
                                            {selectedData.data.map((region,index) => (
                                                <div
                                                    key={index} 
                                                    className="navPlace__content--list flex flex-col justify-between gap-2.5">
                                                    <div className="list-title mb-1.5">
                                                        <p className="text-black text-xl font-bold">{region.title}</p>
                                                    </div>
                                                        <div className="list-view ">
                                                            <ul className="list-view--wrapper flex flex-col gap-2.5 h-12/12 ">
                                                                {region.places.map((place, i) => (
                                                                <Link key={i} to={`/tours/location/${slugify(place)}`} >
                                                                    <li 
                                                                        className="list-view__item text-black font-medium relative group">
                                                                        <p onClick={() => setShowNavPlace(false)} title={place} className="inline-block relative group hover:text-blue-600">{place}
                                                                            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                                                                        </p>
                                                                    </li>
                                                                </Link>
                                                                ))}
                                                            </ul>
                                                        </div> 
                                                    <div className="list-show-all text-black mt-2.5">
                                                        <Link to={`/tours/location/${slugify(region.title)}`}>
                                                            <button onClick={() => setShowNavPlace(false)} key={index} className="flex items-center">
                                                                <p>Xem tất cả</p>
                                                                <i className="fa-solid fa-arrow-right ml-1"></i>
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}  
                                        </div>
                                    </div>
                                )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {showForm && (
                        <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50">
                            <div
                            className="absolute inset-0"
                            onClick={() => setShowForm(false)}
                            ></div>
                            <div className="relative z-10">
                            {isLogin ? (
                                <LoginForm
                                onSubmit={(data) => console.log("Login:", data)}
                                onSwitch={() => setIsLogin(false)}
                                onClose={() => setShowForm(false)}
                                />
                            ) : (
                                <RegisterForm
                                onSubmit={(data) => console.log("Register:", data)}
                                onSwitch={() => setIsLogin(true)}
                                onClose={() => setShowForm(false)}
                                />
                            )}
                            </div>
                        </div>
                        )}
                </div>
            </div>
    );
}