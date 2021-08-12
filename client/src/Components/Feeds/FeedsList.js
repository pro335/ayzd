import React from 'react'
import FeedActions from "./FeedActions"
import { useMediaQuery } from 'react-responsive'

const FeedsList = ({ feeds, onClickHandler }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 767px)' })

  return (
    <>
      <div className="h-full lg:border-r border-brand-gray-800 px-2 md:px-4 pt-2.5">

        {/* <!-- Live Feeds --> */}
        <div className="h-full lg:overflow-y-scroll space-y-2 lg:space-y-4.5">
          {
            feeds.map((feed, index) => (
              <button key={index}
                className="w-full flex flex-wrap text-left hover:bg-brand-gray-800 rounded-lg onHover px-3.5 py-2"
                onClick={onClickHandler}
              >
                <div className="w-14 h-14 flex-shrink-0 rounded-md overflow-hidden">
                  <img className="w-full h-full object-cover object-center" src="../assets/feeds/red-bull.png" alt="" />
                </div>
                <div className="flex-1 font-medium pl-4 pr-4 lg:pr-6">
                  <h2 className="text-sm md:text-base text-brand-gray-300 leading-4">
                    {feed.name}
                  </h2>
                  <p className="text-sm text-brand-gray-500 leading-4 line-clamp-2 md:line-clamp-1">
                    {feed.text}
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
