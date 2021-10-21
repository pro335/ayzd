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
import { Helmet } from 'react-helmet'

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
  const [title, setTitle] = useState("NFT Guides on ayzd.com: research, analytics, axie infinity guides, zed run guides, how to guides for opensea and other platforms, videos and many more");
  const _isMounted = useRef(false); // Initial value _isMounted = false
  
  // useEffect( async () => {
  //   // if (!_isMounted) {
  //     await getGuideFromUrl();
  //   // }
  //   // return () => {
  //   //   _isMounted.current = true;
  //   // };
  // }, []);

  useEffect( async () => {
    await getGuideFromUrl();
  }, [window.location.pathname]);

  
  const getGuideFromUrl = async () => {
    
    setIsLoaded(false);
    setTimeout(() => {
      setIsLoaded(true);
    }, config.LOADING_TIME);

    let arrLocation = window.location.pathname.split('/').filter(function(el) {return isValid(el)});

    SetProjectData(null, project, rankings, dispatch);

    //get all guides
    if(!isValid(guide) || (isValid(guide) && !isValid(guide.guides))) {
      let resGuide = await actions.allGuides();
      let success = false;
      try {
        success = resGuide.data.success;
        let guides = resGuide.data.guides;
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

    if(isValid(arrLocation) && arrLocation.length === 1) {   // pathname is "guides"
      setTitle("NFT Guides on ayzd.com: research, analytics, axie infinity guides, zed run guides, how to guides for opensea and other platforms, videos and many more");
      return;
    }

    if(isValid(arrLocation) && arrLocation.length === 3 && isValid(arrLocation[arrLocation.length - 2]) && isValid(arrLocation[arrLocation.length - 1]) ) {
      let project_unique_id = arrLocation[arrLocation.length - 2];
      let guide_unique_id = arrLocation[arrLocation.length - 1];

      let data = await actions.getGuideFromUniqueId({ project_unique_id, guide_unique_id });

      if(isValid(data)) {
        let item = data.data.data;
        dispatch({
          type: ActionTypes.SET_GUIDE,
          data: item,
        });
        setOpen(true);
        setTitle(`${item.title} - NFT guides and analytics on ayzd.com`);
      }
    }
  }

  const onClickHandler = () => {
    setOpen(!open)
  }

  return (
    <>
      <Helmet>
        <title>{ title }</title>
      </Helmet>
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
