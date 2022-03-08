import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { track } = this.props;
    const { trackName, previewUrl } = track;

    return (
      <div>
        <span>{trackName}</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MusicCard;
