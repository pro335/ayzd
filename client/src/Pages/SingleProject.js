import React, { useEffect, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import Heading from "../Components/SingleProject/Heading"
import Tabs from "../Components/SingleProject/Tabs"
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../utility/isValid';
import SetProjectData from '../utility/SetProjectData';
import config from '../config/config';
import * as actions from '../redux/actions';
import * as ActionTypes from '../redux/ActionTypes';
import LottieAnimation from '../Components/Lottie/Lottie';
import LOTTIE_DATA from '../Components/Lottie/data.json';
import NotFound from "../Components/NFT/NotFound"
import { Helmet } from 'react-helmet'

const SingleProject = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  
  const { project, rankings, livefeed } = useSelector(state => {
    return {
      project: state.project,
      rankings: state.rankings,
      livefeed: state.livefeed,
    };
  });

  const _isMounted = useRef(false); // Initial value _isMounted = false
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect( async () => {
    // if (!_isMounted) {
      await getProjectFromUrl();
    // }
    // return () => {
    //   _isMounted.current = true;
    // };
  }, []);

  useEffect( async () => {
    await getProjectFromUrl();
  }, [project.projects]);

  const getProjectFromUrl = async () => {
    
    setIsLoaded(false);
    setTimeout(() => {
      setIsLoaded(true);
    }, config.LOADING_TIME);

    let arrLocation = window.location.pathname.split('/');

    if(isValid(arrLocation) && isValid(arrLocation[arrLocation.length - 1])) {
      let unique_id = arrLocation[arrLocation.length - 1];

      let data = null;
      
      try {
        if(!isValid(project.projectData) || ( isValid(project.projectData) && (unique_id !== project.projectData.unique_id) ) ) {

          dispatch({
            type: ActionTypes.SET_PROJECT,
            data: null,
          });
        
          data = await actions.getProjectFromUniqueId({unique_id});

          if(isValid(data)) {
            let item = data.data.data[0];

            // if livefeeds is not valid
            if(!isValid(livefeed)) {
              let resLivefeed = await actions.allLivefeeds();
              let livefeeds = [], success = false;
              try {
                success = resLivefeed.data.success;
                livefeeds = resLivefeed.data.livefeeds;
                if(success) {
                  dispatch({
                    type: ActionTypes.ALL_LIVE_FEEDS,
                    data: livefeeds
                  });
                } else {
                  dispatch({
                    type: ActionTypes.LIVE_FEED_ERR,
                    err: resLivefeed.data.errMessage
                  });
                }
              } catch (err) {
                console.error(err);
              }
            }

            SetProjectData(item, project, rankings, dispatch);

            // if discord(twitter) link is valid, but discord(twitter) members is not valid, update the discord(twitter) members
            if(isValid(project.discord_link) && !isValid(project.discord_members)) {
              try {
                await actions.updateDiscordMembersForOneProject(item);
              } catch(err) {
                console.log("discord data getting error!", err);
              }
            }

            if(isValid(project.twitter_link) && !isValid(project.twitter_members)) {
              try {
                await actions.updateTwitterMembersForOneProject(item);
              } catch( err ) {
                console.log("twitter data getting error!", err);
              }
            }

          } else {
            alert("Invalid url");
            history.push(`/`);
          }
        }
      } catch(err) {
        console.log("~error", err);
      }
    }
  }

  return (
    <div className="flex flex-col h-full">
      <Helmet>
        <title>{ `${isValid(project) && isValid(project.projectData) ? project.projectData.name : ""} - nft project on ayzd.com` }</title>
      </Helmet>
      {isValid(project) && isValid(project.projectData) ?
        <>
          <Heading />
          <Tabs />
        </>
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
  )
}

export default SingleProject
