import React from "react";
import { useRef, useEffect, useState } from "react";
export default function FavouritePlace(){
    const tabs = [
    "Miền Bắc",
    "Miền Trung",
    "Miền Đông Nam Bộ",
    "Miền Tây Nam Bộ",
    "Châu Á",
    "Châu Âu",
    "Châu Mỹ",
    "Châu Úc",
    "Châu Phi",
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [underlineStyle, setUnderlineStyle] = useState({});
  const tabsRef = useRef([]);

  useEffect(() => {
    const currentTab = tabsRef.current[activeIndex];
    if (currentTab) {
      setUnderlineStyle({
        width: currentTab.offsetWidth,
        left: currentTab.offsetLeft,
      });
    }
  }, [activeIndex]);

    return (
                <div className="fav p-10">
                    <div className="fav--wrapper p-10">
                        <div className="fav__title">
                            <p className="flex justify-center text-4xl font-semibold text-blue-800 mb-5 relative pb-5">ĐIỂM ĐẾN YÊU THÍCH
                                <span className="bottom-0 left-1/2 translate-x-[-50%] absolute w-2/12 bg-blue-800 h-[2px]"></span>

                            </p>
                        </div>
                        <div className="fav__content flex justify-center px-5 py-5">
                            <div className="fav__content--wrapper ">
                                <div className="fav__tab px-10 mb-5">
                                    <div className="fav__tab--wrapper flex justify-between gap-1 font-semibold relative">
                                        {tabs.map((tab, index) => (
                                        <div
                                            key={index}
                                            ref={(el) => (tabsRef.current[index] = el)}
                                            onClick={() => setActiveIndex(index)}
                                            className={`cursor-pointer p-2.5 transition-colors ${
                                            activeIndex === index
                                                ? "text-blue-700"
                                                : "text-gray-700 hover:text-blue-800"
                                            }`}
                                        >
                                            <h2>{tab}</h2>
                                        </div>
                                        ))}
                                    <span
                                        className="absolute bottom-0 h-[3px] bg-blue-700 rounded-full transition-all duration-300 ease-in-out"
                                        style={{
                                            width: underlineStyle.width,
                                            left: underlineStyle.left,
                                        }}
                                    ></span>
                                    </div>
                                </div>
                                <div className="fav__image  flex justify-center items-center mt-5 ">
                                    <div className="fav__image--wrapper grid gap-[10px] grid-cols-[1fr_0.5fr_1fr_1fr_1fr] auto-rows-[30rem] grid-flow-dense">
                                        <div className="fav__image--item col-span-2 row-span-2 group relative overflow-hidden rounded-2xl group hover:cursor-pointer flex justify-center items-center">
                                            <img 
                                                className="w-full h-full object-cover rounded-2xl transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-50" 
                                                src="https://vietnamtouristvn.com/thumbs/1280x720x2/upload/product/maxresdefault-16757841233871805695951-6959.jpg"></img>
                                            <div className="image__name absolute flex flex-col justify-center items-center text-white font-semibold inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                <label className="text-xl mb-3 drop-shadow-md">Thái Lan</label>
                                                <br/>
                                                <button className="bg-blue-600 p-2.5 rounded-xl border-white border-2 hover:border-blue-600 transition">Khám phá</button>
                                            </div>
                                        </div>
                                        <div className="fav__image--item group relative overflow-hidden rounded-2xl group hover:cursor-pointer flex justify-center items-center">
                                            <img 
                                                className="w-full h-full object-cover rounded-2xl transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-50" 
                                                src="https://vietnamtouristvn.com/thumbs/1280x720x2/upload/product/maxresdefault-16757841233871805695951-6959.jpg"></img>
                                            <div className="image__name absolute flex flex-col justify-center items-center text-white font-semibold inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                <label className="text-xl mb-3 drop-shadow-md">Thái Lan</label>
                                                <br/>
                                                <button className="bg-blue-600 p-2.5 rounded-xl border-white border-2 hover:border-blue-600 transition">Khám phá</button>
                                            </div>
                                        </div>
                                        <div className="fav__image--item col-span-2 group relative overflow-hidden rounded-2xl group hover:cursor-pointer flex justify-center items-center">
                                            <img 
                                                className="w-full h-full object-cover rounded-2xl transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-50" 
                                                src="https://vietnamtouristvn.com/thumbs/1280x720x2/upload/product/maxresdefault-16757841233871805695951-6959.jpg"></img>
                                            <div className="image__name absolute flex flex-col justify-center items-center text-white font-semibold inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                <label className="text-xl mb-3 drop-shadow-md">Thái Lan</label>
                                                <br/>
                                                <button className="bg-blue-600 p-2.5 rounded-xl border-white border-2 hover:border-blue-600 transition">Khám phá</button>
                                            </div>
                                        </div>
                                        <div className="fav__image--item group relative overflow-hidden rounded-2xl group hover:cursor-pointer flex justify-center items-center">
                                            <img 
                                                className="w-full h-full object-cover rounded-2xl transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-50" 
                                                src="https://vietnamtouristvn.com/thumbs/1280x720x2/upload/product/maxresdefault-16757841233871805695951-6959.jpg"></img>
                                            <div className="image__name absolute flex flex-col justify-center items-center text-white font-semibold inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                <label className="text-xl mb-3 drop-shadow-md">Thái Lan</label>
                                                <br/>
                                                <button className="bg-blue-600 p-2.5 rounded-xl border-white border-2 hover:border-blue-600 transition">Khám phá</button>
                                            </div>
                                        </div>
                                        <div className="fav__image--item group relative overflow-hidden rounded-2xl group hover:cursor-pointer flex justify-center items-center">
                                            <img 
                                                className="w-full h-full object-cover rounded-2xl transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-50" 
                                                src="https://vietnamtouristvn.com/thumbs/1280x720x2/upload/product/maxresdefault-16757841233871805695951-6959.jpg"></img>
                                            <div className="image__name absolute flex flex-col justify-center items-center text-white font-semibold inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                <label className="text-xl mb-3 drop-shadow-md">Thái Lan</label>
                                                <br/>
                                                <button className="bg-blue-600 p-2.5 rounded-xl border-white border-2 hover:border-blue-600 transition">Khám phá</button>
                                            </div>
                                        </div>
                                        <div className="fav__image--item row-span-2 group relative overflow-hidden rounded-2xl group hover:cursor-pointer flex justify-center items-center">
                                            <img 
                                                className="w-full h-full object-cover rounded-2xl transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-50" 
                                                src="https://vietnamtouristvn.com/thumbs/1280x720x2/upload/product/maxresdefault-16757841233871805695951-6959.jpg"></img>
                                            <div className="image__name absolute flex flex-col justify-center items-center text-white font-semibold inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                <label className="text-xl mb-3 drop-shadow-md">Thái Lan</label>
                                                <br/>
                                                <button className="bg-blue-600 p-2.5 rounded-xl border-white border-2 hover:border-blue-600 transition">Khám phá</button>
                                            </div>
                                        </div>
                                        <div className="fav__image--item group relative overflow-hidden rounded-2xl group hover:cursor-pointer flex justify-center items-center">
                                            <img 
                                                className="w-full h-full object-cover rounded-2xl transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-50" 
                                                src="https://vietnamtouristvn.com/thumbs/1280x720x2/upload/product/maxresdefault-16757841233871805695951-6959.jpg"></img>
                                            <div className="image__name absolute flex flex-col justify-center items-center text-white font-semibold inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                <label className="text-xl mb-3 drop-shadow-md">Thái Lan</label>
                                                <br/>
                                                <button className="bg-blue-600 p-2.5 rounded-xl border-white border-2 hover:border-blue-600 transition">Khám phá</button>
                                            </div>
                                        </div>
                                        <div className="fav__image--item col-span-2 group relative overflow-hidden rounded-2xl group hover:cursor-pointer flex justify-center items-center">
                                            <img 
                                                className="w-full h-full object-cover rounded-2xl transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-50" 
                                                src="https://vietnamtouristvn.com/thumbs/1280x720x2/upload/product/maxresdefault-16757841233871805695951-6959.jpg"></img>
                                            <div className="image__name absolute flex flex-col justify-center items-center text-white font-semibold inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                <label className="text-xl mb-3 drop-shadow-md">Thái Lan</label>
                                                <br/>
                                                <button className="bg-blue-600 p-2.5 rounded-xl border-white border-2 hover:border-blue-600 transition">Khám phá</button>
                                            </div>
                                        </div>
                                        <div className="fav__image--item group relative overflow-hidden rounded-2xl group hover:cursor-pointer flex justify-center items-center">
                                            <img 
                                                className="w-full h-full object-cover rounded-2xl transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-50" 
                                                src="https://vietnamtouristvn.com/thumbs/1280x720x2/upload/product/maxresdefault-16757841233871805695951-6959.jpg"></img>
                                            <div className="image__name absolute flex flex-col justify-center items-center text-white font-semibold inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                <label className="text-xl mb-3 drop-shadow-md">Thái Lan</label>
                                                <br/>
                                                <button className="bg-blue-600 p-2.5 rounded-xl border-white border-2 hover:border-blue-600 transition">Khám phá</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    );
}