import React, { useState, useRef } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import { Link } from 'react-router-dom';
import { isEmail } from 'validator';

import AuthService from '../services/auth.service';

const required = value => {
  if (!value) {
    return (
      <div className='alert alert-danger' role='alert'>
        This field is required!
      </div>
    );
  }
};

const validEmail = value => {
  if (!isEmail(value)) {
    return (
      <div className='alert alert-danger' role='alert'>
        This is not a valid email.
      </div>
    );
  }
};

const validFullName = value => {
  if (value.length < 5) {
    return (
      <div className='alert alert-danger' role='alert'>
        The full name must be at least 5 characters.
      </div>
    );
  }
};

const validPassword = value => {
  const passwordRegexp = /^(?=.*\d)(?=.*\w)([^\s]){8,}$/;
  if (!passwordRegexp.test(value)) {
    return (
      <div className='alert alert-danger' role='alert'>
        The password must have at least 8 characters and contain numbers and letters
      </div>
    );
  }
};

const Register = props => {
  const form = useRef();
  const checkBtn = useRef();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');

  const onChangeFullName = e => {
    const fullName = e.target.value;
    setFullName(fullName);
  };

  const onChangeEmail = e => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = e => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = e => {
    e.preventDefault();

    setMessage('');
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(fullName, email, password).then(
        response => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        error => {
          const resMessage =
            (error.response && error.response.data && error.response.data.error) || error.message || error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className='col-md-12'>
      <div className='card card-container'>
        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className='form-group'>
                <label htmlFor='fullname'>Full Name</label>
                <Input
                  type='text'
                  className='form-control'
                  name='fullname'
                  value={fullName}
                  onChange={onChangeFullName}
                  validations={[required, validFullName]}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <Input
                  type='text'
                  className='form-control'
                  name='email'
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <Input
                  type='password'
                  className='form-control'
                  name='password'
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, validPassword]}
                />
              </div>

              <div className='form-group'>
                <button className='btn btn-primary btn-block'>Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className='form-group'>
              <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role='alert'>
                {message}
              </div>
            </div>
          )}
          {successful && (
            <div className='form-group'>
              <div className='alert alert-success' role='alert'>
                <p>
                  <strong>
                    Successfully registered. Now please <Link to={'/login'}>Login</Link>
                  </strong>
                </p>
              </div>
            </div>
          )}
          <CheckButton style={{ display: 'none' }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
