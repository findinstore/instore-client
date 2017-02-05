import { connect } from 'react-redux';
import classNames from 'classnames';

import React, { Component, PropTypes } from 'react';

import { routeActions } from 'react-router-redux';
import moment from 'moment';

import * as headerActions from 'js/app/actions/header-actions';

class Header extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const {
      dispatch,
      header,
    } = this.props;
  }

  componentWillReceiveProps(nextProps) {
  } 

  render() {
    const {
      header,
      routing,
    } = this.props;

    return (
      <div className="header">
        HEADER
      </div>
    );
  }
};

function mapStateToProps(newState) {
  return {
    routing: newState.routing,
    modal: newState.modal,
    header: newState.header,
  };
}


export default connect(mapStateToProps)(Header);