import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import isValid from '../../utility/isValid';
import config from '../../config/config';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';
import moment from 'moment-timezone';

const ProjectsList = ({ calendar_list, isActive, activeHandler }) => {

  const dispatch = useDispatch();

  const { project, topCollections, biggestSalesAmount } = useSelector(state => {
    return {
      project: state.project,
      topCollections: state.topCollections,
      biggestSalesAmount: state.biggestSalesAmount,
    };
  });

  const handleClick = (proj) => {

    // dispatch({
    //   type: ActionTypes.SET_PROJECT_ID,
    //   data: proj._id,
    // });
  
    // let data = project.projects.filter(function(item) {
    //   return item._id === proj._id;
    // });
    // if(isValid(data)) {
    //   dispatch({
    //     type: ActionTypes.SET_PROJECT,
    //     data: data[0],
    //   });

    //   //Sort the livefeednews by the selected project
    //   dispatch({
    //     type: ActionTypes.FILTERING_LIVE_FEED_BY_PROJECT,
    //     projectData: data[0],
    //   });

    //   // get the project data(not from db)
    //   let volume = null, isBySellerCount = null, isBySalesVolume = null;
    //   topCollections.topCollections.map(item => {
    //     if(item.name === data[0].name)
    //       volume = item.price;
    //   })

    //   topCollections.topCollections.slice(0, 8).map((item, index) => {
    //     if(item.name === data[0].name)
    //       isBySellerCount = {
    //         value: index,
    //         flag: true
    //       };
    //   })

    //   biggestSalesAmount.biggestSalesAmount.slice(0, 8).map((item, index) => {
    //     if(item.name === data[0].name)
    //       isBySalesVolume =  {
    //         value: index,
    //         flag: true
    //       };
    //   })

    //   let projectDataNotDatabase = {
    //     ...project.projectDataNotDatabase,
    //     volume,
    //     isBySellerCount,
    //     isBySalesVolume,
    //   }

    //   dispatch({
    //     type: ActionTypes.SET_PROJECT_NOT_DB,
    //     data: projectDataNotDatabase,
    //   });

    //   dispatch({
    //     type: ActionTypes.SET_ACTIVE_TAB,
    //     data: 1
    //   });

    // }
    // activeHandler(proj.name);

    let data = project.upcoming_date_show_list.filter(function(item) {
      return item.date === proj.date;
    });
    if(isValid(data)) {
      activeHandler(proj.date);
    }

    // get the upcoming_show_list
    let temp_upcoming_show_list = project.upcoming_date_show_list.filter(function(item) {
      return moment(item.upcoming_date).format("MMMM D") === proj.date;
    });
    dispatch({
      type: ActionTypes.SET_UPCOMING_PROJECTS_SHOWING_LIST,
      data: temp_upcoming_show_list
    });  
  }

  return (
    <div className="h-full flex flex-col font-medium overflow-y-scroll space-y-2 py-3 px-2">
      {
        project.upcoming_date_list.map((item, index) => {
          return (
            <div
              className={`${isActive === item.date ? 'bg-brand-gray-800 text-gray-200' : ''} h-10 hover:bg-brand-gray-800 hover:cursor-pointer rounded-lg flex items-center text-brand-gray-600 hover:text-gray-200 onHover px-3 py-2`}
              onClick={() => handleClick(item)}
              key={index}
            >
              <p>
                {item.date}
              </p>
              <span class="ml-auto inline-flex items-center justify-center px-3 py-1 text-xs font-bold leading-none text-red-100 bg-black" style={{ border: '1px solid #1D1D1D', borderRadius: '6px' }}>{item.count}</span>
            </div>
          )
        })
      }
      {
        project.upcoming_date_list.length <= 0 && <p>No Data found</p>
      }
    </div>
  )
}

export default ProjectsList
