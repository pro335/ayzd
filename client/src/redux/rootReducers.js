import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import categoryReducer from './reducers/categoryReducer';
import chainReducer from './reducers/chainReducer';
import userReducer from './reducers/userReducer';
import newsfeedSourceReducer from './reducers/newsfeedSourceReducer';
import mediaReducer from './reducers/mediaReducer';
import projectReducer from './reducers/projectReducer';
import livefeedReducer from './reducers/livefeedReducer';
import guideReducer from './reducers/guideReducer';
import memberReducer from './reducers/memberReducer';
import tradingReducer from './reducers/tradingReducer';
import rankingsReducer from './reducers/rankingsReducer';

const appReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  chain: chainReducer,
  user: userReducer,
  newsfeedSource: newsfeedSourceReducer,
  media: mediaReducer,
  project: projectReducer,
  livefeed: livefeedReducer,
  guide: guideReducer,
  member: memberReducer,
  // topSales: topSalesReducer,
  // topCollections: topCollectionsReducer,
  // daySales: daySalesReducer,
  // gainers: gainersReducer,
  // loosers: loosersReducer,
  // trading: tradingReducer,
  // biggestSalesAmount: biggestSalesAmountReducer,
  rankings: rankingsReducer,
  
});

const rootReducers = (state, action) => {
  if(action.type === 'LOGOUT_SUCCESS') {
    state = undefined;
  }
  return appReducer(state, action);
}

export default rootReducers;
