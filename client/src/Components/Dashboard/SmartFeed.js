import React, { useState } from 'react';
import RigthSide from "./RigthSide";
import FeedModal from "./../Feeds/FeedModal";
import LiveFeedSection from "./../Feeds/LiveFeedSection";

const SmartFeed = () => {

  const [open, setOpen] = useState(false)

  const onClickHandler = () => {
    setOpen(!open)
  }
  return (
    <>
      <LiveFeedSection showDetailsPanel={true} onClickHandler={onClickHandler} />
      <RigthSide />

      <FeedModal open={open} setOpen={setOpen} />
    </>
  )
}

export default SmartFeed
