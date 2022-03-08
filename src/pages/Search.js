import React, { Component } from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Loading from '../components/Loading';

import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      searchArtist: '',
      artistName: '',
      btnDisabled: true,
      loading: false,
      results: false,
      albums: '',
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

  handleSearch = (event) => {
    event.preventDefault();

    const { searchArtist } = this.state;

    this.setState({
      artistName: searchArtist,
      loading: true,

    }, async () => {
      const search = await searchAlbumsAPI(searchArtist);

      this.setState({
        searchArtist: '',
        loading: false,
        albums: search,
        results: true,
      });
    });
  }

  handleDisplay = () => {
    const { loading, results, artistName, albums } = this.state;

    if (loading) return (<Loading />);
    if (results) {
      return (
        <div>
          Resultado de álbuns de:
          {` ${artistName}`}
          {albums.length === 0
            ? (<div>Nenhum álbum foi encontrado</div>)
            : <AlbumCard albums={ albums } />}
        </div>
      );
    }
  }

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
            onClick={ this.handleSearch }
          >
            Pesquisar
          </button>
        </form>

        {this.handleDisplay()}

      </div>
    );
  }
}

export default Search;
