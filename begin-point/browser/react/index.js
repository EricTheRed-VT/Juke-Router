import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import Albums from './components/Albums.js';
import Album from './components/Album';

import { Router, Route, hashHistory, IndexRedirect } from 'react-router';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={AppContainer} >
    	<IndexRedirect to="/albums" />
    	<Route path= "/albums" component={Albums}/>
    	<Route path= "/albums/:albumId" component={Album}/>
    </Route >
  </Router>,
  document.getElementById('app')
);
