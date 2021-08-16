import React from 'react'
import data from '../data.json'
import RankingSales from "../Components/Rankings/RankingSales";
import BiggestSalesVolume from "../Components/Rankings/BiggestSalesVolume";
import BiggestSalesAmount from "../Components/Rankings/BiggestSalesAmount";
import DaySales from "../Components/Rankings/DaySales";
import Gainers from "../Components/Rankings/Gainers";
import Loosers from "../Components/Rankings/Loosers";

const Rankings = () => {
  return (
    <div className="w-full lg:overflow-hidden">
      <div className="w-full h-full grid md:grid-cols-2 lg:grid-cols-3 overflow-y-scroll">
        <BiggestSalesVolume
          projects={data.projects}
          title="Biggest sales volume"
          icon="shopping-cart"
        />
        <BiggestSalesAmount
          projects={data.projects}
          title="Biggest sales amount"
          icon="biggest-sales"
          classes="border-t"
        />
        <DaySales
          projects={data.projects}
          title="Biggest sales of the day"
          icon="top-sales"
          classes="border-t"
          day
        />
        <Gainers
          projects={data.projects}
          title="Biggest gainers"
          icon="biggest-gainers"
          classes="border-t"
        />
        <Loosers
          projects={data.projects}
          title="Biggest loosers"
          icon="biggest-loosers"
          classes="border-t"
        />
        <Gainers
          projects={data.projects}
          title="Top marketplaces"
          icon="top-marketplaces"
          classes="border-t"
        />
      </div>
    </div>
  )
}

export default Rankings
