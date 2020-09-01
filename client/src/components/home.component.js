import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class Home extends Component {
  render() {
    return (
      <div className='container'>
        <header className='jumbotron'>
          <h3>
            Hello there <span role='img'>👋</span>
          </h3>
          <p>
            <strong>
              Please <Link to={'/login'}>Login</Link> or <Link to={'/register'}>Sign Up</Link>
            </strong>
          </p>
        </header>
      </div>
    );
  }
}
