import React from 'react'
import SectionHeading from "./../SectionHeading";
import data from '../../data.json'


const CheckBoxesList = ({ projects, all, handleChange, title, icon, classes }) => {

  return (
    <div>
      <SectionHeading
        title={title}
        icon={icon}
        classes={classes}
      />
      <div className="space-y-1 p-2">
        {
          data.categories.map((input, index) => {
            const inputText = input.toLowerCase().replace(/\s/g, '-')
            return (
              <label key={index} className="h-10 relative flex items-center hover:bg-brand-gray-800  hover:text-gray-200 rounded-md px-2 py-1">
                <input
                  id={inputText}
                  name={inputText}
                  value={inputText}
                  type="checkbox"
                  onChange={handleChange}
                  // checked={all}
                  className="form-checkbox w-5 h-5 bg-brand-gray-900 border border-brand-gray-700 rounded text-brand-AYZD-PURPLE"
                />
                <span htmlFor={inputText} className="flex-1 text-sm font-medium cursor-pointer capitalize ml-2">
                  {input}
                </span>
              </label>
            )
          })
        }
      </div>
    </div>
  )
}

export default CheckBoxesList
