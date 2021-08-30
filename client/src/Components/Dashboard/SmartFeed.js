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
