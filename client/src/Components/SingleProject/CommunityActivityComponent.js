import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';

const CommunityActivityComponent = ( {icon, title, amount, url} ) => {
  
  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  return (
    isValid(icon) && isValid(title) && isValid(amount) && isValid(url) ?
      <a href={url} className="flex items-center flex-wrap justify-center lg:justify-between space-y-6 lg:space-y-0 py-5 px-5 sm:px-6 lg:w-1/2 sm:w-full" target="_blank">
        <div className="flex items-center border border-brand-gray-800 rounded-lg space-x-5 pl-4 pr-auto py-3 w-full">
          <div className="py-1">
            <img className="w-full h-full object-cover object-center" src={`/assets/icons/${icon}.svg`} alt="" />
          </div>
          <div>
            <p className="text-xs text-brand-gray-400 leading-4">{title}</p>
            <p className="text-lg text-brand-gray-300 font-semibold">{amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
          </div>
        </div>
      </a>
      :
      null
  )
}

export default CommunityActivityComponent

