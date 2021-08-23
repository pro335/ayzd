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

  const { daySales } = useSelector(state => {
    return {
      daySales: state.daySales,
    };
  });

  const addDefaultSrc = (e) => {
    e.target.src = '../assets/images/default_image.png';
  }

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
          daySales.daySales.map((item, index) => (
            <SwiperSlide key={index} className="pl-4">
              <div className="w-full block flex-shrink-0 bg-brand-gray-800 rounded-lg overflow-hidden">
                <div>
                  <img src={isValid(item) && isValid(item.image) ? item.image : '../assets/images/default_image.png'} className="w-full h-full object-cover" alt="" onError={addDefaultSrc} />
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
