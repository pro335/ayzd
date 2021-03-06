import React from 'react'
import { Link, useHistory } from "react-router-dom";
import SectionHeading from "./../SectionHeading";
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';
import config from '../../config/config';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';
import LottieAnimation from '../Lottie/Lottie';
import LOTTIE_DATA from '../Lottie/data.json';

const TopCollectionsSection = ({ }) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const { rankings, project } = useSelector(state => {
    return {
      project: state.project,
      rankings: state.rankings,
    };
  });

  const handleClick = (collection) => {

    let data = project.projects.filter(function (item) {
      return item.name === collection.name;
    });
    if (isValid(data)) {
      history.push(`/projects/${data[0].unique_id}`);
    } else {
      // alert("Doesn't exist")
    }
  }

  return (
    <>
      <div>
        <SectionHeading
          title="Top collections"
          icon="top-sales"
          buttons="View All"
          classes="border-t"
          btnLink="/rankings"
        />
        <div className="h-full flex flex-col justify-center items-center py-20">
          <LottieAnimation lotti={LOTTIE_DATA} height={50} width={50} />
        </div>
        {/* { !isValid(rankings.topCollections) ?
          <div className="h-full flex flex-col justify-center items-center py-20">
            <LottieAnimation lotti={LOTTIE_DATA} height={50} width={50} />
          </div>
          :
          <div className="flex flex-col text-brand-gray-400 font-medium space-y-1 py-5 px-2">
            {
              rankings.topCollections.slice(0, 5).map((item, index) => (
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
                  <p className="text-brand-gray-300 ml-auto">
                    {item.price}
                  </p>
                </div>
              ))
            }
          </div>
        } */}
      </div>
    </>
  )
}

export default TopCollectionsSection
