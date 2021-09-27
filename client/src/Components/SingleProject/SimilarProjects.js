import React from 'react'
import SwiperCore from 'swiper';
import "swiper/swiper.min.css";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import isValid from '../../utility/isValid';
import config from '../../config/config';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';
import AllProjects from "../NFT/AllProjects"

SwiperCore.use([]);

const SimilarProjects = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });
  
  const getImage = (item) => {
    let media = null;
    if(!isValid(item)) {
      media = `${config.bucket_url}/${config.common_image}`;
    } else {
      if(isValid(item.secondary_image) && isValid(item.secondary_image.url) )
        media = item.secondary_image.url;
      else if(isValid(item.main_image) && isValid(item.main_image.url))
        media = item.main_image.url;
      else
        media = `${config.bucket_url}/${config.common_image}`;
    }
    return media;
}

  return (
    <>
      <div className="h-full pb-5 lg:col-span-5 mt-16 lg:mt-0 overflow-hidden">
        <div className="h-full overflow-y-scroll">
          <AllProjects projects={project.projectData.similar_list} type="categories" />
        </div>
      </div>
        

      {/* <div className="p-4 sm:p-5">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3 md:gap-x-6">
          {
            project.projectData.similar_list.map((item, index) => (
              <div key={index} className="w-full block flex-shrink-0 bg-brand-gray-800 rounded-lg overflow-hidden hover:cursor-pointer" onClick={() => handleClick(item)}>
                <div>
                  <img className="w-full h-full object-cover p-5" src={getImage(item)} alt="" />
                </div>
                <div className="p-3 pb-4">
                  <p className="capitalize">
                    {isValid(item.category) ? item.category.name : ""}
                  </p>
                  <p className="text-brand-gray-300 -mt-1">{item.name}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div> */}
    </>
  )
}

export default SimilarProjects
