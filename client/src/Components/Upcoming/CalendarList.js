import React, { useState } from 'react'
import SectionHeading from "./../SectionHeading";
import ProjectsList from "./ProjectsList"
import MobileSelectProjects from "./MobileSelectProjects";
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';
import isValid from '../../utility/reduceTextLengh';

import data from '../../data.json'

const CalendarList = ({ calendar_list, all, handleChange, title, icon, classes }) => {

  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  const projects = project.projects;
  const [filterProject, setFilterProject] = useState(projects);
  const [isActive, setIsActive] = useState(isValid(calendar_list) ? calendar_list[0].label : "");

  const activeHandler = text => {
    setIsActive(text)
  }

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];

    result = projects.filter((data) => data.name.toLowerCase().search(value) !== -1);
    setFilterProject(result);
  }

  return (
    <>
      <SectionHeading
        title={title}
        icon={icon}
        classes={classes}
      />
      <div className="border-brand-gray-800 lg:overflow-hidden">
        <div className="h-full hidden lg:flex flex-col">
          {/* Projects List */}
          <ProjectsList calendar_list={calendar_list} isActive={isActive} activeHandler={activeHandler} />
        </div>
      </div>
    </>
  )
}

export default CalendarList
