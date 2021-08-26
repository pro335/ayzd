import React from 'react'
import SectionHeading from "./../SectionHeading";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';
import config from '../../config/config';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';

const Gainers = ({ projects, title, icon, day, classes }) => {
  
  const dispatch = useDispatch();
  const history = useHistory();
  
  const { gainers, project, topCollections, biggestSalesAmount } = useSelector(state => {
    return {
      gainers: state.gainers,
      project: state.project,
      topCollections: state.topCollections,
      biggestSalesAmount: state.biggestSalesAmount,
    };
  });

  const handleClick = (collection) => {
 
    let data = project.projects.filter(function(item) {
      return item.name === collection.name;
    });
    if(isValid(data)) {
      dispatch({
        type: ActionTypes.SET_PROJECT,
        data: data[0],
      });

      dispatch({
        type: ActionTypes.SET_PROJECT_ID,
        data: data[0]._id,
      });
   
      //Sort the livefeednews by the selected project
      dispatch({
        type: ActionTypes.SORTING_LIVE_FEED_BY_PROJECT,
        project_id: data[0]._id,
      });

      // get the project data(not from db)
      let volume = null, isBySellerCount = null, isBySalesVolume = null;
      topCollections.topCollections.map(item => {
        if(item.name === data[0].name)
          volume = item.price;
      })

      topCollections.topCollections.slice(0, 8).map((item, index) => {
        if(item.name === data[0].name)
          isBySellerCount = {
            value: index,
            flag: true
          };
      })

      biggestSalesAmount.biggestSalesAmount.slice(0, 8).map((item, index) => {
        if(item.name === data[0].name)
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

      history.push("/projects/decentraland");
    } else {
      // alert("Doesn't exist")
    }
  }

  return (
    <>
      <div className="border-r border-brand-gray-800">
        <SectionHeading
          title={title}
          icon={icon}
          classes={classes}
        />

        <div className="flex flex-col text-brand-gray-400 font-medium space-y-2 py-2 md:py-5 px-2">
          {
            gainers.gainers.map((item, index) => (
              <div
                key={index}
                className="h-10 flex items-center hover:bg-brand-gray-800 hover:text-gray-200 hover:cursor-pointer rounded-md px-2  md:px-3"
                onClick={() => handleClick(item)}>

                <div className="w-6 h-6 mr-4">
                  <img className={`mx-auto h-full 'rounded-full'`} src={item.icon} alt="" />
                </div>
                <div>
                  <p>
                    {index + 1}. {item.name}
                  </p>
                </div>

                <div className="flex flex-col md:flex-row items-end md:items-center text-green-400 ml-auto">
                  <span className="text-gray-200 order-1 md:order-none md:mr-2">{item.price}</span>
                  <p className="ml-auto" dangerouslySetInnerHTML={{__html: item.change}} />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Gainers;