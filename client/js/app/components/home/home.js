import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import classNames from 'classnames';

import moment from 'moment';

import * as homeActions from 'js/app/actions/home-actions';

// import { getDayOfMonth, getWeekDay, getMonth } from '../reducers/time-reducer';
// import { 
//   getCurrentGameDay, 
//   getSelectedDayIsSelected,
//   getSummaryIsLoaded,
//   getSelectedWeekDay,
//   getSelectedMonth,
//   getSelectedDayOfMonth
// } from '../../reducers/home-reducer';
// import { todayScoresAreLoaded } from '../../reducers/header-reducer';

class Home extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {
      dispatch,
      header,
    } = this.props;
  }

  componentWillReceiveProps(newProps) {

  }

  render() {
    const {
    } = this.props;

    return (
      <div className="home-page">
        HOME PAGE
      </div>
    )
  }
}

function mapStateToProps(newState) {
  return {
    routing: newState.routing,
    modal: newState.modal,
    header: newState.header,
  };
}

export default connect(mapStateToProps)(Home);