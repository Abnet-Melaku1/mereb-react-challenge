import { useQuery } from "@tanstack/react-query";

import toast from "react-hot-toast";

import TextLoadingSkeleton from "./text-loading-skeleton";
const TabBody = ({ activeIndex = 1 }: { activeIndex: number }) => {
  console.log(import.meta.env.VITE_APP_API_URL);
  const fetchDummyData = async (paragraphs: number) => {
    const response = await fetch(`/api/${paragraphs}/short/headers/plaintext`);
    if (!response.ok) throw new Error("Network response was not ok");
    return response.text();
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["dummmyData", activeIndex],
    queryFn: () => fetchDummyData(activeIndex),
    cacheTime: 1000 * 60 * 10,
    staleTime: 1000 * 60 * 1,
    onError: (err: Error) => {
      toast(err.message);
    },
  });

  if (error) {
    toast(error.message);
  }
  return (
    <>
      {isLoading && <TextLoadingSkeleton />}
      {data && (
        <div className="bg-white px-9 py-5">
          <h1>Title {activeIndex}</h1>
          <p>{data}</p>
        </div>
      )}
    </>
  );
};

export default TabBody;
