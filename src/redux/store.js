import reducer from './reducer';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

let store = createStore(reducer, applyMiddleware(thunk));
export default store;