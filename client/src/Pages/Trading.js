import React, { Fragment, useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import SectionHeading from "../Components/SectionHeading"
import MobileSelect from "../Components/TrandingFloor/Mobile-Select";
import Settings from "../Components/TrandingFloor/Settings";
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../utility/isValid';
import config from '../config/config';
import * as actions from '../redux/actions';
import * as ActionTypes from '../redux/ActionTypes';
import { Helmet } from 'react-helmet'

const Trading = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect( () => {
    async function fetchTrading() {
      let resTrading = await actions.fetchTrading();
      try {
        let { success, dapps, nfts } = resTrading.data;
        if(success) {
          dispatch({
            type: ActionTypes.TRADING,
            dapps,
            nfts,
          });
        } else {
          dispatch({
            type: ActionTypes.TRADING_ERR,
            err: resTrading.data.errMessage
          });
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchTrading();
  }, [])

  const { dapps, current_nfts } = useSelector(state => {
    return {
      dapps: state.trading.dapps,
      current_nfts: state.trading.current_nfts,
    };
  });

  const handleClick = (item) => {
    dispatch({
      type: ActionTypes.SET_CURRENT_SLUG,
      data: item.slug,
    });
  }

  return (
    <>
      <Helmet>
        <title>{ "Trading" }</title>
      </Helmet>
      <div className="h-full w-full grid lg:grid-cols-6 lg:overflow-hidden">

        {/* Left */}
        <div className="h-full col-span-1">
          <div className="h-full border-r border-brand-gray-800">
            <div className="hidden lg:flex items-center space-x-3 p-5">
              <img src="/assets/icons/grid.svg" alt="" />
              <p className="textsm font-medium">
                All
              </p>
            </div>

            <div className="w-full bg-brand-gray-900 fixed lg:hidden z-40 px-4 sm:px-5 pb-1">
              <MobileSelect />

              <div className="w-full pt-3">
                <button
                  type="button"
                  aria-label="Sort Menu"
                  className="inline-flex items-center bg-brand-gray-800 text-sm text-white font-medium rounded-lg px-4 py-2"
                  onClick={() => setOpen(!open)}
                >
                  <img className="mr-3" src="/assets/icons/sort-adjustment.svg" alt="" />
                  <span>Settings</span>
                </button>
              </div>
            </div>

            <div className="hidden lg:block px-1">
              {
                dapps.map((item, index) => (
                  <div
                    className='h-10 hover:bg-brand-gray-800 flex items-center text-brand-gray-600 hover:text-gray-200 rounded-md onHover px-3 py-2'
                    key={`dapps ${index}`}
                    onClick={() => handleClick(item)}
                  >
                    <div className="w-6 h-6 mr-4">
                      <img className="mx-auto h-full rounded-full" src={item.image} alt="" />
                    </div>
                    <p>
                      {item.name}
                    </p>
                  </div>
                ))
              }
            </div>
          </div>

        </div>

        {/* Center */}
        <div className="lg:col-span-4 overflow-hidden mt-28 lg:mt-0">
          <div className="h-full border-r border-brand-gray-800">
            <div className="h-full w-full flex flex-col overflow-hidden">
              {/* Navigation */}
              <nav className="h-15 flex items-center border-b border-brand-gray-800 px-2 py-3" aria-label="Tabs">
                {/* bg-gray-100 text-gray-700 */}
                {/* <a href="!#" className="font-medium text-sm rounded-md onHover hover:text-brand-gray-300 px-3 py-2"
                >
                  Value
                </a>
                <a href="!#" className="font-medium text-sm rounded-md onHover hover:text-brand-gray-300 px-3 py-2"
                >
                  Price
                </a> */}
                <a href="!#" className="font-medium text-sm rounded-md onHover hover:text-brand-gray-300 px-3 py-2"
                >
                  Details
                </a>
              </nav>


              <div className="h-full overflow-y-scroll pb-6">
                {
                  current_nfts.map(item => (
                    <div key={item.id} className="w-full lg:h-15 flex flex-col md:flex-row lg:items-center border-b border-brand-gray-800 px-5 py-4 md:py-2">
                      <div className="flex items-center">
                        {/* <div>
                          <p className="text-brand-gray-300">$1,012</p>
                          <div className="relative h-1 bg-brand-gray-800 rounded-full overflow-hidden">
                            <div className="w-1/2 h-full bg-brand-green absolute left-0 rounded-full"></div>
                          </div>
                        </div> */}

                        <div className="px-4">
                          <p className="text-brand-gray-300">$ {Math.round(item.priceInDollar * 100)/100}</p>
                          <div className="relative h-1 bg-brand-gray-800 rounded-full overflow-hidden">
                            <div className="w-full h-full bg-brand-AYZD-PURPLE absolute left-0 rounded-full"></div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-9">
                            <img className="w-full h-full object-cover" src={item.image} alt="" />
                          </div>
                          <div>
                            <h4 className="text-brand-gray-300">{item.name}</h4>
                            {/* Desktop */}
                            {/* <div className="hidden md:block text-xs space-x-1">
                              <span>Jump Shot</span> ·
                              <span>02/09/2020</span>
                              <span>#3399</span>
                            </div> */}
                            {/* Mobile */}
                            {/* <div className="md:hidden text-xs">
                              <p>
                                <span>Jump Shot</span> ·&nbsp;
                                <span>#3399</span>
                              </p>
                              <span>02/09/2020</span>
                            </div> */}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center md:space-x-3 md:ml-auto mt-3.5 md:mt-0 ml-auto">
                        {/* <div className="flex flex-col text-xs pr-5 order-1 md:order-none ">
                          <span>35m</span>
                          <span>50s ago</span>
                        </div> */}
                        <button className="h-10 bg-brand-AYZD-PURPLE text-sm text-white font-medium shadow-sm rounded-md hover:bg-purple-700 onHover px-4" onClick={() => window.open(item.externalUrl, "_blank")}>
                          Buy
                        </button>
                        <button className="h-10 w-10 border border-brand-gray-500 hover:border-brand-gray-300 shadow-sm rounded-md onHover group mx-3 md:mx-0">
                          <svg className="w-5 h-5 group-hover:text-brand-gray-300 mx-auto">
                            <use href={`/assets/icons/biggest-sales.svg#icon-biggest-sales`}></use>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="hidden lg:block col-span-1">
          <div className="h-full overflow-y-scroll">
            <SectionHeading
              title="Settings"
              icon="sort-adjustment"
            />

            <div className="relative w-full">
              <Settings />
            </div>
          </div>
        </div>
      </div>



      {/* Popup */}
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
                      <span>Settings</span>
                    </button>
                    <div className="relative flex-1 mt-2 p-4">
                      <Settings />
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

export default Trading
