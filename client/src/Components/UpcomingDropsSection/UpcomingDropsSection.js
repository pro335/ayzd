import React from 'react'
import SectionHeading from "./../SectionHeading";
import UpcomingDropsList from "./UpcomingDropsList";
import LottieAnimation from '../Lottie/Lottie';
import LOTTIE_DATA from '../Lottie/data.json';
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';

const UpcomingDropsSection = () => {

  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  return (
    <>
      <div>
        <SectionHeading
          title="Upcoming drops"
          icon="calendar_white_icon"
          classes="border-t"
          buttons="View All"
          btnLink="/drops"
        />
        {!isValid(project.upcoming_show_list) ?
          <div className="h-full flex flex-col justify-center items-center py-20">
            <LottieAnimation lotti={LOTTIE_DATA} height={50} width={50} />
          </div>
          :
          <div className="py-5">
            <UpcomingDropsList />
          </div>
        }
      </div>
    </>
  )
}

export default UpcomingDropsSection
