import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import HomePageContent from "@/components/HomePageContent/HomePageContent";
import { returnData } from "@/utils/mockData";


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