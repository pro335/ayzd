import { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Link } from "react-router-dom";
import isValid from '../../utility/isValid';
import config from '../../config/config';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function MobileSelectProjects({ projects }) {

  const dispatch = useDispatch();

  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  const [selected, setSelected] = useState(isValid(projects) ? projects[0] : "");

  const handleClick = (proj) => {

    dispatch({
      type: ActionTypes.SET_PROJECT_ID,
      data: proj._id,
    });
  
    let data = project.projects.filter(function(item) {
      return item._id === proj._id;
    });
    if(isValid(data)) {
      dispatch({
        type: ActionTypes.SET_PROJECT,
        data: data[0],
      });
    }
  }

  return (
    <Listbox value={selected} onChange={setSelected}>
      {isValid(selected) ?
      ({ open }) => (
        <>

          <div className="pt-4 relative">

            <Listbox.Button className="relative w-full bg-brand-gray-800 rounded-md shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none">
              <span className="flex items-center">
                <img src={isValid(selected.main_image) ? selected.main_image : `${config.bucket_url}/${config.common_image}`} className="flex-shrink-0 h-6 w-6 rounded-full" />

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
                  projects.map((person, index) => {
                    const main_image = isValid(person.main_image) ? person.main_image : `${config.bucket_url}/${config.common_image}`;

                    return (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          classNames(
                            active ? 'text-white bg-indigo-600' : '',
                            'cursor-default select-none relative py-2 pl-3 pr-9'
                          )
                        }
                        value={person}
                      >
                        {({ selected }) => (
                          <>
                            <Link to={"/nba-top-shot"} className="flex items-center" onClick={() => handleClick(person)}>
                              <img src={main_image} alt="" className="flex-shrink-0 h-6 w-6 rounded-full" />
                              <span
                                className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                              >
                                {person.name}
                              </span>
                            </Link>
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
