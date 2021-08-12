import * as ActionTypes from '../ActionTypes';

const initState = {
  users: [],
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const UserReducer = (state = initState, action) => {
  const { type, data, err } = action;
  let tempData = null;
  switch (type) {
    case ActionTypes.ADD_USER:
      return {
        ...state,
        users: [...state.users, data],
        loading: false,
        error: null,
      };
    case ActionTypes.ALL_USERS:
      return {
        ...state,
        users: data,
        loading: false,
        error: null
      };
    case ActionTypes.USER_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case ActionTypes.UPDATE_USER:
      tempData = state.users;
      let foundIndex = state.users.findIndex(x => x._id === data._id);
      if(foundIndex !== -1)
        tempData[foundIndex] = data;
      return {
        ...state,
        users: [...tempData],
        loading: false,
        error: null,
      };
    case ActionTypes.DELETE_USER:
      tempData = state.users;
      tempData = tempData.filter(function(cat) {
        return cat._id !== data._id;
      });
      return {
        ...state,
        users: [...tempData],
        loading: false,
        error: null,
      };
    // case ActionTypes.LOGOUT_SUCCESS:
    //   return {
    //     ...state,
    //     users: [],
    //     loading: false,
    //     error: null
    //   };

    default:
      return state;
  }
};
export default UserReducer;
