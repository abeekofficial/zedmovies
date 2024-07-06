// Import Swiper core and required modules
import { Navigation, Pagination, History } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

//Images
import beasts from "../../assets/images/beasts.jpg";
import joker from "../../assets/images/joker.jpg";
import open from "../../assets/images/open.jpg";
import king from "../../assets/images/king-kong.jpg";

export default function Banners() {
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

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      navigation={true}
      pagination={true}
      history={{
        key: "slide",
      }}
      modules={[Navigation, Pagination, History]}
      className="mySwiper"
    >
      {banners.map((banner, i) => (
        <SwiperSlide
          key={i}
          data-history-key="slide"
          className="flex items-center justify-center"
        >
          <img
            src={banner.imgUrl}
            alt={banner.title}
            className="object-cover w-[800px] rounded-xl"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
