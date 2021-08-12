import React from 'react'
import SectionHeading from "./../SectionHeading";
import TopSalesList from "./TopSalesList";

const TopSalesSection = () => {
  return (
    <>
      <div>
        <SectionHeading
          title="Top sales"
          icon="top-sales"
          classes="border-t"
          buttons="view"
        />

        <div className="py-5">
          <TopSalesList />
        </div>
      </div>
    </>
  )
}

export default TopSalesSection
