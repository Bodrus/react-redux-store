import { createStore } from 'redux';
import reducer from './redusers';

const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__;
const store = createStore(reducer, reduxDevtools && reduxDevtools());

export default store;