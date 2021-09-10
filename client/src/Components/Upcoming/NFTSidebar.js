import React from 'react'
import CalendarList from "./CalendarList"
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';
import config from '../../config/config';

const dump_data = [
  {
    key: 0,
    label: "September 12",
    count: 4,
  },
  {
    key: 0,
    label: "September 14",
    count: 12345,
  },
  {
    key: 0,
    label: "September 17",
    count: 0,
  },
  {
    key: 0,
    label: "September 18",
    count: 5,
  },
]

const NFTSidebar = ({ projects, handleChange, all }) => {

  const { category, chain } = useSelector(state => {
    return {
      category: state.category,
      chain: state.chain,
    };
  });

  return (
    <>
      <CalendarList
        calendar_list={dump_data}
        handleChange={handleChange}
        all={all}
        title="Drop date"
        icon="calendar_white_icon"
      />
    </>
  )
}

export default NFTSidebar
