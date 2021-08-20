import React from 'react'
import SectionHeading from "../SectionHeading"
import TrendingNFT from "./TrendingNFT";

const NFTSliders = ({ title, icon, classes, type }) => {
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
        {type === "trending-nft" ?
          <TrendingNFT />
          :
          null
          // <TrendingNFT />
        }
      </div>
    </div>
  )
}

export default NFTSliders
