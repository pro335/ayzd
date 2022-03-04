import React from 'react'
import UpcomingDropsSection from "../UpcomingDropsSection/UpcomingDropsSection"
import MetaverseProjectsSection from "../MetaverseProjectsSection/MetaverseProjectsSection"
import FeaturedGuideSection from "../FeaturedGuideSection/FeaturedGuideSection"

import GainingMomenum from "../TopCollections/GainingMomenum"
import TopCollectionsSection from "../TopCollections/TopCollectionsSection"
import TopSalesSection from "../TopSales/TopSalesSection"
import Marketplaces from "../TopCollections/Marketplaces"

const RigthSide = () => {
  return (
    <div className="min-w-[320px] w-full h-full lg:col-span-2 lg:overflow-y-scroll">
      <div>
        <UpcomingDropsSection />
        <MetaverseProjectsSection />
        <FeaturedGuideSection />

        {/* <TopSalesSection />
        <TopCollectionsSection />
        <GainingMomenum />
        <Marketplaces /> */}
      </div>
    </div>
  )
}

export default RigthSide
