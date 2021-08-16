import * as ActionTypes from '../ActionTypes';

const initState = {
  loosers: [],
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const GainersReducer = (state = initState, action) => {
  const { type, loosers, err } = action;
  switch (type) {
    case ActionTypes.GAINERS_LOOSERS:
      return {
        ...state,
        loosers: loosers,
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
