import React from 'react'
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Link } from "react-router-dom";

SwiperCore.use([]);

const TopSalesList = () => {
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
          [...Array(4).keys()].map(slide => (
            <SwiperSlide key={slide} className="pl-4">
              <Link to="/" className="w-full block flex-shrink-0 bg-brand-gray-800 rounded-lg overflow-hidden">
                <div>
                  <img src="../assets/images/Avatar-01.png" alt="" />
                </div>
                <div className="leading-5 p-3 pb-4">
                  <p>CryptoPunk #9570</p>
                  <p className="text-brand-gray-300 -mt-1">$165.19k</p>
                </div>
              </Link>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </>
  )
}

export default TopSalesList
