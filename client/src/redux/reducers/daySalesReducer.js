import * as ActionTypes from '../ActionTypes';

const initState = {
  daySales: [],
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const DaySalesReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case ActionTypes.DAY_SALES:
      return {
        ...state,
        daySales: data,
        loading: false,
        error: null
      };
    case ActionTypes.DAY_SALES_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    default:
      return state;
  }
};
export default DaySalesReducer;
