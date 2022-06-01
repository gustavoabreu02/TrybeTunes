import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Carregando from '../pages/Carregando';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      objMusic: [],
      loading: true,
      loadingFaroviteMusic: false,
      favoriteSongs: [],
      targetId: [],
    };
  }

  async componentDidMount() {
    const { mathParams } = this.props;
    const resulMusicAPI = await getMusics(mathParams.id);
    this.setState({
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
      targetId } = this.state;
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
                        defaultChecked={ targetId.some((id) => id === value.trackId) }
                        onClick={ ({ target }) => {
                          const songs = objMusic.filter((song) => song.kind);
                          const musicFavorite = songs.find((song) => (
                            song.trackId === Number(target.id)
                          ));
                          targetId.push(Number(target.id));
                          this.setState({
                            loadingFaroviteMusic: true,
                          }, async () => {
                            if (target.checked) {
                              await addSong(musicFavorite);
                            }
                            const favSongs = await getFavoriteSongs();
                            this.setState({
                              favoriteSongs: favSongs,
                              loadingFaroviteMusic: false,
                            }, () => {
                            });
                            console.log(favoriteSongs);
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
