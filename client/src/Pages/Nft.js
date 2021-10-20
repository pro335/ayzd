import { Fragment, useState, useEffect, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import AllProjects from "../Components/NFT/AllProjects"
import NFTSidebar from "../Components/NFT/NFTSidebar"
import NotFound from "../Components/NFT/NotFound"
// import data from '../data.json'
import SortButton from "../Components/NFT/SortButton"
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../utility/isValid';
import config from '../config/config';
import * as ActionTypes from '../redux/ActionTypes';
import LottieAnimation from '../Components/Lottie/Lottie';
import LOTTIE_DATA from '../Components/Lottie/data.json';
import { Helmet } from 'react-helmet'

const Nft = () => {

  const dispatch = useDispatch();
  
  const { category, chain, project } = useSelector(state => {
    return {
      category: state.category,
      chain: state.chain,
      project: state.project,
    };
  });

  const [isLoaded, setIsLoaded] = useState(false);

  const projects = project.projects;
  const [filteredProjects, setFilteredProjects] = useState(projects)

  const [all, setAll] = useState(false);
  const [open, setOpen] = useState(false);
  const _isMounted = useRef(false); // Initial value _isMounted = false

  useEffect(() => {
    dispatch({
      type: ActionTypes.CATEGORY_CHK_LIST_INITIALIZE,
    });
    dispatch({
      type: ActionTypes.CHAIN_CHK_LIST_INITIALIZE,
    });
    if (!_isMounted) {
      setTimeout(() => {
        setIsLoaded(true);
      }, config.LOADING_TIME);
    }
    return () => {
      _isMounted.current = true;
    };
  }, []); // here

  // useEffect(() => {
  //   dispatch({
  //     type: ActionTypes.CATEGORY_CHK_LIST_INITIALIZE,
  //   });
  //   dispatch({
  //     type: ActionTypes.CHAIN_CHK_LIST_INITIALIZE,
  //   });
  // }, [category.categories, chain.chains])

  useEffect(() => {
    setFilteredProjects(project.projects);
  }, [project.projects]);

  const handleChange = (e) => {

    /** Filter by category **/
    let selected_category_list = [];
    selected_category_list = category.category_checked_list.filter(item => item.checked === true);
    let temp_projects_by_category = [];
    if(selected_category_list.length === 0)    //if whole values of category_check_list is false, take whole projects
      temp_projects_by_category = projects;
    else {   // if whole value of category_check_list is true or some of them is true
      temp_projects_by_category = projects.filter(item => {
        for( let i = 0 ; i < category.category_checked_list.length ; i ++) {
          if(isValid(item.category) && category.category_checked_list[i].checked === true && item.category._id === category.category_checked_list[i]._id)
            return item;
        }
      });
    }

    /** Filter by chain **/
    let selected_chain_list = [];
    selected_chain_list = chain.chain_checked_list.filter(item => item.checked === true);
    let temp_projects_by_chain = [];
    if(selected_chain_list.length === 0)    //if whole values of chain_check_list is false, take whole projects
      temp_projects_by_chain = projects;
    else {   // if whole value of chain_check_list is true or some of them is true
      temp_projects_by_chain = projects.filter(item => {
        for( let i = 0 ; i < chain.chain_checked_list.length ; i ++) {
          if(isValid(item.chain) && chain.chain_checked_list[i].checked === true && item.chain._id === chain.chain_checked_list[i]._id)
            return item;
        }
      });
    }

    /** Filter the projects by category & chain **/
    const filter = temp_projects_by_category.filter(item => {
      for( let i = 0 ; i < temp_projects_by_chain.length ; i ++) {
        if(item._id === temp_projects_by_chain[i]._id)
          return item;
      }
    })

    // const filter = projects.filter(item => (isValid(item.category) && item.category._id === value) || (isValid(item.chain) && item.chain._id === value ));

    setFilteredProjects(filter);
  }

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];

    result = projects.filter((data) => data.name.toLowerCase().search(value) !== -1);
    setFilteredProjects(result);
  }

  return (
    <>
      <Helmet>
        <title>{ "NFT Project database on ayzd.com: biggest database of all the NFT projects on: opensea, rarible, foundation, solana, ethereum, binance, art" }</title>
        {/* Individual guide - “%name of a guide% - NFT guides and analytics on ayzd.com” */}
      </Helmet>
      <div className="h-full relative w-full flex flex-col overflow-hidden">
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
            <NFTSidebar handleChange={handleChange} all={all} />
          </div>

          {/* Sorting */}
          <SortButton
            open={open}
            setOpen={setOpen}
          />

          <div className="h-full pb-5 lg:col-span-5 mt-16 lg:mt-0 overflow-hidden">
            <div className="h-full overflow-y-scroll">
              { isValid(filteredProjects) ?
                  <AllProjects projects={filteredProjects} type="categories" />
                  :
                  ( !isLoaded ?
                    <div className="h-full flex flex-col justify-center items-center pb-15">
                      <LottieAnimation lotti={LOTTIE_DATA} height={50} width={50} />
                    </div>
                    :
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
                      <img className="mr-3" src="/assets/icons/sort-adjustment.svg" alt="" />
                      <span>Sort</span>
                    </button>
                    <div className="relative flex-1 mt-2">
                      <NFTSidebar handleChange={handleChange} all={all} />
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
