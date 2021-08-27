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
          type: ActionTypes.SORTING_LIVE_FEED_BY_PROJECT,
          project_id: item._id,
        });

        // get the project data(not from db)
        let volume = null, isBySellerCount = null, isBySalesVolume = null;
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

        let projectDataNotDatabase = {
          volume,
          isBySellerCount,
          isBySalesVolume,
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
  }, []);

  return (
    <>
      <Heading />
      <Tabs />
    </>
  )
}

export default SingleProject
