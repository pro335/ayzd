import React from 'react'
import CalendarList from "./CalendarList"
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';
import config from '../../config/config';

const CalendarSidebar = ({ all }) => {

  const { category, chain } = useSelector(state => {
    return {
      category: state.category,
      chain: state.chain,
    };
  });

  return (
    <>
      <CalendarList
        all={all}
        title="Drop date"
        icon="calendar_white_icon"
      />
    </>
  )
}

export default CalendarSidebar
