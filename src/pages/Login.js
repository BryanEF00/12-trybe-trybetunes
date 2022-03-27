import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

import loginLogo from '../images/loginLogo.png';

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

    this.setState(
      {
        loading: true,
      },
      async () => {
        await createUser({ name: loginName });
        this.setState({
          loading: false,
          redirect: true,
        });
      },
    );
  };

  render() {
    const { loginName, btnDisabled, loading, redirect } = this.state;

    return (
      <div
        className={ `font-[verdana] font-normal text-sm leading-5
          mt-28
          flex flex-col` }
        data-testid="page-login"
      >
        {loading ? (
          <Loading />
        ) : (
          <div
            className={ `h-full
            flex flex-col items-center
            ` }
          >
            <img className="max-w-[90%] h-auto md:w-auto" src={ loginLogo } alt="logo" />
            <form
              className={ `bg-white shadow-[0_4px_4px_rgba(0,0,0,0.25)]
                w-[80%] h-[25%] rounded-xl mt-5 py-7
                md:w-[60%]
                xl:w-[35%]
                2xl:w-[25%]
                flex flex-col items-center justify-center` }
            >
              <label
                htmlFor="login-name"
                className={ `w-full
                  flex flex-col items-center` }
              >
                <input
                  className={ `bg-white border border-[#E1E5EB]
                  w-[80%]  h-10 py-3 px-4 mb-5
                  md:w-2/3 
                  ` }
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
                className={ `bg-[#003BE5] text-white
                  font-[verdana] font-normal text-base leading-6
                  w-[80%] h-10 rounded-sm
                  md:w-2/3 ` }
                data-testid="login-submit-button"
                type="submit"
                disabled={ btnDisabled }
                onClick={ this.handleUserLogin }
              >
                Entrar
              </button>
            </form>
          </div>
        )}
        {redirect && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;
