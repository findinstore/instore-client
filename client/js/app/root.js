// Needed for certain babel polyfills
require('babel-polyfill');

import 'whatwg-fetch';

// For IE classlist
require('classlist-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, useRouterHistory } from 'react-router';
import { Provider } from 'react-redux';
import createHashHistory from 'history/lib/createHashHistory';
import createLogger from 'redux-logger';
import routes from './routes';
import { syncHistory } from 'react-router-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import analyticsMiddleware from './middlewares/analytics-middleware';

import config from '../config/js-config';

// Sets up the main css file via webpack
require('../../css/root.css');
import debounce from 'js/helpers/debounce';
import { loadState, saveState } from 'js/helpers/localStorage';

// Sets up tooltip
// var EventEmitter = require( 'events' );
// window.dispatch = new EventEmitter();  
// require( '../helpers/tooltip' );

// Sets up so console.log exists on initial run of IE 9
// IE 9 console object doesn't exist until the debugger is open
if (!window.console) window.console = {};
if (!window.console.log) window.console.log = function () { };
if (!window.console.error) window.console.error = function () { };
if (!window.console.dir) window.console.dir = function () { };


// Sets up the redux router middleware
var history = useRouterHistory(createHashHistory)({
  queryKey: false,
});

var reduxRouterMiddleware = syncHistory( history );

var middlewares = [
  thunk,
  reduxRouterMiddleware,
  analyticsMiddleware
];

if ( config.debug ) {
  window.Perf = require('react-addons-perf');
}

var logger = createLogger({
  predicate: function() {
    if (config.logging) {
      return true;
    }
    return false;
  }
});

middlewares.push(logger);

var createStoreWithMiddleware = compose(
  applyMiddleware(
    ...middlewares
  ), window.devToolsExtension ? window.devToolsExtension() : f => f
)( createStore );

const modPersistedState = loadState();

// Creates and sets up the store
var store = createStoreWithMiddleware( rootReducer, modPersistedState );
reduxRouterMiddleware.listenForReplays( store );

store.subscribe(debounce(() => saveState(store.getState())), 500);

var APP_SELECTOR = '#app';


/*
  land on page
  look into cookies to see what their choices for news sites are
  if choices in cookies, store in news-store and make requests for those sites
  if not set defaults as in news-store, and then make an api call for that source
*/

ReactDOM.render(
  (
    <Provider store={ store }>
      <Router history={ history }>
        { routes }
      </Router>
    </Provider>
  ),
  document.querySelector( APP_SELECTOR )
);
