import React from 'react'
import isValid from '../../utility/isValid';

const StatsTopComponent = ( {icon, title, amount} ) => {

  return (
    isValid(icon) && isValid(title) && isValid(amount) ?
      <div className="flex items-center flex-wrap justify-center lg:justify-between space-y-6 lg:space-y-0 pt-5 pl-5 sm:pl-5 w-full">
        <div className="flex items-center border border-brand-gray-800 rounded-lg space-x-5 pl-4 pr-auto py-3 w-full">
          <div className="py-1">
            <img className="w-full h-full object-cover object-center" src={`../assets/icons/${icon}.svg`} alt="" />
          </div>
          <div>
            <p className="text-xs text-brand-gray-400 leading-4">{title}</p>
            <p className="text-lg text-brand-gray-300 font-semibold">{amount}</p>
          </div>
        </div>
      </div>
      :
      null
  )
}

export default StatsTopComponent

