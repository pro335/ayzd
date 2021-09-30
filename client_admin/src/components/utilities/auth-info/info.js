import React from 'react';
import { Avatar, notification } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import FeatherIcon from 'feather-icons-react';
import { InfoWraper, UserDropDwon } from './auth-info-style';
import { Popover } from '../../popup/popup';
import Heading from '../../heading/heading';
import * as actions from '../../../redux/actions';
import * as ActionTypes from '../../../redux/ActionTypes';
import config from '../../../config/config';

const AuthInfo = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { user } = useSelector(state => {
    return {
      user: state.auth.user,
    };
  });

  const SignOut = e => {
    e.preventDefault();

    try {
      dispatch({
          type: ActionTypes.LOGOUT_BEGIN,
      });
      setTimeout(() => {
        dispatch({
            type: ActionTypes.LOGOUT_SUCCESS,
            data: null,
        });
        history.push('/');
        actions.setAuthToken();
        localStorage.removeItem('ayzdAdmin');
        notification['success'] ({
          message: 'You have been successfully Signed out!',
          description: ''
        })              
      }, 500);
    } catch (err) {
      dispatch({
          type: ActionTypes.LOGOUT_ERR,
          err: 'Unknown errors occurred during Signout!',
      });
      notification['error'] ({
        message: 'Log Out Error!',
        description: 'Unknown errors occurred during Signout!'
      })    
    }
  };

  const userContent = (
    <UserDropDwon>
      <div className="user-dropdwon">
        <figure className="user-dropdwon__info">
          <Avatar 
            src={user.avatar !== null && user.avatar !== undefined && user.avatar.name !== undefined && user.avatar.name !== null ?
              `${config.bucket_url}/${user.avatar.name}` :
              `${config.bucket_url}/${config.general_avatar}`
            }
            alt="User Avatar" 
          />
          <figcaption style={{ marginLeft: "10px" }}>
            <Heading as="h5">{user.name}</Heading>
            <p>{user.role === 0 ? "Super-admin": "Editor"}</p>
          </figcaption>
        </figure>
        {/* <ul className="user-dropdwon__links">
          <li>
            <Link to="#">
              <FeatherIcon icon="user" /> Profile
            </Link>
          </li>
          <li>
            <Link to="#">
              <FeatherIcon icon="users" /> Activity
            </Link>
          </li>
        </ul> */}
        <Link className="user-dropdwon__bottomAction" onClick={SignOut} to="#">
          <FeatherIcon icon="log-out" /> Sign Out
        </Link>
      </div>
    </UserDropDwon>
  );

  return (
    <InfoWraper>
      <div className="nav-author">
        <Popover placement="bottomRight" content={userContent} action="click">
          <Link to="#" className="head-example">
            <Avatar 
              src={user.avatar !== null && user.avatar !== undefined && user.avatar.name !== undefined && user.avatar.name !== null ?
                `${config.bucket_url}/${user.avatar.name}` :
                `${config.bucket_url}/${config.general_avatar}`
              }
              alt="User Avatar" 
            />
          </Link>
        </Popover>
      </div>
    </InfoWraper>
  );
};

export default AuthInfo;
