import React from 'react'
import Banner from "./Banner";
import SectionHeading from "./../SectionHeading";
import TrendingNFT from "./../SingleProject/TrendingNFT";
import FeedsList from "./../Feeds/FeedsList";
import data from '../../data.json'

const NBA = () => {
  return (
    <>
      <div className="min-w-[320px] h-full lg:col-span-3 lg:overflow-hidden">
        <div className="h-full border-r border-brand-gray-800 overflow-y-scroll">
          <Banner />
          <div className="w-full">
            <SectionHeading
              title="Trending nfts"
              icon="trending-nft"
            />
            <div className="py-5">
              <TrendingNFT />
            </div>
          </div>

          <div>
            <SectionHeading
              title="Top sales of the day"
              icon="shopping-cart"
              classes="border-t"
            />
            <div className="py-5">
              <TrendingNFT />
            </div>
          </div>
        </div>
      </div>

      <div className="h-full flex flex-col lg:col-span-2 overflow-hidden">
        <SectionHeading
          title="News feed"
          icon="live-feed"
          classes="border-t"
        />

        <FeedsList feeds={data.livenews} />
      </div>
    </>
  )
}

export default NBA
