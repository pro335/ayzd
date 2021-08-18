import * as ActionTypes from '../ActionTypes';
import isValid from '../../utility/isValid';

const initState = {
  livefeeds: [],
  livefeed_id: null,
  livefeedData: null,
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const LivefeedReducer = (state = initState, action) => {
  const { type, data, err } = action;
  let tempData = null;
  switch (type) {
    case ActionTypes.ADD_LIVE_FEED:
      return {
        ...state,
        livefeeds: [...state.livefeeds, data],
        loading: false,
        error: null,
      };
    case ActionTypes.ALL_LIVE_FEEDS:
      return {
        ...state,
        livefeeds: data,
        loading: false,
        error: null
      };
    case ActionTypes.UPDATE_LIVE_FEED:
      tempData = state.livefeeds;
      let foundIndex = state.livefeeds.findIndex(x => x._id === data._id);
      if(foundIndex !== -1)
        tempData[foundIndex] = data;
      return {
        ...state,
        livefeeds: [...tempData],
        loading: false,
        error: null,
      };
    case ActionTypes.DELETE_LIVE_FEED:
      tempData = state.livefeeds;
      tempData = tempData.filter(function(cat) {
        return cat._id !== data._id;
      });
      return {
        ...state,
        livefeeds: [...tempData],
        loading: false,
        error: null,
      };
    case ActionTypes.SORTING_LIVE_FEED_BY:
      let {sortBy} = action;

      let sortedData = [];
      sortedData = sortBy === 'title' || sortBy === 'link' ?
        state.livefeeds.sort((a, b) => {
          return a[sortBy].localeCompare(b[sortBy]);
        })
        :
        state.livefeeds.sort((a, b) => {    // if sortBy is created_time
          return new Date(b[sortBy]).getTime() - new Date(a[sortBy]).getTime();
        })

      return {
        ...state,
        livefeeds: [...sortedData]
      }

    case ActionTypes.LIVE_FEED_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case ActionTypes.SET_LIVE_FEED_ID:
      return {
        ...state,
        livefeed_id: data
      }
    case ActionTypes.SET_LIVE_FEED:
      return {
        ...state,
        livefeedData: data
      }
    
    case ActionTypes.SORTING_LIVE_FEED_BY_PROJECT:
      let project_id = action.project_id;
      let livefeeds_include_project = [];   // livefeeds that include the project
      let livefeeds_not_include = [];   // livefeeds that doesn't include the project
      
      tempData = state.livefeeds;
      tempData = tempData.filter(function(item) {
        isValid(item.project) && item.project._id === project_id ?
          livefeeds_include_project.push(item)
          :
          livefeeds_not_include.push(item);
      });

      return {
        ...state,
        livefeeds: [...livefeeds_include_project, ...livefeeds_not_include],
      }

    default:
      return state;
  }
};
export default LivefeedReducer;
