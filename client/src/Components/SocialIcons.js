import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../utility/isValid';

const SocialIcons = () => {
    
  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  return (
    <>
      {isValid(project.projectData) && isValid(project.projectData.twitter_link) ?
        <a href={isValid(project.projectData) ? project.projectData.twitter_link : ""} className="text-brand-gray-600 hover:text-brand-gray-300 onHover" target="_blank">
          <svg className="w-4 h-4">
            <use href="../assets/icons/twitter.svg#twitter"></use>
          </svg>
        </a>
        :
        null
      }

      {isValid(project.projectData) && isValid(project.projectData.telegram_link) ?
        <a href={isValid(project.projectData) ? project.projectData.telegram_link : ""} className="text-brand-gray-600 hover:text-brand-gray-300 onHover" target="_blank">
          <svg className="w-4 h-4">
            <use href="../assets/icons/telegram.svg#telegram"></use>
          </svg>
        </a>
        :
        null
      }

      {isValid(project.projectData) && isValid(project.projectData.discord_link) ?
        <a href={isValid(project.projectData) ? project.projectData.discord_link : ""} className="text-brand-gray-600 hover:text-brand-gray-300 onHover" target="_blank">
          <svg className="w-5 h-5">
            <use href="../assets/icons/discord.svg#discord"></use>
          </svg>
        </a>
        :
        null
      }
    </>
  )
}

export default SocialIcons;
