import React from 'react'
import { Link } from "react-router-dom";
import SectionHeading from "./../SectionHeading";

const TopCollectionsSection = ({ projects }) => {
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
            projects.slice(0, 5).map((item, index) => (
              <Link to="/dashboard"
                key={index}
                className="h-10 flex items-center hover:bg-brand-gray-800 hover:text-gray-200 rounded-md onHover px-3">
                <div className="w-6 h-6 mr-4">
                  <img className="mx-auto h-full rounded-full" src={`assets/logos/${item.icon}.svg`} alt="" />
                </div>
                <p>
                  {index + 1}. {item.name}
                </p>
                <p className="text-brand-gray-300 ml-auto">
                  ${item.collections}M
                </p>
              </Link>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default TopCollectionsSection
