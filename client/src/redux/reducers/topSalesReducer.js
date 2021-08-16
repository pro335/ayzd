import * as ActionTypes from '../ActionTypes';

const initState = {
  topSales: [],
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const TopSalesReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case ActionTypes.TOP_SALES:
      return {
        ...state,
        topSales: data,
        loading: false,
        error: null
      };
    case ActionTypes.TOP_SALES_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    default:
      return state;
  }
};
export default TopSalesReducer;
