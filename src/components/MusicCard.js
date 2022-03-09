import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  handleChangeFavorite = (event) => {
    const { handleAddFavoriteList, handleRemoveFavoriteList, track } = this.props;
    const { checked } = event.target;

    return checked
      ? this.saveFavorite(handleAddFavoriteList, track)
      : this.removeFavorite(handleRemoveFavoriteList, track);
  }

  saveFavorite = (handleAddFavoriteList, track) => {
    handleAddFavoriteList(track.trackId);
    this.saveFavoriteSong(track);
  }

  removeFavorite = (handleRemoveFavoriteList, track) => {
    handleRemoveFavoriteList(track.trackId);
    this.removeFavoriteSong(track);
  }

  async saveFavoriteSong() {
    const { handleLoading, track } = this.props;
    handleLoading(true);
    await addSong(track);
    handleLoading(false);
  }

  async removeFavoriteSong() {
    const { handleLoading, track } = this.props;
    handleLoading(true);
    await removeSong(track);
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
  handleAddFavoriteList: PropTypes.func.isRequired,
  handleRemoveFavoriteList: PropTypes.func.isRequired,
  favoriteSongsList: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default MusicCard;
