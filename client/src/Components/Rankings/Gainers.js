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

const Gainers = ({ projects, title, icon, day, classes }) => {
  
  const dispatch = useDispatch();
  const history = useHistory();
  
  const { rankings, project } = useSelector(state => {
    return {
      rankings: state.rankings,
      project: state.project,
    };
  });

  const handleClick = (collection) => {
 
    let data = project.projects.filter(function(item) {
      return item.name === collection.name;
    });
    if(isValid(data)) {
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

        { !isValid(rankings.gainers) ?
          <div className="h-full flex flex-col justify-center items-center pt-20 pb-40">
            <LottieAnimation lotti={LOTTIE_DATA} height={50} width={50} />
          </div>
          :
          <div className="flex flex-col text-brand-gray-400 font-medium space-y-2 py-2 md:py-5 px-2">
            {
              rankings.gainers.map((item, index) => (
                <div
                  key={index}
                  className="h-10 flex items-center hover:bg-brand-gray-800 hover:text-gray-200 hover:cursor-pointer rounded-md px-2  md:px-3"
                  onClick={() => handleClick(item)}>

                  <div className="w-6 h-6 mr-4">
                    <img className={`mx-auto h-full rounded-xl`} src={item.icon} alt="" />
                  </div>
                  <div>
                    <p>
                      {index + 1}. {item.name}
                    </p>
                  </div>

                  {/* <div className="flex flex-col md:flex-row items-end md:items-center text-green-400 ml-auto">
                    <span className="text-gray-200 order-1 md:order-none md:mr-2">{item.price}</span>
                    <div className="flex flex-row">
                      <p className="ml-auto" dangerouslySetInnerHTML={{__html: item.change}} />
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div> */}
                  <div className="ml-auto flex flex-col lg:flex-row">
                    <span className="text-gray-200 order-1 md:order-none text-right">{item.price}</span>
                    <div className="flex flex-row order-2">
                      <p className="text-green-400 ml-auto md:ml-2"> +{item.percent.toFixed(2)}% </p>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
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

export default Gainers;