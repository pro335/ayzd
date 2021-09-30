import * as ActionTypes from '../ActionTypes';
const initState = {
  members: [],
  member_id: null,
  member_action: "create", // "create": create, "read": read, "update": update, "delete": delete
  memberData: null,
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const MemberReducer = (state = initState, action) => {
  const { type, data, err } = action;
  let tempData = null;
  switch (type) {
    case ActionTypes.ADD_MEMBER:
      return {
        ...state,
        members: [...state.members, data],
        loading: false,
        error: null,
      };
    case ActionTypes.ALL_MEMBERS:
      return {
        ...state,
        members: data,
        loading: false,
        error: null
      };
    case ActionTypes.UPDATE_MEMBER:
      tempData = state.members;
      let foundIndex = state.members.findIndex(x => x._id === data._id);
      if(foundIndex !== -1)
        tempData[foundIndex] = data;
      return {
        ...state,
        members: [...tempData],
        loading: false,
        error: null,
      };
    case ActionTypes.DELETE_MEMBER:
      tempData = state.members;
      tempData = tempData.filter(function(cat) {
        return cat._id !== data._id;
      });
      return {
        ...state,
        members: [...tempData],
        loading: false,
        error: null,
      };
    case ActionTypes.MEMBER_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case ActionTypes.SET_MEMBER_ID:
      return {
        ...state,
        member_id: data
      }
    case ActionTypes.SET_MEMBER_ACTION:
      return {
        ...state,
        member_action: data
      }
    case ActionTypes.SET_MEMBER:
      return {
        ...state,
        memberData: data
      }
      
    default:
      return state;
  }
};
export default MemberReducer;
