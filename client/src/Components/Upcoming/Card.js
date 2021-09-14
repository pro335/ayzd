import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import isValid from '../../utility/isValid';
import config from '../../config/config';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';

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

  var main_image = isValid(item) && isValid(item.main_image) && isValid(item.main_image.url) ? item.main_image.url : `${config.bucket_url}/${config.common_image}`;
  return (
    <div className="hover:cursor-pointer" onClick={handleClick}>
      <div className="bg-brand-gray-800 border border-brand-gray-800 rounded-xl overflow-hidden">
        <div
          className="block h-41 xl:h-52 relative"
        >
          <img className="w-full h-full object-cover" src={main_image} alt="" onError={addDefaultSrc} />
          <div class="h-7 absolute inset-y-0 top-0 right-0 text-white bg-base px-2 py-1 mt-2 mr-2 rounded-md">{isValid(item.price) ? `${item.price}Ξ` : null}</div>
        </div>
        <div className="border-b text-xs font-medium px-3 py-2" style={{borderColor: "rgba(255, 255, 255, 0.1)"}}>
          <p>
            {isValid(item.upcoming_date) ? item.upcoming_date : null}
          </p>
          <p className="text-sm text-gray-300">
            {item.name}
          </p>
          <p>
            {isValid(item.mint_size) ? `Mint size: ${item.mint_size}` : null}
          </p>
        </div>
        <div className="text-xs font-medium px-3 py-2">
          {isValid(item.twitter_members) ? 
            <div className="flex space-x-2">
              <svg className="w-4 h-4">
                <use href="../assets/icons/twitter.svg#twitter"></use>
              </svg>
              <p>{item.twitter_members}</p>
            </div>
            : 
            null
          }
          {isValid(item.discord_members) ? 
            <div className="flex space-x-2 pt-1">
              <svg className="w-4 h-4">
                <use href="../assets/icons/discord.svg#discord"></use>
              </svg>
              <p>{item.discord_members}</p>
            </div>
            : 
            null
          }
        </div>
      </div>
    </div>
  )
}

export default Card
