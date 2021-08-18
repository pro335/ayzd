import * as ActionTypes from '../ActionTypes';
import isValid from '../../utility/isValid';

const initState = {
  categories: [],
  category_checked_list: [],      // Array of { _id, name, checked }
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
  let temp_category_chk_list = [];

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
    case ActionTypes.CATEGORY_CHK_LIST_INITIALIZE:
      tempData = state.categories;
      temp_category_chk_list = [];
      tempData.map(item => {
        let temp_one_obj = {
          _id: item._id, 
          name: item.name, 
          checked: false,
        }
        temp_category_chk_list.push(temp_one_obj);
      })

      return {
        ...state,
        category_checked_list: temp_category_chk_list,
        loading: false,
        error: null,
      };
    case ActionTypes.CATEGORY_CHK_LIST_CHANGE:
      temp_category_chk_list = state.category_checked_list;
      tempData = null;
      if(isValid(temp_category_chk_list)) {
        let foundIndex = temp_category_chk_list.findIndex(x => x._id === data);

        // update the selected checked value.
        if(foundIndex !== -1)
          tempData = {
            ...temp_category_chk_list[foundIndex],
            checked: !temp_category_chk_list[foundIndex].checked
          }

        temp_category_chk_list[foundIndex] = tempData;
      }
      return {
        ...state,
        category_checked_list: [...temp_category_chk_list],
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};
export default CategoryReducer;
