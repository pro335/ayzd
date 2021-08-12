import React from 'react'
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Card from "../Card";

SwiperCore.use([]);

const TrendingNFT = () => {
  return (
    <>
      <Swiper
        slidesPerView={1.75}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 3.5
          },
          768: {
            slidesPerView: 4.5
          },
          1024: {
            slidesPerView: 3.75
          }
        }}
      >
        {
          [...Array(4).keys()].map(slide => (
            <SwiperSlide key={slide} className="pl-4">
              <Card />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </>
  )
}

export default TrendingNFT
