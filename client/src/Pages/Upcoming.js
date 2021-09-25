import { Fragment, useState, useEffect } from 'react'
import AllProjects from "../Components/Upcoming/AllProjects"
import CalendarSidebar from "../Components/Upcoming/CalendarSidebar"
import NotFound from "../Components/NFT/NotFound"
import data from '../data.json'
import SortButton from "../Components/Upcoming/SortButton"
import MobileSelectProjects from "../Components/Upcoming/MobileSelectProjects"
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../utility/isValid';
import config from '../config/config';
import * as actions from '../redux/actions';
import * as ActionTypes from '../redux/ActionTypes';
import moment from 'moment-timezone';

const Upcoming = () => {

  const dispatch = useDispatch();
  
  const { category, chain, project } = useSelector(state => {
    return {
      category: state.category,
      chain: state.chain,
      project: state.project,
    };
  });

  const [all, setAll] = useState(false);

  useEffect(() => {
    // dispatch({
    //   type: ActionTypes.CATEGORY_CHK_LIST_INITIALIZE,
    // });
    // dispatch({
    //   type: ActionTypes.CHAIN_CHK_LIST_INITIALIZE,
    // });
  }, [category.categories, chain.chains])

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];

    // get upcoming_show_list
    let temp_upcoming_show_list = [];
    if(isValid(project.upcomings)) {

      // get current_date_label
      let month_label = "", day_label = "";
      day_label = project.current_date_label.split(" ")[0];
      month_label = project.current_date_label.split(" ")[1];
      let temp_current_date_label = `${month_label} ${day_label}`;
      
      temp_upcoming_show_list = project.upcomings.filter(function(item) {
        return moment(item.upcoming_date).format("MMMM D") === temp_current_date_label;
      });

    }

    if(isValid(value))
      result = temp_upcoming_show_list.filter((data) => data.name.toLowerCase().search(value) !== -1);
    else
      result = temp_upcoming_show_list;

    dispatch({
      type: ActionTypes.SET_UPCOMING_PROJECTS_SHOWING_LIST,
      upcoming_show_list: result,
      current_date_label: project.current_date_label,
    });  
  }

  return (
    <>
      <div className="relative w-full flex flex-col overflow-hidden">
        <div className="w-full fixed h-16 bg-brand-gray-800 z-30">
          <div className="h-full w-full relative">
            <input type="text" placeholder="Search drops"
              className="h-full w-full bg-transparent text-sm placeholder-brand-gray-500 focus:text-gray-300  focus:outline-none px-14"
              onChange={e => handleSearch(e)} />

            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute top-1/2 left-5 transform -translate-y-1/2"
              fill="none" viewBox="0 0 24 24" stroke="#7E7E7E">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="h-full w-full grid lg:grid-cols-6 lg:overflow-hidden pt-16">
          <div className="lg:hidden px-4 mt-2">
            <MobileSelectProjects />
          </div>
          <div className="hidden lg:block border-r border-brand-gray-800 overflow-y-scroll pb-4">
            <CalendarSidebar all={all} />
          </div>
          
          <div className="h-full pb-5 lg:col-span-5 mt-2 lg:mt-0 overflow-hidden">
            <div className="h-full overflow-y-scroll">
              {
                isValid(project.upcoming_show_list) && project.upcoming_show_list.length > 0 ? (
                  <AllProjects />
                ) : (
                  <NotFound />
                )
              }
            </div>
          </div>
        </div>
        {/* End */}

      </div>
    </>
  )
}

export default Upcoming
