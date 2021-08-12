import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
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

function App() {

  const dispatch = useDispatch();

  useEffect( () => {
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

    fetchAllProjects();
    fetchAllLivefeeds();
  }, [])

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
