import React from 'react'
import SectionHeading from "./../SectionHeading";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';
import config from '../../config/config';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';
import LottieAnimation from '../Lottie/Lottie';
import LOTTIE_DATA from '../Lottie/data.json';

const BiggestSalesAmount = ({ projects, title, icon, day, classes }) => {

  const dispatch = useDispatch();
  const history = useHistory();
  
  const { topCollections, project, biggestSalesAmount } = useSelector(state => {
    return {
      topCollections: state.topCollections,
      project: state.project,
      biggestSalesAmount: state.biggestSalesAmount,
    };
  });

  const handleClick = (collection) => {
 
    let data = project.projects.filter(function(item) {
      return item.name === collection.name;
    });
    if(isValid(data)) {
      dispatch({
        type: ActionTypes.SET_PROJECT,
        data: data[0],
      });

      history.push(`/projects/${data[0].unique_id}`);
    } else {
      // alert("Doesn't exist")
    }
  }
  return (
    <>
      <div className="border-r border-brand-gray-800">
        <SectionHeading
          title={title}
          icon={icon}
          classes={classes}
        />

        { !isValid(topCollections.topCollections) ?
          <div className="h-full flex flex-col justify-center items-center pt-20 pb-40">
            <LottieAnimation lotti={LOTTIE_DATA} height={50} width={50} />
          </div>
          :
          <div className="flex flex-col text-brand-gray-400 font-medium space-y-2 py-2 md:py-5 px-2">
            {
              topCollections.topCollections.slice(0, 8).map((item, index) => (
                <div
                  key={index}
                  className="h-10 flex items-center hover:bg-brand-gray-800 hover:text-gray-200 hover:cursor-pointer rounded-md px-2  md:px-3"
                  onClick={() => handleClick(item)}>

                  <div className="w-6 h-6 mr-4">
                    <img src={item.icon} />
                  </div>
                  <p>
                    {index + 1}. {item.name}
                  </p>

                  <div className={`${item.gaining > 0 ? 'text-green-400' : 'text-red-500'} flex flex-col md:flex-row items-end md:items-center ml-auto`}>
                    <span className="text-gray-200 order-1 md:order-none md:mr-2">{item.price}</span>
                  </div>
                </div>
              ))
            }
          </div>
        }
      </div>
    </>
  )
}

export default BiggestSalesAmount;