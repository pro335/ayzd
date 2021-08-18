import React from 'react'
import SectionHeading from "./../SectionHeading";
import data from '../../data.json'
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';
import config from '../../config/config';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';

const CheckBoxesList = ({ data, all, handleChange, title, icon, classes }) => {
  const dispatch = useDispatch();

  const onChange = (_id) => {
    if(title === "Categories") {
      dispatch({
        type: ActionTypes.CATEGORY_CHK_LIST_CHANGE,
        data: _id,
      });
    } else if(title === "Chain") {
      dispatch({
        type: ActionTypes.CHAIN_CHK_LIST_CHANGE,
        data: _id,
      });
    }
    handleChange();
  }

  return (
    <div>
      <SectionHeading
        title={title}
        icon={icon}
        classes={classes}
      />
      <div className="space-y-1 p-2">
        {
          data.map((input, index) => {
            return (
              <label key={index} className="h-10 relative flex items-center hover:bg-brand-gray-800  hover:text-gray-200 rounded-md px-2 py-1">
                <input
                  id={input._id}
                  name={input._id}
                  value={input._id}
                  type="checkbox"
                  onChange={() => onChange(input._id)}
                  // checked={all}
                  className="form-checkbox w-5 h-5 bg-brand-gray-900 border border-brand-gray-700 rounded text-brand-AYZD-PURPLE"
                />
                <span htmlFor={input._id} className="flex-1 text-sm font-medium cursor-pointer capitalize ml-2">
                  {input.name}
                </span>
              </label>
            )
          })
        }
      </div>
    </div>
  )
}

export default CheckBoxesList
