import React from 'react'
import GainingMomenum from "../TopCollections/GainingMomenum"
import TopCollectionsSection from "../TopCollections/TopCollectionsSection"
import TopSalesSection from "../TopSales/TopSalesSection"
import Marketplaces from "../TopCollections/Marketplaces"

const RigthSide = () => {
  return (
    <div className="min-w-[320px] w-full h-full lg:col-span-2 lg:overflow-y-scroll">
      <div>
        <TopSalesSection />
        <TopCollectionsSection />
        <GainingMomenum />
        <Marketplaces />
      </div>
    </div>
  )
}

export default RigthSide
