import React, { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import AllProjects from "../NFT/AllProjects"
import data from "../../data.json"
import SectionHeading from "./../SectionHeading";
import NFTListSelects from "./NFTListSelects";
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';
import config from '../../config/config';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';

const NFTList = () => {
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch();
  
  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  useEffect(() => {
    
    async function fetchTrendingNFTs() {
      
      let params = {
        dappSlug: project.projectData.slug, 
        orderBy: null, 
        orderDirection: null,
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
    }

    fetchTrendingNFTs();
  }, [])

  return (
    <>
      <div className="h-full w-full grid lg:grid-cols-6 lg:overflow-hidden">

        <div
          className="lg:hidden h-18 w-full bg-brand-gray-900 pt-5 lg:hidden px-4 md:px-8">
          <button
            type="button"
            aria-label="Sort Menu"
            className="inline-flex items-center bg-brand-gray-800 text-sm text-white font-medium rounded-lg px-4 py-2"
            onClick={() => setOpen(!open)}
          >
            <img className="mr-3" src="../assets/icons/sort-adjustment.svg" alt="" />
            <span>Sort</span>
          </button>
        </div>

        <div className="hidden lg:flex flex-col border-r border-brand-gray-800 overflow-hidden">
          <SectionHeading
            title="Sort"
            icon="sort-adjustment"
            classes="borde-t"
          />
          <NFTListSelects />
        </div>

        <div className="lg:col-span-5 overflow-y-scroll">
          <AllProjects projects={project.trendingNFTs} />
        </div>
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
                      <img className="mr-3" src="../assets/icons/sort-adjustment.svg" alt="" />
                      <span>Sort</span>
                    </button>
                    <div className="relative flex-1 mt-2 p-4">
                      <NFTListSelects />
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

export default NFTList
