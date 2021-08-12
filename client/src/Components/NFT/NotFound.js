import React from 'react'

const NotFound = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="text-center">
        <img className="mx-auto" src="assets/icons/not-found.svg" alt="" />
        <h2 className="text-lg text-gray-100 font-medium mt-2">
          Whoops
        </h2>
        <p className="font-medium ">
          No project found with these parameters. Try something different
        </p>
      </div>
    </div>
  )
}

export default NotFound
