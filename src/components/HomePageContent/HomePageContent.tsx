'use client'
import { useQuery } from "@tanstack/react-query";
import { returnData } from "@/app/page";
import Header from "../Header/Header";
import ItemCard from "../ItemCard/ItemCard";
import Product from "@/models/product";


export default function HomePageContent() { 
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: returnData,
  });

  if (data && data.length >= 3) {
    return (
      <main className="w-full h-fit flex flex-col pb-10">
        <Header />
        <div className="w-full h-[90vh] hidden lg:flex flex-col md:flex-row items-center justify-between p-4">
          <div className="w-[63%] h-[95%] ">
            <ItemCard product={data[0]} isBig={true} />
          </div>
          <div className="w-[33%] h-[95%] flex flex-col justify-between">
            <div className="w-full h-[48%]">
              <ItemCard product={data[1]} isBig={false} />
            </div>
            <div className="w-full h-[48%]">
              <ItemCard product={data[2]} isBig={false} />
            </div>
          </div>
        </div>

        <div className="w-full  flex flex-col items-center justify-evenly px-10 ">
          <h1 className="text-3xl font-bold mb-10">Todos os Produtos</h1>
          <div className="w-full max-w-screen-xl h-full max-h-full grid grid-flow-row grid-cols-2 lg:grid-cols-3 gap-10 justify-center ">
            {data && data.map((product: Product, index: number) => {
              return (
                <div key={index} className="w-[10rem] md:w-[23rem] lg:w-[26rem] md:h-96 lg:h-[26rem]  flex items-center justify-center">
                  <ItemCard product={product} isBig={false} />
                </div>
              );
            })}
          </div>
        </div>
      </main>
    );
  }

  return null;
}