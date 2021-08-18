import * as ActionTypes from '../ActionTypes';
import isValid from '../../utility/isValid';

const initState = {
  chains: [],
  chain_checked_list: [],      // Array of { _id, name, checked }
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
  let temp_chain_chk_list = [];

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
    case ActionTypes.CHAIN_CHK_LIST_INITIALIZE:
      tempData = state.chains;
      temp_chain_chk_list = [];
      tempData.map(item => {
        let temp_one_obj = {
          _id: item._id, 
          name: item.name, 
          checked: false,
        }
        temp_chain_chk_list.push(temp_one_obj);
      })

      return {
        ...state,
        chain_checked_list: temp_chain_chk_list,
        loading: false,
        error: null,
      };
    case ActionTypes.CHAIN_CHK_LIST_CHANGE:
      temp_chain_chk_list = state.chain_checked_list;
      tempData = null;
      if(isValid(temp_chain_chk_list)) {
        let foundIndex = temp_chain_chk_list.findIndex(x => x._id === data);

        // update the selected checked value.
        if(foundIndex !== -1)
          tempData = {
            ...temp_chain_chk_list[foundIndex],
            checked: !temp_chain_chk_list[foundIndex].checked
          }

        temp_chain_chk_list[foundIndex] = tempData;
      }
      return {
        ...state,
        chain_checked_list: [...temp_chain_chk_list],
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};
export default ChainReducer;
