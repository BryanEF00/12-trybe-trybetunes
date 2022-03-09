import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import { createUser } from '../services/userAPI';

import Loading from '../components/Loading';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      loginName: '',
      btnDisabled: true,
      loading: false,
      redirect: false,
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    const minLength = 3;
    this.setState({
      loginName: value,
      btnDisabled: value.length < minLength,
    });
  };

  handleUserLogin = (event) => {
    event.preventDefault();

    const { loginName } = this.state;

    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name: loginName });
      this.setState({
        loading: false,
        redirect: true,
      });
    });
  }

  render() {
    const { loginName, btnDisabled, loading, redirect } = this.state;

    return (
      <div
        data-testid="page-login"
      >

        {loading
          ? <Loading />
          : (
            <form>
              <label htmlFor="login-name">
                Login
                <input
                  data-testid="login-name-input"
                  type="text"
                  name="loginName"
                  id="login-name"
                  placeholder="Nome"
                  autoComplete="off"
                  value={ loginName }
                  onChange={ this.handleChange }
                />
              </label>
              <button
                data-testid="login-submit-button"
                type="submit"
                disabled={ btnDisabled }
                onClick={ this.handleUserLogin }
              >
                Entrar
              </button>
            </form>
          )}
        {redirect && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
