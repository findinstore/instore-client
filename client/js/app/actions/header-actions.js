import moment from 'moment';

export const SET_HEADER_TEXT = 'SET_HEADER_TEXT';

export const setHeaderText = (headerText) => {
  return {
    type: SET_HEADER_TEXT,
    headerText,
  };
};
