import React from 'react'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  MenuIcon,
  XIcon,
} from '@heroicons/react/outline'
import { Link, NavLink } from "react-router-dom";

const navLinks = [
  {
    name: 'Dashboard',
    to: '/',
    icon: 'dashboard',
    // current: true,
    badge: false
  },
  {
    name: 'NFT Project',
    to: '/nft-projects',
    icon: 'nft',
    // current: false,
    badge: false
  },
  {
    name: 'Rankings',
    to: '/rankings',
    icon: 'ranking',
    // current: false,
    badge: false
  },
  // {
  //   name: 'Trading floor',
  //   to: '/trading',
  //   icon: 'trading-floor',
  //   // current: false,
  //   badge: true
  // },
]

const Header = () => {
  return (
    <Popover as="header" className="w-full fixed top-0 left-0 bg-brand-gray-900 border-b border-brand-gray-800 z-100 px-5">
      {({ open }) => (
        <>
          <nav className="h-16 flex items-center">
            <Link to="/">
              <img src="../assets/Logo.svg" alt="" />
            </Link>
            <div className="nav-menu hidden lg:flex items-center font-medium space-x-4.5 px-4.5">
              {
                navLinks.map((link, index) => (
                  <NavLink exact
                    to={`${link.to}`}
                    activeClassName="active"
                    key={index}
                    className="group flex items-center border-b-2 border-transparent hover:border-brand-AYZD-PURPLE hover:text-gray-100 px-1 pt-6 pb-5"
                  >
                    <svg className="w-5 h-4.5 mr-2 group-hover:text-brand-AYZD-PURPLE">
                      <use href={`../assets/icons/${link.icon}.svg#icon-${link.icon}`}></use>
                    </svg>
                    {link.name}
                  </NavLink>
                ))
              }
            </div>
            <div className="hidden lg:flex items-center font-medium ml-auto space-x-3">
              {/* <Link
                to="/"
                className="text-brand-gray-400 hover:text-gray-100">
                Sign up
              </Link> */}
              <a
                href="https://ayzd.substack.com"
                className="bg-brand-AYZD-PURPLE hover:bg-purple-700 text-white leading-7 rounded-xl px-4 py-1.5"
                target="_blank"
              >
                Subscribe to NFT newsletter
              </a>
            </div>

            {/* Menu button */}
            <div className="absolute right-5 flex-shrink-0 lg:hidden">
              {/* Mobile menu button */}
              <Popover.Button className="bg-transparent p-2 rounded-md inline-flex items-center justify-center text-cyan-200 hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none ">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Popover.Button>
            </div>
          </nav>

          <Transition.Root show={open} as={Fragment}>
            <div className="lg:hidden">
              <Transition.Child
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="duration-150 ease-in"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Popover.Overlay static className="z-20 fixed inset-0 bg-black bg-opacity-70" />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-150 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  static
                  className="z-100 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full p-2 transition transform origin-top"
                >
                  <div className="rounded-lg shadow-lg bg-brand-gray-900 ring-1 ring-black ring-opacity-5 ">
                    <div className="py-2">
                      {/* Top */}
                      <div className="flex items-center justify-between px-4">
                        <div>
                          <img src="../assets/Logo.svg" alt="" />
                        </div>
                        <div className="-mr-2">
                          <Popover.Button className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-brand-gray-300">
                            <span className="sr-only">Close menu</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </Popover.Button>
                        </div>
                      </div>

                      {/* Menu */}
                      <div className="mobile-nav-menu border-b border-brand-gray-800 mt-3 px-4 space-y-1">
                        {
                          navLinks.map((link, index) => (
                            <NavLink
                              to={`${link.to}`}
                              activeClassName="active"
                              key={index}
                              className="group flex items-center hover:text-gray-100 px-2 py-3"
                            >
                              <svg className="w-5 h-4.5 group-hover:text-brand-AYZD-PURPLE mr-4">
                                <use href={`../assets/icons/${link.icon}.svg#icon-${link.icon}`}></use>
                              </svg>
                              {link.name}
                            </NavLink>
                          ))
                        }
                      </div>

                      <div className="font-medium px-5 py-6 space-y-6">
                        {/* <Link to="/"
                          className="block bg-indigo-600 hover:bg-indigo-500 text-white text-center leading-7 rounded-xl px-10 py-1.5">
                          Sign Up
                        </Link> */}

                        <p className="text-brand-gray-500 font-medium text-center leading-6">
                          {/* Existing customer? */}
                          <a
                            href="https://ayzd.substack.com"
                            className="bg-brand-AYZD-PURPLE hover:bg-purple-700 text-white leading-7 rounded-xl px-10 py-1.5"
                            target="_blank"
                          >
                            Subscribe to NFT newsletter
                          </a>
                        </p>

                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition.Child>
            </div>
          </Transition.Root>
        </>
      )}
    </Popover>
  )
}

export default Header
