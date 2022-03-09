import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  handleChangeFavorite = () => {
    const { handleLoading, handleFavoriteList, track } = this.props;

    handleFavoriteList(track.trackId);
    this.saveSong(track, handleLoading(false));
  }

  async saveSong() {
    const { handleLoading, track } = this.props;
    handleLoading(true);
    await addSong(track);
    handleLoading(false);
  }

  render() {
    const { track, favoriteSongsList } = this.props;
    const { trackName, previewUrl, trackId } = track;

    return (
      <div>
        <span>{trackName}</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
        <label
          htmlFor={ trackId }
        >
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name={ trackId }
            id={ trackId }
            checked={ favoriteSongsList.includes(trackId) }
            onChange={ this.handleChangeFavorite }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.objectOf(PropTypes.any).isRequired,
  handleLoading: PropTypes.func.isRequired,
  handleFavoriteList: PropTypes.func.isRequired,
  favoriteSongsList: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default MusicCard;
