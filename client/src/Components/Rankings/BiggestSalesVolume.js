import React from 'react'
import SectionHeading from "./../SectionHeading";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';
import config from '../../config/config';

const BiggestSalesVolume = ({ projects, title, icon, day, classes }) => {
  
  const { topCollections } = useSelector(state => {
    return {
      topCollections: state.topCollections,
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
            topCollections.topCollections.map((item, index) => (
              <div
                key={index}
                className="h-10 flex items-center hover:bg-brand-gray-800 hover:text-gray-200 rounded-md px-2  md:px-3">

                <div className="w-6 h-6 mr-4">
                  <img src={item.icon} />
                </div>
                <p>
                  {index + 1}. {item.name}
                </p>

                <div className={`${item.gaining > 0 ? 'text-green-400' : 'text-red-500'} flex flex-col md:flex-row items-end md:items-center ml-auto`}>
                  <span className="text-gray-200 order-1 md:order-none md:mr-2">{item.price}</span>
                  <p className="ml-auto" dangerouslySetInnerHTML={{__html: item.change}} />
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default BiggestSalesVolume;