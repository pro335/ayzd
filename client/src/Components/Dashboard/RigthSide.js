import React from 'react'
import GainingMomenum from "../TopCollections/GainingMomenum"
import TopCollectionsSection from "../TopCollections/TopCollectionsSection"
import TopSalesSection from "../TopSales/TopSalesSection"
import Marketplaces from "../Rankings/Marketplaces";

const RigthSide = () => {
  return (
    <div className="min-w-[320px] w-full h-full lg:col-span-2 lg:overflow-y-scroll">
      <div>
        <TopSalesSection />
        <TopCollectionsSection />
        <GainingMomenum />
        <Marketplaces
          title="NFT tokens by market cap today"
          icon="tokens_market_cap"
          classes="border-t"
          count={5}
        />
      </div>
    </div>
  )
}

export default RigthSide
