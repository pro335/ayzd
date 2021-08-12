import React from 'react'
import SectionHeading from "../SectionHeading"
import TrendingNFT from "./TrendingNFT";

const NFTSliders = ({ title, icon, classes }) => {
  return (
    <div>
      <div>
        <SectionHeading
          title={title}
          icon={icon}
          classes={classes}
        />
      </div>
      <div className="py-5">
        <TrendingNFT />
      </div>
    </div>
  )
}

export default NFTSliders
