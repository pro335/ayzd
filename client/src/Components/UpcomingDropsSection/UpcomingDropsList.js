import React, { useState, useEffect } from 'react'
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useSelector } from 'react-redux';
import Card from "../Upcoming/Card"

SwiperCore.use([]);

const UpcomingDropsList = () => {

  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // executes every 1 second.
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
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
          project.upcoming_show_list.slice(0, 4).map((item, index) =>
            (item.name !== "Smart feed") && (item.name !== "Research & Analytics") ?
              <SwiperSlide key={index} className="pl-4">
                <Card key={index} item={item} currentTime={currentTime} />
              </SwiperSlide>
              :
              null
          )
        }
      </Swiper>
    </>
  )
}

export default UpcomingDropsList
