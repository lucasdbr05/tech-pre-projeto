import React, { useState, useEffect } from "react";
import cartIcon from "../../../public/shopping-cart (1).png";
import Image from "next/image";

export default function ItemTag({ isBig, hovered, title, price }: { isBig: boolean, hovered: boolean, title: String, price: number }) {
    const [sliceSize, setSliceSize] = useState(13);

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth < 640) {
                setSliceSize(isBig ? 10 : 5);
            } else if (screenWidth >= 640 && screenWidth < 768) {
                setSliceSize(isBig ? 13 : 3);
            } else if (screenWidth >= 768 && screenWidth < 1024) {
                setSliceSize(isBig ? 20 : 14);
            } else {
                setSliceSize(isBig ? 25 : 14);
            }
        };

        handleResize(); 
    }, [isBig, window.innerHeight]);

    return (
        <div className={`absolute bg-[#0a0a0b] border-[#71717A] 
            border-2 p-1 ${!isBig ? "w-[90%] xl:w-[55%] h-1/6  top-[75%] left-[5%] xl:left-[40%]" : "w-1/3 h-[10%] top-[80%] left-[60%]"} 
            rounded-3xl flex items-center justify-between flex-row`}>
            <h1 className="px-3 whitespace-nowrap">
                {title.length > sliceSize ? title.slice(0, sliceSize) + "..." : title}
            </h1>
            <div className={`rounded-2xl w-1/3 h-full bg-primary text-lg font-semibold 
                flex items-center justify-center ${hovered ? "animate-flip" : ""}`}>
                {hovered ? (
                    <Image
                        src={cartIcon}
                        alt="cart icon"
                        className="w-7 h-7 animate-flip cursor-pointer"
                        width={100}
                        height={100}
                    />
                ) : (
                    <h2 className="text-sm xl:text-lg">R${price}</h2>
                )}
            </div>
        </div>
    );
}
