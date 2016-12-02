import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import Albums from './components/Albums.js';
import Album from './components/Album';
import Artists from './components/Artists';
import Artist from './components/Artist';
import Songs from './components/Songs';

import { Router, Route, hashHistory, IndexRedirect } from 'react-router';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={AppContainer} >
    	<IndexRedirect to="/albums" />
    	<Route path="/albums" component={Albums}/>
    	<Route path="/albums/:albumId" component={Album}/>
      <Route path="/artists" component={Artists}/>
      <Route path="/artists/:artistId" component={Artist}>
      <IndexRedirect to="/artists/:artistId/albums" />
        <Route path="/artists/:artistId/albums" component={Albums}/>
        <Route path="/artists/:artistId/songs" component={Songs}/>
      </Route>
    </Route >
  </Router>,
  document.getElementById('app')
);
