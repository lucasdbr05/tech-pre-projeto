'use client';
import Image from "next/image";
import ItemTag from "../ItemTag/ItemTag";
import { useState } from "react";
import Product from "@/models/product";



export default function ItemCard({ isBig, product }: { isBig: boolean, product: Product }) {
    const [hovered, setHovered] = useState(false);

    return(
        <div className="w-full h-full relative" onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
            <Image src={product.imgUrl} className="w-full h-full bg-[#18181B] rounded-lg absolute top-0 left-0 
            object-contain" alt="item picture" width={500} height={500} />
            <ItemTag title={product.title} price={product.price} isBig={isBig} hovered={hovered} />
        </div>
    );
}