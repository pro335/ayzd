import { ArrowNarrowRightIcon } from "@heroicons/react/solid";
import React from 'react'
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="relative flex flex-col md:flex-row md:items-center justify-between bg-base z-40 px-5 py-5 md:pl-9 md:pr-6 mt-5 lg:mt-0" >
      <div>
        <h4 className="text-lg text-gray-100 font-bold leading-6">
          Visit full project page
        </h4>
        <p className="text-sm font-medium text-white text-opacity-60">
          Detailed information, statistics, list of minted nft’s and more
        </p>
      </div>
      <div className="mt-2">
        <Link to="/projects/decentraland" className="h-10 block bg-black bg-opacity-70 text-white text-opacity-60 hover:bg-opacity-100 hover:text-opacity-100 inline-flex items-center rounded-lg px-4">
          <span>Project details</span>
          <ArrowNarrowRightIcon className="h-6 w-4 onHover ml-2" />
        </Link>
      </div>

      <img className="w-full h-full absolute top-0 left-0 opacity-20 -z-1" src="../assets/images/trending-banner.png" alt="" />
    </div>
  )
}

export default Banner
