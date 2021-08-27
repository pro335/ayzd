import React from 'react'
import SectionHeading from "../SectionHeading"
import { Link, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';
import config from '../../config/config';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';

const GainingMomenum = ({ projects }) => {
 
  const dispatch = useDispatch();
  const history = useHistory();
  
  const { project, gainers, topCollections, biggestSalesAmount } = useSelector(state => {
    return {
      project: state.project,
      gainers: state.gainers,
      topCollections: state.topCollections,
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
      <div>
        <SectionHeading
          title="Gaining momenum"
          icon="rocket"
          buttons="view"
          classes="border-t"
          btnLink="/rankings"
        />

        <div className="flex flex-col text-brand-gray-400 font-medium space-y-1 py-5 px-2">
          {
            gainers.gainers.map((item, index) => (
              <div
                key={index}
                className="h-10 flex items-center hover:bg-brand-gray-800 hover:text-gray-200 hover:cursor-pointer rounded-md onHover px-3"
                onClick={() => handleClick(item)}>

                <div className="w-6 h-6 mr-4">
                  <img className="mx-auto h-full rounded-full" src={item.icon} alt="" />
                </div>
                <p>
                  {index + 1}. {item.name}
                </p>
                {/* <p className={`${item.gaining > 0 ? 'text-green-400' : 'text-red-500'} ml-auto`}>
                  {item.gaining > 0 && '+'}{item.gaining} %
                </p> */}
                <p className="ml-auto" dangerouslySetInnerHTML={{__html: item.price}} />
                <p dangerouslySetInnerHTML={{__html: item.change}} />
              </div>
            ))
          }

        </div>
      </div>
    </>
  )
}

export default GainingMomenum
