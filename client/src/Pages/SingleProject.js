import React, { useEffect, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom';
import Heading from "../Components/SingleProject/Heading"
import Tabs from "../Components/SingleProject/Tabs"
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../utility/isValid';
import config from '../config/config';
import * as actions from '../redux/actions';
import * as ActionTypes from '../redux/ActionTypes';

const SingleProject = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  
  const { project, rankings } = useSelector(state => {
    return {
      project: state.project,
      rankings: state.rankings,
    };
  });
  const _isMounted = useRef(false); // Initial value _isMounted = false

  useEffect( async () => {
    // if (!_isMounted) {
      const getProjectFromUrl = async () => {
        let arrLocation = window.location.pathname.split('/');
  
        if(isValid(arrLocation) && isValid(arrLocation[arrLocation.length - 1])) {
          let unique_id = arrLocation[arrLocation.length - 1];

          let data = null;
          
          try {
            data = await actions.getProjectFromUniqueId({unique_id});

            if(isValid(data)) {
              let item = data.data.data[0];
      
              dispatch({
                type: ActionTypes.SET_PROJECT_ID,
                data: item._id,
              });
            
              dispatch({
                type: ActionTypes.SET_PROJECT,
                data: item,
              });
      
              //Sort the livefeednews by the selected project
              dispatch({
                type: ActionTypes.FILTERING_LIVE_FEED_BY_PROJECT,
                projectData: item,
              });
      
              dispatch({
                type: ActionTypes.SET_ACTIVE_TAB,
                data: 1
              });
            } else {
              alert("Invalid url");
              history.push(`/`);
            }
          } catch(err) {
            console.log("~error", err);
          }
        }
    
      }

      await getProjectFromUrl();
    // }
    // return () => {
    //   _isMounted.current = true;
    // };
  }, []);

  useEffect( async () => {
    // set the project data(not from db)
    const setProjectDataNotDatabase = async () => {

      if(isValid(project) && isValid(project.projectData)) {
        let item = project.projectData;
        let volume = null, isBySellerCount = null, isBySalesVolume = null, discord_members = null, twitter_members = null;
        rankings.topCollections.map(one_item => {
          if(item.name === one_item.name)
            volume = one_item.price;
        })

        rankings.topCollections.slice(0, 8).map((one_item, index) => {
          if(item.name === one_item.name)
            isBySellerCount = {
              value: index,
              flag: true
            };
        })

        rankings.biggestSalesAmount.slice(0, 8).map((one_item, index) => {
          if(item.name === one_item.name)
            isBySalesVolume =  {
              value: index,
              flag: true
            };
        })

        // get the twitter numbers & discord numbers
        try {
          let resData = await actions.updateDiscordMembersForOneProject(item);
          let { success, data } = resData.data;
          if(success) {
            discord_members = data;
          }
        } catch(err) {
          console.log("discord data getting error!", err);
        }

        try {
          let resData = await actions.updateTwitterMembersForOneProject(item);
          let { success, data } = resData.data;
          if(success) {
            twitter_members = data;
          }
        } catch( err ) {
          console.log("twitter data getting error!", err);
        }

        let projectDataNotDatabase = {
          ...project.projectDataNotDatabase,
          volume,
          isBySellerCount,
          isBySalesVolume,
          discord_members,
          twitter_members,
        }

        dispatch({
          type: ActionTypes.SET_PROJECT_NOT_DB,
          data: projectDataNotDatabase,
        });
      }
    }

    await setProjectDataNotDatabase();
  }, [rankings])

  return (
    <div className="flex flex-col">
      {isValid(project) && isValid(project.projectData) ?
        <>
          <Heading />
          <Tabs />
        </>
        :
        null
      }
    </div>
  )
}

export default SingleProject
