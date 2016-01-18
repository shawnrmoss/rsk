import React from 'react';
import { RouteHandler } from 'react-router';

import AuthStore from '../stores/AuthStore';

var LoginRequired = React.createClass({
  statics: {
    willTransitionTo: function (transition, params, query, callback) {
      if(!AuthStore.loggedIn()){
        // go over to login page
        console.log("Here");
        transition.redirect('/login', null, { redirect: transition.path });
      }
      callback();
    }
  },
  render () {
    return (
      <RouteHandler/>
    );
  }
});

module.exports = { LoginRequired };