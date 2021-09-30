import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducers';

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('ayzdAdmin', serializedState)
    }catch(e){
        console.log(e);
    }
}

function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('ayzdAdmin')
        if(serializedState === null) return undefined
        return JSON.parse(serializedState)
    }catch (e) {
        console.log(e)
        return undefined
    }
}

const persistedState = loadFromLocalStorage();

(process.env.NODE_ENV === "development" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
const reduxDevTool =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(thunk.withExtraArgument()))
    : compose(applyMiddleware(thunk.withExtraArgument()));
const store = createStore(rootReducer, persistedState, reduxDevTool);

const unsubscribe = store.subscribe(() => {
    const state = store.getState();
    saveToLocalStorage(state);
});

export default store;
