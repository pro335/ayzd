import Cookies from 'js-cookie';
import actions from './actions';
import axios from 'axios';
import config from '../../config/config';

axios.defaults.baseURL = config.api_url;

const { loginBegin, loginSuccess, loginErr, logoutBegin, logoutSuccess, logoutErr } = actions;


const login = (login_info) => dispatch => {

  return axios.post("/api/auth/login", login_info)
    .then(res => {
      const { success, token, user } = res.data;
      if(success) {
        axios.defaults.headers.common["Authorization"] = token;
            dispatch(loginBegin());
            setTimeout(() => {
              Cookies.set('ayzd_admin_logedIn', true);
              dispatch(loginSuccess(true));
            }, 1000);
      } else {
          dispatch(loginErr(res.data.errMessage));
      }
    })
    .catch(err => {
      console.log(err);
    })


};

const logOut = () => {
  return async dispatch => {
    try {
      dispatch(logoutBegin());
      Cookies.remove('ayzd_admin_logedIn');
      dispatch(logoutSuccess(null));
    } catch (err) {
      dispatch(logoutErr(err));
    }
  };
};

export { login, logOut };
