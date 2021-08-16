import React from 'react'
import { Link } from "react-router-dom";
import SectionHeading from "./../SectionHeading";
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';
import config from '../../config/config';

const TopCollectionsSection = ({ projects }) => {

  const { topCollections } = useSelector(state => {
    return {
      topCollections: state.topCollections,
    };
  });

  return (
    <>
      <div>
        <SectionHeading
          title="Top collections"
          icon="top-sales"
          buttons="view"
          classes="border-t"
        />

        <div className="flex flex-col text-brand-gray-400 font-medium space-y-1 py-5 px-2">
          {
            topCollections.topCollections.map((item, index) => (
              <div to="/dashboard"
                key={index}
                className="h-10 flex items-center hover:bg-brand-gray-800 hover:text-gray-200 rounded-md onHover px-3">
                <div className="w-6 h-6 mr-4">
                  <img className="mx-auto h-full rounded-full" src={item.icon} alt="" />
                </div>
                <p>
                  {index + 1}. {item.name}
                </p>
                <p className="text-brand-gray-300 ml-auto">
                  {item.price}
                </p>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default TopCollectionsSection
