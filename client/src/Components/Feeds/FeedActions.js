import React from 'react'
import { useMediaQuery } from 'react-responsive'
import reduceTextLengh from '../../utility/reduceTextLengh';
import isValid from '../../utility/isValid';

var moment = require('moment');

const FeedActions = ({ feed: { tag, created_time, link, project, comments } }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 767px)' })

  let marketType, tagColor, bgColor = 'rgba(123, 97, 255, 0.2)';

  if (tag === 1) {
    marketType = 'Bearish';
    tagColor = '#BD2150';
    bgColor = 'rgba(189, 33, 80, 0.2)';
  } else if (tag === 2) {
    marketType = 'Bullish';
    tagColor = '#20E77B';
    bgColor = 'rgba(32, 231, 123, 0.13)';
  } else if (tag === 3) {
    marketType = 'LMAO';
    tagColor = '#D3B23D';
    bgColor = 'rgba(211, 178, 61, 0.1)';
  } else if (tag === 4) {
    marketType = 'Investment';
    tagColor = '#7B61FF';
    bgColor = 'rgba(123, 97, 255, 0.2)';
  } else if (tag === 5) {
    marketType = 'Interesting';
    tagColor = '#05FCED';
    bgColor = 'rgba(5, 252, 237, 0.13)';
  } else if (tag === 6) {
    marketType = 'Hot';
    tagColor = '#FF772B';
    bgColor = 'rgba(211, 88, 61, 0.1)';
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
          <p className={`bg-opacity-20 flex items-center rounded-full px-2.5 py-1`} style={{backgroundColor: bgColor}}>
            <img src={`../assets/icons/${marketType.toLowerCase()}.svg`} alt="" />
            <span className={`font-semibold ml-1`} style={{color: tagColor, fontSize: "10px"}}>
              {marketType}
            </span>
          </p>
          :
          null
        }
        <p className="flex items-center">
          <img src="../assets/icons/clock.svg" alt="" />
          <span className="ml-1.5">
            {moment(created_time).fromNow()}
          </span>
        </p>
        <p className="flex items-center">
          <img src="../assets/icons/web.svg" alt="" />
          <span className="ml-1.5">{reduceTextLengh(link, 15)}</span>
        </p>
        {/* <p className="flex items-center">
          <img src="../assets/icons/comment.svg" alt="" />
          <span className="ml-1.5">{tag}</span>
        </p> */}
      </div>
    </>
  )
}

export default FeedActions
