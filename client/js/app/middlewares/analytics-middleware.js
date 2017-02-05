import { UPDATE_LOCATION } from 'react-router-redux';
import config from '../../config/js-config';

// import * as userActions from '../actions/user';
// import * as middlewareActions from '../actions/middleware';

module.exports = function analyticsMiddleware(store) {
  return next => action => {
    const result = next(action);

    if (action) {

      // Tracking only works after userId is set
      // This applies only to userId views
      // if (action.type === userActions.RECEIVE_USER) {
      //   ga('set', 'userId', action.data[0].id);
      //   ga('set', 'customUserId', action.data[0].id);
      //   ga('set', 'groupName', action.data[0].company_name);
      //   ga('send', 'event', 'Authenification', 'Logged in');

      if (action.type === UPDATE_LOCATION) {
        // For some reason, can't set a custom path. Needs to have the format:
        ga('set', 'page', document.location.pathname + document.location.hash);
        ga('send', 'pageview');

      }

      // if (action.type === middlewareActions.LOGGED_OUT) {
      //   ga('send', 'event', 'Authenification', 'Logged Out');

      // }

    }
    
    return result;
  };
}
