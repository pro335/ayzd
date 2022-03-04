import React from 'react'
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Card from "../Card"

SwiperCore.use([]);

const MetaverseProjectsList = ({ data }) => {

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
          data.map((item, index) =>
            <SwiperSlide key={index} className="pl-4">
              <Card key={index} item={item} type={"categories"} />
            </SwiperSlide>
          )
        }
      </Swiper>
    </>
  )
}

export default MetaverseProjectsList
