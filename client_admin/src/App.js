import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { hot } from 'react-hot-loader/root';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import store from './redux/store';
import * as actions from './redux/actions';
import * as ActionTypes from './redux/ActionTypes';
import Admin from './routes/admin';
import Auth from './routes/auth';
import './static/css/style.css';
import config from './config/config';
import ProtectedRoute from './components/utilities/protectedRoute';
import moment from 'moment-timezone';
moment.tz.setDefault("Europe/Riga");

const { theme } = config;

const ProviderConfig = () => {
  const dispatch = useDispatch();
  const { rtl, isLoggedIn, topMenu, darkMode, token } = useSelector(state => {
    return {
      darkMode: state.ChangeLayoutMode.data,
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: state.ChangeLayoutMode.topMenu,
      isLoggedIn: state.auth.login,
      token: state.auth.token,
    };
  });

  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
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
  
      async function updateLivefeeds() {
        let resLivefeed = await actions.updateLivefeeds();
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
  
      async function fetchAllNewsfeedSources() {
        let resNewsfeedSource = await actions.allNewsfeedSources();
        try {
          let { success, newsfeedSources } = resNewsfeedSource.data;
          if(success) {
            dispatch({
              type: ActionTypes.ALL_NEWS_FEED_SOURCES,
              data: newsfeedSources
            });
          } else {
            dispatch({
              type: ActionTypes.NEWS_FEED_SOURCE_ERR,
              err: resNewsfeedSource.data.errMessage
            });
          }
        } catch (err) {
          console.error(err);
        }
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
  
      async function fetchAllUsers() {
        let resUser = await actions.allUsers();
        try {
          let { success, users } = resUser.data;
          if(success) {
            dispatch({
              type: ActionTypes.ALL_USERS,
              data: users
            });
          } else {
            dispatch({
              type: ActionTypes.USER_ERR,
              err: resUser.data.errMessage
            });
          }
        } catch (err) {
          console.error(err);
        }
      }  
      
      const loadData = () => {
        // setPath(window.location.pathname);
  
        fetchAllLivefeeds();
        fetchAllNewsfeedSources();
        fetchAllProjects();
        fetchAllCategories();
        fetchAllChains();
        fetchAllUsers();
      }
  
      loadData();
  
      const interval = setInterval(() => {
  
        loadData();
  
        // var m = new Date();
        // var dateString = m.getFullYear() +"/"+ (m.getMonth()+1) +"/"+ m.getDate() + " " + m.getHours() + ":" + m.getMinutes() + ":" + m.getSeconds();
        // console.log(dateString)
      }, config.TIME_INTERVAL);
    
      return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.

    }
    return () => {
      unmounted = true;
    };
  }, []);

  if(isLoggedIn) {
    actions.setAuthToken(token)
  }

  return (
    <ConfigProvider direction={rtl ? 'rtl' : 'ltr'}>
      <ThemeProvider theme={{ ...theme, rtl, topMenu, darkMode }}>
        <Router basename={process.env.PUBLIC_URL}>
          {!isLoggedIn ? <Route path="/" component={Auth} /> : <ProtectedRoute path="/admin" component={Admin} />}
          {isLoggedIn && (path === process.env.PUBLIC_URL || path === `${process.env.PUBLIC_URL}/`) && (
            <Redirect to="/admin" />
          )}
        </Router>
      </ThemeProvider>
    </ConfigProvider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ProviderConfig />
    </Provider>
  );
}

export default hot(App);