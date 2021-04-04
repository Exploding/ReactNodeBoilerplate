/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import TestPage from 'containers/TestPage';

export default function App() {
  return (
    <div className="container main">
      <Switch>
        <Route exact path="/" component={TestPage} />
      </Switch>
    </div>
  );
}
