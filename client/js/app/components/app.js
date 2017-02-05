import { RouteHandler } from 'react-router';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import { compose } from 'redux';

import React, { Component, PropTypes } from 'react';
import Header from './header';
import Modal from './modal';

class App extends Component {

  render() {
    var pathname = this.props.routing.location.pathname;
    var appContentClasses = classNames({
      'app-wide-view': true,
      'home-page-view': pathname  === '/home'
    });
    return(
      <div className="view">
        <div>
          <Header />
          <div id="content">
            <div className={appContentClasses}>
              {this.props.children}
            </div>
          </div>
          <Modal />
        </div>
      </div>
    );
   }
};

function selectState(newState) {
  return {
    routing: newState.routing
  };
}

export default connect(selectState)(App);
