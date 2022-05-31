import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <div data-testid="page-album">
        <Header />
        <BrowserRouter>
          <Route
            path={ match.url }
            render={ () => <MusicCard mathParams={ match.params } /> }
          />
        </BrowserRouter>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
