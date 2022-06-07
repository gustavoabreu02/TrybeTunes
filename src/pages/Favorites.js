import React from 'react';
import FavMusicCard from '../components/FavMusicCard';
import Header from '../components/Header';

class Favorites extends React.Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        <FavMusicCard />
      </div>
    );
  }
}

export default Favorites;
