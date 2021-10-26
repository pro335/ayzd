import { ArrowNarrowRightIcon } from "@heroicons/react/solid";
import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import isValid from '../../utility/isValid';

const Banner = ({type="dashboard"}) => {

  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  return (
    <div className="relative flex flex-col md:flex-row md:items-center justify-between bg-base z-40 px-5 py-5 md:pl-9 md:pr-6 mt-5 lg:mt-0" >
      <div className="flex flex-row">
        { type === "upcoming" && <img className="hidden sm:flex w-7 h-7 object-cover object-center mt-2" src="/assets/icons/mail.png" alt="" /> }
        <div className="flex flex-col ml-2">
          <h4 className="text-lg text-gray-100 font-bold leading-6">
            { type === "dashboard" ? "Visit full project page" : null }
            { type === "guides" && isValid(project)  && isValid(project.projectData) ? `${project.projectData.name} guides` : null }
            { type === "upcoming" && "Receive daily emails with todays best drops" }
          </h4>
          <p className="text-sm font-medium text-white text-opacity-60">
            { type !== "upcoming" && "Detailed information, statistics, list of minted nft’s and more" }
            { type === "upcoming" && "A list of best drops in your inbox. Every day. For free." }
          </p>
        </div>
      </div>
      <div className="mt-2">
        { ((type === "dashboard") || (type === "guides" && isValid(project)  && isValid(project.projectData) && project.projectData.name !== "Research & Analytics")) &&
          <Link to={`/projects/${project.projectData.unique_id}`} className="h-10 lg:w-35 md:w-40 block bg-black bg-opacity-70 text-white text-opacity-60 hover:bg-opacity-100 hover:text-opacity-100 inline-flex items-center rounded-lg px-4">
            <span>Project details</span>
            <ArrowNarrowRightIcon className="h-6 w-4 onHover ml-2" />
          </Link>
        }
        { (type === "upcoming") &&
          <a href={`https://ayzd.substack.com/s/ayzd-daily-drops`} className="h-10 lg:w-35 md:w-40 block bg-black bg-opacity-70 text-white text-opacity-60 hover:bg-opacity-100 hover:text-opacity-100 inline-flex items-center rounded-lg px-4" target="_blank">
            <span>Subscribe</span>
            <ArrowNarrowRightIcon className="h-6 w-4 onHover ml-auto" />
          </a>
        }
      </div>

      {/* <img className="w-full h-full absolute top-0 left-0 opacity-20 -z-1" src="/assets/images/trending-banner.png" alt="" /> */}
    </div>
  )
}

export default Banner
