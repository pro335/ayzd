import React from 'react'
import SwiperCore from 'swiper';
import "swiper/swiper.min.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';
import config from '../../config/config';

SwiperCore.use([]);

const SimilarProjects = () => {
  
  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  let imageUrl = null;
  return (
    <>
      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3 md:gap-x-6">
          {
            project.projectData.similar_list.map((item, index) => (
              imageUrl = isValid(item.main_image) ? item.main_image.url : `${config.bucket_url}/${config.common_image}`,

              <div key={index} className="w-full block flex-shrink-0 bg-brand-gray-800 rounded-lg overflow-hidden">
                <div>
                  <img className="w-full h-full object-cover p-5" src={imageUrl} alt="" />
                </div>
                <div className="leading-5 p-3 pb-4">
                  <p>{item.small_description}</p>
                  <p className="text-brand-gray-300 -mt-1">{item.name}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default SimilarProjects
