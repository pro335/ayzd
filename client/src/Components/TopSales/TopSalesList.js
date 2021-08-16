import React from 'react'
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';
import config from '../../config/config';

SwiperCore.use([]);

const TopSalesList = () => {

  const { topSales } = useSelector(state => {
    return {
      topSales: state.topSales,
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
          topSales.topSales.map((item, index) => (
            <SwiperSlide key={index} className="pl-4">
              <div className="w-full block flex-shrink-0 bg-brand-gray-800 rounded-lg overflow-hidden">
                <div>
                  <img src={item.image} alt="" />
                </div>
                <div className="leading-5 p-3 pb-4">
                  <p>{item.name}</p>
                  <p className="text-brand-gray-300 -mt-1">{item.price}</p>
                </div>
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </>
  )
}

export default TopSalesList
