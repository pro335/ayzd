import React from 'react'
import SectionHeading from "../SectionHeading"
import { Link, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';
import config from '../../config/config';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';
import LottieAnimation from '../Lottie/Lottie';
import LOTTIE_DATA from '../Lottie/data.json';

const Marketplaces = ({ }) => {
 
  const dispatch = useDispatch();
  const history = useHistory();
  
  const { project, rankings } = useSelector(state => {
    return {
      project: state.project,
      rankings: state.rankings,
    };
  });

  
  const handleClick = (collection) => {
 
    // let data = project.projects.filter(function(item) {
    //   return item.name === collection.name;
    // });
    // if(isValid(data)) {
    //   history.push(`/projects/${data[0].unique_id}`);
    // } else {
    //   // alert("Doesn't exist")
    // }
  }

  return (
    <>
      <div>
        <SectionHeading
          title="NFT tokens by market cap today"
          icon="tokens_market_cap"
          buttons="view"
          classes="border-t"
          btnLink="/rankings"
        />

        { !isValid(rankings.tokens_by_market_cap) ?
          <div className="h-full flex flex-col justify-center items-center py-20">
            <LottieAnimation lotti={LOTTIE_DATA} height={50} width={50} />
          </div>
          :
          <div className="flex flex-col text-brand-gray-400 font-medium space-y-1 py-5 px-2">
            {
              rankings.tokens_by_market_cap.slice(0, 5).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center hover:bg-brand-gray-800 hover:text-gray-200 hover:cursor-pointer rounded-md onHover px-3"
                  onClick={() => handleClick(item)}>

                  <div className="w-6 h-6 mr-4">
                    <img className="mx-auto h-full rounded-full" src={item.icon} alt="" />
                  </div>
                  <div>
                    <p>
                      {index + 1}. {item.title}
                    </p>
                    <p className="text-xs text-brand-gray-700 font-medium">{item.sub_title}</p>
                  </div>

                  <div className="flex flex-col md:flex-row items-end md:items-center ml-auto">
                    <div className="md:mr-2 flex flex-col">
                      <span className="text-gray-200 order-1 md:order-none text-right">{item.marketcap}</span>
                      <span className="text-xs text-brand-gray-700 order-2 font-medium text-right">{item.price}</span>
                    </div>
                    <div className={`flex flex-row text-right ${item.percent.indexOf('+') > -1 ? 'text-green-400' : 'text-red-500'}`}>
                      <p className="ml-auto w-15">{item.percent} </p>
                      {item.percent.indexOf('+') > -1 ?
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      }
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

export default Marketplaces
