import React from 'react'
import SectionHeading from "./../SectionHeading";
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';

const RankingSales = ({ projects, title, icon, day, classes }) => {
  
  const { daySales } = useSelector(state => {
    return {
      daySales: state.daySales,
    };
  });

  const addDefaultSrc = (e) => {
    e.target.src = '../assets/images/default_image.svg';
  }


  return (
    <>
      <div className="border-r border-brand-gray-800">
        <SectionHeading
          title={title}
          icon={icon}
          classes={classes}
        />

        <div className="flex flex-col text-brand-gray-400 font-medium space-y-2 py-2 md:py-5 px-2">
          {
            daySales.daySales.map((item, index) => (
              <div
                key={index}
                className="h-10 flex items-center hover:bg-brand-gray-800 hover:text-gray-200 hover:cursor-pointer rounded-md px-2  md:px-3">
                  
                <div className="w-6 h-6 mr-4">
                  <img className={`mx-auto h-full`} src={isValid(item) && isValid(item.image) ? item.image : '../assets/images/default_image.svg'} alt="" onError={addDefaultSrc} />
                </div>
                <div>
                  <p>
                    {index + 1}. {item.name}
                  </p>
                  {/* <p className="text-xs text-brand-gray-700 font-medium leading-5 -mt-1">{reduceTextLengh(item.sub_name, 30)}</p> */}
                </div>

                <div className="ml-auto">
                  <p className="text-brand-gray-300">{item.price}</p>
                  {/* <p className="text-xs text-brand-gray-500 font-medium leading-5 -mt-1">49.99 ETH</p> */}
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default RankingSales;