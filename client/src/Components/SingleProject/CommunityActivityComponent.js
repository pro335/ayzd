import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';

const CommunityActivityComponent = ( {icon, title, amount, url} ) => {
  
  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  return (
    isValid(icon) && isValid(title) && isValid(amount) && isValid(url) ?
      <a href={url} className="flex items-center flex-wrap justify-center lg:justify-between space-y-6 lg:space-y-0 pt-5 pl-5 lg:w-1/2 sm:w-full" target="_blank">
        <div className="flex items-center border border-brand-gray-800 rounded-lg space-x-5 px-4 pr-auto py-3 w-full">
          <div className="py-1">
            <img className="w-full h-full object-cover object-center" src={`../assets/icons/${icon}.svg`} alt="" />
          </div>
          <div>
            <p className="text-xs text-brand-gray-400 leading-4">{title}</p>
            <p className="text-lg text-brand-gray-300 font-semibold">{amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
          </div>
          { title === "Twitter" && isValid(project.projectData.twitter_members_24h) && (amount !== project.projectData.twitter_members_24h) &&
            <div className={`relative flex flex-row rounded-2xl overflow-hidden whitespace-nowrap px-3 py-1.5 !ml-auto ${project.projectData.twitter_members > project.projectData.twitter_members_24h ? 'text-brand-green' : 'text-brand-AYZD-PURPLE'}`}>
              <div style={{marginTop: "1px"}}>
                {project.projectData.twitter_members > project.projectData.twitter_members_24h ?
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                }
              </div>
              {(Math.abs(project.projectData.twitter_members - project.projectData.twitter_members_24h)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              <span className={`w-full h-full absolute left-0 top-0 opacity-30 ${project.projectData.twitter_members > project.projectData.twitter_members_24h ? 'bg-secondary' : 'bg-base'}`}></span>
            </div>
          }
          { title === "Discord" && isValid(project.projectData.discord_members_24h) && (amount !== project.projectData.discord_members_24h) &&
            <div className={`relative flex flex-row rounded-2xl overflow-hidden whitespace-nowrap px-3 py-1.5 !ml-auto ${project.projectData.discord_members > project.projectData.discord_members_24h ? 'text-brand-green' : 'text-brand-AYZD-PURPLE'}`}>
              <div style={{marginTop: "1px"}}>
                {project.projectData.discord_members > project.projectData.discord_members_24h ?
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                }
              </div>
              {(Math.abs(project.projectData.discord_members - project.projectData.discord_members_24h)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              <span className={`w-full h-full absolute left-0 top-0 opacity-30 ${project.projectData.discord_members > project.projectData.discord_members_24h ? 'bg-secondary' : 'bg-base'}`}></span>
            </div>
          }
        </div>
      </a>
      :
      null
  )
}

export default CommunityActivityComponent

