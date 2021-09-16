import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Dashboard from "./Pages/Dashboard";
import Upcoming from "./Pages/Upcoming";
import Nft from "./Pages/Nft";
import Rankings from "./Pages/Rankings";
import Trading from "./Pages/Trading";
import SingleProject from "./Pages/SingleProject";
import * as actions from './redux/actions';
import * as ActionTypes from './redux/ActionTypes';
import isValid from './utility/isValid';
import config from './config/config';
import moment from 'moment-timezone';
moment.tz.setDefault("Europe/Riga");

function App() {

  const dispatch = useDispatch();

  const { project, livefeed } = useSelector(state => {
    return {
      project: state.project,
      livefeed: state.livefeed,
    };
  });

  useEffect(() => {

    async function initializeProjects() {
      dispatch({
        type: ActionTypes.SET_PROJECT_ID,
        data: null,
      });
      // dispatch({
      //   type: ActionTypes.SET_PROJECT,
      //   data: null,
      // });
      // dispatch({
      //   type: ActionTypes.FILTERING_LIVE_FEED_BY_PROJECT,
      //   projectData: null,
      // });
    }

    async function fetchData1() {

      //get all projects
      let resProject = await actions.allProjects();
      let projects = [], success = false;
      try {
        success = resProject.data.success;
        projects = resProject.data.projects;
        if(success) {
          dispatch({
            type: ActionTypes.ALL_PROJECTS,
            data: projects
          });
        } else {
          dispatch({
            type: ActionTypes.PROJECT_ERR,
            err: resProject.data.errMessage
          });
        }
      } catch (err) {
        console.error(err);
      }

      //get all livefeeds
      let resLivefeed = await actions.allLivefeeds();
      let livefeeds = [];
      try {
        success = resLivefeed.data.success;
        livefeeds = resLivefeed.data.livefeeds;
        if(success) {
          dispatch({
            type: ActionTypes.ALL_LIVE_FEEDS,
            data: livefeeds
          });
          dispatch({
            type: ActionTypes.SET_FILTERED_LIVE_FEEDS,
            data: livefeeds
          });
        } else {
          dispatch({
            type: ActionTypes.LIVE_FEED_ERR,
            err: resLivefeed.data.errMessage
          });
        }
      } catch (err) {
        console.error(err);
      }

      // get the projects that has news
      let temp_projects_has_news = [], temp_projects_has_news_id_list = [];
      livefeeds.map((one_livefeed) => {
        if(isValid(one_livefeed) && isValid(one_livefeed.project) && isValid(one_livefeed.project._id)) {
          let foundIndex = temp_projects_has_news_id_list.findIndex(x => one_livefeed.project._id === x);
          if(foundIndex === -1)
            temp_projects_has_news_id_list.push(one_livefeed.project._id);
        }
      });
      projects.map((one_project, index) => {
        if(index === 0) {
          temp_projects_has_news.push(one_project);
        } else {
          let foundIndex = temp_projects_has_news_id_list.findIndex(x => one_project._id === x);
          if(foundIndex !== -1)
            temp_projects_has_news.push(one_project);
        }
      })
      dispatch({
        type: ActionTypes.SET_PROJECTS_HAS_NEWS,
        data: temp_projects_has_news
      })


      /** Start of get upcoming projects */
      let temp_upcomings = [];
      //fetch only upcoming projects
      projects.filter(function(item, index) {
        if((index !== 0) && isValid(item) && isValid(item.isUpcoming) && item.isUpcoming)
          temp_upcomings.push(item);
      });

      // //add twitter_members & discord_members to upcoming projects.
      // let temp_upcomings_include_members = [];
      // await Promise.all(temp_upcomings.map(async(item) => {
      //   let discord_members = null, twitter_members = null, temp_item = item;
      //   if(isValid(item.twitter_link)) {
      //     let resData = await actions.fetchTwitterMembersForOneProject({url: item.twitter_link});
      //     let { success, data } = resData.data;
      //     if(success) {
      //       twitter_members = data;
      //       temp_item = {
      //         ...temp_item,
      //         twitter_members
      //       }
      //     }
      //   }
      //   if(isValid(item.discord_link)) {
      //     let resData = await actions.fetchDiscordMembersForOneProject({url: item.discord_link});
      //     let { success, data } = resData.data;
      //     if(success) {
      //       discord_members = data;
      //       temp_item = {
      //         ...temp_item,
      //         discord_members
      //       }
      //     }
      //   }
      //   temp_upcomings_include_members.push(temp_item);
      // }));
      // temp_upcomings = temp_upcomings_include_members;

      //sort by the upcoming date
      temp_upcomings = temp_upcomings.sort((a, b) => {
        return new Date(a['upcoming_date']) - new Date(b['upcoming_date']);
      });

      // format the upcoming date from UTC to "Aug 31, 2021 12:00 AM"
      let temp_upcoming_date_list = [];
      temp_upcomings.map((item) => {
        let new_date = moment(item.upcoming_date).format("MMMM D");
        let foundIndex = temp_upcoming_date_list.findIndex(x => x.date === new_date);
        if(foundIndex !== -1) {
          let temp_data = temp_upcoming_date_list[foundIndex];
          temp_upcoming_date_list[foundIndex] = {
            ...temp_data,
            count: temp_data.count + 1
          };
        } else {
          temp_upcoming_date_list.push({
            date: new_date,
            count: 1
          });
        }
      });

      // get upcoming_show_list, current_date_label
      let temp_upcoming_show_list = [], temp_current_date_label = "";
      if(isValid(temp_upcoming_date_list)) {
        temp_upcoming_show_list = temp_upcomings.filter(function(item) {
          return moment(item.upcoming_date).format("MMMM D") === temp_upcoming_date_list[0].date;
        });
        
        // get current_date_label
        let month_label = "", day_label = "";
        month_label = temp_upcoming_date_list[0].date.split(" ")[0];
        day_label = temp_upcoming_date_list[0].date.split(" ")[1];
        temp_current_date_label = `${day_label} ${month_label}`;
      }
      
      dispatch({
        type: ActionTypes.SET_UPCOMING_PROJECTS,
        upcomings: temp_upcomings,
        upcoming_date_list: temp_upcoming_date_list
      });
      dispatch({
        type: ActionTypes.SET_UPCOMING_PROJECTS_SHOWING_LIST,
        upcoming_show_list: temp_upcoming_show_list,
        current_date_label: temp_current_date_label,
      });     
      /** The End of get upcoming projects */

    }

    async function updateLivefeeds() {
      let resLivefeed = await actions.updateLivefeeds();
      try {
        let { success, livefeeds } = resLivefeed.data;
        if(success) {
          dispatch({
            type: ActionTypes.ALL_LIVE_FEEDS,
            data: livefeeds
          });
          dispatch({
            type: ActionTypes.SET_FILTERED_LIVE_FEEDS,
            data: livefeeds
          });
        } else {
          dispatch({
            type: ActionTypes.LIVE_FEED_ERR,
            err: resLivefeed.data.errMessage
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
    // async function fetchTopSales() {
    //   let resTopSales = await actions.fetchTopSales();
    //   try {
    //     let { success, data } = resTopSales.data;
    //     if(success) {
    //       dispatch({
    //         type: ActionTypes.TOP_SALES,
    //         data: data
    //       });
    //     } else {
    //       dispatch({
    //         type: ActionTypes.TOP_SALES_ERR,
    //         err: resTopSales.data.errMessage
    //       });
    //     }
    //   } catch (err) {
    //     console.error(err);
    //   }
    // }
    async function fetchTopCollections() {
      let resTopCollections = await actions.fetchTopCollections();
      try {
        let { success, data } = resTopCollections.data;
        if(success) {
          dispatch({
            type: ActionTypes.TOP_COLLECTIONS,
            data: data
          });
        } else {
          dispatch({
            type: ActionTypes.TOP_COLLECTIONS_ERR,
            err: resTopCollections.data.errMessage
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
    async function fetchBiggestSalesVolume() {
      let resTopCollections = await actions.fetchBiggestSalesVolume();
      try {
        let { success, data } = resTopCollections.data;
        if(success) {
          //set biggest sales amount
          dispatch({
            type: ActionTypes.BIGGEST_SALES_AMOUNT,
            data: data
          });
        } else {
          dispatch({
            type: ActionTypes.TOP_COLLECTIONS_ERR,
            err: resTopCollections.data.errMessage
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
    async function fetchDaySales() {
      let resDaySales = await actions.fetchDaySales();
      try {
        let { success, data } = resDaySales.data;
        if(success) {
          dispatch({
            type: ActionTypes.DAY_SALES,
            data: data
          });
        } else {
          dispatch({
            type: ActionTypes.DAY_SALES_ERR,
            err: resDaySales.data.errMessage
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
    async function fetchGainersLoosers() {
      let resGainersLoosers = await actions.fetchGainersLoosers();
      try {
        let { success, gainers, loosers } = resGainersLoosers.data;
        if(success) {
          dispatch({
            type: ActionTypes.GAINERS_LOOSERS,
            gainers,
            loosers,
          });
        } else {
          dispatch({
            type: ActionTypes.DAY_SALES_ERR,
            err: resGainersLoosers.data.errMessage
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
    async function fetchAllCategories() {
      let resCategory = await actions.allCategories();
      try {
        let { success, categories } = resCategory.data;
        if(success) {
          dispatch({
            type: ActionTypes.ALL_CATEGORIES,
            data: categories
          });
        } else {
          dispatch({
            type: ActionTypes.CATEGORY_ERR,
            err: resCategory.data.errMessage
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
    async function fetchAllChains() {
      let resChain = await actions.allChains();
      try {
        let { success, chains } = resChain.data;
        if(success) {
          dispatch({
            type: ActionTypes.ALL_CHAINS,
            data: chains
          });
        } else {
          dispatch({
            type: ActionTypes.CHAIN_ERR,
            err: resChain.data.errMessage
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
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

    const loadData = () => {
      initializeProjects();
      fetchData1();
      // updateLivefeeds();
      // fetchTopSales();
      fetchTopCollections();
      fetchBiggestSalesVolume();
      fetchDaySales();
      fetchGainersLoosers();
      fetchAllCategories();
      fetchAllChains();
      // fetchTrading();
    }

    loadData();

    const interval = setInterval(() => {

      loadData();

      // var m = new Date();
      // var dateString = m.getFullYear() +"/"+ (m.getMonth()+1) +"/"+ m.getDate() + " " + m.getHours() + ":" + m.getMinutes() + ":" + m.getSeconds();
      // console.log(dateString)
    }, config.TIME_INTERVAL);
  
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])

  return (
    <>
      <Router>
        <Header />
        <main className="relative w-full flex pb-8 lg:pb-0 pt-16">
          <Switch>
            <Route exact path="/nft-projects" component={Nft} />
            <Route exact path="/rankings" component={Rankings} />
            <Route exact path="/trading" component={Trading} />
            <Route exact path="/projects/:project_unique_id" component={SingleProject} />
            <Route exact path="/upcoming" component={Upcoming} />
            <Route path="/" component={Dashboard} />
          </Switch>
        </main>
      </Router>
      <Footer />
    </>
  );
}

export default App;
