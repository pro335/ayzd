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

  const handleClick = (proj, is_previous = false) => {

    let data = null, temp_upcoming_show_list = [], temp_current_date_label = "";
    let month_label = "", day_label = "";

    if(!is_previous) {
      data = project.upcoming_date_list.filter(function(item) {
        return item.date === proj.date;
      });
      if(isValid(data)) {
        activeHandler(proj.date);
      }

      // get upcoming_show_list, current_date_label
      if(proj.date === "All upcoming drops") {
        temp_upcoming_show_list = project.upcomings;
        temp_current_date_label = `${isValid(project.upcomings) ? project.upcomings.length : 0} Upcoming NFT Drops`;
      } else {
        if(isValid(project.upcomings)) {
          temp_upcoming_show_list = project.upcomings.filter(function(item) {
            return moment(item.upcoming_date).format("MMMM D") === proj.date;
          });

          // get current_date_label
          month_label = proj.date.split(" ")[0];
          day_label = proj.date.split(" ")[1];
          temp_current_date_label = `${isValid(temp_upcoming_show_list) ? temp_upcoming_show_list.length : 0} NFT drop${isValid(temp_upcoming_show_list) && temp_upcoming_show_list.length > 1 ? "s" : "" } on ${day_label} ${month_label}`;
        }
      }

      // // get the upcoming_show_list
      // temp_upcoming_show_list = project.upcomings.filter(function(item) {
      //   return moment(item.upcoming_date).format("MMMM D") === proj.date;
      // });

      dispatch({
        type: ActionTypes.SET_UPCOMING_PROJECTS_SHOWING_LIST,
        upcoming_show_list: temp_upcoming_show_list,
        current_date_label: temp_current_date_label,
        current_date: proj.date,
        is_previous: false,
      });  
    } else {
      data = project.previous_upcoming_date_list.filter(function(item) {
        return item.date === proj.date;
      });
      if(isValid(data)) {
        activeHandler(proj.date);
      }
  
      // get upcoming_show_list, current_date_label
      if(isValid(project.previous_upcomings)) {
        temp_upcoming_show_list = project.previous_upcomings.filter(function(item) {
          return moment(item.upcoming_date).format("MMMM D") === proj.date;
        });
  
        // get current_date_label
        month_label = proj.date.split(" ")[0];
        day_label = proj.date.split(" ")[1];
        temp_current_date_label = `${isValid(temp_upcoming_show_list) ? temp_upcoming_show_list.length : 0} NFT drop${isValid(temp_upcoming_show_list) && temp_upcoming_show_list.length > 1 ? "s" : "" } on ${day_label} ${month_label}`;
      }
  
      // get the upcoming_show_list
      temp_upcoming_show_list = project.previous_upcomings.filter(function(item) {
        return moment(item.upcoming_date).format("MMMM D") === proj.date;
      });
  
      dispatch({
        type: ActionTypes.SET_UPCOMING_PROJECTS_SHOWING_LIST,
        upcoming_show_list: temp_upcoming_show_list,
        current_date_label: temp_current_date_label,
        current_date: proj.date,
        is_previous: true,
      });
    }
  }

  return (
    <div className="h-full flex flex-col font-medium overflow-y-scroll space-y-2 py-3">
      { isValid(project.upcoming_date_list) || isValid(project.previous_upcoming_date_list) ?
        <>
          <div className="flex items-center mb-1 mx-2">
            <div>
              <img src={`/assets/icons/current_drop_icon.svg`} alt="" />
            </div>
            <p className="lg:text-md text-gray-100 font-medium leading-6 ml-3">
              {"Current & Future drops"}
            </p>
          </div>
          {project.upcoming_date_list.map((item, index) => {
            return (
              <div
                className={`${isActive === item.date ? 'bg-brand-gray-800 text-white' : 'text-brand-gray-600'} h-10 hover:bg-brand-gray-800 hover:cursor-pointer rounded-lg flex items-center hover:text-white onHover px-3 py-2 mx-2`}
                onClick={() => handleClick(item, false)}
                key={index}
              >
                <p>
                  {item.date}
                </p>
                <span className={`${isActive === item.date ? 'text-white' : ''} ml-auto inline-flex items-center justify-center px-3 py-1 text-xs font-bold leading-none bg-black w-8`} style={{ border: '1px solid #1D1D1D', borderRadius: '6px' }}>{item.count}</span>
              </div>
            )
          })}
          <div className="flex items-center mb-1 border-t border-brand-gray-800 pt-3 px-2">
            <div>
              <img src={`/assets/icons/previous_drop_icon.svg`} alt="" />
            </div>
            <p className="lg:text-md text-gray-100 font-medium leading-6 ml-3">
              {"Previous drops"}
            </p>
          </div>
          {project.previous_upcoming_date_list.map((item, index) => {
            return (
              <div
                className={`${isActive === item.date ? 'bg-brand-gray-800 text-white' : 'text-brand-gray-600'} h-10 hover:bg-brand-gray-800 hover:cursor-pointer rounded-lg flex items-center hover:text-white onHover px-3 py-2 mx-2`}
                onClick={() => handleClick(item, true)}
                key={index}
              >
                <p>
                  {item.date}
                </p>
                <span className={`${isActive === item.date ? 'text-white' : ''} ml-auto inline-flex items-center justify-center px-3 py-1 text-xs font-bold leading-none bg-black w-8`} style={{ border: '1px solid #1D1D1D', borderRadius: '6px' }}>{item.count}</span>
              </div>
            )
          })}
        </>
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
