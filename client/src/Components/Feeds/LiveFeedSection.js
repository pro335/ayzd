import React from 'react'
import SectionHeading from "../SectionHeading"
import FeedsList from "./FeedsList"
import data from '../../data.json'

const LiveFeedSection = ({ onClickHandler }) => {
  return (
    <div className="h-full md:col-span-3 lg:overflow-hidden">

      {/* <!-- Center Heading --> */}
      <SectionHeading
        title="Live news feed"
        icon="live-feed"
        buttons="all"
        classes="lg:border-r"
      />
      {/* <!-- End --> */}


      <FeedsList feeds={data.livenews} onClickHandler={onClickHandler} />
    </div>
  )
}

export default LiveFeedSection
