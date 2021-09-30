import * as ActionTypes from '../ActionTypes';

const initState = {
  newsfeedSources: [],
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const NewsfeedSourceReducer = (state = initState, action) => {
  const { type, data, err } = action;
  let tempData = null;
  switch (type) {
    case ActionTypes.ADD_NEWS_FEED_SOURCE:
      return {
        ...state,
        newsfeedSources: [...state.newsfeedSources, data],
        loading: false,
        error: null,
      };
    case ActionTypes.ALL_NEWS_FEED_SOURCES:
      return {
        ...state,
        newsfeedSources: data,
        loading: false,
        error: null
      };
    case ActionTypes.NEWS_FEED_SOURCE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case ActionTypes.UPDATE_NEWS_FEED_SOURCE:
      tempData = state.newsfeedSources;
      let foundIndex = state.newsfeedSources.findIndex(x => x._id === data._id);
      if(foundIndex !== -1)
        tempData[foundIndex] = data;
      return {
        ...state,
        newsfeedSources: [...tempData],
        loading: false,
        error: null,
      };
    case ActionTypes.DELETE_NEWS_FEED_SOURCE:
      tempData = state.newsfeedSources;
      tempData = tempData.filter(function(cat) {
        return cat._id !== data._id;
      });
      return {
        ...state,
        newsfeedSources: [...tempData],
        loading: false,
        error: null,
      };
    // case ActionTypes.LOGOUT_SUCCESS:
    //   return {
    //     ...state,
    //     newsfeedSources: [],
    //     loading: false,
    //     error: null
    //   };

    default:
      return state;
  }
};
export default NewsfeedSourceReducer;
