import React, {useState, useEffect, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import isValid from '../../utility/isValid';
import config from '../../config/config';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';
import moment from 'moment-timezone';
import LottieAnimation from '../Lottie/Lottie';
import LOTTIE_DATA from '../Lottie/data.json';

const LeftDateList = ({ isActive, activeHandler }) => {

  const dispatch = useDispatch();

  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const _isMounted = useRef(false); // Initial value _isMounted = false

  useEffect(() => {
    if (!_isMounted) {
      setTimeout(() => {
        setIsLoaded(true);
      }, config.LOADING_TIME);
    }
    return () => {
      _isMounted.current = true;
    };
  }, []); // here

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
      { isValid(project.upcoming_date_list) ?
        project.upcoming_date_list.map((item, index) => {
          return (
            <div
              className={`${isActive === item.date ? 'bg-brand-gray-800 text-white' : ''} h-10 hover:bg-brand-gray-800 hover:cursor-pointer rounded-lg flex items-center text-brand-gray-600 hover:text-white onHover px-3 py-2`}
              onClick={() => handleClick(item)}
              key={index}
            >
              <p>
                {item.date}
              </p>
              <span className={`${isActive === item.date ? 'text-white' : ''} ml-auto inline-flex items-center justify-center px-3 py-1 text-xs font-bold leading-none bg-black`} style={{ border: '1px solid #1D1D1D', borderRadius: '6px' }}>{item.count}</span>
            </div>
          )
        })
        :
        ( !isLoaded ?
          <div className="h-full flex flex-col justify-center items-center pb-15">
            <LottieAnimation lotti={LOTTIE_DATA} height={50} width={50} />
          </div>
          :
          project.upcoming_date_list.length <= 0 && <p>No Data found</p>
        )
      }
    </div>
  )
}

export default LeftDateList
