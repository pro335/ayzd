import { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Link } from "react-router-dom";
import isValid from '../../utility/isValid';
import config from '../../config/config';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';
import moment from 'moment-timezone';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function MobileSelectProjects({ }) {

  const dispatch = useDispatch();

  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  const [selected, setSelected] = useState(isValid(project.upcoming_date_list) ? project.upcoming_date_list[0] : "");


  const handleClick = (proj) => {
    let data = project.upcoming_date_list.filter(function(item) {
      return item.date === proj.date;
    });

    // get upcoming_show_list, current_date_label
    let temp_upcoming_show_list = [], temp_current_date_label = "";
    if(isValid(project.upcomings)) {
      temp_upcoming_show_list = project.upcomings.filter(function(item) {
        return moment(item.upcoming_date).format("MMMM D") === proj.date;
      });

      // get current_date_label
      let month_label = "", day_label = "";
      month_label = proj.date.split(" ")[0];
      day_label = proj.date.split(" ")[1];
      temp_current_date_label = `${day_label} ${month_label}`;
    }

    // get the upcoming_show_list
    temp_upcoming_show_list = project.upcomings.filter(function(item) {
      return moment(item.upcoming_date).format("MMMM D") === proj.date;
    });

    dispatch({
      type: ActionTypes.SET_UPCOMING_PROJECTS_SHOWING_LIST,
      upcoming_show_list: temp_upcoming_show_list,
      current_date_label: temp_current_date_label,
    });  
  }

  return (
    <Listbox value={selected} onChange={setSelected}>
      {isValid(selected) ?
      ({ open }) => (
        <>

          <div className="pt-4 relative">

            <Listbox.Button className={`${selected.name === "Smart feed" ? '' : 'rounded-md'} relative w-full bg-brand-gray-800 shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none`}>
              <div
                className={`h-8 hover:bg-brand-gray-800 hover:cursor-pointer rounded-lg flex items-center hover:text-gray-200 onHover px-3 py-1`}
                onClick={() => handleClick(selected)}
                // key={index}
              >
                <p className="text-white">
                  {selected.date}
                </p>
                <span className="ml-auto inline-flex items-center justify-center px-3 py-1 text-xs font-bold leading-none text-red-100 bg-black" style={{ border: '1px solid #1D1D1D', borderRadius: '6px' }}>{selected.count}</span>
              </div>

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
                className={`${selected.name === "Smart feed" ? '' : 'rounded-md'} absolute z-50 mt-1 w-full bg-brand-gray-800 shadow-lg max-h-60 py-1 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm`}
              >
                {
                  project.upcoming_date_list.map((one_date, index) => {
                    return (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          classNames(
                            active ? 'text-white bg-indigo-600' : '',
                            'cursor-default select-none relative pl-3 pr-9'
                          )
                        }
                        value={one_date}
                      >
                        {({ selected }) => (
                          <>
                            <div className="relative w-full shadow-sm pl-3 py-2 text-left" onClick={() => handleClick(one_date)}>
                              <div
                                className={`hover:cursor-pointer rounded-lg flex items-center hover:text-gray-200 onHover px-3 py-1`}
                                // onClick={() => handleClick(item)}
                                // key={index}
                              >
                                <p>
                                  {one_date.date}
                                </p>
                                <span className="ml-auto inline-flex items-center justify-center px-3 py-1 text-xs font-bold leading-none text-red-100 bg-black" style={{ border: '1px solid #1D1D1D', borderRadius: '6px' }}>{one_date.count}</span>
                              </div>
                            </div>
                          </>
                        )}
                      </Listbox.Option>
                    )
                  })}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )
      :
      null }
    </Listbox>
  )
}
