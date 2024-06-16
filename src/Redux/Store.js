import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import dashboardReducer from './reducers/dashboardReducer';
import productReducer from './reducers/productReducer';
import categoryReducer from './reducers/categoryReducer';

const rootReducer = combineReducers({
    user: userReducer,
    dashboard: dashboardReducer,
    products : productReducer,
    category :  categoryReducer,
});

const store = createStore(rootReducer);

export default store;
