import React from 'react'
import { useMediaQuery } from 'react-responsive'

const FeedActions = ({ feed: { type, time, web, comments } }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 767px)' })

  let marketType, typeColor;

  if (type === "Bearish") {
    marketType = 'Bearish'
    typeColor = 'dark-red'
  } else if (type === "Bullish") {
    marketType = 'Bullish'
    typeColor = 'green'
  } else {
    marketType = 'LMAO'
    typeColor = 'yellow'
  }

  return (
    <>
      <div className={`
      flex items-center text-xs text-brand-gray-600 font-medium mt-0.5 ${isTabletOrMobile ? 'w-full justify-between pr-2' : 'space-x-3'
        }`}
      >
        <p className={`bg-brand-${typeColor} bg-opacity-20 flex items-center rounded-full px-2.5 py-1`}>
          <img src={`../assets/icons/${marketType.toLowerCase()}.svg`} alt="" />
          <span className={`text-xxs text-brand-${typeColor}  font-semibold ml-1`}>
            {marketType}
          </span>
        </p>
        <p className="flex items-center">
          <img src="assets/icons/clock.svg" alt="" />
          <span className="ml-1.5">
            {time}
          </span>
        </p>
        <p className="flex items-center">
          <img src="assets/icons/web.svg" alt="" />
          <span className="ml-1.5">{web}</span>
        </p>
        <p className="flex items-center">
          <img src="assets/icons/comment.svg" alt="" />
          <span className="ml-1.5">{comments}</span>
        </p>
      </div>
    </>
  )
}

export default FeedActions
