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
  { id: 1, name: 'Price', key: 'priceInDollar' },
  { id: 2, name: 'Minted time', key: 'createdAt' },
]

const direction = [
  { id: 1, name: 'Descending', key: 'desc' },
  { id: 2, name: 'Ascending', key: 'asc' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NFTListSelects() {

  const dispatch = useDispatch();
  
  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  const [sortbySelected, setSortbySelected] = useState(sortby[0]);
  const [directionSelected, setDirectionSelected] = useState(direction[0]);

  const handleSortByChanged = async (value) => {

    let orderBy = null, orderDirection = null;
    if(value.id !== 0)
      orderBy = value.key;
    if(directionSelected.id !== 0)
      orderDirection = directionSelected.key;

    if(isValid(orderBy)) {    // orderBy is valid
      if(isValid(project.projectData) && isValid(project.projectData.slug)) {
        let params = {
          dappSlug: project.projectData.slug, 
          orderBy, 
          orderDirection,
        }

        let res = await actions.getTrendingNFTs(params);
        try {
          let { success, trendingNFTs } = res.data;
          if(success) {
            dispatch({
              type: ActionTypes.SET_TRENDING_NFTS,
              data: trendingNFTs
            });
          } else {
            dispatch({
              type: ActionTypes.PROJECT_ERR,
              err: res.data.errMessage
            });
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        dispatch({
          type: ActionTypes.SET_TRENDING_NFTS,
          data: []
        });
      }
    }

    setSortbySelected(value);
  }  

  const handleDirectionChanged = async (value) => {

    let orderBy = null, orderDirection = null;
    if(value.id !== 0)
      orderDirection = value.key;
    if(sortbySelected.id !== 0)
      orderBy = sortbySelected.key;

    if(isValid(orderBy)) {    // orderBy is valid
      if(isValid(project.projectData) && isValid(project.projectData.slug)) {
        let params = {
          dappSlug: project.projectData.slug, 
          orderBy, 
          orderDirection,
        }

        let res = await actions.getTrendingNFTs(params);
        try {
          let { success, trendingNFTs } = res.data;
          if(success) {
            dispatch({
              type: ActionTypes.SET_TRENDING_NFTS,
              data: trendingNFTs
            });
          } else {
            dispatch({
              type: ActionTypes.PROJECT_ERR,
              err: res.data.errMessage
            });
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        dispatch({
          type: ActionTypes.SET_TRENDING_NFTS,
          data: []
        });
      }
    }

    setDirectionSelected(value);
  }  

  return (
    <div className="h-full overflow-y-scroll p-4">
      <Listbox value={sortbySelected} onChange={handleSortByChanged}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium ">Sort By:</Listbox.Label>
            <div className="mt-1 relative">
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
          </>
        )}
      </Listbox>
      <Listbox value={directionSelected} onChange={handleDirectionChanged}>
        {({ open }) => (
          <>
            <Listbox.Label className="block text-sm font-medium ">Direction:</Listbox.Label>
            <div className="mt-1 relative">
              <Listbox.Button className="bg-brand-gray-800 relative w-full rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none text-sm">
                <span className="block truncate text-brand-gray-300">{directionSelected.name}</span>
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
                  {direction.map((item, index) => (
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
          </>
        )}
      </Listbox>
    </div>
  )
}
