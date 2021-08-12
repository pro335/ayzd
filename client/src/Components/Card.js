import React from 'react'
import { Link } from "react-router-dom";

const Card = ({ item, type }) => {
  return (
    <>
      <div className="bg-brand-gray-800 border border-brand-gray-800 rounded-xl overflow-hidden">
        <Link to="/projects/decentraland"
          className="block h-41 xl:h-52"
        >
          <img className="w-full h-full object-cover" src="../assets/images/play-box-image.png" alt="" />
        </Link>
        <div className="text-xs font-medium pl-3 py-2 pr-5">
          {
            type === "categories" ?
              (
                <>
                  <p className="capitalize">
                    {item.category}
                  </p>
                  <p className="text-sm text-gray-300">
                    {item.name}
                  </p>
                </>
              ) : (
                <>
                  <p >
                    JUAN TOSCANO...
                  </p>
                  <p className="text-brand-gray-400 font-bold">
                    $4.00
                  </p>
                  <p className="text-sm text-gray-300">
                    231 sales
                  </p>
                </>
              )
          }

        </div>
      </div>
    </>
  )
}

export default Card
