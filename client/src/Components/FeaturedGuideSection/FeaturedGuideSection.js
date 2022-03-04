import React from 'react'
import SectionHeading from "./../SectionHeading";
import FeaturedGuideList from "./FeaturedGuideList";
import LottieAnimation from '../Lottie/Lottie';
import LOTTIE_DATA from '../Lottie/data.json';
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';

const FeaturedGuideSection = () => {

  const { guide } = useSelector(state => {
    return {
      guide: state.guide,
    };
  });

  return (
    <>
      <div>
        <SectionHeading
          title="Featured guides"
          icon="featuredguide"
          classes="border-t"
          buttons="All guides"
          btnLink="/guides"
        />
        {!isValid(guide.guides) ?
          <div className="h-full flex flex-col justify-center items-center py-20">
            <LottieAnimation lotti={LOTTIE_DATA} height={50} width={50} />
          </div>
          :
          <div className="py-5">
            <FeaturedGuideList />
          </div>
        }
      </div>
    </>
  )
}

export default FeaturedGuideSection
