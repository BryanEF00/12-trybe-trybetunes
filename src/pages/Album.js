import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      playlist: '',
      image: '',
      album: '',
      artist: '',
      favorites: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const song = await getMusics(id);
    const favorited = await getFavoriteSongs();

    const { artworkUrl100, collectionName, artistName } = song[0];
    const favoritedId = favorited.map((track) => track.trackId);

    this.setState({
      loading: false,
      playlist: song,
      image: artworkUrl100,
      album: collectionName,
      artist: artistName,
      favorites: favoritedId,
    });
  }

  handleLoading = (boolean) => {
    this.setState({
      loading: boolean,
    });
  };

  handleAddFavoriteList = (trackId) => {
    const { favorites } = this.state;

    if (!favorites.includes(trackId)) {
      this.setState((prevState) => ({
        favorites: [...prevState.favorites, trackId],
      }));
    }
  }

  handleRemoveFavoriteList = (trackId) => {
    const { favorites } = this.state;

    if (favorites.includes(trackId)) {
      this.setState((prevState) => ({
        favorites: [...prevState.favorites].filter((songs) => songs !== trackId),
      }));
    }
  }

  render() {
    const { loading, playlist, image, album, artist, favorites } = this.state;

    return (
      <div
        data-testid="page-album"
      >
        <Header />
        {loading
          ? <Loading />
          : (
            <div>
              <div>
                <img src={ image } alt={ album } />
                <h1 data-testid="album-name">{album}</h1>
                <h3 data-testid="artist-name">{artist}</h3>
              </div>
              {playlist.map((song, index) => (
                index > 0 && <MusicCard
                  track={ song }
                  handleLoading={ this.handleLoading }
                  handleAddFavoriteList={ this.handleAddFavoriteList }
                  handleRemoveFavoriteList={ this.handleRemoveFavoriteList }
                  favoriteSongsList={ favorites }
                  key={ song.trackId }
                />
              ))}
            </div>
          )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Album;
