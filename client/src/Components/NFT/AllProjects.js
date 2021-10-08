import React from 'react'
import Card from "../Card"

const AllProjects = ({ projects, type, onClickHandler }) => {
  return (
    <div className="px-4 md:px-8 lg:px-20 py-3 lg:py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-x-5 lg:gap-y-7">
        {
          projects.map((item, index) =>
            (type === "guides") || (type !== "guides" && item.name !== "Smart feed" && item.name !== "Research & Analytics") ?
              <Card key={index} item={item} type={type} onClickHandler={onClickHandler} />
              :
              null
          )
        }
      </div>
    </div>
  )
}

export default AllProjects
