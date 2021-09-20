import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import isValid from '../../utility/isValid';
import config from '../../config/config';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';
import moment from 'moment-timezone';

const LeftDateList = ({ isActive, activeHandler }) => {

  const dispatch = useDispatch();

  const { project, topCollections, biggestSalesAmount } = useSelector(state => {
    return {
      project: state.project,
      topCollections: state.topCollections,
      biggestSalesAmount: state.biggestSalesAmount,
    };
  });

  const handleClick = (proj) => {
    let data = project.upcoming_date_list.filter(function(item) {
      return item.date === proj.date;
    });
    if(isValid(data)) {
      activeHandler(proj.date);
    }

    // get upcoming_show_list, current_date_label
    let temp_upcoming_show_list = [], temp_current_date_label = "";
    if(isValid(project.upcomings)) {
      temp_upcoming_show_list = project.upcomings.filter(function(item) {
        return moment(item.upcoming_date).format("MMMM D") === proj.date;
      });

      // get current_date_label
      let month_label = "", day_label = "";
      month_label = proj.date.split(" ")[0];
      day_label = proj.date.split(" ")[1];
      temp_current_date_label = `${day_label} ${month_label}`;
    }

    // get the upcoming_show_list
    temp_upcoming_show_list = project.upcomings.filter(function(item) {
      return moment(item.upcoming_date).format("MMMM D") === proj.date;
    });

    dispatch({
      type: ActionTypes.SET_UPCOMING_PROJECTS_SHOWING_LIST,
      upcoming_show_list: temp_upcoming_show_list,
      current_date_label: temp_current_date_label,
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

export default LeftDateList