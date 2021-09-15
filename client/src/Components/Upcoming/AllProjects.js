import React from 'react'
import Card from "./Card"
import { useSelector, useDispatch } from 'react-redux';

const AllProjects = ({ projects }) => {

  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  return (
    <div className="px-4 md:px-8 lg:px-20 py-3 lg:py-6">
      <p className="text-lg text-gray-300">4 NFT drops on 12 September</p>
      <p className="text-sm font-medium">All drop dates are displayed in GMT+3 time zone</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-x-5 lg:gap-y-7 pt-4">
        {
          project.upcoming_show_list.map((item, index) =>
            item.name !== "Smart feed" ?
              <Card key={index} item={item} />
              :
              null
          )
        }
      </div>
    </div>
  )
}

export default AllProjects
