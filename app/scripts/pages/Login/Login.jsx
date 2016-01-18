import React from 'react';
import { History } from 'react-router';
import AuthStore from '../../stores/AuthStore';
import AuthActions from '../../actions/AuthActions';
import Router from 'react-router';
import Reflux from 'reflux';

var Login = React.createClass({  
  mixins: [
    Router.State,    
    History,
    Reflux.connect(AuthStore),
    Reflux.ListenerMixin
  ],
  
  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount () {
    this.listenTo(AuthStore, this._onAuthChange);
  },

  _onAuthChange(auth) {
    this.setState(auth);

    if(this.state.loggedIn){                                         
        this.history.pushState(null, '/home');                
    }
  },

  _handleSubmit(event) {
    event.preventDefault();

    AuthActions.login(
      React.findDOMNode(this.refs.email).value,
      React.findDOMNode(this.refs.password).value
    );        
  },

  render() {
    var errorMessage;
    if (this.state.error) {
      errorMessage = (
        <div className='state-error' style={{ paddingBottom: 16 }}>
          { this.state.error }
        </div>
      );
    }

    var formContent;
    if (this.state.user) {
      formContent = (
        <div>
          <p>
            You're logged in as <strong>{ this.state.user.name }</strong>.
          </p>
        </div>
      );
    } else {
      formContent = (
        <div>
          { errorMessage }
          Email: <input defaultValue="iwritecode@preact.com" ref="email" style={{ maxWidth: '100%' }} type="email" />
          <br/>
          Password: <input defaultValue="wearehiring!" ref="password" style={{ maxWidth: '100%' }} type="password" />
          <br/>
          <button >Log In</button>
        </div>
      );
    }
    return (
      <form onSubmit={this._handleSubmit}>
        { formContent }
      </form>
    );
  }
});


module.exports = Login;
