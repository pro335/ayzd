import React, { useState, useEffect } from 'react'
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useSelector } from 'react-redux';
import Card from "../Card"

SwiperCore.use([]);

const FeaturedGuideList = () => {

  const { guide } = useSelector(state => {
    return {
      guide: state.guide,
    };
  });

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
            slidesPerView: 2.5
          }
        }}
      >
        {
          guide.guides.slice(1, 5).map((item, index) =>
            <SwiperSlide key={index} className="pl-4">
              <Card key={index} item={item} type={"guides"} />
            </SwiperSlide>
          )
        }
      </Swiper>
    </>
  )
}

export default FeaturedGuideList
