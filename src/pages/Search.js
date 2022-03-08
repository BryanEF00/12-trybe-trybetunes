import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchArtist: '',
      btnDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { value } = target;
    const minLength = 2;
    this.setState({
      searchArtist: value,
      btnDisabled: value.length < minLength,
    });
  };

  render() {
    const { searchArtist, btnDisabled } = this.state;

    return (
      <div
        data-testid="page-search"
      >
        <Header />

        <form>
          <label htmlFor="search-artist">
            Search
            <input
              data-testid="search-artist-input"
              type="text"
              name="searchArtist"
              id="search-artist"
              placeholder="Nome do Artista"
              value={ searchArtist }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="search-artist-button"
            type="submit"
            disabled={ btnDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
