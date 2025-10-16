import React from "react";
import { travelData, inforData } from "../assets/data";

export default function Footer(){

    return (
        <div className="footer flex justify-center items-centerx bg-blue-200 bottom-0">
            <div className="footer--wrapper">
                <div className="footer__content">
                    <div className="footer__content--wrapper grid grid-cols-3 grid-rows-2 gap-5">
                        {travelData.map((travel, index) => (
                            <div key={index} className="content__travel">
                                <div className="content__travel--wrapper px-1.5">
                                    <div className="title">
                                        <h2 
                                            className="font-bold mb-2.5 ml-2">{travel.title}</h2>
                                    </div>
                                    <div className="region grid grid-cols-2 grid-rows-8 gap-2.5">
                                        {travel.region.map((region, i) => (
                                            <a 
                                                className="relative group inline-block w-fit font-medium"
                                                key={i}
                                                title={region}>{region}
                                                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="content__booking">
                            <div className="content__booking--wrapper">
                                <div className="booking__title">
                                    <h2 className="font-bold ml-2 mb-2.5">Tra cứu booking</h2>
                                </div>
                                <div className="booking__input mt-2.5">
                                    <input className="block w-12/12 rounded-md p-1 bg-amber-50 mb-1 p-2" type="text" placeholder="Nhập mã booking của quý khách"></input>
                                    <button type="submit" className="border-blue-700 border-2 p-1 px-3 rounded-md mt-1.5 hover:bg-blue-700 hover:text-white">Tìm kiếm</button>
                                </div>
                            </div>
                        </div>
                        <div className="content__contact">
                            <div className="content__contact--wrapper p-2">
                                <div className="contact__title">
                                    <h2 className="font-bold ml-2 mb-2.5">Liên hệ</h2>
                                </div>
                                <div className="contact--main flex flex-col gap-2">
                                    <div className="contact__addess">
                                        <p>2086 Huỳnh Tấn Phát, Nhà Bè, TP. Hồ Chí Minh</p>
                                    </div>
                                    <div className="contact__phone">
                                        <p className="mb-1">(+84) 798980217</p>
                                        <p>(+84) 123456789</p>
                                    </div>
                                    <div className="contact__infor flex flex-col gap-1.5">
                                        <a href="#">
                                            <p className="hover:text-black">########</p>
                                        </a>
                                        <div className="contact__infor--icon flex gap-1.5">
                                            <a href="https://www.instagram.com/ngkiet.___/">               
                                                 <i className="fa-brands fa-instagram text-2xl hover:text-black"></i>
                                            </a>
                                            <a href="https://www.facebook.com/nguyen.kiet.74657">               
                                                 <i className="fa-brands fa-facebook text-2xl hover:text-black"></i>
                                            </a>
                                        </div>

                                    </div>
                                    <div className="contact__timework">
                                        <p>Từ 8:00 - 23:00 hằng ngày</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="content__infor">
                            <div className="content__infor--wrapper">
                                <div className="infor__title">
                                    <h2 className="font-bold ml-2 mb-2.5">Thông tin</h2>
                                </div>
                                <div className="infor--main">
                                    {inforData.map((infor,index) => (
                                        <a key={index} href="#" className="relative group block w-fit">
                                            {infor}
                                            <span className="bottom-0 w-0 duration-300 left-0 absolute h-[2px] bg-blue-600 transition-all group-hover:w-full"></span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="content__certificate">
                            <div className="content__certificate--wrapper">
                                <div className="certificate__title">
                                    <h2 className="font-bold ml-2 mb-2.5">Chứng nhận</h2>
                                </div>
                                <div className="certificate__image">
                                    {/* <img src="" alt="" />
                                    <img src="" alt="" /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer__more">
                    <div className="footer__more--wrapper"></div>
                </div>
            </div>
        </div>
    )
}