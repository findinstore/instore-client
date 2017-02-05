import { createSelector } from 'reselect';

import moment from 'moment';

import * as homeActions from '../actions/home-actions';

export const initialHomeState = () => {
  return {
    homeText: 'This is the home page!',
  };
}

const homeReducer = (state = initialHomeState(), action) => {

  switch (action.type) {

    case homeActions.SET_HOME_TEXT:
      return Object.assign({}, state, {
        homeText: action.homeText,
      });

    default:
      return state;
  }
}

// export const getTimeState = (state) => state.time;

export const getHomeState = (state) => state.home;

// export const getSelectedDayIsSelected = createSelector(
//   [getHomeState],
//   (scoreboardState) => {
//     return scoreboardState.selectedDay !== null;
//   }
// );

// export const getSummaryIsLoaded = createSelector(
//   [getHomeState],
//   (scoreboardState) => {
//     return scoreboardState.summary !== null;
//   }
// );

// export const getSelectedDay = (state) => moment(state.scoreboard.selectedDay);

// export const getCurrentGameDay = createSelector(
//   [getTimeState, getHomeState, getSelectedDay, getTodayDate],
//   (timeState, scoreboardState, selectedDay, gameDate) => {
//     if ( selectedDay === null ) {
//       selectedDay = gameDate;
//     }
//     var cloneSelectedDay = selectedDay;
//     var cloneGameDate = gameDate;
//     var sameDay = cloneSelectedDay.startOf('day')._d.getTime() === cloneGameDate.startOf('day')._d.getTime();
//     var previousDay = selectedDay._d.getTime() < gameDate._d.getTime();
//     var nextDay = selectedDay._d.getTime() > gameDate._d.getTime();
//     if ( sameDay ) {
//       return CURRENT_GAME_DAY.GAME_DAY;
//     } else if ( previousDay ) {
//       return CURRENT_GAME_DAY.BEFORE_GAME_DAY;
//     } else if ( nextDay ) {
//       return CURRENT_GAME_DAY.AFTER_GAME_DAY;
//     }
//   }
// );

// export const getSelectedDayOfMonth = createSelector(
//   [getSelectedDay, getDayOfMonth, getSelectedDayIsSelected],
//   (selectedDay, dayOfMonth, selectedDayIsSelected) => {
//     if ( selectedDayIsSelected ) {      
//       return selectedDay._d.getDate() 
//     } else {
//       return dayOfMonth;
//     }
//   }
// );

// export const getSelectedWeekDay = createSelector(
//   [getSelectedDay, getWeekDay, getSelectedDayIsSelected],
//   (selectedDay, weekDay, selectedDayIsSelected) => {
//     if ( selectedDayIsSelected ) {      
//       return mapDayOfWeek[selectedDay._d.getDay()];
//     } else {
//       return weekDay;
//     }
//   }
// )

// export const getSelectedMonth = createSelector(
//   [getSelectedDay, getMonth, getSelectedDayIsSelected],
//   (selectedDay, month, selectedDayIsSelected) => {
//     if ( selectedDayIsSelected ) {      
//       var month = selectedDay._d.getMonth();
//       return moment.monthsShort(month);
//     } else {
//       return month;
//     }
//   }
// );

export default homeReducer;