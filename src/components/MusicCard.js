import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Carregando from '../pages/Carregando';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      objMusic: [],
      loading: true,
      loadingFaroviteMusic: false,
      favoriteSongs: [],
      targetId: [],
      loadingChecked: true,
    };
  }

  async componentDidMount() {
    const { mathParams } = this.props;
    const resulMusicAPI = await getMusics(mathParams.id);
    const favSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs: favSongs,
      loadingChecked: true,
      objMusic: resulMusicAPI,
      loading: false,
    });
  }

  render() {
    const {
      objMusic,
      loading,
      loadingFaroviteMusic,
      favoriteSongs,
      targetId,
      loadingChecked } = this.state;
    return (
      <div>
        {loading ? (
          <Carregando />
        ) : (
          <div>
            <h4 data-testid="artist-name">{objMusic[0].artistName}</h4>
            <h5 data-testid="album-name">{objMusic[0].collectionName}</h5>
            {loadingFaroviteMusic ? <Carregando /> : (
              objMusic
                .filter((value) => value.kind)
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
                    <label htmlFor="favorites-checkbox">
                      Favorita
                      <input
                        data-testid={ `checkbox-music-${value.trackId}` }
                        id={ value.trackId }
                        type="checkbox"
                        defaultChecked={ loadingChecked ? (
                          favoriteSongs.some((songsId) => (
                            songsId.trackId === value.trackId
                          ))
                        ) : (
                          targetId.some((id) => id === value.trackId)
                        ) }
                        onChange={ ({ target }) => {
                          const songs = objMusic.filter((song) => song.kind);
                          const musicFavorite = songs.find((song) => (
                            song.trackId === Number(target.id)
                          ));
                          this.setState({
                            loadingChecked: false,
                          }, () => {
                            targetId.push(Number(target.id));
                          });
                          this.setState({
                            loadingFaroviteMusic: true,
                          }, async () => {
                            if (target.checked) {
                              await addSong(musicFavorite);
                            } else {
                              await removeSong(musicFavorite);
                            }
                            this.setState({
                              loadingFaroviteMusic: false,
                            });
                          });
                        } }
                      />
                    </label>
                  </div>
                ))
            )}
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  mathParams: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default MusicCard;
