import React from 'react';
import Carregando from '../pages/Carregando';
import { removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class FavMusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      songsFav: {},
      loadingFavSongs: false,
      loadingSongs: true,
    };
  }

  async componentDidMount() {
    const favSongs = await getFavoriteSongs();
    console.log(favSongs);
    this.setState({
      songsFav: favSongs,
      loadingFavSongs: true,
    });
  }

  render() {
    const { songsFav, loadingFavSongs, loadingSongs } = this.state;
    return (
      <div>
        {loadingFavSongs ? (
          <div>
            {loadingSongs ? (
              <div>
                {songsFav
                  .map((value) => (
                    <div key={ value.trackId }>
                      <p>{value.trackName}</p>
                      <audio
                        data-testid="audio-component"
                        src={ value.previewUrl }
                        controls
                      >
                        <track kind="captions" />
                      </audio>
                      <label htmlFor={ value.trackId }>
                        Favorita
                        <input
                          data-testid={ `checkbox-music-${value.trackId}` }
                          id={ value.trackId }
                          type="checkbox"
                          defaultChecked="true"
                          onChange={ async ({ target }) => {
                            this.setState({
                              loadingSongs: false,
                            });
                            const musicFavorite = songsFav.find(
                              (song) => song.trackId === Number(target.id),
                            );
                            await removeSong(musicFavorite);
                            const favSongs = await getFavoriteSongs();
                            this.setState({
                              songsFav: favSongs,
                              loadingSongs: true,
                            });
                          } }
                        />
                      </label>
                    </div>
                  ))}
              </div>
            ) : (
              <Carregando />
            )}
          </div>
        ) : (
          <Carregando />
        )}
      </div>
    );
  }
}

export default FavMusicCard;
