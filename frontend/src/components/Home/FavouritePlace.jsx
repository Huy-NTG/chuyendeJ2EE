import React from "react";
import { useRef, useEffect, useState } from "react";
import { favouriteplace } from "../../assets/data/Tour";
import { Link } from "react-router-dom";
import { slugify } from "../../utils/stringUtils";


export default function FavouritePlace(){
    
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
  const activeRegion = favouriteplace[activeIndex];
  const activeData = activeRegion ? activeRegion.data : [];

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
                                {favouriteplace.map((tab, index) => (
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
                                        <h2 className="text-xl">{tab.title}</h2>
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
                            <div className="fav__image flex justify-center items-center mt-5 ">
                                <div className="fav__image--wrapper  grid gap-[10px] grid-cols-[1fr_0.5fr_1fr_1fr_1fr] auto-rows-[30rem] grid-flow-dense">
                                    
                                    <div className="fav__image--item col-span-2 row-span-2 group relative overflow-hidden rounded-2xl group hover:cursor-pointer flex justify-center items-center">
                                        <img 
                                            className="w-full h-full object-cover rounded-2xl transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-50" 
                                            src={activeData[0].img}></img>
                                        <div className="image__name absolute flex flex-col justify-center items-center text-white font-semibold inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <label className="text-xl mb-3 drop-shadow-md">{activeData[0].name}</label>
                                            <br/>
                                            <Link to={`/tours/location/${slugify(activeData[0].name)}`}>
                                                <button className="bg-blue-600 p-2.5 rounded-xl border-white border-2 hover:border-blue-600 hover:text-white transition">Khám phá</button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="fav__image--item group relative overflow-hidden rounded-2xl group hover:cursor-pointer flex justify-center items-center">
                                        <img 
                                            className="w-full h-full object-cover rounded-2xl transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-50" 
                                            src={activeData[1].img}></img>
                                        <div className="image__name absolute flex flex-col justify-center items-center text-white font-semibold inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <label className="text-xl mb-3 drop-shadow-md">{activeData[1].name}</label>
                                            <br/>
                                            <Link to={`/tours/location/${slugify(activeData[1].name)}`}>
                                                <button className="bg-blue-600 p-2.5 rounded-xl border-white border-2 hover:border-blue-600 hover:text-white transition">Khám phá</button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="fav__image--item col-span-2 group relative overflow-hidden rounded-2xl group hover:cursor-pointer flex justify-center items-center">
                                        <img 
                                            className="w-full h-full object-cover rounded-2xl transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-50" 
                                            src={activeData[2].img}></img>
                                        <div className="image__name absolute flex flex-col justify-center items-center text-white font-semibold inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <label className="text-xl mb-3 drop-shadow-md">{activeData[2].name}</label>
                                            <br/>
                                            <Link to={`/tours/location/${slugify(activeData[2].name)}`}>
                                                <button className="bg-blue-600 p-2.5 rounded-xl border-white border-2 hover:border-blue-600 hover:text-white transition">Khám phá</button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="fav__image--item group relative overflow-hidden rounded-2xl group hover:cursor-pointer flex justify-center items-center">
                                        <img 
                                            className="w-full h-full object-cover rounded-2xl transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-50" 
                                            src={activeData[3].img}></img>
                                        <div className="image__name absolute flex flex-col justify-center items-center text-white font-semibold inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <label className="text-xl mb-3 drop-shadow-md">{activeData[3].name}</label>
                                            <br/>
                                            <Link to={`/tours/location/${slugify(activeData[3].name)}`}>
                                                <button className="bg-blue-600 p-2.5 rounded-xl border-white border-2 hover:border-blue-600 hover:text-white transition">Khám phá</button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="fav__image--item group relative overflow-hidden rounded-2xl group hover:cursor-pointer flex justify-center items-center">
                                        <img 
                                            className="w-full h-full object-cover rounded-2xl transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-50" 
                                            src={activeData[4].img}></img>
                                        <div className="image__name absolute flex flex-col justify-center items-center text-white font-semibold inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <label className="text-xl mb-3 drop-shadow-md">{activeData[4].name}</label>
                                            <br/>
                                            <Link to={`/tours/location/${slugify(activeData[4].name)}`}>
                                                <button className="bg-blue-600 p-2.5 rounded-xl border-white border-2 hover:border-blue-600 hover:text-white transition">Khám phá</button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="fav__image--item row-span-2 group relative overflow-hidden rounded-2xl group hover:cursor-pointer flex justify-center items-center">
                                        <img 
                                            className="w-full h-full object-cover rounded-2xl transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-50" 
                                            src={activeData[5].img}></img>
                                        <div className="image__name absolute flex flex-col justify-center items-center text-white font-semibold inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <label className="text-xl mb-3 drop-shadow-md">{activeData[5].name}</label>
                                            <br/>
                                            <Link to={`/tours/location/${slugify(activeData[5].name)}`}>
                                                <button className="bg-blue-600 p-2.5 rounded-xl border-white border-2 hover:border-blue-600 hover:text-white transition">Khám phá</button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="fav__image--item group relative overflow-hidden rounded-2xl group hover:cursor-pointer flex justify-center items-center">
                                        <img 
                                            className="w-full h-full object-cover rounded-2xl transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-50" 
                                            src={activeData[6].img}></img>
                                        <div className="image__name absolute flex flex-col justify-center items-center text-white font-semibold inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <label className="text-xl mb-3 drop-shadow-md">{activeData[6].name}</label>
                                            <br/>
                                            <Link to={`/tours/location/${slugify(activeData[6].name)}`}>
                                                <button className="bg-blue-600 p-2.5 rounded-xl border-white border-2 hover:border-blue-600 hover:text-white transition">Khám phá</button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="fav__image--item col-span-2 group relative overflow-hidden rounded-2xl group hover:cursor-pointer flex justify-center items-center">
                                        <img 
                                            className="w-full h-full object-cover rounded-2xl transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-50" 
                                            src={activeData[7].img}></img>
                                        <div className="image__name absolute flex flex-col justify-center items-center text-white font-semibold inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <label className="text-xl mb-3 drop-shadow-md">{activeData[7].name}</label>
                                            <br/>
                                            <Link to={`/tours/location/${slugify(activeData[7].name)}`}>
                                                <button className="bg-blue-600 p-2.5 rounded-xl border-white border-2 hover:border-blue-600 hover:text-white transition">Khám phá</button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="fav__image--item group relative overflow-hidden rounded-2xl group hover:cursor-pointer flex justify-center items-center">
                                        <img 
                                            className="w-full h-full object-cover rounded-2xl transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:brightness-50" 
                                            src={activeData[8].img}></img>
                                        <div className="image__name absolute flex flex-col justify-center items-center text-white font-semibold inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <label className="text-xl mb-3 drop-shadow-md">{activeData[8].name}</label>
                                            <br/>
                                            <Link to={`/tours/location/${slugify(activeData[8].name)}`}>
                                                <button className="bg-blue-600 p-2.5 rounded-xl border-white border-2 hover:border-blue-600 hover:text-white transition">Khám phá</button>
                                            </Link>
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