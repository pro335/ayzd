import React from 'react'
import { ArrowNarrowUpIcon } from '@heroicons/react/outline'
import SocialIcons from "./../SocialIcons";

const Heading = () => {
  return (
    <div className="flex items-center flex-wrap justify-center lg:justify-between space-y-6 lg:space-y-0 py-5 px-5 sm:px-6">
      {/* Left */}
      <div className="flex flex-wrap justify-center">
        <div className="w-16 h-16">
          <img className="w-full h-full" src="../assets/images/decentraland.png" alt="" />
        </div>
        <div className="w-full lg:w-auto text-center lg:pl-5">
          <div className="flex items-center flex-wrap justify-center lg:justify-start">
            <h3 className="text-2xl text-gray-100 font-bold">
              Decentraland
            </h3>
            <div className="w-full lg:w-auto flex items-center justify-center lg:justify-start space-x-2 pl-3">
              <a href="#!" className="text-brand-gray-600 hover:text-brand-gray-300">
                <svg className="w-4 h-4">
                  <use href="../assets/icons/link.svg#icon-linked"></use>
                </svg>
              </a>
              <SocialIcons />
            </div>
          </div>
          <p className="text-sm text-brand-gray-400 font-medium pb-1.5">
            Decentraland is an application or software which has been created to run on Ethereum.
          </p>
          <div className="flex items-center justify-center lg:justify-start space-x-2">
            <div className="relative text-brand-AYZD-PURPLE rounded-full overflow-hidden whitespace-nowrap px-3 py-1.5">
              #1 by sales volume

              <span className="absolute left-0 top-0 w-full h-full bg-base opacity-30"></span>
            </div>

            <div className="relative text-brand-green rounded-full overflow-hidden whitespace-nowrap px-3 py-1.5">
              #1 by seller count
              <span className="w-full h-full bg-secondary absolute left-0 top-0 opacity-30"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div>
        <div className="flex items-center border border-brand-gray-800 rounded-lg space-x-5 px-4 py-3">
          <div>
            <p className="text-xs text-brand-gray-400 leading-4">Sales volume</p>
            <p className="text-lg text-brand-gray-300 font-semibold">$503,201</p>
          </div>
          <div className="bg-brand-green bg-opacity-20 rounded-full px-2 py-1">
            <p className="flex items-center text-sm font-medium text-brand-green">
              <ArrowNarrowUpIcon className="w-4 mr1" />
              12%
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Heading
