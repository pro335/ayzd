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

  const handleClick = () => {

    if(type === "categories") {
    
      dispatch({
        type: ActionTypes.SET_PROJECT,
        data: item,
      });
  
      history.push(`/projects/${item.unique_id}`);
    } else {
      // window.open(item.coinrankingUrl, "_blank")
    }
  }

  const addDefaultSrc = (e) => {
    e.target.src = '../assets/images/default_image.svg';
  }

  var main_image = null;
  if(type === "categories") {
    main_image = isValid(item) && isValid(item.main_image) && isValid(item.main_image.url) ? item.main_image.url : `${config.bucket_url}/${config.common_image}`;
  } else {
    main_image = isValid(item) && isValid(item.image) ? item.image : '../assets/images/default_image.svg';
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
