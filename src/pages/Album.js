import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      playlist: '',
      image: '',
      album: '',
      artist: '',
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const song = await getMusics(id);

    const { artworkUrl100, collectionName, artistName } = song[0];

    this.setState({
      loading: false,
      playlist: song,
      image: artworkUrl100,
      album: collectionName,
      artist: artistName,
      favorites: [],
    });
  }

  handleLoading = (boolean) => {
    this.setState({
      loading: boolean,
    });
  };

  handleFavoriteList = (trackId) => {
    const { favorites } = this.state;

    if (!favorites.includes(trackId)) {
      this.setState((prevState) => ({
        favorites: [...prevState.favorites, trackId],
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
                  handleFavoriteList={ this.handleFavoriteList }
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
