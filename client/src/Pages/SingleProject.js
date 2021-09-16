import React, { useEffect } from 'react'
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
  
  const { project, topCollections, biggestSalesAmount } = useSelector(state => {
    return {
      project: state.project,
      topCollections: state.topCollections,
      biggestSalesAmount: state.biggestSalesAmount,
    };
  });

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
  
      const getProjectFromUrl = async () => {
        let arrLocation = window.location.pathname.split('/');
  
        if(isValid(arrLocation) && isValid(arrLocation[arrLocation.length - 1])) {
          let unique_id = arrLocation[arrLocation.length - 1];
          
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
            topCollections.topCollections.map(one_item => {
              if(item.name === one_item.name)
                volume = one_item.price;
            })
    
            topCollections.topCollections.slice(0, 8).map((one_item, index) => {
              if(item.name === one_item.name)
                isBySellerCount = {
                  value: index,
                  flag: true
                };
            })
    
            biggestSalesAmount.biggestSalesAmount.slice(0, 8).map((one_item, index) => {
              if(item.name === one_item.name)
                isBySalesVolume =  {
                  value: index,
                  flag: true
                };
            })
    
            // get the twitter numbers & discord numbers
            if(isValid(item.discord_link)) {
              let resData = await actions.fetchDiscordMembersForOneProject({url: item.discord_link});
              let { success, data } = resData.data;
              if(success) {
                discord_members = data;
              }
            }

            if(isValid(item.twitter_link)) {
              let resData = await actions.fetchTwitterMembersForOneProject({url: item.twitter_link});
              let { success, data } = resData.data;
              if(success) {
                twitter_members = data;
              }
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
  
      getProjectFromUrl();
    }
    return () => {
      unmounted = true;
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
