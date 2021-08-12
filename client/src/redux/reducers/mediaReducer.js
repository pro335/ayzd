import * as ActionTypes from '../ActionTypes';

const initState = {
  medias: [],
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const MediaReducer = (state = initState, action) => {
  const { type, data, err } = action;
  let tempData = null;
  switch (type) {
    case ActionTypes.ADD_MEDIA:
      return {
        ...state,
        medias: [...state.medias, data],
        loading: false,
        error: null,
      };
    case ActionTypes.ALL_MEDIAS:
      return {
        ...state,
        medias: data,
        loading: false,
        error: null
      };
    case ActionTypes.UPDATE_MEDIA:
      tempData = state.medias;
      let foundIndex = state.medias.findIndex(x => x._id === data._id);
      if(foundIndex !== -1)
        tempData[foundIndex] = data;
      return {
        ...state,
        medias: [...tempData],
        loading: false,
        error: null,
      };
    case ActionTypes.DELETE_MEDIA:
      tempData = state.medias;
      tempData = tempData.filter(function(cat) {
        return cat._id !== data._id;
      });
      return {
        ...state,
        medias: [...tempData],
        loading: false,
        error: null,
      };
    case ActionTypes.MEDIA_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    // case ActionTypes.LOGOUT_SUCCESS:
    //   return {
    //     ...state,
    //     medias: [],
    //     loading: false,
    //     error: null
    //   };

    default:
      return state;
  }
};
export default MediaReducer;
