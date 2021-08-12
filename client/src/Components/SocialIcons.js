import React from 'react'

const SocialIcons = () => {
  return (
    <>
      <a href="#!" className="text-brand-gray-600 hover:text-brand-gray-300 onHover">
        <svg className="w-4 h-4">
          <use href="../assets/icons/twitter.svg#twitter"></use>
        </svg>
      </a>
      <a href="#!" className="text-brand-gray-600 hover:text-brand-gray-300 onHover">
        <svg className="w-4 h-4">
          <use href="../assets/icons/telegram.svg#telegram"></use>
        </svg>
      </a>
      <a href="#!" className="text-brand-gray-600 hover:text-brand-gray-300 onHover">
        <svg className="w-5 h-5">
          <use href="../assets/icons/discord.svg#discord"></use>
        </svg>
      </a>
    </>
  )
}

export default SocialIcons;
