import React, { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import LiveFeedSection from "../Feeds/LiveFeedSection"
import FeedModal from "../Feeds/FeedModal"
import About from "./About"
import Guides from "./Guides"
import NFTList from "./NFTList"
import SimilarProjects from "./SimilarProjects"
import Statistics from "./Statistics"
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../../utility/isValid';
import * as actions from '../../redux/actions';
import * as ActionTypes from '../../redux/ActionTypes';

const Tabs = () => {
  const [open, setOpen] = useState(false);
  const [openFeedModal, setOpenFeedModal] = useState(false);

  const dispatch = useDispatch();
    
  const { project, buttons } = useSelector(state => {

    let tempButtons = [];
    tempButtons.push({
      "id": 1,
      "title": "About",
    });

    if(isValid(state.project.projectData) && isValid(state.project.trendingNFTs))
      tempButtons.push({
        "id": 2,
        "title": "NFT List",
      });

    // tempButtons.push({
    //   "id": 3,
    //   "title": "Statistics",
    // });

    // if(isValid(state.project.projectData) && isValid(state.project.projectData.guide_list))
    //   tempButtons.push({
    //     "id": 4,
    //     "title": "Guides",
    //   });

    if(isValid(state.livefeed) && isValid(state.livefeed.filtered_livefeeds))
      tempButtons.push({
        "id": 5,
        "title": "Newsfeed",
      });

    if(isValid(state.project.projectData) && isValid(state.project.projectData.similar_list))
      tempButtons.push({
        "id": 6,
        "title": "Similar projects",
      });

    return {
      project: state.project,
      buttons: tempButtons,
    };
  });
  
  useEffect(() => {
    
    async function fetchTrendingNFTs() {
      if(isValid(project.projectData) && isValid(project.projectData.slug)) {
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
      } else {
        dispatch({
          type: ActionTypes.SET_TRENDING_NFTS,
          data: []
        });
      }
    }

    fetchTrendingNFTs();
  }, []);

  const toggleTab = (index) => {
    dispatch({
      type: ActionTypes.SET_ACTIVE_TAB,
      data: index
    });
  };
  
  const onClickHandler = () => {
    setOpenFeedModal(!openFeedModal)
  }

  return (
    <>
      <div className="h-15 flex-shrink-0 overflow-hidden border-b border-brand-gray-800">
        <div className="w-full h-full flex items-center border-t border-brand-gray-800 space-x-4 overflow-x-scroll whitespace-nowrap px-4 sm:px-5">
          {
            buttons.map((button, index) => (
              <button key={index}
                className={`${project.activeTab === button.id && "text-brand-gray-300 border-brand-AYZD-PURPLE"} h-full text-sm font-medium border-b-2 border-transparent hover:border-brand-AYZD-PURPLE px-4`}
                onClick={() => toggleTab(button.id)}
              >
                {button.title}
              </button>
            ))
          }
        </div>
      </div>
      <div className="relative overflow-hidden">
        {
          project.activeTab === 1 ? <About /> :
            project.activeTab === 2 ? <NFTList /> :
              // project.activeTab === 3 ? <Statistics /> :
                // project.activeTab === 4 ? <Guides /> :
                  project.activeTab === 5 ? <LiveFeedSection showDetailsPanel={false} onClickHandler={onClickHandler} /> :
                    project.activeTab === 6 && <SimilarProjects />
        }
      </div>


      {/* Do not delete */}
      <div className="hidden">
        <span className="bg-brand-dark-red text-brand-dark-red"></span>
        <span className="bg-brand-yellow text-brand-yellow"></span>
      </div>



      {/* Modal */}
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
                    <div className="relative flex-1 mt-2">
                      {/* <NFTSidebar projects={data} handleChange={handleChange} all={all} /> */}
                      <h2>Hello world</h2>
                    </div>
                  </div>

                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      
      {/** Feed Modal */}
      <FeedModal open={openFeedModal} setOpen={setOpenFeedModal} />

    </>
  )
}

export default Tabs
