import React from 'react'
import SwiperCore from 'swiper';
import "swiper/swiper.min.css";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import isValid from '../../utility/isValid';
import config from '../../config/config';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';

SwiperCore.use([]);

const SimilarProjects = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { project, topCollections, biggestSalesAmount } = useSelector(state => {
    return {
      project: state.project,
      topCollections: state.topCollections,
      biggestSalesAmount: state.biggestSalesAmount,
    };
  });
  
  const handleClick = (proj) => {

    dispatch({
      type: ActionTypes.SET_PROJECT_ID,
      data: proj._id,
    });
  
    let data = project.projects.filter(function(item) {
      return item._id === proj._id;
    });
    if(isValid(data)) {
      dispatch({
        type: ActionTypes.SET_PROJECT,
        data: data[0],
      });

      //Sort the livefeednews by the selected project
      dispatch({
        type: ActionTypes.FILTERING_LIVE_FEED_BY_PROJECT,
        projectData: data[0],
      });

      // get the project data(not from db)
      let volume = null, isBySellerCount = null, isBySalesVolume = null;
      topCollections.topCollections.map(item => {
        if(item.name === data[0].name)
          volume = item.price;
      })

      topCollections.topCollections.slice(0, 8).map((item, index) => {
        if(item.name === data[0].name)
          isBySellerCount = {
            value: index,
            flag: true
          };
      })

      biggestSalesAmount.biggestSalesAmount.slice(0, 8).map((item, index) => {
        if(item.name === data[0].name)
          isBySalesVolume =  {
            value: index,
            flag: true
          };
      })

      let projectDataNotDatabase = {
        ...project.projectDataNotDatabase,
        volume,
        isBySellerCount,
        isBySalesVolume,
      }

      dispatch({
        type: ActionTypes.SET_PROJECT_NOT_DB,
        data: projectDataNotDatabase,
      });
      
      dispatch({
        type: ActionTypes.SET_ACTIVE_TAB,
        data: 1
      });

    }

    // history.push(`/projects/${data[0].unique_id}`);
  }

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
      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-3 md:gap-x-6">
          {
            project.projectData.similar_list.map((item, index) => (
              <div key={index} className="w-full block flex-shrink-0 bg-brand-gray-800 rounded-lg overflow-hidden hover:cursor-pointer" onClick={() => handleClick(item)}>
                <div>
                  <img className="w-full h-full object-cover p-5" src={getImage(item)} alt="" />
                </div>
                <div className="leading-5 p-3 pb-4">
                  {/* <p className="capitalize">
                    {isValid(item.category) ? item.category.name : ""}
                  </p> */}
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
