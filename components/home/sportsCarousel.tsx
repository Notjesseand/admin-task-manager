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

const sportsCarousel = () => {
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState<News[]>([]);
  const news1 = news?.slice(0, news.length / 2);
  const news2 = news?.slice(news.length / 2);

  // fetching data when component mounts
  useEffect(() => {
    setLoading(true);
    const fetchTrending = async () => {
      const response = await fetchData("sports");
      setNews(response);
      console.log(response);
      setLoading(false);
    };
    fetchTrending();
  }, []);

  // loading animation
  lineSpinner.register();
  if (loading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
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
    <>
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 10000,
          }),
        ]}
        className="w-full rounded-lg"
      >
        <CarouselContent>
          {news &&
            news1.map((news, index) => (
              <CarouselItem key={index}>
                <div
                  className=" aspect-square  bg-no-repeat bg-center bg-cover rounded-lg"
                  style={{
                    backgroundImage: `url(${
                      news?.multimedia &&
                      news?.multimedia[2] &&
                      news?.multimedia[0]?.url
                    })`,
                  }}
                ></div>
                <Link
                  href={`${news.url}`}
                  target="_blank"
                  className="mt-3 flex font-nunito"
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

      {/* carousel 2 */}
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 10000,
          }),
        ]}
        className="w-full rounded-lg"
      >
        <CarouselContent>
          {news &&
            news2.map((news, index) => (
              <CarouselItem key={index}>
                <div
                  className=" aspect-square  bg-no-repeat bg-center bg-cover rounded-lg"
                  style={{
                    backgroundImage: `url(${
                      news?.multimedia &&
                      news?.multimedia[2] &&
                      news?.multimedia[0]?.url
                    })`,
                  }}
                ></div>
                <Link
                  href={`${news.url}`}
                  target="_blank"
                  className="mt-3 flex font-nunito"
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
    </>
  );
};

export default sportsCarousel;
