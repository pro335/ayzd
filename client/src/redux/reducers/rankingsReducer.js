import * as ActionTypes from '../ActionTypes';

const initState = {
  topCollections: [],
  topSales: [],
  biggestSalesAmount: [],
  daySales: [],
  gainers: [],
  loosers: [],
  tokens_by_market_cap: [],
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const RankingsReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case ActionTypes.TOP_COLLECTIONS:
      return {
        ...state,
        topCollections: data,
        loading: false,
        error: null
      };
    case ActionTypes.TOP_SALES:
      return {
        ...state,
        topSales: data,
        loading: false,
        error: null
      };
    case ActionTypes.BIGGEST_SALES_AMOUNT:
      let tempData = data;

      // if(isValid(tempData)) {
      //   for(let i = 0 ; i < tempData.length ; i ++) {
      //     for(let j = 0 ; j < i ; j ++) {
      //       if(parseInt(tempData[j]['amount'].replace(",", "")) - parseInt(tempData[i]['amount'].replace(",", "")) > 0) {
      //         let one_tempData = tempData[j];
      //         tempData[j] = tempData[i];
      //         tempData[i] = one_tempData;
      //       }
      //     }
      //   }
      // }

      return {
        ...state,
        biggestSalesAmount: [...tempData],
        loading: false,
        error: null
      };
    case ActionTypes.DAY_SALES:
      return {
        ...state,
        daySales: data,
        loading: false,
        error: null
      };
    case ActionTypes.GAINERS:
      return {
        ...state,
        gainers: data,
        loading: false,
        error: null
      };
    case ActionTypes.LOOSERS:
      return {
        ...state,
        loosers: data,
        loading: false,
        error: null
      };
    case ActionTypes.TOKENS_BY_MARKET_CAP:
      return {
        ...state,
        tokens_by_market_cap: data,
        loading: false,
        error: null
      };
      

    case ActionTypes.RANKINGS_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};
export default RankingsReducer;
