import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getUser } from '../services/userAPI';

import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      userName: '',
    };
  }

  async componentDidMount() {
    const userInfo = await getUser();

    this.setState({
      loading: false,
      userName: userInfo.name,
    });
  }

  render() {
    const { loading, userName } = this.state;

    return (
      <header
        data-testid="header-component"
      >
        Header
        {loading
          ? <Loading />
          : (
            <div data-testid="header-user-name">{userName}</div>
          )}
        <nav>
          <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
