import React, { useState } from 'react'
import SectionHeading from "./../SectionHeading";
import LeftDateList from "./LeftDateList"
import MobileSelectProjects from "./MobileSelectProjects";
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';
import isValid from '../../utility/isValid';

const CalendarList = ({ all, title, icon, classes }) => {

  const { project, isActive } = useSelector(state => {
    let temp_isActive = "";
    // get current_date_label
    let month_label = "", day_label = "";
    if(state.project && state.project.current_date_label) {
      day_label = state.project.current_date_label.split(" ")[0];
      month_label= state.project.current_date_label.split(" ")[1];
    }
    temp_isActive = `${month_label} ${day_label}`;
    
    return {
      project: state.project,
      isActive: temp_isActive,
    };
  });

  const activeHandler = text => {
    // setIsActive(text)
  }

  return (
    <>
      <SectionHeading
        title={title}
        icon={icon}
        classes={classes}
      />
      <div className="h-full border-brand-gray-800 lg:overflow-hidden">
        <div className="h-full hidden lg:flex flex-col">
          {/* Projects List */}
          <LeftDateList isActive={isActive} activeHandler={activeHandler} />
        </div>
      </div>
    </>
  )
}

export default CalendarList
