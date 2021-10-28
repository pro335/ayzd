import { Fragment, useState, useEffect, useRef } from 'react'
import AllProjects from "../Components/Upcoming/AllProjects"
import CalendarSidebar from "../Components/Upcoming/CalendarSidebar"
import NotFound from "../Components/NFT/NotFound"
import SortButton from "../Components/Upcoming/SortButton"
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../utility/isValid';
import config from '../config/config';
import * as actions from '../redux/actions';
import * as ActionTypes from '../redux/ActionTypes';
import moment from 'moment-timezone';
import LottieAnimation from '../Components/Lottie/Lottie';
import LOTTIE_DATA from '../Components/Lottie/data.json';
import { Helmet } from 'react-helmet'
import Banner from "../Components/Banner/Banner";

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
      <Helmet>
        <title>{ "NFT Drop calendar on ayzd.com: nft drops on eth, solana drops, binance drops, crypto.com drops, best collections and nft drop analytics" }</title>
      </Helmet>
      <div className="flex-col h-full relative w-full overflow-hidden">
        <div className="hidden lg:flex w-full fixed h-16 bg-brand-gray-800 z-30">
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
        <div className="h-full w-full grid lg:grid-cols-6 lg:overflow-hidden pt-0 lg:pt-16">
          {/* { isValid(project.upcoming_date_list) ? */}
            <>
              <div className="h-full hidden lg:block border-r border-brand-gray-800 overflow-y-scroll pb-4">
                <CalendarSidebar all={all} />
              </div>
            </>
            {/* :
            null
          } */}
          
          <div className="h-full pb-5 lg:col-span-5 lg:mt-0 overflow-hidden">
            <div className="h-full overflow-y-scroll">
              {
                isValid(project.upcoming_show_list) ? (
                  <>
                    <Banner type={"upcoming"} />
                    <AllProjects />
                  </>
                ) : (
                  !isLoaded ?
                    <div className="h-full flex flex-col justify-center items-center pb-15">
                      <LottieAnimation lotti={LOTTIE_DATA} height={50} width={50} />
                    </div>
                    :
                    <p>No Data found</p>
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
