import React from 'react'
import SocialIcons from "./SocialIcons"

const Footer = () => {
  return (
    <footer
      className="w-full h-8 bg-brand-gray-900 flex items-center justify-between fixed bottom-0 border-t border-brand-gray-800 z-50 shadow-footer py-2 px-5">
      <div className="flex items-center text-xs font-medium space-x-7">
        <a href="mailto:alex@ayzd.com?subject=Partnership opportunity with Ayzd" className="flex items-center text-brand-gray-600 hover:text-brand-gray-300">
          <svg className="w-4 h-4">
            <use href="../assets/icons/feature-icon.svg#icon-feature"></use>
          </svg>
          Feature request
        </a>
        <a href="mailto:alex@ayzd.com?subject=Feature request on ayzd.com" className="flex items-center text-brand-gray-600 hover:text-brand-gray-300">
          <svg className="w-4 h-4">
            <use href="../assets/icons/partnerships.svg#partnerships"></use>
          </svg>
          Partnerships
        </a>
      </div>

      <div className="flex items-center space-x-4">
        <a href={"https://twitter.com/ayzdcom"} className="text-brand-gray-600 hover:text-brand-gray-300 onHover" target="_blank">
          <svg className="w-4 h-4">
            <use href="../assets/icons/twitter.svg#twitter"></use>
          </svg>
        </a>

        <a href={"https://t.me/ayzdcom"} className="text-brand-gray-600 hover:text-brand-gray-300 onHover" target="_blank">
          <svg className="w-4 h-4">
            <use href="../assets/icons/telegram.svg#telegram"></use>
          </svg>
        </a>

        <a href={"https://discord.gg/banjzrbx"} className="text-brand-gray-600 hover:text-brand-gray-300 onHover" target="_blank">
          <svg className="w-5 h-5">
            <use href="../assets/icons/discord.svg#discord"></use>
          </svg>
        </a>                
      </div>
    </footer>
  )
}

export default Footer
