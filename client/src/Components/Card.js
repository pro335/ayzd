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

  const { project } = useSelector(state => {
    return {
      project: state.project,
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

      history.push("/projects/decentraland");
    }
  }

  const main_image = isValid(item) && isValid(item.main_image) ? item.main_image : `${config.bucket_url}/${config.common_image}`;
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
              <img className="w-full h-full object-cover" src={item.image} alt="" />
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
    </div>
  )
}

export default Card
