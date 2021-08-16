import React from 'react'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';
import config from '../../config/config';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const MobileSelect = ({ projects }) => {
  const dispatch = useDispatch();

  const { dapps } = useSelector(state => {
    return {
      dapps: state.trading.dapps,
    };
  });

  const [selected, setSelected] = useState(dapps[0])

  const handleClick = (item) => {
    let foundIndex = dapps.findIndex(x => x.slug === item.slug);
    if(foundIndex !== -1)
      setSelected(dapps[foundIndex]);
    dispatch({
      type: ActionTypes.SET_CURRENT_SLUG,
      data: item.slug,
    });
  }

  return (
    <Listbox value={selected} onChange={(e) => handleClick(e)}>
      {({ open }) => (
        <>
          <div className="pt-4 relative">
            <Listbox.Button className="relative w-full bg-brand-gray-800 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none" onClick={() => alert("aaa")}>
              <span className="flex items-center">
                <img src={selected.image} alt={selected.name} className="flex-shrink-0 h-6 w-6 rounded-full" />

                <span className="block text-sm font-medium text-gray-200 ml-3">
                  {selected.name}
                </span>
              </span>

              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDownIcon className={`h-5 w-5 text-brand-gray-400 transition-transform duration-300 ease-out transform  ${open ? '-rotate-180' : ''}`} aria-hidden="true" />
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
                  dapps.map((item, index) => (
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
                            <img src={item.image} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                            <span
                              className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                            >
                              {item.name}
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

export default MobileSelect
