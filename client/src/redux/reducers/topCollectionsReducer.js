import * as ActionTypes from '../ActionTypes';

const initState = {
  topCollections: [],
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const TopCollectionsReducer = (state = initState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case ActionTypes.TOP_COLLECTIONS:
      return {
        ...state,
        topCollections: data,
        loading: false,
        error: null
      };
    case ActionTypes.TOP_COLLECTIONS_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };

    default:
      return state;
  }
};
export default TopCollectionsReducer;
