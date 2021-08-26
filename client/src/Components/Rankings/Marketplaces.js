import React from 'react'
import SectionHeading from "../SectionHeading";
import { Link } from "react-router-dom";

const Marketplaces = ({ projects, title, icon, day, classes }) => {
  return (
    <>
      <div className="border-r border-brand-gray-800">
        <SectionHeading
          title={title}
          icon={icon}
          classes={classes}
        />
        <div className="h-4/5 w-full flex items-center justify-center">
          <div className="text-center">
            {/* <p className="flex flex-col text-brand-gray-400 font-medium space-y-2 py-2 md:py-5 px-2 text-center inline-block align-middle"> */}
            Coming Soon
            {/* </p> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Marketplaces;