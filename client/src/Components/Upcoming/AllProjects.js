import React, {useState, useEffect} from 'react'
import Card from "./Card"
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';
import Sortby from "./Sortby";

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
    <>
      {isValid(project) &&
        <>
          <div className="px-4 md:px-8 lg:px-20 py-3 lg:py-6">
            <div className="flex flex-col lg:flex-row mt-5 lg:mt-0">
              <div className="flex flex-col">
              <p className="text-lg text-gray-300 flex items-center">{project.current_date_label}</p>
              <p className="text-brand-gray-400 font-medium flex items-center">Want to be featured here?&nbsp;
                <a href="https://forms.gle/LrF9yUjEZasRMztDA"
                  style={{textDecoration: "underline"}}
                  target="_blank"
                >Add your project</a>
              </p>
              
              </div>
              <Sortby />
            </div>
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
          <div className="lg:hidden mt-6 mb-1">
            <div className="flex items-center border-t border-b border-brand-gray-800 py-3 px-2 px-4 md:px-8 lg:px-20">
              <div>
                <img src={`/assets/icons/previous_drop_icon.svg`} alt="" />
              </div>
              <p className="lg:text-md text-gray-100 font-medium leading-6 ml-3">
                {"Previous drops"}
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-x-5 lg:gap-y-7 pt-4 px-4 md:px-8 lg:px-20">
              {
                isValid(project.previous_upcomings) && project.previous_upcomings.slice(0, 10).map((item, index) =>
                  (item.name !== "Smart feed") && (item.name !== "Research & Analytics") ?
                    <Card key={index} item={item} currentTime={currentTime} />
                    :
                    null
                )
              }
            </div>
          </div>
        </>
      }
    </>
  )
}

export default AllProjects
