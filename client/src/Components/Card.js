import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import isValid from '../utility/isValid';
import SetProjectData from '../utility/SetProjectData';
import config from '../config/config';
import * as actions from '../redux/actions';
import * as ActionTypes from '../redux/ActionTypes';

const Card = ({ item, type="nft", onClickHandler }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { project, rankings, guide } = useSelector(state => {
    return {
      project: state.project,
      rankings: state.rankings,
      guide: state.guide,
    };
  });
  
  const handleClick = () => {

    if(type === "categories") {
    
      let data = project.projects.filter(function(proj) {
        return item._id === proj._id;
      });

      SetProjectData(data[0], project, rankings, dispatch);

      if(isValid(data)) {  
        history.push(`/projects/${item.unique_id}`);
      }
    } else if(type === "guides") {

      let data = guide.guides.filter(function(proj) {
        return item._id === proj._id;
      });
      if(isValid(data) && isValid(data[0]) && isValid(data[0].unique_id) && isValid(data[0].project) && isValid(data[0].project.unique_id) ) {
        // dispatch({
        //   type: ActionTypes.SET_GUIDE,
        //   data: data[0],
        // });

        history.push(`/guides/${data[0].project.unique_id}/${data[0].unique_id}`);

        // if(typeof onClickHandler === "function")
        //   onClickHandler();
      }
    }
  }

  const addDefaultSrc = (e) => {
    e.target.src = '/assets/images/default_image.svg';
  }

  var media = null;
  if(type === "categories") {
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
  } else if(type === "guides") {
    if(isValid(item.media_image) && isValid(item.media_image.url))
      media = item.media_image.url;
    else
      media = `${config.bucket_url}/${config.common_image}`;
  } else {    
    media = isValid(item) && isValid(item.image) ? item.image : '/assets/images/default_image.svg';
  }
  return (
    <div className={type === "categories" || type === "guides" ? "hover:cursor-pointer" : ""} onClick={handleClick}>
      <div className="bg-brand-gray-800 border border-brand-gray-800 rounded-xl overflow-hidden">
        <div
          className="block h-41 xl:h-52 relative"
        >
          <img className="w-full h-full object-cover" src={media} alt="" onError={addDefaultSrc} />
          <img className={`${type==="guides" && item.is_video_guide ? "visible": "invisible"} absolute inset-y-0 top-0 ml-2 mt-2`} src="/assets/icons/video.svg" alt="" />
        </div>
        <div className="text-xs font-medium pl-3 py-2 pr-5">
          {
            type === "categories" ?
              (
                <>
                  <p className="capitalize">
                    {isValid(item.category) ? item.category.name : ""}
                  </p>
                  <p className="text-sm text-gray-300">
                    {item.name}{/* , {item.twitter_members} */}
                  </p>
                </>
              ) 
              : 
              (
                type === "guides" ?
                (
                  <>
                    <p className="capitalize">
                      {isValid(item.project) ? item.project.name : ""}
                    </p>
                    <p className="text-sm text-gray-300">
                      {item.title}
                    </p>
                  </>
                )
                :
                (
                  <>
                    <p >
                      {item.name}
                    </p>
                    <p className="text-brand-gray-400 font-bold">
                      {item.dappName}
                    </p>
                    <p className="text-sm text-gray-300">
                      $ {Math.round(item.priceInDollar * 100)/100}
                    </p>
                  </>
                )
              )
          }

        </div>
      </div>
    </div>
  )
}

export default Card
