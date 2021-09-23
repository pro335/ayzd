import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import isValid from '../utility/isValid';
import config from '../config/config';
import * as actions from '../redux/actions';
import * as ActionTypes from '../redux/ActionTypes';

const Card = ({ item, type="nft" }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { project, topCollections, biggestSalesAmount } = useSelector(state => {
    return {
      project: state.project,
      topCollections: state.topCollections,
      biggestSalesAmount: state.biggestSalesAmount,
    };
  });
  
  const handleClick = () => {

    if(type === "categories") {
    
      let data = project.projects.filter(function(proj) {
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
  
        history.push(`/projects/${item.unique_id}`);
      }
    } else {
      // window.open(item.coinrankingUrl, "_blank")
    }
  }

  const addDefaultSrc = (e) => {
    e.target.src = '../assets/images/default_image.svg';
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
  } else {
    media = isValid(item) && isValid(item.image) ? item.image : '../assets/images/default_image.svg';
  }
  return (
    <div className={type === "categories" ? "hover:cursor-pointer" : ""} onClick={handleClick}>
      <div className="bg-brand-gray-800 border border-brand-gray-800 rounded-xl overflow-hidden">
        <div
          className="block h-41 xl:h-52"
        >
          {
            type === "categories" ?
              <img className="w-full h-full object-cover" src={media} alt="" />
              :
              <img className="w-full h-full object-cover" src={media} alt="" onError={addDefaultSrc} />
          }
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
                    {item.name}
                  </p>
                </>
              ) : (
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
          }

        </div>
      </div>
    </div>
  )
}

export default Card
