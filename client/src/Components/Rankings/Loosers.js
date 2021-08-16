import React from 'react'
import SectionHeading from "./../SectionHeading";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';
import config from '../../config/config';

const Loosers = ({ projects, title, icon, day, classes }) => {

  const { loosers } = useSelector(state => {
    return {
      loosers: state.loosers,
    };
  });

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
            loosers.loosers.map((item, index) => (
              <div
                key={index}
                className="h-10 flex items-center hover:bg-brand-gray-800 hover:text-gray-200 rounded-md px-2  md:px-3">
                <div className="w-6 h-6 mr-4">
                  <img className={`mx-auto h-full 'rounded-full'`} src={item.icon} alt="" />
                </div>
                <div>
                  <p>
                    {index + 1}. {item.name}
                  </p>
                </div>

                <div className="flex flex-col md:flex-row items-end md:items-center text-red-500 ml-auto">
                  <span className="text-gray-200 order-1 md:order-none md:mr-2">{item.price}</span>
                  <p className="ml-auto" dangerouslySetInnerHTML={{__html: item.change}} />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Loosers;