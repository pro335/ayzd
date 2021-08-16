/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import reduceTextLengh from '../../utility/reduceTextLengh';
import isValid from '../../utility/isValid';
import config from '../../config/config';

var moment = require('moment');

export default function FeedModal({ open, setOpen }) {

  const { livefeed } = useSelector(state => {
    return {
      livefeed: state.livefeed,
    };
  });

  const livefeedData = isValid(livefeed.livefeedData) ?
    livefeed.livefeedData
    :
    {
      title: "",
      link: "",
      created_time: "2021-07-22T12:41:00.000+00:00",
      description: "",
      tag: 0,
      media: `${config.bucket_url}/${config.common_image}`,
    };

  let tag = isValid(livefeedData) ? livefeedData.tag : 0;
  let marketType, tagColor;

  if (tag === 1) {
    marketType = 'Bearish'
    tagColor = 'dark-red'
  } else if (tag === 2) {
    marketType = 'Bullish'
    tagColor = 'green'
  } else if (tag === 3) {
    marketType = 'LMAO'
    tagColor = 'yellow'
  } else {
    marketType = 'not-found'
    tagColor = 'white'
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" static className="fixed inset-0 overflow-hidden z-1000" open={open} onClose={setOpen}>
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
            <Dialog.Overlay className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 md:pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-2xl">

                <div className="h-full flex flex-col py-6 bg-brand-gray-900 border-l border-brand-gray-800 shadow-xl overflow-y-scroll">
                  {/* <!-- Modal Heading --> */}
                  <div className="border-b border-brand-gray-800 pb-7 px-6">

                    <div className="flex items-start justify-between text-brand-gray-300">
                      <h2 className="text-lg font-semibold">
                        {livefeedData.title}
                        <span className="inline-block ml-1">
                          <a href={livefeedData.link} target="_blank">
                            <svg className="w-4 h-4">
                              <use href="assets/icons/link.svg#icon-linked"></use>
                            </svg>
                          </a>
                        </span>
                      </h2>
                      <div className="ml-7 flex items-center">
                        <button type="button" aria-label="Top Right" className="focus:outline-none ml-auto" onClick={() => setOpen(false)}>
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center flex-wrap text-xs text-brand-gray-600 font-medium md:space-x-3 mt-1">
                      <div className="flex items-center border border-brand-gray-800 rounded-xl px-2 py-1">
                        <div className="w-6 h-6 bg-brand-gray-900 mr-2">
                          <img className="mx-auto h-full rounded-full" src="assets/logos/NBA-Top-shot.svg" alt="" />
                        </div>
                        <p className="text-sm text-gray-200">
                          NBA Top shot
                        </p>
                      </div>
                      {tag !== 0 ?
                        <p className={`bg-brand-${tagColor} bg-opacity-20 flex items-center rounded-full px-2.5 py-1`}>
                          <img src={`../assets/icons/${marketType.toLowerCase()}.svg`} alt="" />
                          <span className={`text-xxs text-brand-${tagColor}  font-semibold ml-1`}>
                            {marketType}
                          </span>
                        </p>
                        :
                        null
                      }

                      <div className="flex items-center mt-2 md:mt-0 space-x-3">

                        <p className="flex items-center">
                          <img src="assets/icons/clock.svg" alt="" />
                          <span className="ml-1.5">{moment(livefeedData.created_time).fromNow()}</span>
                        </p>
                        <p className="flex items-center">
                          <img src="assets/icons/web.svg" alt="" />
                          <span className="ml-1.5">{reduceTextLengh(livefeedData.link, 25)}</span>
                        </p>
                        <p className="flex items-center">
                          <img src="assets/icons/comment.svg" alt="" />
                          <span className="ml-1.5">{livefeedData.tag}</span>
                        </p>
                      </div>

                    </div>
                    <div>

                      {/* <!-- Image --> */}
                      <div className="h-44 rounded-md overflow-hidden py-4">
                        <img className="w-full h-full object-cover object-center" src={livefeedData.media} alt="" />
                      </div>
                      <p className="text-sm text-brand-gray-400">
                        {livefeedData.description}
                      </p>
                    </div>
                  </div>

                  {/* <!-- Modal Body --> */}
                  <div className="px-6">
                    <ul className="divide-y divide-brand-gray-800">
                      {
                        [...Array(8).keys()].map((item, index) => (
                          <li className="py-4" key={index}>
                            <div className="flex space-x-3">
                              <img className="h-6 w-6 rounded-full" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=256&amp;h=256&amp;q=80" alt="" />
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                  <h3 className=" text-gray-200 font-medium">Lindsay Walton</h3>
                                  <p className="text-brand-gray-500">1h</p>
                                </div>
                                <p className="text-brand-gray-500">
                                  Nice article
                                </p>
                              </div>
                            </div>
                          </li>
                        ))
                      }
                    </ul>
                  </div>

                  {/* <!-- Modal Message --> */}
                  <div className="border-t border-brand-gray-800 px-6 py-3">
                    <div className="h-10 flex items-center space-x-3">
                      <input type="text" placeholder="Your comment" className="h-full flex-1 bg-transparent border border-brand-gray-800 rounded-md shadow-sm placeholder-brand-gray-500 focus:outline-none px-4" />
                      <button type="submit" className="h-full block bg-brand-AYZD-PURPLE text-sm text-white font-medium rounded-md px-5">
                        Add <span className="hidden md:inline-block">comment</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
