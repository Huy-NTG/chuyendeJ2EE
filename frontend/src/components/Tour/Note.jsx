import React, { useState, useRef } from "react";

export default function Note({item}){
    const { ref } = useRef(null);
    const [show, setShow] = useState(false);
    const iconClass = show ? 'rotate-180' : 'rotate-0';
    
    return (
        <div className="note__item__title font-semibold">
            <h2 ref={ref} onClick={() => {show ? setShow(false) : setShow(true)}} 
                className={`font-bold h-12 flex px-5 justify-between items-center bg-gray-100 hover:cursor-pointer hover:bg-blue-100
                            ${show ? ' rounded-t-2xl' : ' rounded-2xl'}
                        `}>{item.title}
                <span className={`fa-solid fa-chevron-down transition-transform duration-300 ${iconClass}`}></span>
            </h2>
            <div
                ref={ref}
                className={`note__item__content mb-2.5 p-2.5 bg-gray-100 border-t-2 border-gray-400 
                    overflow-y-auto transform transition-all duration-500 ease-out 
                    ${show ? ' max-h-96 opacity-100' : 'max-h-0 opacity-0'} 
                `}
                >
                <p className='p-2.5'>{item.content}</p>
            </div>
        </div>
    )
}