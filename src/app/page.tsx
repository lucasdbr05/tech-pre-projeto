import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import HomePageContent from "@/components/HomePageContent/HomePageContent";

export const returnData = () => {
  return [
    {
      title: 'Moleton Never Stop Learning',
      price: 199,
      imgUrl: "/moletom-never-stop-learning 1.png"
    },
    {
      title: "Moleton IA Side",
      price: 99,
      imgUrl: "/moletom-ia-p-devs.png"
    },
    {
      title: "Camisa Expand your mind",
      price: 69,
      imgUrl: "/[patrocinador]do-while22-t-shirt 1.png"
    },
    {
      title: "Camisa Expand your mind",
      price: 69,
      imgUrl: "/[patrocinador]do-while22-t-shirt 1.png"
    },
    {
      title: "Camisa Expand your mind",
      price: 69,
      imgUrl: "/[patrocinador]do-while22-t-shirt 1.png"
    },
    {
      title: "Camisa Expand your mind",
      price: 69,
      imgUrl: "/[patrocinador]do-while22-t-shirt 1.png"
    }
  ];
}


export default async function Home() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: returnData,
  })


  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePageContent />
    </HydrationBoundary>
  );
}