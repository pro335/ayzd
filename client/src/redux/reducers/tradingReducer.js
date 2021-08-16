import * as ActionTypes from '../ActionTypes';

const initState = {
  dapps: [],
  nfts: [],
  current_nfts: [],
  current_slug: null,
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const TradingReducer = (state = initState, action) => {
  const { type, data, dapps, nfts, err } = action;
  let tempData = [];
  switch (type) {
    case ActionTypes.TRADING:
      return {
        ...state,
        dapps: dapps,
        nfts: nfts,
        current_nfts: nfts,
        loading: false,
        error: null
      };
    case ActionTypes.SET_CURRENT_SLUG:
      tempData = state.nfts;
      tempData = tempData.filter(function(item) {
        return item.dappSlug === data;
      });
      return {
        ...state,
        current_slug: data,
        current_nfts: tempData,
        loading: false,
        error: null
      };
    case ActionTypes.TRADING_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    default:
      return state;
  }
};
export default TradingReducer;
