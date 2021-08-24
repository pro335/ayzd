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

      dispatch({
        type: ActionTypes.SET_PROJECT_ID,
        data: item._id,
      });
    
      dispatch({
        type: ActionTypes.SET_PROJECT,
        data: item,
      });

      //Sort the livefeednews by the selected project
      dispatch({
        type: ActionTypes.SORTING_LIVE_FEED_BY_PROJECT,
        project_id: item._id,
      });

      // get the project data(not from db)
      let volume = null, isBySalesVolume = null, isBySellerCount = null;
      topCollections.topCollections.map(one_item => {
        if(item.name === one_item.name)
          volume = one_item.price;
      })

      topCollections.topCollections.slice(0, 8).map((one_item, index) => {
        if(item.name === one_item.name)
          isBySalesVolume = {
            value: index,
            flag: true
          };
      })

      biggestSalesAmount.biggestSalesAmount.slice(0, 8).map((one_item, index) => {
        if(item.name === one_item.name)
          isBySellerCount =  {
            value: index,
            flag: true
          };
      })

      let projectDataNotDatabase = {
        volume,
        isBySalesVolume,
        isBySellerCount,
      }

      dispatch({
        type: ActionTypes.SET_PROJECT_NOT_DB,
        data: projectDataNotDatabase,
      });
      

      history.push("/projects/decentraland");
    } else {
      // window.open(item.coinrankingUrl, "_blank")
    }
  }

  const addDefaultSrc = (e) => {
    e.target.src = '../assets/images/default_image.png';
  }

  var main_image = null;
  if(type === "categories") {
    main_image = isValid(item) && isValid(item.main_image) && isValid(item.main_image.url) ? item.main_image.url : `${config.bucket_url}/${config.common_image}`;
  } else {
    main_image = isValid(item) && isValid(item.image) ? item.image : '../assets/images/default_image.png';
  }
  return (
    <div className={type === "categories" ? "hover:cursor-pointer" : ""} onClick={handleClick}>
      <div className="bg-brand-gray-800 border border-brand-gray-800 rounded-xl overflow-hidden">
        <div
          className="block h-41 xl:h-52"
        >
          {
            type === "categories" ?
              <img className="w-full h-full object-cover" src={main_image} alt="" />
              :
              <img className="w-full h-full object-cover" src={main_image} alt="" onError={addDefaultSrc} />
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
