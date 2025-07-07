import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { fetchData } from "@/api/fetchTrending";
import { lineSpinner } from "ldrs";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";

interface News {
  url: string;
  abstract: string;
  // multimedia: string;
  multimedia: {
    [index: string]: {
      url: string;
    };
  };
}

const politicsCarousel = () => {
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState<News[]>([]);
  const news1 = news.slice(0, news.length / 3);
  const news2 = news.slice(news.length / 3, (news.length / 3) * 2);
  const news3 = news.slice(0, news.length / 3);

  // fetching data when component mounts
  useEffect(() => {
    setLoading(true);
    const fetchTrending = async () => {
      const response = await fetchData("politics");
      setNews(response);
      setLoading(false);
    };
    fetchTrending();
  }, []);

  // loading animation
  lineSpinner.register();
  if (loading) {
    return (
      <div className="h-full w-full flex justify-center items-center absolute">
        <l-line-spinner
          size="40"
          stroke="3"
          speed="1"
          color="black"
        ></l-line-spinner>
      </div>
    );
  }
  return (
    <div className="w-full">
      <Carousel
        plugins={[
          Autoplay({
            delay: 12000,
          }),
        ]}
        className="rounded-lg w-full flex"
        // orientation="vertical"
      >
        <CarouselContent>
          {news &&
            news1.map((news, index) => (
              <CarouselItem key={index}>
                <Link
                  href={news.url}
                  className="w-full flex aspect-[3/2] bg-no-repeat bg-cover rounded-lg bg-center"
                  style={{
                    backgroundImage: `url(${
                      news?.multimedia &&
                      news?.multimedia[2] &&
                      news?.multimedia[0]?.url
                    })`,
                  }}
                ></Link>
                <Link
                  href={`${news.url}`}
                  target="_blank"
                  className="mt-2 mx-2 flex font-nunito leading-5 underline"
                >
                  {" "}
                  {news.abstract}
                </Link>
              </CarouselItem>
            ))}
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
      {/* second carousel */}
      <Carousel
        plugins={[
          Autoplay({
            delay: 12000,
          }),
        ]}
        className="rounded-lg w-full flex"
        // orientation="vertical"
      >
        <CarouselContent>
          {news &&
            news2.map((news, index) => (
              <CarouselItem key={index}>
                <Link
                  href={news.url}
                  className="w-full flex aspect-[3/1] bg-no-repeat bg-cover rounded-lg bg-center"
                  style={{
                    backgroundImage: `url(${
                      news?.multimedia &&
                      news?.multimedia[2] &&
                      news?.multimedia[0]?.url
                    })`,
                  }}
                ></Link>
                <Link
                  href={`${news.url}`}
                  target="_blank"
                  className="mt-2 mx-2 flex font-nunito leading-5 underline"
                >
                  {" "}
                  {news.abstract}
                </Link>
              </CarouselItem>
            ))}
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
    </div>
  );
};

export default politicsCarousel;
