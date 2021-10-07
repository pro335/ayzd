import React, {useState, useEffect, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import isValid from '../../utility/isValid';
import config from '../../config/config';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';
import LottieAnimation from '../Lottie/Lottie';
import LOTTIE_DATA from '../Lottie/data.json';

const ProjectsList = ({ isActive, activeHandler, type="dashboard" }) => {

  const dispatch = useDispatch();

  const { project, rankings } = useSelector(state => {
    return {
      project: state.project,
      rankings: state.rankings,
    };
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const _isMounted = useRef(false); // Initial value _isMounted = false

  useEffect(() => {
    if (!_isMounted) {
      setTimeout(() => {
        setIsLoaded(true);
      }, config.LOADING_TIME);
    }
    return () => {
      _isMounted.current = true;
    };
  }, []); // here

  const handleClick = (proj) => {

    if(type === "dashboard") {
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
        rankings.topCollections.map(item => {
          if(item.name === data[0].name)
            volume = item.price;
        })

        rankings.topCollections.slice(0, 8).map((item, index) => {
          if(item.name === data[0].name)
            isBySellerCount = {
              value: index,
              flag: true
            };
        })

        rankings.biggestSalesAmount.slice(0, 8).map((item, index) => {
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
      activeHandler(proj.name);
    } else if(type === "guides") {
      dispatch({
        type: ActionTypes.SET_PROJECT_ID,
        data: proj._id,
      });
    
      let data = project.projects_has_guides.filter(function(item) {
        return item._id === proj._id;
      });
      if(isValid(data)) {
        dispatch({
          type: ActionTypes.SET_PROJECT,
          data: data[0],
        });

        //Filter guides by the selected project
        dispatch({
          type: ActionTypes.FILTERING_GUIDE_BY_PROJECT,
          projectData: data[0],
        });
      }
      activeHandler(proj.name);
    }
  }

  return (
    <div className="h-full flex flex-col font-medium overflow-y-scroll space-y-2 py-3 px-2">
      { type === "dashboard" && isValid(project.projects_has_news_show_list) ?
        project.projects_has_news_show_list.map((item, index) => {
          const main_image = isValid(item.main_image) &&  isValid(item.main_image.url) ? item.main_image.url : `${config.bucket_url}/${config.common_image}`;

          return (
            <div
              className={`${isActive === item.name ? 'bg-brand-gray-800 text-gray-200' : ''} h-10 hover:bg-brand-gray-800 hover:cursor-pointer rounded-lg flex items-center text-brand-gray-600 hover:text-gray-200 onHover px-3 py-2`}
              onClick={() => handleClick(item)}
              key={index}
            >
              <div className="w-6 h-6 mr-4">
                <img className={`${item.name === "Smart feed" ? '' : 'rounded-full'} mx-auto h-full`} src={main_image} alt={item.name} />
              </div>
              <p>
                {item.name}
              </p>
            </div>
          )
        })
        :
        ( type === "guides" && isValid(project.projects_has_guides_show_list) ?
          project.projects_has_guides_show_list.map((item, index) => {
            const main_image = isValid(item.main_image) &&  isValid(item.main_image.url) ? item.main_image.url : `${config.bucket_url}/${config.common_image}`;
  
            return (
              <div
                className={`${isActive === item.name ? 'bg-brand-gray-800 text-gray-200' : ''} h-10 hover:bg-brand-gray-800 hover:cursor-pointer flex items-center text-brand-gray-600 hover:text-gray-200 onHover px-3 py-2`}
                onClick={() => handleClick(item)}
                key={index}
              >
                <div className="w-6 h-6 mr-4">
                  <img className={`${item.name === "All guides" || item.name === "Research & Analytics" ? '' : 'rounded-full'} mx-auto h-full`} src={main_image} alt={item.name} />
                </div>
                <p>
                  {item.name}
                </p>
              </div>
            )
          })
          :
          (
          !isLoaded ?
            <div className="h-full flex flex-col justify-center items-center pb-15">
              <LottieAnimation lotti={LOTTIE_DATA} height={50} width={50} />
            </div>
            :
            project.projects_has_news_show_list.length <= 0 && <p>No Projects</p>
          )
        )}
    </div>
  )
}

export default ProjectsList
