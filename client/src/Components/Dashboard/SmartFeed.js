import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RigthSide from "./RigthSide";
import FeedModal from "./../Feeds/FeedModal";
import LiveFeedSection from "./../Feeds/LiveFeedSection";
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';
import isValid from '../../utility/isValid';

const SmartFeed = () => {

  const dispatch = useDispatch();
  const {project} = useSelector(state => {
    return {
      project: state.project
    }
  });

  useEffect(() => {

    // set the project_id to null
    dispatch({
      type: ActionTypes.SET_PROJECT_ID,
      data: null,
    });

    // //Sort the livefeednews by the selected project
    // if(isValid(project.projects)) {
    //   dispatch({
    //     type: ActionTypes.SORTING_LIVE_FEED_BY_PROJECT,
    //     project_id: project.project_id,
    //   });
    // }
  }, []);

  const [open, setOpen] = useState(false)

  const onClickHandler = () => {
    setOpen(!open)
  }
  return (
    <>
      <LiveFeedSection showDetailsPanel={true} onClickHandler={onClickHandler} />
      <RigthSide />

      <FeedModal open={open} setOpen={setOpen} />
    </>
  )
}

export default SmartFeed
