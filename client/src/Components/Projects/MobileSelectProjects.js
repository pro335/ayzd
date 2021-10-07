import { Fragment, useState, useEffect } from 'react'
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

export default function MobileSelectProjects({ type="dashboard" }) {

  const dispatch = useDispatch();

  const { project, rankings } = useSelector(state => {
    return {
      project: state.project,
      rankings: state.rankings,
    };
  });

  const [selected, setSelected] = useState(
    type === "dashboard" && isValid(project.projects_has_news_show_list)
      ? project.projects_has_news_show_list[0]
      : ( type === "guides" && isValid(project.projects_has_guides_show_list)
          ? project.projects_has_guides_show_list[0]
          : ""
      )
  );

  useEffect(() => {
    type === "dashboard" && isValid(project.projects_has_news_show_list)
      ? setSelected(project.projects_has_news_show_list[0])
      : ( type === "guides" && isValid(project.projects_has_guides_show_list)
          ? setSelected(project.projects_has_guides_show_list[0])
          : setSelected("")
      )
  }, [project.projects_has_news_show_list, project.projects_has_guides_show_list]); // here

  const handleClick = (proj) => {

    if(type === "dashboard") {
      dispatch({
        type: ActionTypes.SET_PROJECT_ID,
        data: proj._id,
      });
    
      let data = project.projects_has_news_show_list.filter(function(item) {
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
        rankings.topCollections.map(item => {
          if(item.name === data[0].name)
            volume = item.price;
        })

        rankings.topCollections.slice(0, 8).map((item, index) => {
          if(item.name === data[0].name)
            isBySellerCount = {
              value: index,
              flag: true
            };
        })

        rankings.biggestSalesAmount.slice(0, 8).map((item, index) => {
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
    } else if(type === "guides") {
      dispatch({
        type: ActionTypes.SET_PROJECT_ID,
        data: proj._id,
      });
    
      let data = project.projects_has_guides_show_list.filter(function(item) {
        return item._id === proj._id;
      });
      if(isValid(data)) {
        dispatch({
          type: ActionTypes.SET_PROJECT,
          data: data[0],
        });
      }
    }
  }

  return (
    <Listbox value={selected} onChange={setSelected}>
      {isValid(selected) ?
      ({ open }) => (
        <>
          <div className="pt-4 relative">

            <Listbox.Button className={`rounded-lg relative w-full bg-brand-gray-800 shadow-sm pl-3 pr-10 py-2 text-left focus:outline-none`}>
              <span className="flex items-center">
                <img src={isValid(selected.main_image) ? selected.main_image.url : `${config.bucket_url}/${config.common_image}`} className={`${selected.name === "Smart feed" || selected.name === "All guides" || selected.name === "Research & Analytics" ? '' : 'rounded-full'} flex-shrink-0 h-6 w-6`} />

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
                className={`rounded-lg absolute z-50 mt-1 w-full bg-brand-gray-800 shadow-lg max-h-60 py-1 ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm`}
              >
                {
                  type === "dashboard" && project.projects_has_news_show_list.map((person, index) => {
                    const main_image = isValid(person.main_image) ? person.main_image.url : `${config.bucket_url}/${config.common_image}`;

                    return (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          classNames(
                            active ? 'text-white bg-indigo-600' : 'rounded-lg',
                            'cursor-default select-none relative py-2 pl-3 pr-9 rounded-lg'
                          )
                        }
                        value={person}
                      >
                        {({ selected }) => (
                          <>
                            <div className="flex items-center hover:cursor-pointer" onClick={() => handleClick(person)}>
                              <img src={main_image} alt="" className={`${person.name === "Smart feed" ? '' : 'rounded-full'} flex-shrink-0 h-6 w-6`} />
                              <span
                                className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                              >
                                {person.name}
                              </span>
                            </div>
                          </>
                        )}
                      </Listbox.Option>
                    )
                })}
                {
                  type === "guides" && project.projects_has_guides_show_list.map((person, index) => {
                    const main_image = isValid(person.main_image) ? person.main_image.url : `${config.bucket_url}/${config.common_image}`;

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
                            <div className="flex items-center hover:cursor-pointer" onClick={() => handleClick(person)}>
                              <img src={main_image} alt="" className={`${person.name === "All guides" || person.name === "Research & Analytics" ? '' : 'rounded-full'} flex-shrink-0 h-6 w-6`} />
                              <span
                                className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                              >
                                {person.name}
                              </span>
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
