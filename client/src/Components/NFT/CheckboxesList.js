import React, {useState, useEffect, useRef} from 'react';
import SectionHeading from "./../SectionHeading";
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';
import config from '../../config/config';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';
import LottieAnimation from '../Lottie/Lottie';
import LOTTIE_DATA from '../Lottie/data.json';
import NotFound from "../NFT/NotFound";

const CheckBoxesList = ({ data, all, handleChange, title, icon, classes }) => {
  const dispatch = useDispatch();

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
      <div className="h-full space-y-1 p-2">
        {isValid(data) ?
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
          :
          ( !isLoaded ?
            <div className="h-full flex flex-col justify-center items-center py-20">
              <LottieAnimation lotti={LOTTIE_DATA} height={50} width={50} />
            </div>
            :
            <NotFound />
          )
        }
      </div>
    </div>
  )
}

export default CheckBoxesList
