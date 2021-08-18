import React from 'react';
import { SortAscendingIcon, ChevronDownIcon } from '@heroicons/react/solid'
import { Link } from "react-router-dom";

const SectionHeading = ({ title, icon, buttons, classes, btnLink }) => {
  return (
    <div
      className={`h-15 flex items-center justify-between border-b ${classes} border-brand-gray-800 px-5 py-3`}>
      <div className="flex items-center">
        <div>
          <img src={`../assets/icons/${icon}.svg`} alt="" />
        </div>
        <p className="lg:text-lg text-gray-100 font-medium leading-6 ml-3">
          {title}
        </p>
      </div>

      {
        buttons && (
          buttons === "all" ?
            (
              <div className="flex items-center space-x-3">
                <button type="button">
                  <SortAscendingIcon className="h-4.5 w-4.5 text-brand-gray-400" />
                </button>

                <button type="button"
                  className="flex items-center text-brand-gray-400 font-medium">
                  <span>All</span>

                  <ChevronDownIcon className="h-5 w-5 text-brand-gray-400 ml-2" />
                </button>
              </div>
            )
            :
            (
              <Link to={btnLink ? btnLink : "/"} className="text-brand-gray-400 font-medium transition-colors duration-200 ease-out hover:text-gray-100">
                View All
              </Link>
            )
        )

      }
    </div>
  )
}

export default SectionHeading
