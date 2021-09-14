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

  const { project, topCollections, biggestSalesAmount } = useSelector(state => {
    return {
      project: state.project,
      topCollections: state.topCollections,
      biggestSalesAmount: state.biggestSalesAmount,
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

      //Sort the livefeednews by the selected project
      dispatch({
        type: ActionTypes.FILTERING_LIVE_FEED_BY_PROJECT,
        projectData: data[0],
      });

      // get the project data(not from db)
      let volume = null, isBySellerCount = null, isBySalesVolume = null;
      topCollections.topCollections.map(item => {
        if(item.name === data[0].name)
          volume = item.price;
      })

      topCollections.topCollections.slice(0, 8).map((item, index) => {
        if(item.name === data[0].name)
          isBySellerCount = {
            value: index,
            flag: true
          };
      })

      biggestSalesAmount.biggestSalesAmount.slice(0, 8).map((item, index) => {
        if(item.name === data[0].name)
          isBySalesVolume =  {
            value: index,
            flag: true
          };
      })

      let projectDataNotDatabase = {
        ...project.projectDataNotDatabase,
        volume,
        isBySellerCount,
        isBySalesVolume,
      }

      dispatch({
        type: ActionTypes.SET_PROJECT_NOT_DB,
        data: projectDataNotDatabase,
      });

      dispatch({
        type: ActionTypes.SET_ACTIVE_TAB,
        data: 1
      });

    }
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
                // onClick={() => handleClick(item)}
                // key={index}
              >
                <p>
                  {/* {item.label} */}September 12
                </p>
                <span class="ml-auto inline-flex items-center justify-center px-3 py-1 text-xs font-bold leading-none text-red-100 bg-black" style={{ border: '1px solid #1D1D1D', borderRadius: '6px' }}>4</span>
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
                  projects.map((person, index) => {
                    const main_image = isValid(person.main_image) ? person.main_image.url : `${config.bucket_url}/${config.common_image}`;

                    return (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          classNames(
                            active ? 'text-white bg-indigo-600' : '',
                            'cursor-default select-none relative pl-3 pr-9'
                          )
                        }
                        value={person}
                      >
                        {({ selected }) => (
                          <>
                            <div className="relative w-full shadow-sm pl-3 py-2 text-left" onClick={() => handleClick(person)}>
                              <div
                                className={`hover:bg-brand-gray-800 hover:cursor-pointer rounded-lg flex items-center hover:text-gray-200 onHover px-3 py-1`}
                                // onClick={() => handleClick(item)}
                                // key={index}
                              >
                                <p>
                                  {/* {item.label} */}September 12
                                </p>
                                <span class="ml-auto inline-flex items-center justify-center px-3 py-1 text-xs font-bold leading-none text-red-100 bg-black" style={{ border: '1px solid #1D1D1D', borderRadius: '6px' }}>4</span>
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
