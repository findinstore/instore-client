import moment from 'moment';

import http from '../http';

import {
  getHeaderState,
} from '../reducers/header-reducer';

export const SET_HOME_TEXT = 'SET_HOME_TEXT';

export const setHomeText = (homeText) => {
  return {
    type: SET_HOME_TEXT,
    homeText,
  };
}
