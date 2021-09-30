import * as ActionTypes from '../ActionTypes';
const initState = {
  projects: [],
  project_id: null,
  project_action: 0, // 0: create, 1: read, 2: update, 3: delete
  project_create_method: 0, // 0: from url, 1: manual
  projectData: null,
  loading: false,
  error: null,
};

/**
 *
 * @todo impure state mutation/explaination
 */
const ProjectReducer = (state = initState, action) => {
  const { type, data, err } = action;
  let tempData = null;
  switch (type) {
    case ActionTypes.ADD_PROJECT:
      return {
        ...state,
        projects: [...state.projects, data],
        loading: false,
        error: null,
      };
    case ActionTypes.ALL_PROJECTS:
      return {
        ...state,
        projects: data,
        loading: false,
        error: null
      };
    case ActionTypes.UPDATE_PROJECT:
      tempData = state.projects;
      let foundIndex = state.projects.findIndex(x => x._id === data._id);
      if(foundIndex !== -1)
        tempData[foundIndex] = data;
      return {
        ...state,
        projects: [...tempData],
        loading: false,
        error: null,
      };
    case ActionTypes.DELETE_PROJECT:
      tempData = state.projects;
      tempData = tempData.filter(function(cat) {
        return cat._id !== data._id;
      });
      return {
        ...state,
        projects: [...tempData],
        loading: false,
        error: null,
      };
    case ActionTypes.PROJECT_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case ActionTypes.SORTING_PROJECT_BY:
      let {sortBy} = action;

      let sortedData = [];
      switch(sortBy) {
        case 'name':
          sortedData = state.projects.sort((a, b) => {
            return a[sortBy].localeCompare(b[sortBy]);
          });
          break;
        case 'created_time':
          sortedData = state.projects.sort((a, b) => {
            return new Date(a[sortBy]).getTime() - new Date(b[sortBy]).getTime();
          });
          break;
        default:
          break;
      }
      return {
        ...state,
        projects: [...sortedData]
      }
    case ActionTypes.SET_PROJECT_ID:
      return {
        ...state,
        project_id: data
      }
    case ActionTypes.SET_PROJECT_ACTION:
      return {
        ...state,
        project_action: data
      }
    case ActionTypes.SET_PROJECT:
      return {
        ...state,
        projectData: data
      }
    case ActionTypes.SET_PROJECT_CREATE_METHOD:
      return {
        ...state,
        project_create_method: data
      }
      
    default:
      return state;
  }
};
export default ProjectReducer;