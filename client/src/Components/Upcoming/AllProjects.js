import React, {useState, useEffect} from 'react'
import Card from "./Card"
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';

const AllProjects = ({ }) => {

  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // executes every 1 second.
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  });

  return (
    isValid(project) ?
      <div className="px-4 md:px-8 lg:px-20 py-3 lg:py-6">
        <p className="text-lg text-gray-300">{project.current_date_label}</p>
        {/* <p className="text-sm font-medium">All drop dates are displayed in GMT+3 time zone</p> */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-x-5 lg:gap-y-7 pt-4">
          {
            project.upcoming_show_list.map((item, index) =>
              (item.name !== "Smart feed") && (item.name !== "Research & Analytics") ?
                <Card key={index} item={item} currentTime={currentTime} />
                :
                null
            )
          }
        </div>
      </div>
      :
      null
  )
}

export default AllProjects
