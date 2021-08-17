import React from 'react'
import { useMediaQuery } from 'react-responsive'
import reduceTextLengh from '../../utility/reduceTextLengh';

var moment = require('moment');

const FeedActions = ({ feed: { tag, created_time, link, comments } }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 767px)' })

  let marketType, tagColor;

  if (tag === 1) {
    marketType = 'Bearish'
    tagColor = 'dark-red'
  } else if (tag === 2) {
    marketType = 'Bullish'
    tagColor = 'green'
  } else if (tag === 3) {
    marketType = 'LMAO'
    tagColor = 'yellow'
  } else {
    marketType = 'not-found'
    tagColor = 'white'
  }

  return (
    <>
      <div className={`
      flex items-center text-xs text-brand-gray-600 font-medium mt-0.5 ${isTabletOrMobile ? 'w-full justify-between pr-2' : 'space-x-3'
        }`}
      >
        {tag !== 0 ?
          <p className={`bg-brand-${tagColor} bg-opacity-20 flex items-center rounded-full px-2.5 py-1`}>
            <img src={`../assets/icons/${marketType.toLowerCase()}.svg`} alt="" />
            <span className={`text-xxs text-brand-${tagColor}  font-semibold ml-1`}>
              {marketType}
            </span>
          </p>
          :
          null
        }
        <p className="flex items-center">
          <img src="assets/icons/clock.svg" alt="" />
          <span className="ml-1.5">
            {moment(created_time).fromNow()}
          </span>
        </p>
        <p className="flex items-center">
          <img src="assets/icons/web.svg" alt="" />
          <span className="ml-1.5">{reduceTextLengh(link, 15)}</span>
        </p>
        {/* <p className="flex items-center">
          <img src="assets/icons/comment.svg" alt="" />
          <span className="ml-1.5">{tag}</span>
        </p> */}
      </div>
    </>
  )
}

export default FeedActions
