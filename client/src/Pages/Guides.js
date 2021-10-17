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
import * as actions from '../redux/actions';
import * as ActionTypes from '../redux/ActionTypes';

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
  
  useEffect( async () => {
    // if (!_isMounted) {
      await getGuideFromUrl();
    // }
    // return () => {
    //   _isMounted.current = true;
    // };
  }, []);

  useEffect( async () => {
    await getGuideFromUrl();
  }, [window.location.pathname]);

  
  const getGuideFromUrl = async () => {
    
    setIsLoaded(false);
    setTimeout(() => {
      setIsLoaded(true);
    }, config.LOADING_TIME);

    SetProjectData(null, project, rankings, dispatch);

    let arrLocation = window.location.pathname.split('/').filter(function(el) {return isValid(el)});

    //get all guides
    let guides = [];
    if(isValid(guide.guides)) {
      guides = guide.guides;
    } else {
      let resGuide = await actions.allGuides();
      let success = false;
      try {
        success = resGuide.data.success;
        guides = resGuide.data.guides;
        if(success) {
          dispatch({
            type: ActionTypes.ALL_GUIDES,
            data: guides
          });

          //Filter guides by the selected project
          dispatch({
            type: ActionTypes.FILTERING_GUIDE_BY_PROJECT,
            projectData: isValid(project) && isValid(project.projectData) ? project.projectData : null,
          });
        } else {
          dispatch({
            type: ActionTypes.GUIDE_ERR,
            err: resGuide.data.errMessage
          });
        }
      } catch (err) {
        console.error(err);
      }
    }

    if(isValid(arrLocation) && arrLocation.length === 1)    // pathname is "guides"
      return;

    if(isValid(arrLocation) && arrLocation.length === 3 && isValid(arrLocation[arrLocation.length - 2]) && (arrLocation[arrLocation.length - 2] === "category") && isValid(arrLocation[arrLocation.length - 1]) ) {
      let unique_id = arrLocation[arrLocation.length - 1];

      let data = guides.filter(function(item) {
        return item.unique_id === unique_id;
      });

      if(isValid(data)) {
        dispatch({
          type: ActionTypes.SET_GUIDE,
          data: data[0],
        });
        setOpen(true);
      }

      console.log("aaa")
      
      // try {
      //   if(!isValid(project.projectData) || (unique_id !== project.projectData.unique_id)) {

      //   }
      // } catch (err) {

      // }
    }
  }

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
