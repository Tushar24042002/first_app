import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import dashboardReducer from './reducers/dashboardReducer';
import productReducer from './reducers/productReducer';

const rootReducer = combineReducers({
    user: userReducer,
    dashboard: dashboardReducer,
    products : productReducer
});

const store = createStore(rootReducer);

export default store;
