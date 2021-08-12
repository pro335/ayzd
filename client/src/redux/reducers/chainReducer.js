import * as ActionTypes from '../ActionTypes';

const initState = {
  chains: [],
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const ChainReducer = (state = initState, action) => {
  const { type, data, err } = action;
  let tempData = null;
  switch (type) {
    case ActionTypes.ADD_CHAIN:
      return {
        ...state,
        chains: [...state.chains, data],
        loading: false,
        error: null,
      };
    case ActionTypes.ALL_CHAINS:
      return {
        ...state,
        chains: data,
        loading: false,
        error: null
      };
    case ActionTypes.CHAIN_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case ActionTypes.UPDATE_CHAIN:
      tempData = state.chains;
      let foundIndex = state.chains.findIndex(x => x._id === data._id);
      if(foundIndex !== -1)
        tempData[foundIndex] = data;
      return {
        ...state,
        chains: [...tempData],
        loading: false,
        error: null,
      };
    case ActionTypes.DELETE_CHAIN:
      tempData = state.chains;
      tempData = tempData.filter(function(cat) {
        return cat._id !== data._id;
      });
      return {
        ...state,
        chains: [...tempData],
        loading: false,
        error: null,
      };
    // case ActionTypes.LOGOUT_SUCCESS:
    //   return {
    //     ...state,
    //     chains: [],
    //     loading: false,
    //     error: null
    //   };

    default:
      return state;
  }
};
export default ChainReducer;
