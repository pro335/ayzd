import React, {useState, useEffect} from 'react'
import { useSelector} from 'react-redux';
import SectionHeading from "../SectionHeading"
import FeedsList from "./FeedsList"
import Banner from "../NBA/Banner";
import data from '../../data.json'
import isValid from '../../utility/isValid';
import LottieAnimation from '../Lottie/Lottie';
import LOTTIE_DATA from '../Lottie/data.json';
import NotFound from "../NFT/NotFound"

const LiveFeedSection = ({ showDetailsPanel=false, onClickHandler }) => {

  const { project, livefeed } = useSelector( state => {
    return {
      project: state.project,
      livefeed: state.livefeed,
    };
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 3000);
  }, []); // here

  return (
      <div className="h-full md:col-span-3 lg:overflow-hidden">
        {showDetailsPanel && isValid(project.project_id) && project.projectData.name !== "Smart feed" ?
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

        { isValid(livefeed.filtered_livefeeds) ?
          <FeedsList feeds={data.livenews} onClickHandler={onClickHandler} />
          :
          ( !isLoaded ?
            <div className="h-full flex flex-col justify-center items-center pb-15">
              <LottieAnimation lotti={LOTTIE_DATA} height={50} width={50} />
            </div>
            :
            <div className="h-full pb-15 lg:pb-42">
              <NotFound />
            </div>
          )
        }
      </div>
  )
}

export default LiveFeedSection
