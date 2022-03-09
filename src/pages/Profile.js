import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';

import { getUser } from '../services/userAPI';

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      userInfo: '',
    };
  }

  async componentDidMount() {
    const userInfo = await getUser();

    this.setState({
      loading: false,
      userInfo,
    });
  }

  render() {
    const { loading, userInfo } = this.state;

    return (
      <div
        data-testid="page-profile"
      >
        <Header />
        {loading
          ? <Loading />
          : (
            <div>
              <div>
                <img
                  data-testid="profile-image"
                  src={ userInfo.image }
                  alt={ userInfo.name }
                />
                <Link to="/profile/edit">
                  Editar perfil
                </Link>
              </div>
              <div>
                Nome
                <p>{userInfo.name}</p>
              </div>
              <div>
                E-mail
                <p>{userInfo.email}</p>
              </div>
              <div>
                Descrição
                <p>{userInfo.description}</p>
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
