import React from 'react';
import AuthStore from '../../stores/AuthStore';

export function requireAuthentication(Component){
  return class AuthenticatedComponent extends React.Component {
       
    constructor() {
      super()      
    }
    
    componentDidMount () {
        this.listenTo(AuthStore, this._onAuthChange);
    }

    _onAuthChange(auth) {
        this.setState(auth);

        if(!this.state.loggedIn){                                         
            this.history.pushState(null, '/login');                
        }
    }
    
    _getLoginState() {
      return {
        userLoggedIn: AuthStore.isLoggedIn(),
        user: AuthStore.user,
        jwt: AuthStore.jwt
      };
    }
       
    render() {
      return (
      <Component
        {...this.props}
         />
      );
    }
  }
  
  
  
};
