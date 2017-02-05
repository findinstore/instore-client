import { createSelector } from 'reselect';

import moment from 'moment';

import * as headerActions from '../actions/header-actions';

export const initialHeaderState = () => {
  return {
    headerText: 'Hello world Home',
  };
}

const headerReducer = (state = initialHeaderState(), action) => {

  switch (action.type) {

    case headerActions.SET_HEADER_TEXT:
      return Object.assign({}, state, {
        headerText: action.headerText,
      });

    default:
      return state;
  }
}

export const getHeaderState = (state) => state.header;

export default headerReducer;
