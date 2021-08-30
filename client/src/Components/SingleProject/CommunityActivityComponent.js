import React from 'react'
import { ArrowNarrowUpIcon } from '@heroicons/react/outline'
import SocialIcons from "./../SocialIcons";
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';
import config from '../../config/config';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';

const CommunityActivityComponent = ( {icon, title, amount} ) => {
  
  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  return (
    <div className="flex items-center flex-wrap justify-center lg:justify-between space-y-6 lg:space-y-0 py-5 px-5 sm:px-6 w-full">
      {isValid(project.projectDataNotDatabase) && isValid(project.projectDataNotDatabase.volume) ?
        <div className="flex items-center border border-brand-gray-800 rounded-lg space-x-5 pl-4 pr-auto py-3 w-full">
          <div className="py-1">
            <img className="w-full h-full object-cover object-center" src={`/assets/icons/${icon}.svg`} alt="" />
          </div>
          <div>
            <p className="text-xs text-brand-gray-400 leading-4">{title}</p>
            <p className="text-lg text-brand-gray-300 font-semibold">{amount}</p>
          </div>
        </div>
        :
        null
      }
    </div>
  )
}

export default CommunityActivityComponent
