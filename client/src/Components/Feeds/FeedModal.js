/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import reduceTextLengh from '../../utility/reduceTextLengh';
import isValid from '../../utility/isValid';
import config from '../../config/config';
import { Link, useHistory } from "react-router-dom";
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';
import ReactPlayer from 'react-player';

var moment = require('moment');

export default function FeedModal({ open, setOpen, type="dashboard" }) {

  const dispatch = useDispatch();
  const history = useHistory();
  
  const { livefeed, project, guide } = useSelector(state => {
    return {
      livefeed: state.livefeed,
      project: state.project,
      guide: state.guide,
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

  let marketType, tagColor, bgColor = 'rgba(123, 97, 255, 0.2)';

  if (tag === 1) {
    marketType = 'Bearish';
    tagColor = '#BD2150';
    bgColor = 'rgba(189, 33, 80, 0.2)';
  } else if (tag === 2) {
    marketType = 'Bullish';
    tagColor = '#20E77B';
    bgColor = 'rgba(32, 231, 123, 0.13)';
  } else if (tag === 3) {
    marketType = 'LMAO';
    tagColor = '#D3B23D';
    bgColor = 'rgba(211, 178, 61, 0.1)';
  } else if (tag === 4) {
    marketType = 'Investment';
    tagColor = '#7B61FF';
    bgColor = 'rgba(123, 97, 255, 0.2)';
  } else if (tag === 5) {
    marketType = 'Interesting';
    tagColor = '#05FCED';
    bgColor = 'rgba(5, 252, 237, 0.13)';
  } else if (tag === 6) {
    marketType = 'Hot';
    tagColor = '#FF772B';
    bgColor = 'rgba(211, 88, 61, 0.1)';
  } else {
    marketType = 'not-found'
    tagColor = 'white'
  }

  const handleClick = (proj) => {

    if(type === "guides" && isValid(proj) && isValid(proj.name) && (proj.name === "Research & Analytics") )
      return;
      
    let data = project.projects.filter(function(item) {
      return item._id === proj._id;
    });
    if(!isValid(data))
      return;

    const item = data[0];

    setOpen(false);

    history.push(`/projects/${item.unique_id}`);
  }


  const addDefaultSrc = (e) => {
    e.target.src = '/assets/images/default_image.svg';
  }

  let main_image = null;
  if(type === "dashboard" )
    main_image = isValid(livefeedData.project) && isValid(livefeedData.project.main_image) ? livefeedData.project.main_image.url : `${config.bucket_url}/${config.common_image}`;
  else if(type === "guides")
    main_image = isValid(guide.guideData) && isValid(guide.guideData.project) && isValid(guide.guideData.project.main_image) ? guide.guideData.project.main_image.url : `${config.bucket_url}/${config.common_image}`;

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog 
        as="div" 
        static 
        className="fixed inset-0 overflow-hidden z-1000" 
        open={open} 
        onClose={() => {
          setOpen(false); 
          if(type === "guides")
            history.push(`/guides`);
        }}
      >
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
                {type === "dashboard" &&
                <div className="h-full flex flex-col py-6 bg-brand-gray-900 border-l border-brand-gray-800 shadow-xl overflow-y-scroll">
                  {/* <!-- Modal Heading --> */}
                  <div className="border-b border-brand-gray-800 pb-7 px-6">

                    <div className="flex items-start justify-between text-brand-gray-300">
                      <h2 className="text-lg font-semibold">
                        {livefeedData.title}
                        <span className="inline-block ml-1">
                          <a href={livefeedData.link} target="_blank">
                            <svg className="w-4 h-4">
                              <use href="/assets/icons/link.svg#icon-linked"></use>
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
                      { isValid(livefeedData.project) && livefeedData.project.name !== "Smart feed" ? 
                        <div className="flex items-center border border-brand-gray-800 rounded-xl px-2 py-1 hover:cursor-pointer" onClick={() => handleClick(livefeedData.project)}>
                          <div className="w-6 h-6 bg-brand-gray-900 mr-2">
                            <img className="mx-auto h-full rounded-full" src={main_image} alt={livefeedData.project.name} />
                          </div>
                          <p className="text-sm text-gray-200">
                            { livefeedData.project.name }
                          </p>
                        </div>
                        :
                        null
                      }
                      {tag !== 0 ?
                        <p className={`bg-opacity-20 flex items-center rounded-full px-2.5 py-1`} style={{backgroundColor: bgColor}}>
                          <img src={`/assets/icons/${marketType.toLowerCase()}.svg`} alt="" />
                          <span className={`font-semibold ml-1`} style={{color: tagColor, fontSize: "10px"}}>
                            {marketType}
                          </span>
                        </p>
                        :
                        null
                      }

                      <div className="flex items-center mt-2 md:mt-0 space-x-3">

                        <p className="flex items-center">
                          <img src="/assets/icons/clock.svg" alt="" />
                          <span className="ml-1.5">{moment(livefeedData.created_time).fromNow()}</span>
                        </p>
                        <p className="flex items-center">
                          <img src="/assets/icons/web.svg" alt="" />
                          <span className="ml-1.5">{reduceTextLengh(livefeedData.link, 25)}</span>
                        </p>
                        {/* <p className="flex items-center">
                          <img src="/assets/icons/comment.svg" alt="" />
                          <span className="ml-1.5">{livefeedData.tag}</span>
                        </p> */}
                      </div>

                    </div>
                    <div>
                      {/* <!-- Image --> */}
                      <div className="h-44 rounded-md overflow-hidden py-4">
                        <img className="w-full h-full object-cover object-center" src={livefeedData.media} alt="" onError={addDefaultSrc} />
                      </div>
                      <p className="text-sm text-brand-gray-400 div_modalContainer">
                        {livefeedData.description}
                      </p>
                    </div>
                    
                    {isValid(livefeedData.link) ?
                      <div className="lg:flex items-center font-medium mt-4 ml-auto space-x-3">
                        <a
                          href={livefeedData.link}
                          className="bg-brand-AYZD-PURPLE hover:bg-purple-700 text-white leading-7 rounded-xl px-auto py-1.5 w-full flex flex-col justify-center items-center"
                          target="_blank"
                        >
                          Open full article
                        </a>
                      </div>
                      :
                      null
                    }
                  </div>

                  {/* <!-- Modal Body --> */}
                  {/* <div className="px-6">
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
                  </div> */}

                  {/* <!-- Modal Message --> */}
                  {/* <div className="border-t border-brand-gray-800 px-6 py-3">
                    <div className="h-10 flex items-center space-x-3">
                      <input type="text" placeholder="Your comment" className="h-full flex-1 bg-transparent border border-brand-gray-800 rounded-md shadow-sm placeholder-brand-gray-500 focus:outline-none px-4" />
                      <button type="submit" className="h-full block bg-brand-AYZD-PURPLE text-sm text-white font-medium rounded-md px-5">
                        Add <span className="hidden md:inline-block">comment</span>
                      </button>
                    </div>
                  </div> */}
                </div>}

                {type === "guides" && isValid(guide) && isValid(guide.guideData) &&
                <div className="h-full flex flex-col py-6 bg-brand-gray-900 border-l border-brand-gray-800 shadow-xl overflow-y-scroll">
                  {/* <!-- Modal Heading --> */}
                  <div className="border-b border-brand-gray-800 pb-7 px-6">

                    <div className="flex items-start justify-between text-brand-gray-300">
                      <h2 className="text-lg font-semibold">
                        {guide.guideData.title}
                      </h2>
                      <div className="ml-7 flex items-center">        
                        <button 
                          type="button" 
                          aria-label="Top Right" 
                          className="focus:outline-none ml-auto" 
                          onClick={() => { 
                            setOpen(false); 
                            history.push(`/guides`); 
                          }}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center flex-wrap text-xs text-brand-gray-600 font-medium md:space-x-3 mt-1">
                      { isValid(guide.guideData.project) && (guide.guideData.project.name !== "Smart feed" && guide.guideData.project.name !== "All guides") ? 
                        <div 
                          className={`flex items-center border border-brand-gray-800 rounded-xl px-2 py-1 ${guide.guideData.project.name !== "Research & Analytics" ? "hover:cursor-pointer" : ""}`} 
                          onClick={() => handleClick(guide.guideData.project)}
                        >
                          <div className="w-6 h-6 bg-brand-gray-900 mr-2">
                            <img className={`mx-auto h-full ${guide.guideData.project.name !== "Research & Analytics" ? "rounded-full" : ""}`} src={main_image} alt={guide.guideData.project.name} />
                          </div>
                          <p className="text-sm text-gray-200">
                            { guide.guideData.project.name }
                          </p>
                        </div>
                        :
                        null
                      }
                    </div>
                    <div>
                      {/* <!-- Image or video --> */}
                      {isValid(guide) && isValid(guide.guideData) && guide.guideData.is_video_guide && isValid(guide.guideData.media_video) &&
                        <div className="h-84 rounded-md overflow-hidden py-4">
                          <ReactPlayer 
                            // className="w-full h-full object-cover"
                            width="100%"
                            url={guide.guideData.media_video} 
                            controls
                          />
                        </div>
                      }
                      {isValid(guide) && isValid(guide.guideData) && !guide.guideData.is_video_guide && isValid(guide.guideData.media_image) &&
                        <div className="h-44 rounded-md overflow-hidden py-4">
                          <img className="w-full h-full object-cover object-center" src={guide.guideData.media_image.url} alt="" onError={addDefaultSrc} />
                        </div>
                      }
                      <p className="text-sm text-brand-gray-400 heading-format div_modalContainer" dangerouslySetInnerHTML={{__html: guide.guideData.full_description}} />
                    </div>                    
                  </div>
                </div>}
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
