import { ArrowNarrowRightIcon } from "@heroicons/react/solid";
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import * as ActionTypes from '../../redux/ActionTypes';

const MainBanner = ({onClickHandler}) => {

  const dispatch = useDispatch();

  const { guide } = useSelector(state => {
    return {
      guide: state.guide,
    };
  });

  const handleClick = () => {
    dispatch({
      type: ActionTypes.SET_GUIDE,
      data: guide.guides[0],
    });
    if(typeof onClickHandler === "function")
      onClickHandler();
  }

  return (
    <>
      {/* code duplicated - for desktop size */}
      <div 
        className="hidden md:flex h-40 lg:h-72 relative flex-col md:flex-row md:items-center justify-between z-40 px-5 py-5 md:pl-9 md:pr-6 mt-0 bg-center bg-cover bg-no-repeat" 
        style={{backgroundImage: "url(../assets/images/main-banner-bg.png)"}}
      >
        <div className="flex flex-col">
          <h4 className="text-xl text-gray-100 text-center md:text-left font-bold leading-6">
            Getting started with NFTs
          </h4>
          <p className="text-sm font-medium text-white text-center md:text-left text-opacity-60">
            Easy and comprehensive guide to the NFT world
          </p>
          <button className="h-10 w-40 lg:w-35 md:w-40 block bg-brand-AYZD-PURPLE text-white hover:bg-purple-700 inline-flex items-center rounded-lg px-4 mt-4 mx-auto md:mx-0" onClick={handleClick}>
            <span>Start learning</span>
            <ArrowNarrowRightIcon className="h-6 w-4 onHover ml-2" />
          </button>
        </div>

        {/* <img className="w-full h-full absolute top-0 left-0 -z-1 object-cover" src="../assets/images/main-banner-bg.png" alt="" /> */}
      </div>

      {/* code duplicated - for mobile size */}
      <div 
        className="flex md:hidden h-40 lg:h-72 relative flex-col md:flex-row md:items-center justify-between z-40 px-5 py-5 md:pl-9 md:pr-6 mt-0 bg-center bg-cover bg-no-repeat" 
        style={{backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.49), rgba(0, 0, 0, 0.49)), url(../assets/images/main-banner-bg.png)"}}
      >
        <div className="flex flex-col">
          <h4 className="text-xl text-gray-100 text-center md:text-left font-bold leading-6">
            Getting started with NFTs
          </h4>
          <p className="text-sm font-medium text-white text-center md:text-left text-opacity-60">
            Easy and comprehensive guide to the NFT world
          </p>
          <button className="h-10 w-40 lg:w-35 md:w-40 block bg-brand-AYZD-PURPLE text-white hover:bg-purple-700 inline-flex items-center rounded-lg px-4 mt-4 mx-auto md:mx-0" onClick={handleClick}>
            <span>Start learning</span>
            <ArrowNarrowRightIcon className="h-6 w-4 onHover ml-2" />
          </button>
        </div>
      </div>
    </>
  )
}

export default MainBanner
