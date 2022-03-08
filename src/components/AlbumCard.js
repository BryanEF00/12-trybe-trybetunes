import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCard extends Component {
  render() {
    const { albums } = this.props;

    return (
      <div>
        {albums.map((album) => {
          const { collectionId, artworkUrl100, collectionName, artistName } = album;
          return (
            <Link
              data-testid={ `link-to-album-${collectionId}` }
              to={ `/album/${collectionId}` }
              key={ collectionId }
            >
              <img src={ artworkUrl100 } alt={ collectionName } />
              <h1>{collectionName}</h1>
              <h3>{artistName}</h3>
            </Link>
          );
        })}
      </div>
    );
  }
}

export default AlbumCard;

AlbumCard.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
};
