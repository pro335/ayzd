import * as ActionTypes from '../ActionTypes';

const initState = {
  categories: [],
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const CategoryReducer = (state = initState, action) => {
  const { type, data, err } = action;
  let tempData = null;
  switch (type) {
    case ActionTypes.ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, data],
        loading: false,
        error: null,
      };
    case ActionTypes.ALL_CATEGORIES:
      return {
        ...state,
        categories: data,
        loading: false,
        error: null
      };
    case ActionTypes.CATEGORY_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case ActionTypes.UPDATE_CATEGORY:
      tempData = state.categories;
      let foundIndex = state.categories.findIndex(x => x._id === data._id);
      if(foundIndex !== -1)
        tempData[foundIndex] = data;
      return {
        ...state,
        categories: [...tempData],
        loading: false,
        error: null,
      };
    case ActionTypes.DELETE_CATEGORY:
      tempData = state.categories;
      tempData = tempData.filter(function(cat) {
        return cat._id !== data._id;
      });
      return {
        ...state,
        categories: [...tempData],
        loading: false,
        error: null,
      };
    // case ActionTypes.LOGOUT_SUCCESS:
    //   return {
    //     ...state,
    //     categories: [],
    //     loading: false,
    //     error: null
    //   };

    default:
      return state;
  }
};
export default CategoryReducer;
