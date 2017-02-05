import React from 'react';
import Router from 'react-router';
import {
  Route,
  IndexRedirect,
  IndexRoute,
} from 'react-router';

import App from './components/app';
import Home from './components/home';
import NotFound from './components/not-found';

module.exports = (
  <Route path="/" component={ App }>
    <IndexRoute component={ Home } />
    <Route path="*" component={ NotFound } />
  </Route>
);
