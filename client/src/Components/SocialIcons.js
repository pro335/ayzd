import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

const SocialIcons = () => {
    
  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  return (
    <>
      <a href={project.projectData.twitter_link} className="text-brand-gray-600 hover:text-brand-gray-300 onHover">
        <svg className="w-4 h-4">
          <use href="../assets/icons/twitter.svg#twitter"></use>
        </svg>
      </a>
      <a href={project.projectData.telegram_link} className="text-brand-gray-600 hover:text-brand-gray-300 onHover">
        <svg className="w-4 h-4">
          <use href="../assets/icons/telegram.svg#telegram"></use>
        </svg>
      </a>
      <a href={project.projectData.discord_link} className="text-brand-gray-600 hover:text-brand-gray-300 onHover">
        <svg className="w-5 h-5">
          <use href="../assets/icons/discord.svg#discord"></use>
        </svg>
      </a>
    </>
  )
}

export default SocialIcons;
