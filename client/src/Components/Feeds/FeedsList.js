import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import FeedActions from "./FeedActions"
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';
import isValid from '../../utility/isValid';
import reduceTextLengh from '../../utility/reduceTextLengh';
import useWindowDimensions from '../../utility/useWindowDimensions';

const FeedsList = ({ onClickHandler }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 767px)' })
  const dispatch = useDispatch();
  const { height, width } = useWindowDimensions();

  const { project, livefeed } = useSelector(state => {
    return {
      livefeed: state.livefeed,
      project: state.project,
    };
  });

  const [numberOfShowingNews, setNumberOfShowingNews] = useState(width < 1024 && livefeed.filtered_livefeeds.length > 20 ? 20 : livefeed.filtered_livefeeds.length);

  const handleClick = (feedId) => {

    dispatch({
      type: ActionTypes.SET_LIVE_FEED_ID,
      data: feedId,
    });

    let data = livefeed.filtered_livefeeds.filter(function (item) {
      return item._id === feedId;
    });
    if (isValid(data)) {
      dispatch({
        type: ActionTypes.SET_LIVE_FEED,
        data: data[0],
      });
      if (typeof onClickHandler === "function")
        onClickHandler();
    }
  }

  const addDefaultSrc = (e) => {
    e.target.src = '/assets/images/default_livefeed_image.svg';
  }

  const loadMore = () => {
    numberOfShowingNews + 20 < livefeed.filtered_livefeeds.length ? setNumberOfShowingNews(numberOfShowingNews + 20) : setNumberOfShowingNews(livefeed.filtered_livefeeds.length);
  }

  return (
    <>
      <div className="h-full lg:border-r border-brand-gray-800 px-2 md:px-4 pt-2.5">

        {/* <!-- Live Feeds --> */}
        <div className="h-full lg:overflow-y-scroll space-y-2 lg:space-y-4.5">
          {
            livefeed.filtered_livefeeds.slice(0, numberOfShowingNews).map((feed, index) => (
              isValid(feed) ?
                <button key={index}
                  className="w-full flex flex-wrap text-left hover:bg-brand-gray-800 rounded-lg onHover px-3.5 py-2"
                  onClick={() => handleClick(feed._id)}
                >
                  <div className="w-14 h-14 flex-shrink-0 rounded-md overflow-hidden">
                    <img className="w-full h-full object-cover object-center" src={feed.media} alt="" onError={addDefaultSrc} />
                  </div>
                  <div className="flex-1 font-medium pl-4 pr-4 lg:pr-6">
                    <h2 className="text-sm md:text-base text-brand-gray-300 leading-4">
                      {reduceTextLengh(feed.title, 100)}
                    </h2>
                    <p className="text-sm text-brand-gray-500 leading-4 line-clamp-2 md:line-clamp-1">
                      {reduceTextLengh(feed.description, 100)}
                    </p>
                    {
                      !isTabletOrMobile && <FeedActions feed={feed} />
                    }
                  </div>
                  {
                    isTabletOrMobile && <FeedActions feed={feed} />
                  }
                </button>
                :
                <button key={index}
                  className="w-full flex flex-wrap text-left hover:bg-brand-gray-800 rounded-lg onHover px-3.5 py-2"
                />
            ))
          }
          {numberOfShowingNews < livefeed.filtered_livefeeds.length ?
            <button
              className="flex lg:hidden justify-center w-52 font-medium mx-auto bg-purple-500 hover:bg-purple-700 text-white leading-7 rounded-xl px-4 py-1.5 text-center"
              style={{ marginTop: '20px', marginBottom: '20px' }}
              onClick={loadMore}
            >
              Load more
            </button>
            :
            null
          }
        </div>
      </div>
    </>
  )
}

export default FeedsList
