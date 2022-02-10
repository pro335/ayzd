import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import SectionHeading from "../SectionHeading"
import FeedsList from "./FeedsList"
import Banner from "../Banner/Banner";
import isValid from '../../utility/isValid';
import LottieAnimation from '../Lottie/Lottie';
import LOTTIE_DATA from '../Lottie/data.json';
import NotFound from "../NFT/NotFound"
import config from '../../config/config';

const LiveFeedSection = ({ showDetailsPanel = false, onClickHandler }) => {

  const { project, livefeed } = useSelector(state => {
    return {
      project: state.project,
      livefeed: state.livefeed,
    };
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const _isMounted = useRef(false); // Initial value _isMounted = false

  useEffect(() => {
    if (!_isMounted) {
      setTimeout(() => {
        setIsLoaded(true);
      }, config.LOADING_TIME);
    }
    return () => {
      _isMounted.current = true;
    };
  }, []); // here

  return (
    <div className="h-full md:col-span-3 lg:overflow-hidden">
      {showDetailsPanel && isValid(project.project_id) && isValid(project.projectData) && (project.projectData.name !== "Smart feed" && project.projectData.name !== "Metaverse") ?
        <Banner />
        :
        null
      }

      {/* <!-- Center Heading --> */}
      <SectionHeading
        title="Live news feed"
        icon="live-feed"
        buttons=""
        classes="lg:border-r"
      />
      {/* <!-- End --> */}

      <div className="h-full flex flex-col justify-center items-center pb-15">
        <LottieAnimation lotti={LOTTIE_DATA} height={50} width={50} />
      </div>
      {/* { isValid(livefeed.filtered_livefeeds) ?
          <FeedsList onClickHandler={onClickHandler} />
          :
          ( !isLoaded ?
            <div className="h-full flex flex-col justify-center items-center pb-15">
              <LottieAnimation lotti={LOTTIE_DATA} height={50} width={50} />
            </div>
            :
            <div className="h-full pb-20 lg:pb-52">
              <NotFound />
            </div>
          )
        } */}
    </div>
  )
}

export default LiveFeedSection
