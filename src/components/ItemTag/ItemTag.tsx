import cartIcon from "../../../public/shopping-cart (1).png";
import Image from "next/image";

export default function ItemTag({ isBig, hovered, title, price }: { isBig: boolean, hovered: boolean, title: String, price: number }) {

    return (
        <div className={`absolute bg-[#0a0a0b] border-[#71717A] 
            border-2 p-1 ${!isBig ? "max-w-[90%] xl:max-w-[55%] h-1/6 top-[75%] left-[5%] xl:left-[40%]" : "max-w-[33%] h-[10%] top-[80%] left-[60%]"} 
            rounded-3xl flex items-center justify-between flex-row`}>
            <h1 className="px-3 truncate">
                {title}
            </h1>
            <div className={`rounded-2xl w-1/3 min-w-[50px] h-full bg-primary text-lg font-semibold 
                flex items-center justify-center ${hovered ? "animate-flip" : ""}`}>
                {hovered ? (
                    <Image
                        src={cartIcon}
                        alt="cart icon"
                        className="w-6 h-6 lg:w-7 lg:h-7 animate-flip cursor-pointer"
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