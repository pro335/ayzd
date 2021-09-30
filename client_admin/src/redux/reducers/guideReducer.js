import * as ActionTypes from '../ActionTypes';
const initState = {
  guides: [],
  guide_id: null,
  guide_action: "create", // "create": create, "read": read, "update": update, "delete": delete
  guideData: null,
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const GuideReducer = (state = initState, action) => {
  const { type, data, err } = action;
  let tempData = null;
  switch (type) {
    case ActionTypes.ADD_GUIDE:
      return {
        ...state,
        guides: [...state.guides, data],
        loading: false,
        error: null,
      };
    case ActionTypes.ALL_GUIDES:
      return {
        ...state,
        guides: data,
        loading: false,
        error: null
      };
    case ActionTypes.UPDATE_GUIDE:
      tempData = state.guides;
      let foundIndex = state.guides.findIndex(x => x._id === data._id);
      if(foundIndex !== -1)
        tempData[foundIndex] = data;
      return {
        ...state,
        guides: [...tempData],
        loading: false,
        error: null,
      };
    case ActionTypes.DELETE_GUIDE:
      tempData = state.guides;
      tempData = tempData.filter(function(cat) {
        return cat._id !== data._id;
      });
      return {
        ...state,
        guides: [...tempData],
        loading: false,
        error: null,
      };
    case ActionTypes.GUIDE_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case ActionTypes.SET_GUIDE_ID:
      return {
        ...state,
        guide_id: data
      }
    case ActionTypes.SET_GUIDE_ACTION:
      return {
        ...state,
        guide_action: data
      }
    case ActionTypes.SET_GUIDE:
      return {
        ...state,
        guideData: data
      }
      
    default:
      return state;
  }
};
export default GuideReducer;
