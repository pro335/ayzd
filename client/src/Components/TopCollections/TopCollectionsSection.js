import React from 'react'
import { Link, useHistory } from "react-router-dom";
import SectionHeading from "./../SectionHeading";
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';
import config from '../../config/config';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';

const TopCollectionsSection = ({ projects }) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const { topCollections, project, biggestSalesAmount } = useSelector(state => {
    return {
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
      let volume = null, isBySalesVolume = false, isBySellerCount = false;
      topCollections.topCollections.map(one_item => {
        if(collection.name === one_item.name)
          volume = one_item.price;
      })

      topCollections.topCollections.slice(0, 8).map(one_item => {
        if(collection.name === one_item.name)
          isBySalesVolume = true;
      })

      biggestSalesAmount.biggestSalesAmount.slice(0, 8).map(one_item => {
        if(collection.name === one_item.name)
          isBySellerCount = true;
      })

      let projectDataNotDatabase = {
        volume,
        isBySalesVolume,
        isBySellerCount,
      }

      dispatch({
        type: ActionTypes.SET_PROJECT_NOT_DB,
        data: projectDataNotDatabase,
      });

      history.push("/projects/decentraland");
    } else {
      // alert("Doesn't exist")
    }
  }

  return (
    <>
      <div>
        <SectionHeading
          title="Top collections"
          icon="top-sales"
          buttons="view"
          classes="border-t"
          btnLink="/rankings"
        />

        <div className="flex flex-col text-brand-gray-400 font-medium space-y-1 py-5 px-2">
          {
            topCollections.topCollections.slice(0, 8).map((item, index) => (
              <div
                key={index}
                className="h-10 flex items-center hover:bg-brand-gray-800 hover:text-gray-200 hover:cursor-pointer rounded-md onHover px-3"
                onClick={() => handleClick(item)}>

                <div className="w-6 h-6 mr-4">
                  <img className="mx-auto h-full rounded-full" src={item.icon} alt="" />
                </div>
                <p>
                  {index + 1}. {item.name}
                </p>
                <p className="text-brand-gray-300 ml-auto">
                  {item.price}
                </p>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default TopCollectionsSection
