import * as ActionTypes from '../ActionTypes';
const initState = {
  projects: [],
  projects_has_news: [],    // project list in the dashboard page(only projects that has the live news) 
  projects_has_news_show_list: [],    // project list in the dashboard page(only projects that has the live news) to show
  projects_has_guides: [],    // project list in the guides page(only projects that has the guides) 
  projects_has_guides_show_list: [],    // project list in the guides page(only projects that has the guides) to show
  upcomings: [],    // whole upcoming projects
  upcoming_show_list: [],   // upcoming projects to show
  upcoming_date_list: [],   // data for left side bar in Drop Calendar menu
  previous_upcomings: [],    // whole upcoming projects
  previous_upcoming_show_list: [],   // upcoming projects to show
  previous_upcoming_date_list: [],   // data for left side bar in Drop Calendar menu
  current_date_label: null,   // the label of right side in the Drop Calendar page.
  project_id: null,
  project_action: 0, // 0: create, 1: read, 2: update, 3: delete
  projectData: null,
  projectDataNotDatabase: { 
    volume: null, 
    isBySellerCount: { value: null, flag: null }, 
    isBySalesVolume: { value: null, flag: null }, 
    // twitter_members: null, 
    // discord_members: null 
  },
  trendingNFTs: [],
  activeTab: 1,     //  1: About, 2: NFT List, 3: Statistics, 3: Guides, 4: Guides, 5: Newsfeed, 6: Similar projects,
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
    case ActionTypes.SET_TRENDING_NFTS:
      return {
        ...state,
        trendingNFTs: data,
      }
    case ActionTypes.SET_PROJECT_NOT_DB:
      return {
        ...state,
        projectDataNotDatabase: data,
      }
    case ActionTypes.SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: data,
      }      
    case ActionTypes.SET_PROJECTS_HAS_NEWS:
      return {
        ...state,
        projects_has_news: data,
        projects_has_news_show_list: data,
      }
    case ActionTypes.SET_PROJECTS_HAS_NEWS_SHOW_LIST:
      return {
        ...state,
        projects_has_news_show_list: data,
      }
    case ActionTypes.SET_UPCOMING_PROJECTS: 
      return {
        ...state,
        upcomings: action.upcomings,
        upcoming_date_list: action.upcoming_date_list,
      }
    case ActionTypes.SET_UPCOMING_PROJECTS_SHOWING_LIST: 
      return {
        ...state,
        upcoming_show_list: action.upcoming_show_list,
        current_date_label: action.current_date_label,
      }      
    case ActionTypes.SET_PROJECTS_HAS_GUIDES:
      return {
        ...state,
        projects_has_guides: data,
        projects_has_guides_show_list: data,
      }
    case ActionTypes.SET_PROJECTS_HAS_GUIDES_SHOW_LIST:
      return {
        ...state,
        projects_has_guides_show_list: data,
      }
    case ActionTypes.SET_PREVIOUS_UPCOMING_PROJECTS:
      return {
        ...state,
        previous_upcomings: action.previous_upcomings,    
        previous_upcoming_show_list: action.previous_upcoming_show_list,   
        previous_upcoming_date_list: action.previous_upcoming_date_list,   
      }      

    default:
      return state;
  }
};
export default ProjectReducer;
