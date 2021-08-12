import React from 'react'
import data from '../data.json'
import { RankingSales } from "../Components/Rankings/RankingSales";

const Rankings = () => {
  return (
    <div className="w-full lg:overflow-hidden">
      <div className="w-full h-full grid md:grid-cols-2 lg:grid-cols-3 overflow-y-scroll">
        <RankingSales
          projects={data.projects}
          title="Biggest sales volume"
          icon="shopping-cart"
        />
        <RankingSales
          projects={data.projects}
          title="Biggest sales amount"
          icon="biggest-sales"
          classes="border-t"
        />
        <RankingSales
          projects={data.projects}
          title="Biggest sales of the day"
          icon="top-sales"
          classes="border-t"
          day
        />
        <RankingSales
          projects={data.projects}
          title="Biggest gainers"
          icon="biggest-gainers"
          classes="border-t"
        />
        <RankingSales
          projects={data.projects}
          title="Biggest loosers"
          icon="biggest-loosers"
          classes="border-t"
        />
        <RankingSales
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
