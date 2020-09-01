import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AuthService from '../services/auth.service';

const logOut = () => {
  AuthService.logout();
};

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className='container'>
        <header className='jumbotron'>
          <h3>
            <strong>Welcome {currentUser.fullName}!</strong>
          </h3>
        </header>
        <span>
          <strong>
            To log out please click{' '}
            <a href='/login' onClick={logOut}>
              here
            </a>
          </strong>
        </span>
      </div>
    );
  }
}
