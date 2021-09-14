import { Fragment, useState, useEffect } from 'react'
import AllProjects from "../Components/Upcoming/AllProjects"
import NFTSidebar from "../Components/Upcoming/NFTSidebar"
import NotFound from "../Components/Upcoming/NotFound"
import data from '../data.json'
import SortButton from "../Components/Upcoming/SortButton"
import MobileSelectProjects from "../Components/Upcoming/MobileSelectProjects"
import { useSelector, useDispatch } from 'react-redux';
import isValid from '../utility/isValid';
import config from '../config/config';
import * as actions from '../redux/actions';
import * as ActionTypes from '../redux/ActionTypes';

const dump_data = [
  {
    key: 0,
    label: "September 12",
    count: 4,
  },
  {
    key: 0,
    label: "September 14",
    count: 12345,
  },
  {
    key: 0,
    label: "September 17",
    count: 0,
  },
  {
    key: 0,
    label: "September 18",
    count: 5,
  },
];

const dump_projects = [
  {
    main_image: { url: "https://cdn.coinranking.com/dapp/cryptokitties.svg"},
    price: 0.05,
    name: "CryptoKitties",
    upcoming_date: "Aug 31, 2021 12:00 AM",
    mint_size: 10100,
    twitter_members: 10200,
    discord_members: 9099,
  },
  {
    main_image: { url: "https://cdn.coinranking.com/dapp/cryptokitties.svg"},
    price: 0.05,
    name: "CryptoKitties",
    upcoming_date: "Aug 31, 2021 12:00 AM",
    mint_size: 10100,
    twitter_members: 10200,
    discord_members: 9099,
  },
  {
    main_image: { url: "https://cdn.coinranking.com/dapp/cryptokitties.svg"},
    price: 0.05,
    name: "CryptoKitties",
    upcoming_date: "Aug 31, 2021 12:00 AM",
    mint_size: 10100,
    twitter_members: 10200,
    discord_members: 9099,
  },
  {
    main_image: { url: "https://cdn.coinranking.com/dapp/cryptokitties.svg"},
    price: 0.05,
    name: "CryptoKitties",
    upcoming_date: "Aug 31, 2021 12:00 AM",
    mint_size: 10100,
    twitter_members: 10200,
    discord_members: 9099,
  },
  {
    main_image: { url: "https://cdn.coinranking.com/dapp/cryptokitties.svg"},
    price: 0.05,
    name: "CryptoKitties",
    upcoming_date: "Aug 31, 2021 12:00 AM",
    mint_size: 10100,
    twitter_members: 10200,
    discord_members: 9099,
  },
  {
    main_image: { url: "https://cdn.coinranking.com/dapp/cryptokitties.svg"},
    price: 0.05,
    name: "CryptoKitties",
    upcoming_date: "Aug 31, 2021 12:00 AM",
    mint_size: 10100,
    twitter_members: 10200,
    discord_members: 9099,
  },
  {
    main_image: { url: "https://cdn.coinranking.com/dapp/cryptokitties.svg"},
    price: 0.05,
    name: "CryptoKitties",
    upcoming_date: "Aug 31, 2021 12:00 AM",
    mint_size: 10100,
    twitter_members: 10200,
    discord_members: 9099,
  },
  {
    main_image: { url: "https://cdn.coinranking.com/dapp/cryptokitties.svg"},
    price: 0.05,
    name: "CryptoKitties",
    upcoming_date: "Aug 31, 2021 12:00 AM",
    mint_size: 10100,
    twitter_members: 10200,
    discord_members: 9099,
  },
  {
    main_image: { url: "https://cdn.coinranking.com/dapp/cryptokitties.svg"},
    price: 0.05,
    name: "CryptoKitties",
    upcoming_date: "Aug 31, 2021 12:00 AM",
    mint_size: 10100,
    twitter_members: 10200,
    discord_members: 9099,
  },
]

const Upcoming = () => {

  const dispatch = useDispatch();
  
  const { category, chain, project } = useSelector(state => {
    return {
      category: state.category,
      chain: state.chain,
      project: state.project,
    };
  });

  const projects = project.projects;
  const [filteredProjects, setFilteredProjects] = useState(dump_projects)

  const [all, setAll] = useState(false);

  useEffect(() => {
    dispatch({
      type: ActionTypes.CATEGORY_CHK_LIST_INITIALIZE,
    });
    dispatch({
      type: ActionTypes.CHAIN_CHK_LIST_INITIALIZE,
    });
  }, [category.categories, chain.chains])

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
      <div className="relative w-full flex flex-col overflow-hidden">
        <div className="w-full fixed h-16 bg-brand-gray-800 z-30">
          <div className="h-full w-full relative">
            <input type="text" placeholder="Search drops"
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
          <div className="lg:hidden px-4 mt-2">
            <MobileSelectProjects projects={dump_data} />
          </div>
          <div className="hidden lg:block border-r border-brand-gray-800 overflow-y-scroll pb-4">
            <NFTSidebar projects={data} handleChange={handleChange} all={all} />
          </div>
          
          <div className="h-full pb-5 lg:col-span-5 mt-2 lg:mt-0 overflow-hidden">
            <div className="h-full overflow-y-scroll">
              {
                filteredProjects.length > 0 ? (
                  <AllProjects projects={filteredProjects} />
                ) : (
                  <NotFound />
                )
              }
            </div>
          </div>
        </div>
        {/* End */}

      </div>
    </>
  )
}

export default Upcoming
