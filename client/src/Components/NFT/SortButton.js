import React from 'react'

const SortButton = ({ open, setOpen }) => {
  return (
    <>
      <div className="h-18 w-full bg-brand-gray-900 fixed pt-5 lg:hidden px-4 md:px-8">
        <button
          type="button"
          aria-label="Sort Menu"
          className="inline-flex items-center bg-brand-gray-800 text-sm text-white font-medium rounded-lg px-4 py-2"
          onClick={() => setOpen(!open)}
        >
          <img className="mr-3" src="../assets/icons/sort-adjustment.svg" alt="" />
          <span>Sort</span>
        </button>
      </div>
    </>
  )
}

export default SortButton
