import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';

import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      imageInput: '',
      nameInput: '',
      emailInput: '',
      descriptionInput: '',
      btnDisabled: true,
      redirect: false,
    };
  }

  async componentDidMount() {
    const userInfo = await getUser();

    this.setState({
      loading: false,
      imageInput: userInfo.image,
      nameInput: userInfo.name,
      emailInput: userInfo.email,
      descriptionInput: userInfo.description,
    }, this.formValidations);
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, this.formValidations);
  }

  handleEdit = async (event) => {
    event.preventDefault();

    const { nameInput, emailInput, imageInput, descriptionInput } = this.state;

    const update = {
      name: nameInput,
      email: emailInput,
      image: imageInput,
      description: descriptionInput,
    };
    this.setState({ loading: true });
    await updateUser(update);
    this.setState({ loading: false, redirect: true });
  }

  formValidations = () => {
    const { imageInput, nameInput, emailInput, descriptionInput } = this.state;

    const emptyField = [imageInput, nameInput, emailInput, descriptionInput]
      .some((value) => !value);

    /*
    Site para validação regex de e-mail: https://regexr.com/3e48o
    Referência: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
    */
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    const validEmail = regex.test(emailInput);

    let isInvalid = true;

    if (!emptyField && validEmail) isInvalid = false;

    this.setState({
      btnDisabled: isInvalid,
    });
  }

  render() {
    const {
      loading, imageInput, nameInput, emailInput,
      descriptionInput, btnDisabled, redirect,
    } = this.state;

    return (
      <div
        data-testid="page-profile-edit"
      >
        <Header />
        {loading
          ? <Loading />
          : (
            <div>
              <form>
                <div>
                  <img src={ imageInput } alt={ nameInput } />
                  <input
                    data-testid="edit-input-image"
                    type="text"
                    name="imageInput"
                    placeholder="Insira um link"
                    value={ imageInput }
                    onChange={ this.handleChange }
                  />
                </div>
                <div>
                  <h1>Nome</h1>
                  <input
                    data-testid="edit-input-name"
                    type="text"
                    name="nameInput"
                    placeholder="Nome de usuario"
                    maxLength={ 20 }
                    value={ nameInput }
                    onChange={ this.handleChange }
                  />
                </div>
                <div>
                  <h1>E-mail</h1>
                  <input
                    data-testid="edit-input-email"
                    type="email"
                    name="emailInput"
                    placeholder="usuario@usuario.com"
                    value={ emailInput }
                    onChange={ this.handleChange }
                  />
                </div>
                <div>
                  <h1>Descrição</h1>
                  <textarea
                    data-testid="edit-input-description"
                    name="descriptionInput"
                    placeholder="Sobre mim"
                    value={ descriptionInput }
                    onChange={ this.handleChange }
                  />
                </div>
                <button
                  data-testid="edit-button-save"
                  type="submit"
                  disabled={ btnDisabled }
                  onClick={ this.handleEdit }
                >
                  Salvar
                </button>
              </form>
              {redirect && <Redirect to="/profile" />}
            </div>
          )}
      </div>
    );
  }
}

export default ProfileEdit;
