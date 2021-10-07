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
    <div className="h-40 relative flex flex-col md:flex-row md:items-center justify-between bg-base z-40 px-5 py-5 md:pl-9 md:pr-6 mt-5 lg:mt-0">
      <div>
        <h4 className="text-xl text-gray-100 font-bold leading-6">
          Getting started with NFTs
        </h4>
        <p className="text-sm font-medium text-white text-opacity-60">
          Easy and comprehensive guide to the NFT world
        </p>
        <button className="h-10 lg:w-35 md:w-40 block bg-brand-AYZD-PURPLE text-white hover:bg-purple-700 inline-flex items-center rounded-lg px-4 mt-4" onClick={handleClick}>
          <span>Start learning</span>
          <ArrowNarrowRightIcon className="h-6 w-4 onHover ml-2" />
        </button>
      </div>

      <img className="w-full h-full absolute top-0 left-0 -z-1" src="../assets/images/main-banner-bg.png" alt="" />
    </div>
  )
}

export default MainBanner
