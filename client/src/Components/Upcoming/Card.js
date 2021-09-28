import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import isValid from '../../utility/isValid';
import config from '../../config/config';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';
import moment from 'moment';

const Card = ({ item }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({
      type: ActionTypes.SET_PROJECT,
      data: item,
    });

    history.push(`/projects/${item.unique_id}`);
  }

  const addDefaultSrc = (e) => {
    e.target.src = '../assets/images/default_image.svg';
  }

  const addToCalendar = () => {
    console.log("item", item)
  }

  var main_image = isValid(item) && isValid(item.main_image) && isValid(item.main_image.url) ? item.main_image.url : `${config.bucket_url}/${config.common_image}`;
  return (
    <div>
      <div className="bg-brand-gray-800 border border-brand-gray-800 rounded-xl overflow-hidden">
        <div
          className="block h-41 xl:h-52 relative hover:cursor-pointer"
          onClick={handleClick}
        >
          <img className="w-full h-full object-cover" src={main_image} alt="" onError={addDefaultSrc} />
          <div class="h-7 absolute inset-y-0 top-0 right-0 text-white bg-base px-2 py-1 mt-2 mr-2 rounded-md">{isValid(item.price) ? `${item.price}` : null}</div>
        </div>
        <div
          className="text-xs font-medium px-3 py-2 hover:cursor-pointer"
          onClick={handleClick}
        >
          <p>
            {isValid(item.upcoming_date) ? moment(item.upcoming_date).format("MMM D, YYYY hh:mm A") : null}
          </p>
          <p className="text-sm text-gray-300">
            {item.name}
          </p>
          <p>
            {isValid(item.mint_size) ? `Mint size: ${item.mint_size}` : null}
          </p>
        </div>
        <div className="border-t text-xs font-medium px-3 py-2" style={{borderColor: "rgba(255, 255, 255, 0.1)"}}>
          {isValid(item.twitter_members) ? 
            <div 
              className="flex space-x-2 hover:cursor-pointer"
              onClick={handleClick}
            >
              <svg className="w-4 h-4">
                <use href="../assets/icons/twitter.svg#twitter"></use>
              </svg>
              <p>{item.twitter_members}</p>
            </div>
            : 
            null
          }
          {isValid(item.discord_members) ? 
            <div 
              className="flex space-x-2 pt-1 hover:cursor-pointer"
              onClick={handleClick}
            >
              <svg className="w-4 h-4">
                <use href="../assets/icons/discord.svg#discord"></use>
              </svg>
              <p>{item.discord_members}</p>
            </div>
            : 
            null
          }
          <button 
            className="flex flex-row items-center font-medium space-x-3 bg-black hover:bg-gray-800 text-white leading-7 rounded-xl px-2 lg:px-4 py-1.5 my-1.5 mx-auto"
            onClick={addToCalendar}
          >
            <img src="../assets/icons/plus.svg" alt="" />
            <p>Add to calendar</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
