import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Carregando from '../pages/Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      objMusic: [],
      loading: true,
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
    const { objMusic, loading } = this.state;
    return (
      <div>
        {loading ? (
          <Carregando />
        ) : (
          <div>
            <h4 data-testid="artist-name">{objMusic[0].artistName}</h4>
            <h5 data-testid="album-name">{objMusic[0].collectionName}</h5>
            {objMusic.filter((value) => value.kind).map((value) => (
              <div key={ value.trackId }>
                <p>{value.trackName}</p>
                <audio
                  data-testid="audio-component"
                  src={ value.previewUrl }
                  controls
                >
                  <track kind="captions" />
                </audio>
              </div>
            ))}
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
