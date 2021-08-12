import React from 'react'
import SwiperCore from 'swiper';
import "swiper/swiper.min.css";
import { Link } from "react-router-dom";

SwiperCore.use([]);

const SimilarProjects = () => {
  return (
    <>
      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3 md:gap-x-6">
          {
            [...Array(7).keys()].map((slide, index) => (
              <Link key={index} to="/" className="w-full block flex-shrink-0 bg-brand-gray-800 rounded-lg overflow-hidden">
                <div>
                  <img src="../assets/images/Avatar-01.png" alt="" />
                </div>
                <div className="leading-5 p-3 pb-4">
                  <p>CryptoPunk #9570</p>
                  <p className="text-brand-gray-300 -mt-1">$165.19k</p>
                </div>
              </Link>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default SimilarProjects
