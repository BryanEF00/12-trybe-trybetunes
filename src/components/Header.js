import React, { Component } from 'react';

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
        <div />
      </header>
    );
  }
}

export default Header;
