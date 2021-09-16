import React from 'react'
import { ArrowNarrowUpIcon } from '@heroicons/react/outline'
import SocialIcons from "./../SocialIcons";
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';
import config from '../../config/config';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';
import moment from 'moment';

const Heading = () => {
  
  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  const main_image = isValid(project.projectData) && isValid(project.projectData.main_image) && isValid(project.projectData.main_image.url) ? project.projectData.main_image.url : `${config.bucket_url}/${config.common_image}`;

  return ( 
    <div className="flex items-center flex-wrap justify-center justify-between space-y-6 lg:space-y-0 py-5 px-5 sm:px-6">
      {/* Left */}
      {isValid(project.projectData) ? 
        <div className="flex flex-wrap justify-center">
          <div className="w-16 h-16">
            <img className={`${project.projectData.name === "Smart feed" ? '' : 'rounded-full'} w-full h-full`} src={main_image} alt="" />
          </div>
          <div className="w-full lg:w-auto text-center lg:pl-5">
            <div className="flex items-center flex-wrap justify-center lg:justify-start">
              <h3 className="text-2xl text-gray-100 font-bold">
                {project.projectData.name}
              </h3>
              <div className="w-full lg:w-auto flex items-center justify-center lg:justify-start space-x-2 pl-3">
                {isValid(project.projectData.app_link) ?
                  <a href={project.projectData.app_link} className="text-brand-gray-600 hover:text-brand-gray-300" target="_blank">
                    <svg className="w-4 h-4">
                      <use href="../assets/icons/link.svg#icon-linked"></use>
                    </svg>
                  </a>
                  :
                  null
                }
                <SocialIcons />
              </div>
            </div>
            <p className="text-sm text-brand-gray-400 font-medium pb-1.5 text-center md:text-left">
              {project.projectData.small_description}
            </p>
            <div className="flex items-center justify-center lg:justify-start space-x-2">
              {isValid(project.projectDataNotDatabase) && isValid(project.projectDataNotDatabase.isBySalesVolume) && project.projectDataNotDatabase.isBySalesVolume.flag ?
                <div className="relative text-brand-green rounded-full overflow-hidden whitespace-nowrap px-3 py-1.5">
                  #{project.projectDataNotDatabase.isBySalesVolume.value + 1} by sales volume
                  <span className="w-full h-full bg-secondary absolute left-0 top-0 opacity-30"></span>
                </div>
                :
                null
              }

              {isValid(project.projectDataNotDatabase) && isValid(project.projectDataNotDatabase.isBySellerCount) && project.projectDataNotDatabase.isBySellerCount.flag?
                <div className="relative text-brand-AYZD-PURPLE rounded-full overflow-hidden whitespace-nowrap px-3 py-1.5">
                  #{project.projectDataNotDatabase.isBySellerCount.value + 1} by seller count

                  <span className="absolute left-0 top-0 w-full h-full bg-base opacity-30"></span>
                </div>
                :
                null
              }
            </div>
          </div>
        </div>
        :
        null
      }

      {/* Right */}
      { isValid(project.projectData) && (!isValid(project.projectData.isUpcoming) || ( isValid(project.projectData.isUpcoming) && !project.projectData.isUpcoming )) && isValid(project.projectDataNotDatabase) && isValid(project.projectDataNotDatabase.volume) ?
        <div className="mx-auto md:mx-0">
          <div className="flex items-center border border-brand-gray-800 rounded-lg space-x-5 px-4 py-3">
            <div>
              <p className="text-xs text-brand-gray-400 leading-4">Sales volume</p>
              <p className="text-lg text-brand-gray-300 font-semibold">{project.projectDataNotDatabase.volume}</p>
            </div>
            <div className="w-12 h-12 py-1">
              <img className="w-12 h-12 object-cover object-center" src="/assets/icons/sales_volume.svg" alt="" />
            </div>
          </div>
        </div>
        :
        null
      }
      { isValid(project.projectData) && isValid(project.projectData.isUpcoming) && project.projectData.isUpcoming && isValid(project.projectData.upcoming_date) ?
        <div className="mx-auto md:mx-0">
        <div className="flex items-center border border-brand-gray-800 rounded-lg space-x-5 px-4 py-3">
          <div>
            <p className="text-xs text-brand-gray-400 leading-4">Drop date (GMT +3)</p>
            <p className="text-lg text-brand-gray-300 font-semibold">{moment(project.projectData.upcoming_date).format("MMM D, YYYY hh:mm A")}</p>
          </div>
          <div className="w-12 h-12 py-1">
            <img className="w-12 h-12 object-cover object-center" src="/assets/icons/calendar1.svg" alt="" />
          </div>
        </div>
      </div>
      :
      null
    }

  </div>
  )
}

export default Heading
