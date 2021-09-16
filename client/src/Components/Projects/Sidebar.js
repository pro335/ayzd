import React, { useState } from 'react'
import ProjectsList from "./ProjectsList"
import MobileSelectProjects from "./MobileSelectProjects";
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';
import isValid from '../../utility/reduceTextLengh';

import data from '../../data.json'

const Sidebar = () => {
  const dispatch = useDispatch();

  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  const [isActive, setIsActive] = useState(isValid(project.projects_has_news_show_list) ? project.projects_has_news_show_list[0].name : "");

  const activeHandler = text => {
    setIsActive(text)
  }

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    if(!isValid(value)) {
      dispatch({
        type: ActionTypes.SET_PROJECTS_HAS_NEWS_SHOW_LIST,
        data: project.projects_has_news,
      });
    } else {
      let result = [];
      result = project.projects_has_news.filter((data) => data.name.toLowerCase().search(value) !== -1);
      dispatch({
        type: ActionTypes.SET_PROJECTS_HAS_NEWS_SHOW_LIST,
        data: result,
      });
    }
  }

  return (
    <>
      <div className="border-r border-brand-gray-800 lg:overflow-hidden">
        <div className="lg:hidden px-4 z-100">
          <MobileSelectProjects projects={project.projects_has_news_show_list} />
        </div>

        <div className="h-full hidden lg:flex flex-col">
          {/* Search */}
          <div className="h-15 border-b border-brand-gray-800 px-2 py-3">
            <div className="relative h-full flex items-center">
              <input
                className="h-10 w-full bg-brand-gray-900 text-gray-300 placeholder-brand-gray-400 border border-brand-gray-800 focus:outline-none focus:border-brand-AYZD-PURPLE rounded-md pl-10 pr-4"
                type="text" placeholder="Search project..."
                onChange={e => handleSearch(e)}
              />

              <img className="absolute left-4" src="../assets/icons/search.svg" alt="" />
            </div>
          </div>
          {/* end */}

          {/* Projects List */}
          <ProjectsList isActive={isActive} activeHandler={activeHandler} />
        </div>
      </div>
    </>
  )
}

export default Sidebar
