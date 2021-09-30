import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import isValid from '../../utility/isValid';
import useWindowDimensions from '../../utility/useWindowDimensions';

const StatsTopComponent = ( {icon, title, amount} ) => {

  const { height, width } = useWindowDimensions();
  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  const addToCalendar = () => {
    const item = project.projectData;
    let stDate = isValid(item.upcoming_date) ? moment(item.upcoming_date).format("YYYYMMDDTHHmmss") : moment(new Date()).format("YYYYMMDDTHHmmss");
    let endDate = isValid(item.upcoming_date) ? moment(item.upcoming_date).add(30, 'minutes').format("YYYYMMDDTHHmmss") : moment(new Date()).format("YYYYMMDDTHHmmss");
    let text = isValid(item.name) ? item.name : "Upcoming project";
    let location = isValid(item.app_link) ? item.app_link : "https://app.ayzd.com";
    let details = isValid(item.small_description) ? item.small_description : "Drop calendar";

    let url = `https://calendar.google.com/calendar/u/0/r/eventedit?ctz=Europe/Riga&dates=${stDate}/${endDate}&details=${details}&location=${location}&text=${text}`;
    window.open(url, "_blank");
  }

  return (
    isValid(icon) && isValid(title) && isValid(amount) ?
      <div className="flex items-center flex-wrap justify-center lg:justify-between space-y-6 lg:space-y-0 pt-5 pl-5 sm:pl-5 w-full">
        <div className="flex flex-row items-center border border-brand-gray-800 rounded-lg space-x-5 pl-4 pr-auto py-3 px-4 w-full">
          <div className="py-1">
            <img className="w-full h-full object-cover object-center" src={`../assets/icons/${icon}.svg`} alt="" />
          </div>
          <div>
            <p className="text-xs text-brand-gray-400 leading-4">{title}</p>
            <p className="text-lg text-brand-gray-300 font-semibold">{amount}</p>
          </div>
          { isValid(project.projectData) && isValid(project.projectData.isUpcoming) && project.projectData.isUpcoming && isValid(project.projectData.upcoming_date) ?
            <button 
              className={ `${width > 515 ? 'flex' : "hidden"} flex-row items-center font-medium space-x-3 bg-black hover:bg-brand-calendar-button hover:border-brand-calendar-button text-white leading-7 rounded-xl px-2 lg:px-4 py-1.5 my-1.5 !ml-auto border border-brand-gray-800`}
              onClick={addToCalendar}
            >
              <img src="../assets/icons/plus.svg" alt="" />
              <p>Add to calendar</p>
            </button>
            :
            null
          }
        </div>
        { isValid(project.projectData) && isValid(project.projectData.isUpcoming) && project.projectData.isUpcoming && isValid(project.projectData.upcoming_date) ?
          <button 
            className={ `${width <= 515 ? 'flex' : "hidden"} flex-row items-center font-medium space-x-3 bg-black hover:bg-brand-calendar-button hover:border-brand-calendar-button text-white leading-7 rounded-xl px-2 lg:px-4 py-1.5 !mx-auto border border-brand-gray-800`}
            onClick={addToCalendar}
          >
            <img src="../assets/icons/plus.svg" alt="" />
            <p>Add to calendar</p>
          </button>
          :
          null
        }
      </div>
      :
      null
  )
}

export default StatsTopComponent

