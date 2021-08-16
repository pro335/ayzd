import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import AllProjects from "../Components/NFT/AllProjects"
import NFTSidebar from "../Components/NFT/NFTSidebar"
import NotFound from "../Components/NFT/NotFound"
import data from '../data.json'
import SortButton from "../Components/NFT/SortButton"
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../utility/isValid';
import config from '../config/config';
import * as actions from '../redux/actions';
import * as ActionTypes from '../redux/ActionTypes';

const Nft = () => {
  
  const { category, chain, project } = useSelector(state => {
    return {
      category: state.category,
      chain: state.chain,
      project: state.project,
    };
  });

  const projects = project.projects;
  const [filteredProjects, setFilteredProjects] = useState(projects)

  const [all, setAll] = useState(false)
  const [open, setOpen] = useState(false)

  const handleChange = (e) => {
    const value = e.target.value;

    if (value === "all") {
      setFilteredProjects(projects)
      setAll(!all)
      return;
    }

    const filter = projects.filter(item => (isValid(item.category) && item.category._id === value) || (isValid(item.chain) && item.chain._id === value ));

    setFilteredProjects(filter)
  }

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];

    result = projects.filter((data) => data.name.toLowerCase().search(value) !== -1);
    setFilteredProjects(result);
  }

  return (
    <>
      <div className="relative w-full flex flex-col overflow-hidden">
        <div className="w-full fixed h-16 bg-brand-gray-800 z-30">
          <div className="h-full w-full relative">
            <input type="text" placeholder="Search NFT Projects"
              className="h-full w-full bg-transparent text-sm placeholder-brand-gray-500 focus:text-gray-300  focus:outline-none px-14"
              onChange={e => handleSearch(e)} />

            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute top-1/2 left-5 transform -translate-y-1/2"
              fill="none" viewBox="0 0 24 24" stroke="#7E7E7E">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="h-full w-full grid lg:grid-cols-6 lg:overflow-hidden pt-16">
          <div className="hidden lg:block border-r border-brand-gray-800 overflow-y-scroll pb-4">
            <NFTSidebar projects={data} handleChange={handleChange} all={all} />
          </div>

          {/* Sorting */}
          <SortButton
            open={open}
            setOpen={setOpen}
          />

          <div className="h-full pb-5 lg:col-span-5 mt-16 lg:mt-0 overflow-hidden">
            <div className="h-full overflow-y-scroll">
              {
                filteredProjects.length > 0 ? (
                  <AllProjects projects={filteredProjects} type="categories" />
                ) : (

                  <NotFound />
                )
              }
            </div>
          </div>
        </div>
        {/* End */}

      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 overflow-hidden z-1000"
          open={open}
          onClose={setOpen}>
          <div className="absolute inset-0 overflow-hidden">

            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 bg-brand-gray-800 bg-opacity-50 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-y-0 left-0 pr-10 max-w-full flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <div className="relative w-screen max-w-md border-r border-brand-gray-500">

                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-8 pt-4 pl-2 flex sm:-mr-10 sm:pl-4">
                      <button
                        className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setOpen(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>

                  <div className="h-full flex flex-col py-4 bg-brand-gray-900 shadow-xl overflow-y-scroll">
                    <button
                      type="button"
                      aria-label="Sort Menu"
                      className="inline-flex items-center text-sm text-white font-medium  px-4 py-2"
                      onClick={() => setOpen(!open)}
                    >
                      <img className="mr-3" src="assets/icons/sort-adjustment.svg" alt="" />
                      <span>Sort</span>
                    </button>
                    <div className="relative flex-1 mt-2">
                      <NFTSidebar projects={data} handleChange={handleChange} all={all} />
                    </div>
                  </div>

                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default Nft
