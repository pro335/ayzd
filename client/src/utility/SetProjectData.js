import isValid from './isValid';
import * as ActionTypes from '../redux/ActionTypes';

const SetProjectData = (data, project, rankings, dispatch) =>  {

  dispatch({
    type: ActionTypes.SET_PROJECT_ID,
    data: isValid(data) ? data._id : null,
  });

  dispatch({
    type: ActionTypes.SET_PROJECT,
    data: data,
  });

  //Sort the livefeednews by the selected project
  dispatch({
    type: ActionTypes.FILTERING_LIVE_FEED_BY_PROJECT,
    projectData: data,
  });

  //Filter guides by the selected project
  dispatch({
    type: ActionTypes.FILTERING_GUIDE_BY_PROJECT,
    projectData: data,
  });

  if(isValid(data)) {
    // get the project data(not from db)
    let volume = null, isBySellerCount = null, isBySalesVolume = null;
    rankings.topCollections.map(item => {
      if(item.name === data.name)
        volume = item.price;
    })

    rankings.topCollections.slice(0, 8).map((item, index) => {
      if(item.name === data.name)
        isBySellerCount = {
          value: index,
          flag: true
        };
    })

    rankings.biggestSalesAmount.slice(0, 8).map((item, index) => {
      if(item.name === data.name)
        isBySalesVolume =  {
          value: index,
          flag: true
        };
    })

    let projectDataNotDatabase = {
      ...project.projectDataNotDatabase,
      volume,
      isBySellerCount,
      isBySalesVolume,
    }

    dispatch({
      type: ActionTypes.SET_PROJECT_NOT_DB,
      data: projectDataNotDatabase,
    });
  }

  dispatch({
    type: ActionTypes.SET_ACTIVE_TAB,
    data: 1
  });
}

export default SetProjectData;