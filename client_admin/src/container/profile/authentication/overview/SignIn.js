import React, { useState } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { Form, Input, Button, notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FacebookOutlined, TwitterOutlined } from '@ant-design/icons';
import { AuthWrapper } from './style';
import * as actions from '../../../../redux/actions';
import * as ActionTypes from '../../../../redux/ActionTypes';
import { Checkbox } from '../../../../components/checkbox/checkbox';
import Heading from '../../../../components/heading/heading';

const SignIn = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isLoggedIn, isLoading, error } = useSelector(state => {
    return {
      isLoading: state.auth.isLoading,
      isLoggedIn: state.auth.login,
      error: state.auth.error,
    };
  });
  const [form] = Form.useForm();
  const [state, setState] = useState({
    checked: null,
  });

  const handleSubmit = async () => {
    let login_info = {
      email: form.getFieldValue("email"),
      password: form.getFieldValue("password")
    };
    actions.login(login_info).then( res => {
      const { success, token, user } = res.data;
      if(success) {
        dispatch({
            type: ActionTypes.LOGIN_BEGIN,
        });
        setTimeout(() => {
          dispatch({
              type: ActionTypes.LOGIN_SUCCESS,
              data: true,
              token,
              user
          });
          actions.setAuthToken(token);

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

          history.push('/admin');
          notification['success'] ({
            message: 'Successfully logged in',
            description: ''
          })              
        }, 500);
      } else {
        dispatch({
            type: ActionTypes.LOGIN_ERR,
            err: res.data.errMessage,
        });
        notification['error'] ({
          message: 'Error',
          description: res.data.errMessage
        })          
      }
    });
  };

  const onChange = checked => {
    setState({ ...state, checked });
  };

  return (
    <AuthWrapper>
      {/* <p className="auth-notice">
        Don&rsquo;t have an account? <NavLink to="/register">Sign up now</NavLink>
      </p> */}
      <div className="auth-contents">
        <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
          <Heading as="h3">
            Sign in to <span className="color-secondary">Admin</span>
          </Heading>
          <Form.Item
            name="email"
            rules={[{ message: 'Please input your Email!', required: true }]}
            initialValue="name@example.com"
            label="Email Address"
          >
            <Input />
          </Form.Item>
          <Form.Item name="password" initialValue="123456" label="Password">
            <Input.Password placeholder="Password" />
          </Form.Item>
          {/* <div className="auth-form-action">
            <Checkbox onChange={onChange}>Keep me logged in</Checkbox>
            <NavLink style={{ marginLeft: 'auto' }} className="forgot-pass-link" to="/forgotPassword">
              Forgot password?
            </NavLink>
          </div> */}
          <Form.Item>
            <Button className="btn-signin" htmlType="submit" type="primary" size="large">
              {isLoading ? 'Loading...' : 'Sign In'}
            </Button>
          </Form.Item>
          {/* <p className="form-divider">
            <span>Or</span>
          </p>
          <ul className="social-login">
            <li>
              <Link className="google-signup" to="#">
                <img src={require('../../../../static/img/google.png')} alt="" />
                <span>Sign in with Google</span>
              </Link>
            </li>
            <li>
              <Link className="facebook-sign" to="#">
                <FacebookOutlined />
              </Link>
            </li>
            <li>
              <Link className="twitter-sign" to="#">
                <TwitterOutlined />
              </Link>
            </li>
          </ul> */}
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default SignIn;
