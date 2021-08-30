import React, { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import FeedActions from "./FeedActions"
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';
import isValid from '../../utility/isValid';

const FeedsList = ({ feeds, onClickHandler }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 767px)' })
  const dispatch = useDispatch();

  const { project, livefeed } = useSelector(state => {
    return {
      livefeed: state.livefeed,
      project: state.project,
    };
  });

  const handleClick = (feedId) => {

    dispatch({
      type: ActionTypes.SET_LIVE_FEED_ID,
      data: feedId,
    });
  
    let data = livefeed.filtered_livefeeds.filter(function(item) {
      return item._id === feedId;
    });
    if(isValid(data)) {
      dispatch({
        type: ActionTypes.SET_LIVE_FEED,
        data: data[0],
      });
      if(typeof onClickHandler === "function")
        onClickHandler();
    }
  }

  const addDefaultSrc = (e) => {
    e.target.src = '../assets/images/default_image.svg';
  }

  return (
    <>
      <div className="h-full lg:border-r border-brand-gray-800 px-2 md:px-4 pt-2.5">

        {/* <!-- Live Feeds --> */}
        <div className="h-full lg:overflow-y-scroll space-y-2 lg:space-y-4.5">
          {
            livefeed.filtered_livefeeds.map((feed, index) => (
              <button key={index}
                className="w-full flex flex-wrap text-left hover:bg-brand-gray-800 rounded-lg onHover px-3.5 py-2"
                onClick={() => handleClick(feed._id)}
              >
                <div className="w-14 h-14 flex-shrink-0 rounded-md overflow-hidden">
                  <img className="w-full h-full object-cover object-center" src={feed.media} alt="" onError={addDefaultSrc} />
                </div>
                <div className="flex-1 font-medium pl-4 pr-4 lg:pr-6">
                  <h2 className="text-sm md:text-base text-brand-gray-300 leading-4">
                    {feed.title}
                  </h2>
                  <p className="text-sm text-brand-gray-500 leading-4 line-clamp-2 md:line-clamp-1">
                    {feed.description}
                  </p>
                  {
                    !isTabletOrMobile && <FeedActions feed={feed} />
                  }
                </div>
                {
                  isTabletOrMobile && <FeedActions feed={feed} />
                }

              </button>
            ))
          }

        </div>
      </div>
    </>
  )
}

export default FeedsList
