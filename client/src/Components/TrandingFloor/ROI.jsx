import React from 'react'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { SelectorIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const nums = [1, 2, 3, 4, 5]
const ROI = () => {
  const [selected, setSelected] = useState(nums[2])
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="pt-4 relative">
            <Listbox.Button className="relative w-full bg-brand-gray-800 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none">
              <span className="flex items-center">
                <span className="block text-sm font-medium text-gray-200 ml-3">
                  {selected}+
                </span>
              </span>

              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon className={`h-5 w-5 text-brand-gray-400 transition-transform duration-300 ease-out transform  ${open ? '-rotate-180' : ''}`} aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                static
                className="absolute z-50 mt-1 w-full bg-brand-gray-800 shadow-lg max-h-60 rounded-md py-1 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
              >
                {
                  nums.map((item, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        classNames(
                          active ? 'text-white bg-indigo-600' : '',
                          'cursor-default select-none relative py-2 pl-3 pr-9'
                        )
                      }
                      value={item}
                    >
                      {({ selected }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                            >
                              {item}
                            </span>
                          </div>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

export default ROI
