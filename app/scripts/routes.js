import React from 'react';
import { Router, Route } from 'react-router';
import createHistory from 'history/lib/createHashHistory'

import App from './pages/app.jsx';
import Home from './pages/home.jsx';
import Info from './pages/info.jsx';
import NotFound from './pages/notFound.jsx';

import Login from './pages/Login/Login.jsx';

import {requireAuthentication} from './components/AuthenticatedComponent/AuthenticatedComponent.jsx';

const routes = (
  <Router history={createHistory()}>    
    <Route component={ Login } name="Login" path="Login"/>
    <Route path='/' component={ requireAuthentication(App) }>             
        <Route path='info' component={ Info } />
        <Route path='home' component={ Home } />
        <Route path='*' component={NotFound}/>        
    </Route> 
  </Router>
);

export default routes;