import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Sidebar from "../Components/Projects/Sidebar";
import AllProjects from "../Components/NFT/AllProjects"
import LottieAnimation from '../Components/Lottie/Lottie';
import LOTTIE_DATA from '../Components/Lottie/data.json';
import NotFound from "../Components/NFT/NotFound"
import isValid from '../utility/isValid';
import SetProjectData from '../utility/SetProjectData';
import config from '../config/config';
import Banner from "../Components/Banner/Banner";
import MainBanner from "../Components/Banner/MainBanner";
import FeedModal from "../Components/Feeds/FeedModal";

const Guides = () => {

  const dispatch = useDispatch();
  
  const { project, guide, rankings } = useSelector(state => {
    return {
      project: state.project,
      guide: state.guide,
      rankings: state.rankings,
    };
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const [open, setOpen] = useState(false);    // show the guide modal
  const _isMounted = useRef(false); // Initial value _isMounted = false

  useEffect(() => {
    // if (!_isMounted) {
      SetProjectData(null, project, rankings, dispatch);
      setTimeout(() => {
        setIsLoaded(true);
      }, config.LOADING_TIME);
    // }
    // return () => {
    //   _isMounted.current = true;
    // };
  }, []); // here

  const onClickHandler = () => {
    setOpen(!open)
  }

  return (
    <>
      <div className="h-full w-full grid lg:grid-cols-6 lg:overflow-hidden">
        <div className="hidden lg:flex flex-col">
          <Sidebar type={"guides"} />
        </div>
        <div className="h-full pb-5 lg:col-span-5 mt-0 overflow-hidden">
          <div className="h-full overflow-y-scroll">
            { isValid(project) && ( !isValid(project.projectData) || (isValid(project.projectData) && project.projectData.name === "All guides" ) ) ?
              <MainBanner onClickHandler={onClickHandler} />
              :
              <Banner type={"guides"} />
            }
            <div className="flex flex-col lg:hidden">
              <Sidebar type={"guides"} />
            </div>
            <div className="pt-2 h-full">
              { isValid(guide.guides_show_list) ?
                  <AllProjects projects={guide.guides_show_list} type="guides" onClickHandler={onClickHandler} />
                  :
                  ( !isLoaded ?
                    <div className="h-full flex flex-col justify-center items-center pb-15">
                      <LottieAnimation lotti={LOTTIE_DATA} height={50} width={50} />
                    </div>
                    :
                    <NotFound />
                  )
              }
            </div>
          </div>
        </div>
      </div>
      <FeedModal open={open} setOpen={setOpen} type={"guides"} />
    </>
  )
}

export default Guides;
