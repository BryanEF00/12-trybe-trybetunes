import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      favoriteList: [],
    };
  }

  async componentDidMount() {
    const savedFavorites = await getFavoriteSongs();

    this.setState({
      loading: false,
      favoriteList: savedFavorites,
    });
  }

  handleLoading = (boolean) => {
    this.setState({
      loading: boolean,
    });
  };

  handleRemoveFavoriteList = (trackId) => {
    const { favoriteList } = this.state;

    if (favoriteList.some((song) => song.trackId === trackId)) {
      this.setState((prevState) => ({
        favoriteList: [...prevState.favoriteList]
          .filter((songs) => songs.trackId !== trackId),
      }));
    }
  }

  render() {
    const { loading, favoriteList } = this.state;
    return (
      <div
        data-testid="page-favorites"
      >
        <Header />
        {loading
          ? <Loading />
          : (
            <>
              <h1>Músicas favoritas:</h1>
              {favoriteList.map((song) => (
                <MusicCard
                  track={ song }
                  handleLoading={ this.handleLoading }
                  handleAddFavoriteList={ () => {} }
                  handleRemoveFavoriteList={ this.handleRemoveFavoriteList }
                  favoriteSongsList={ favoriteList.map((track) => track.trackId) }
                  key={ song.trackId }
                />
              ))}
            </>
          )}
      </div>
    );
  }
}

export default Favorites;
