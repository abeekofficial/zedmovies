import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

import beasts from "../../assets/images/beasts.jpg";
import joker from "../../assets/images/joker.jpg";
import open from "../../assets/images/open.jpg";
import king from "../../assets/images/king-kong.jpg";

const Banners: React.FC = () => {
  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);

  type BannersProps = {
    title: string;
    imgUrl: string;
  };

  const banners: BannersProps[] = [
    {
      title: "King Kong",
      imgUrl: king,
    },
    {
      title: "Joker",
      imgUrl: joker,
    },
    {
      title: "Openheimer",
      imgUrl: open,
    },
    {
      title: "Fantastic Beasts and Where to Find Them",
      imgUrl: beasts,
    },
  ];

  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", `${1 - progress}`);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
    {
      s;
    }
  };

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        {banners.map((banner, i) => (
          <SwiperSlide key={i} data-history-key={`slide-${i}`}>
            <div className="flex items-center justify-center">
              <img
                src={banner.imgUrl}
                alt={banner.title}
                className="object-cover w-full h-[400px] rounded-xl"
              />
            </div>
          </SwiperSlide>
        ))}

        <div className="autoplay-progress" slot="container-end">
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
};

export default Banners;
