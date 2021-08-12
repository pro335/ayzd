import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import isValid from '../../utility/isValid';
import config from '../../config/config';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';

const ProjectsList = ({ projects, isActive, activeHandler }) => {

  const dispatch = useDispatch();

  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  const handleClick = (proj) => {

    dispatch({
      type: ActionTypes.SET_PROJECT_ID,
      data: proj._id,
    });
  
    let data = project.projects.filter(function(item) {
      return item._id === proj._id;
    });
    if(isValid(data)) {
      dispatch({
        type: ActionTypes.SET_PROJECT,
        data: data[0],
      });
    }
    activeHandler(proj.name);
  }

  return (
    <div className="h-full flex flex-col font-medium overflow-y-scroll space-y-2 py-3 px-2">
      {
        projects.map((item, index) => {
          const main_image = isValid(item.main_image) ? item.main_image.url : `${config.bucket_url}/${config.common_image}`;

          return (
            <Link to={"/nba-top-shot"}
              className={`${isActive === item.name ? 'bg-brand-gray-800 text-gray-200' : ''} h-10 hover:bg-brand-gray-800 flex items-center text-brand-gray-600 hover:text-gray-200 rounded-md onHover px-3 py-2`}
              onClick={() => handleClick(item)}
              key={index}
            >
              <div className="w-6 h-6 mr-4">
                <img className="mx-auto h-full rounded-full" src={main_image} alt={item.name} />
              </div>
              <p>
                {item.name}
              </p>
            </Link>
          )
        })
      }
      {
        projects.length <= 0 && <p>No Projects</p>
      }
    </div>
  )
}

export default ProjectsList
