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

const Travel = () => {
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState<News[]>([]);
  const third = Math.floor(news.length / 3);
  const remainder = news.length % 3;

  const news1 = news.slice(0, third);
  const news2 = news.slice(third, third * 2);
  const news3 = news.slice(third * 2);

  // fetching data when component mounts
  useEffect(() => {
    setLoading(true);
    const fetchTrending = async () => {
      const response = await fetchData("Travel");
      setNews(response);
      console.log(response);
      setLoading(false);
    };
    fetchTrending();
  }, []);

  console.log("travel news bu", news);

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
    <div className="px-5 sm:px-8 md:px-5">
      <div className="flex justify-center">
        <p className="text-center text-lg font-montserrat mt-4 py-1 px-7 bg-red-600 text-white italic font-bold mb-1">
          Travel
        </p>
      </div>
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 12000,
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
                      news?.multimedia[1]?.url
                    })`,
                  }}
                ></div>
                <Link
                  href={`${news.url}`}
                  target="_blank"
                  className="mt-3 flex font-nunito leading-5 underline"
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
                  className="mt-3 flex font-nunito leading-5 underline"
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
      {/* carousel 3 */}
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 13000,
          }),
        ]}
        className="w-full rounded-lg"
      >
        <CarouselContent>
          {news &&
            news3.map((news, index) => (
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
                  className="mt-3 flex font-nunito leading-5 underline"
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

export default Travel;
