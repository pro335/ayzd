import React from 'react'
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Link } from "react-router-dom";

SwiperCore.use([]);

const MediaList = () => {

  return (
    <>
      <Swiper
        className="max-w-full"
        slidesPerView={1.25}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2.5
          },
          768: {
            slidesPerView: 3.5
          },
          1280: {
            slidesPerView: 3
          }
        }}
      >
        {
          [...Array(12).keys()].map(slide => (
            <SwiperSlide key={slide} className="pl-4">
              <Link to="/" className="block lg:flex-shrink-0 bg-brand-gray-800 rounded-lg overflow-hidden">
                <div className="w-full">
                  <img className="w-full" src="../assets/images/media.png" alt="" />
                </div>
              </Link>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </>
  )
}

export default MediaList
