import React, { useState } from 'react'
import RangeSlider from "./RangeSlider";
import { Switch } from '@headlessui/react'
import ROI from "./ROI";

const Settings = () => {
  const [enabled, setEnabled] = useState(false)

  return (
    <>
      <RangeSlider />

      <div className="">
        <div className="border-t border-b border-brand-gray-800 py-2 px-2 ">
          <label className="h-10 relative flex items-center hover:bg-brand-gray-800  hover:text-gray-200 rounded-md px-3 py-2">
            <input
              id="hide"
              type="checkbox"
              // checked={all}
              className="form-checkbox w-5 h-5 bg-brand-gray-900 border border-brand-gray-700 rounded text-brand-AYZD-PURPLE"
            />
            <span htmlFor="hide" className="flex-1 text-sm font-medium cursor-pointer capitalize ml-2">
              Hide gone deal
            </span>
          </label>
        </div>
        <div className="flex items-center px-4 py-3">
          <img src="../assets/icons/bell.svg" alt="" />
          <p className="text-lg text-gray-100 font-medium ml-2">Notifications</p>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`${enabled ? 'bg-brand-AYZD-PURPLE' : 'bg-brand-gray-400'}
          relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none  ml-auto`}
          >
            <span className="sr-only">Notifications</span>
            <span
              aria-hidden="true"
              className={`${enabled ? 'translate-x-5' : 'translate-x-0'}
            pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
            />
          </Switch>
        </div>
        <div className="px-4">
          <p>Notify me when ROI level is:</p>

          <ROI />

          <button className="relative bg-brand-gray-900 h-10 w-full flex items-center justify-center font-medium border border-brand-gray-800 hover:bg-brand-gray-700 hover:text-gray-200 rounded-lg mt-4">
            <img className="absolute left-3" src="../assets/icons/sound.svg" alt="" />

            Test sound
          </button>
        </div>

      </div>
    </>
  )
}

export default Settings
