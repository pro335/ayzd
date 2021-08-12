import React from 'react'
import { Link } from "react-router-dom";

const ProjectsList = ({ projects, isActive, activeHandler }) => {
  return (
    <div className="h-full flex flex-col font-medium overflow-y-scroll space-y-2 py-3 px-2">
      {
        projects.map((project, index) => {
          const url = project.name.toLowerCase().replace(/\s/g, '-')

          return (
            <Link to={url === 'nba-top-shot' ? "/nba-top-shot" : "/"}
              className={`${isActive === project.name ? 'bg-brand-gray-800 text-gray-200' : ''} h-10 hover:bg-brand-gray-800 flex items-center text-brand-gray-600 hover:text-gray-200 rounded-md onHover px-3 py-2`}
              onClick={() => activeHandler(project.name)}
              key={index}
            >
              <div className="w-6 h-6 mr-4">
                <img className="mx-auto h-full rounded-full" src={`../assets/logos/${project.icon}.svg`} alt={project.name} />
              </div>
              <p>
                {project.name}
              </p>
            </Link>
          )
        })
      }
      {
        projects.length <= 0 && <p>No Projects</p>
      }
    </div>
  )
}

export default ProjectsList
