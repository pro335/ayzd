import React from 'react'
import { Link } from "react-router-dom";

const Guides = () => {
  return (
    <div className="h-full overflow-y-scroll p-4 sm:p-5">
      <div className="grid md:grid-cols-2 gap-6">
        {
          [...Array(8).keys()].map((item, index) => {
            return (
              <Link key={index} to="/" className="block w-full bg-brand-gray-800 rounded-lg overflow-hidden">
                <div className="h-40">
                  <img className="w-full h-full object-cover" src="../assets/images/guide.png" alt="" />
                </div>
                <div className="p-2">
                  <p className="text-xs leading-4">
                    Start level
                  </p>
                  <h4 className="text-sm text-brand-gray-300 font-medium">
                    How to value assets on Decentraland
                  </h4>
                </div>
              </Link>
            )
          })
        }
      </div>
    </div >
  )
}

export default Guides
