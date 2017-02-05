import moment from 'moment';
import { routeReducer } from 'react-router-redux';

import { initialHeaderState } from 'js/app/reducers/header-reducer';
import { initialHomeState } from 'js/app/reducers/home-reducer';
import { initialModalState } from 'js/app/reducers/modal-reducer';

var millisecond = 1;
var second = 1000;
var minute = 60 * second;
var hour = 60 * minute;
var day = 24 * hour;

export const loadState = () => {
  try {
    let serializedState = JSON.parse(localStorage.getItem('instoreState'));
    if ( serializedState === null ) {
      return undefined;
    }
    var lastLoginTime = serializedState.time.currentTime;
    var currentTime = moment()._d.getTime();
    var modSerializedState = Object.assign({}, serializedState, {
      // time: Object.assign({}, serializedState.time, {
      //   currentTime: moment()._d
      // }),
      // scoreboard: Object.assign({}, serializedState.scoreboard, {
      //   selectedDay: moment(serializedState.scoreboard.selectedDay)._d
      // })
    });

    // var tenMinutes = minute * 10;
    // if ( true /*currentTime - lastLoginTime > tenMinutes*/ ) {
    //   modSerializedState = Object.assign({}, serializedState, {
    //     scoreboard: Object.assign({}, serializedState.scoreboard, {
    //       selectedDay: null
    //     })
    //   })
    // }

    const newState = transformState(modSerializedState);
    return newState;
  } catch(err) {
    console.error('no local storage', err);
    return undefined;
  }
}

var stateToPersist = {
  home: ['homeText'],
  header: ['headerText'],
}

/* create complete state object, with certain state persisted */
function transformState(localStorageState) {
  var initialState = createInitialState();
  var modInitialState = Object.keys(stateToPersist).reduce((prevObj, currStore) => {
    var changesInCurrStore = stateToPersist[currStore];
    for (var i = 0; i < changesInCurrStore.length; i++) {
      var changeInCurrentStore = changesInCurrStore[i];
      prevObj[currStore][changeInCurrentStore] = localStorageState[currStore][changeInCurrentStore];
    }
    return prevObj;
  }, initialState);
  return modInitialState;
}

function createInitialState() {
  return {
    header: initialHeaderState(),
    routing: routeReducer,
    modal: initialModalState(),
    home: initialHomeState(),
  };
}

/* in session storage, store only the state that is necessary to retreive later */
function createSimpleStateObject(currentState) {
  if ( currentState === null ) return null;
  var simpleState = Object.keys(stateToPersist).reduce((prevObj, currStore)=>{
    var changesInCurrStore = stateToPersist[currStore];
    if ( !prevObj.hasOwnProperty(currStore) ) {
      prevObj[currStore] = {};
    }
    for (var i = 0; i < changesInCurrStore.length; i++) {
      var changeInCurrentStore = changesInCurrStore[i];
      var newVar = currentState[currStore][changeInCurrentStore];
      // newVar = typeof newVar.getDate === 'function' ? newVar.getTime() : newVar;
      prevObj[currStore][changeInCurrentStore] = newVar;
    }
    return prevObj;
  }, {});
  return simpleState;
}

export const saveState = (state) => {
  try {
    const localStorageState = createSimpleStateObject(state);
    const serializedState = JSON.stringify(localStorageState);
    localStorage.setItem('instoreState', serializedState);
  } catch (err) {
    console.error('no session storage', err);
  }
}
