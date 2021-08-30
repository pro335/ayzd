import React from 'react'
import SectionHeading from "./../SectionHeading";
import TopSalesList from "./TopSalesList";
import LottieAnimation from '../Lottie/Lottie';
import LOTTIE_DATA from '../Lottie/data.json';
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';

const TopSalesSection = () => {
  
  const { daySales } = useSelector(state => {
    return {
      daySales: state.daySales,
    };
  });

  return (
    <>
      <div>
        <SectionHeading
          title="Top sales"
          icon="top-sales"
          classes="border-t"
          buttons="view"
          btnLink="/rankings"
        />

        { !isValid(daySales.daySales) ?
          <div className="h-full flex flex-col justify-center items-center py-20">
            <LottieAnimation lotti={LOTTIE_DATA} height={50} width={50} />
          </div>
          :
          <div className="py-5">
            <TopSalesList />
          </div>
        }          
      </div>
    </>
  )
}

export default TopSalesSection
