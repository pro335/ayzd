import React from 'react'
import { Link } from "react-router-dom";
import isValid from '../utility/isValid';
import config from '../config/config';
import * as actions from '../redux/actions';
import * as ActionTypes from '../redux/ActionTypes';

const Card = ({ item, type="nft" }) => {
  const main_image = isValid(item) && isValid(item.main_image) ? item.main_image.url : `${config.bucket_url}/${config.common_image}`;
  return (
    <>
      <div className="bg-brand-gray-800 border border-brand-gray-800 rounded-xl overflow-hidden">
        <div
          className="block h-41 xl:h-52"
        >
          {
            type === "categories" ?
              <img className="w-full h-full object-cover" src={main_image} alt="" />
              :
              <img className="w-full h-full object-cover" src={item.image} alt="" />
          }
        </div>
        <div className="text-xs font-medium pl-3 py-2 pr-5">
          {
            type === "categories" ?
              (
                <>
                  <p className="capitalize">
                    {item.category.name}
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
                    $ {Math.round(item.priceInDollar * 100)/100}
                  </p>
                  <p className="text-sm text-gray-300">
                    {item.dappName}
                  </p>
                </>
              )
          }

        </div>
      </div>
    </>
  )
}

export default Card
