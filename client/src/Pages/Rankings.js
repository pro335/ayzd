import React from 'react'
import RankingSales from "../Components/Rankings/RankingSales";
import BiggestSalesVolume from "../Components/Rankings/BiggestSalesVolume";
import BiggestSalesAmount from "../Components/Rankings/BiggestSalesAmount";
import DaySales from "../Components/Rankings/DaySales";
import Gainers from "../Components/Rankings/Gainers";
import Loosers from "../Components/Rankings/Loosers";
import Marketplaces from "../Components/Rankings/Marketplaces";

const Rankings = () => {
  return (
    <div className="w-full lg:overflow-hidden">
      <div className="w-full h-full grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 overflow-y-scroll">
        <BiggestSalesAmount
          title="Biggest all time sales amount"
          icon="shopping-cart"
        />
        <BiggestSalesVolume
          title="Biggest all time sales volume"
          icon="biggest-sales"
          classes="border-t"
        />
        <DaySales
          title="Biggest sales of the day"
          icon="top-sales"
          classes="border-t"
          day
        />
        <Gainers
          title="Biggest gainers this month"
          icon="biggest-gainers"
          classes="border-t"
        />
        <Loosers
          title="Biggest losers this month"
          icon="biggest-loosers"
          classes="border-t"
        />
        <Marketplaces
          title="NFT tokens by market cap today"
          icon="tokens_market_cap"
          classes="border-t"
        />
      </div>
    </div>
  )
}

export default Rankings
