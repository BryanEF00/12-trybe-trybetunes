import React, { Component } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';

import headerLogo from '../images/headerLogo.png';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
    };
  }

  async componentDidMount() {
    const getData = JSON.parse(localStorage.getItem('user'));
    const { name } = getData;

    if (name) {
      this.setState({
        userName: name,
      });
    }

    const userInfo = await getUser();

    this.setState({
      userName: userInfo.name,
    });
  }

  render() {
    const { userName } = this.state;

    return (
      <>
        <header
          className={ `
          bg-[#023031]
            px-5 py-5
            flex justify-between items-center
        ` }
          data-testid="header-component"
        >
          <img
            className={ `
              h-24 mt-[-2rem]
        ` }
            src={ headerLogo }
            alt="logo"
          />

          <div
            className={ `
                bg-white
                  w-[45%] max-h-14 px-1 py-1
                  md:w-[30%]
                  flex items-center justify-between rounded-full
              ` }
          >
            <FaUserCircle
              className={ `
            text-[#2FC18C]
              text-[2.75rem]
              w-fit
              ` }
            />
            <div
              data-testid="header-user-name"
              className={ `
                  text-[#29313D]
                    font-[epilogue] font-medium text-base text-center
                    md:text-xl
                    w-2/3 mx-auto
                ` }
            >
              {userName}
            </div>
          </div>
        </header>
        <nav
          className={ `
            font-[Epilogue] text-lg text-center
            space-x-1
            flex justify-evenly 
        ` }
        >
          <NavLink
            className={ (isActive) => `
            navlink
            ${!isActive ? `
            inactiveNavlink
            ` : `
            activeNavlink
            `}
            ` }
            data-testid="link-to-favorites"
            to="/favorites"
          >
            Favoritas
          </NavLink>
          <NavLink
            className={ (isActive) => `
            navlink
            ${!isActive ? `
              inactiveNavlink
            ` : `
              activeNavlink
            `}
            ` }
            data-testid="link-to-search"
            to="/search"
          >
            Pesquisa
          </NavLink>

          <NavLink
            className={ (isActive) => `
            navlink
            ${!isActive ? 'inactiveNavlink' : 'activeNavlink'}
            ` }
            data-testid="link-to-profile"
            to="/profile"
          >
            Perfil
          </NavLink>
        </nav>
      </>
    );
  }
}

export default Header;
