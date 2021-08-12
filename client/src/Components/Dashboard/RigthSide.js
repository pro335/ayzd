import React from 'react'
import GainingMomenum from "../TopCollections/GainingMomenum"
import TopCollectionsSection from "../TopCollections/TopCollectionsSection"
import TopSalesSection from "../TopSales/TopSalesSection"
import data from '../../data.json'

const RigthSide = () => {
  return (
    <div className="min-w-[320px] w-full h-full lg:col-span-2 lg:overflow-y-scroll">
      <div>
        <TopSalesSection />
        <TopCollectionsSection projects={data.projects} />
        <GainingMomenum projects={data.projects} />
      </div>
    </div>
  )
}

export default RigthSide
