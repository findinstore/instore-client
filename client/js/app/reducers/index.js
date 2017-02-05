import { routeReducer } from 'react-router-redux';
import { combineReducers } from 'redux';

import homeReducer from './home-reducer';
import headerReducer from './header-reducer';
import modalReducer from './modal-reducer';

const combinedReducers = combineReducers({
  routing: routeReducer,
  modal: modalReducer,
  header: headerReducer,
  home: homeReducer,
});

export default combinedReducers;