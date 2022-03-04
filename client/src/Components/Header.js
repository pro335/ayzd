import React from 'react'
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import {
  MenuIcon,
  XIcon,
} from '@heroicons/react/outline'
import { Link, NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../utility/isValid';
import SetProjectData from '../utility/SetProjectData';

const navLinks = [
  {
    name: 'Dashboard',
    to: '/',
    icon: 'dashboard',
    // current: true,
    badge: false
  },
  {
    name: 'NFT Projects',
    to: '/nft-projects',
    icon: 'nft',
    // current: false,
    badge: false
  },
  // {
  //   name: 'Rankings',
  //   to: '/rankings',
  //   icon: 'ranking',
  //   // current: false,
  //   badge: false
  // },
  // {
  //   name: 'Trading floor',
  //   to: '/trading',
  //   icon: 'trading-floor',
  //   // current: false,
  //   badge: true
  // },
  {
    name: 'Drop & IGO Calendar',
    to: '/drops',
    icon: 'calendar',
    // current: false,
    badge: false
  },
  {
    name: 'Guides & Research',
    to: '/guides',
    icon: 'guides',
    // current: false,
    badge: false
  },
]

const Header = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  const handleClick = (link = null) => {
    if (isValid(link) && (link.to !== "/" && link.to !== "/guides"))    // if user doesn't click the "Dashboard", i.e. user click "NFT Project", "Rankings"
      return;

    // if user click the "Logo" or "Dashboard" navbar
    SetProjectData(null, project, null, dispatch);

    if (!isValid(link))
      history.push(`/`);
    else if (link.to === "/guides")
      history.push(`/guides`);
  }

  return (
    <Popover as="header" className="w-full fixed top-0 left-0 bg-brand-gray-900 border-b border-brand-gray-800 z-100 px-5">
      {({ open }) => (
        <>
          <nav className="h-16 flex items-center">
            <div className="hover:cursor-pointer" onClick={() => handleClick()}>
              <img src="/assets/Logo.svg" alt="" />
            </div>
            <div className="nav-menu hidden lg:flex items-center font-medium space-x-4.5 px-4.5">
              {
                navLinks.map((link, index) => (
                  <NavLink exact
                    to={`${link.to}`}
                    activeClassName="active"
                    key={index}
                    className="group flex items-center border-b-2 border-transparent hover:border-brand-AYZD-PURPLE hover:text-gray-100 px-1 pt-6 pb-5"
                    onClick={() => handleClick(link)}
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:text-brand-AYZD-PURPLE">
                      <use href={`/assets/icons/${link.icon}.svg#icon-${link.icon}`}></use>
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
                Subscribe to NFT & Metaverse newsletter
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
                          <img src="/assets/Logo.svg" alt="" />
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
                            <NavLink exact
                              to={`${link.to}`}
                              activeClassName="active"
                              key={index}
                              className="group flex items-center hover:text-gray-100 px-2 py-3"
                              onClick={() => handleClick(link)}
                            >
                              <svg className="w-5 h-5 group-hover:text-brand-AYZD-PURPLE mr-4">
                                <use href={`/assets/icons/${link.icon}.svg#icon-${link.icon}`}></use>
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

                        <a
                          href="https://ayzd.substack.com"
                          className="block bg-brand-AYZD-PURPLE hover:bg-purple-700 text-white text-center leading-7 rounded-xl px-2 py-1.5"
                          target="_blank"
                        >
                          Subscribe to NFT & Metaverse newsletter
                        </a>

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
