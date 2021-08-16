import * as ActionTypes from '../ActionTypes';

const initState = {
  gainers: [],
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const GainersReducer = (state = initState, action) => {
  const { type, gainers, err } = action;
  switch (type) {
    case ActionTypes.GAINERS_LOOSERS:
      return {
        ...state,
        gainers: gainers,
        loading: false,
        error: null
      };
    case ActionTypes.GAINERS_LOOSERS_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    default:
      return state;
  }
};
export default GainersReducer;
