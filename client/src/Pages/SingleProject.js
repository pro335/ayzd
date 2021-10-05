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
    if (!_isMounted) {
      const checkProjectsList = async () => {
        if(!isValid(project.projects)) {
          //get all projects
          let resProject = await actions.allProjects();
          let projects = [], success = false;
          try {
            success = resProject.data.success;
            projects = resProject.data.projects;
            if(success) {
              dispatch({
                type: ActionTypes.ALL_PROJECTS,
                data: projects
              });
            } else {
              dispatch({
                type: ActionTypes.PROJECT_ERR,
                err: resProject.data.errMessage
              });
            }
          } catch (err) {
            console.error(err);
          }
        }
      }
  
      const getProjectFromUrl = async () => {
        let arrLocation = window.location.pathname.split('/');
  
        if(isValid(arrLocation) && isValid(arrLocation[arrLocation.length - 1])) {
          let unique_id = arrLocation[arrLocation.length - 1];

          if(!isValid(project.projects)) {
            await checkProjectsList();
          }
          
          let data = project.projects.filter(function(x) {
            return x.unique_id === unique_id;
          });
    
          if(isValid(data)) {
            const item = data[0];
    
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
              projectData: data[0],
            });
    
            // get the project data(not from db)
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
    
            dispatch({
              type: ActionTypes.SET_ACTIVE_TAB,
              data: 1
            });
          } else {
            alert("Invalid url");
            history.push(`/`);
          }
        }
    
      }

      await checkProjectsList();
      await getProjectFromUrl();
    }
    return () => {
      _isMounted.current = true;
    };
  }, []);

  return (
    <div className="flex flex-col">
      <Heading />
      <Tabs />
    </div>
  )
}

export default SingleProject
