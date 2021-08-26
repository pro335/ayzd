import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Dashboard from "./Pages/Dashboard";
import Nft from "./Pages/Nft";
import Rankings from "./Pages/Rankings";
import Trading from "./Pages/Trading";
import SingleProject from "./Pages/SingleProject";
import * as actions from './redux/actions';
import * as ActionTypes from './redux/ActionTypes';
import isValid from './utility/isValid';

function App() {

  const dispatch = useDispatch();

  const { project } = useSelector(state => {
    return {
      project: state.project,
    };
  });

  useEffect( () => {

    async function initializeStore() {
      const serializedState = JSON.stringify(null)
      localStorage.setItem('ayzd', serializedState)
    }

    async function fetchAllProjects() {
      let resProject = await actions.allProjects();
      try {
        let { success, projects } = resProject.data;
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
    }
    async function fetchAllLivefeeds() {
      let resLivefeed = await actions.allLivefeeds();
      try {
        let { success, livefeeds } = resLivefeed.data;
        if(success) {
          dispatch({
            type: ActionTypes.ALL_LIVE_FEEDS,
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

    // initializeStore();
    fetchAllProjects();
    fetchAllLivefeeds();
    // fetchTopSales();
    fetchTopCollections();
    fetchBiggestSalesVolume();
    fetchDaySales();
    fetchGainersLoosers();
    fetchAllCategories();
    fetchAllChains();
    // fetchTrading();

  }, []);

  return (
    <>
      <Router>
        <Header />
        <main className="relative w-full flex flex-col pb-8 lg:pb-0 pt-16">
          <Switch>
            <Route exact path="/nft-projects" component={Nft} />
            <Route exact path="/rankings" component={Rankings} />
            <Route exact path="/trading" component={Trading} />
            <Route exact path="/projects/decentraland" component={SingleProject} />
            <Route path="/" component={Dashboard} />
          </Switch>
        </main>
      </Router>
      <Footer />
    </>
  );
}

export default App;
