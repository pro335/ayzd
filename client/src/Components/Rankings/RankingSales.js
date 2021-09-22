import React from 'react'
import SectionHeading from "./../SectionHeading";
import { Link } from "react-router-dom";

const RankingSales = ({ projects, title, icon, day, classes }) => {
  return (
    <>
      <div className="border-r border-brand-gray-800">
        <SectionHeading
          title={title}
          icon={icon}
          classes={classes}
        />

        <div className="flex flex-col text-brand-gray-400 font-medium space-y-2 py-2 md:py-5 px-2">
          {
            projects.slice(0, 8).map((item, index) => (
              <Link to="/dashboard"
                key={index}
                className="h-10 flex items-center hover:bg-brand-gray-800 hover:text-gray-200 rounded-md px-2  md:px-3">
                <div className="w-6 h-6 mr-4">
                  <img className={`mx-auto h-full ${day ? '' : 'rounded-full'}`} src={`../assets/logos/${item.icon}.svg`} alt="" />
                </div>
                <div>
                  <p>
                    {index + 1}. {item.name}
                  </p>
                  {
                    day &&
                    <p className="text-xs text-brand-gray-700 font-medium leading-5 -mt-1">Cryptopunks</p>
                  }
                </div>

                <div className="ml-auto">
                  {
                    day ?
                      (
                        <div>

                          <p className="text-brand-gray-300">$165.19k</p>
                          <p className="text-xs text-brand-gray-500 font-medium leading-5 -mt-1">49.99 ETH</p>

                        </div>
                      ) :
                      (
                        <div className={`${item.gaining > 0 ? 'text-green-400' : 'text-red-500'} flex flex-col md:flex-row items-end md:items-center`}>
                          <span className="text-gray-200 order-1 md:order-none md:mr-2">${item.collections}K</span>
                          <span className="inline-flex items-center">
                            {item.gaining > 0 && '+'}{item.gaining} %
                            {
                              item.gaining > 0 ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )
                            }
                          </span>
                        </div>
                      )
                  }
                </div>
              </Link>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default RankingSales;