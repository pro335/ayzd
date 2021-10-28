/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';
import config from '../../config/config';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';

const sortby = [
  { id: 1, name: 'Cheapest', key: 'cheapest' },
  { id: 2, name: 'Most expensive', key: 'most_expensive' },
  { id: 3, name: 'Most twitter followers', key: 'twitter_members' },
  { id: 4, name: 'Most discord members', key: 'discord_members' },
  { id: 5, name: 'Biggest 24h subscriber gain', key: 'biggest_gain' },
];


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Sortby() {

  const dispatch = useDispatch();
  
  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  const [sortbySelected, setSortbySelected] = useState(sortby[0]);

  const handleSortByChanged = async (value) => {

    let sortBy = null;
    if(value.id !== 0)
    sortBy = value.key;

    if(isValid(sortBy) && isValid(project.upcoming_show_list)) {    // orderBy is valid
      dispatch({
        type: ActionTypes.UPCOMING_SORT_BY,
        sortBy
      });
    }

    setSortbySelected(value);
  }  

  return (
    <div className="lg:ml-auto py-4">
      <Listbox value={sortbySelected} onChange={handleSortByChanged}>
        {({ open }) => (
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
            <Listbox.Label className="block text-sm font-medium ">Sort By</Listbox.Label>
            <div className="mt-1 relative w-full sm:w-60">
              <Listbox.Button className="bg-brand-gray-800 relative w-full rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none text-sm">
                <span className="block truncate text-brand-gray-300">{sortbySelected.name}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <SelectorIcon className="h-5 w-5 text-brand-gray-500" aria-hidden="true" />
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
                  className="absolute z-10 mt-1 w-full bg-brand-gray-800 shadow-lg max-h-40 rounded-md py-1 overflow-auto focus:outline-none text-sm"
                >
                  {sortby.map((item, index) => (
                    <Listbox.Option
                      key={index}
                      className={({ active }) =>
                        classNames(
                          active ? 'bg-brand-gray-400' : 'font-bold',
                          'text-brand-gray-300 cursor-default select-none relative onHover py-2 pl-3 pr-9'
                        )
                      }
                      value={item}
                    >
                      {({ selected, active }) => (
                        <>
                          <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                            {item.name}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4'
                              )}
                            >
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </div>
        )}
      </Listbox>
    </div>
  )
}
