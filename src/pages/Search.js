import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';

class Search extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.buttonPesquisar = this.buttonPesquisar.bind(this);
    this.requisiçãoAlbuns = this.requisiçãoAlbuns.bind(this);
    this.state = {
      searchInput: '',
      buttonDisabled: true,
      loading: false,
      albuns: [],
      nameAnterior: '',
      loadingAlbuns: true,
      loadingComponent: false,
      nenhumAlbumEncontrado: false,
    };
  }

  handleChange(event) {
    this.buttonPesquisar(event);
    this.setState({
      searchInput: event.target.value,
    });
  }

  buttonPesquisar(event) {
    if (event.target.value.length >= 2) {
      this.setState({
        buttonDisabled: false,
      });
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
  }

  requisiçãoAlbuns() {
    const { searchInput } = this.state;
    this.setState(() => ({
      loadingAlbuns: true,
      loadingComponent: true,
    }), async () => {
      const resulSearchAlbumAPI = await searchAlbumsAPI(searchInput);
      if (resulSearchAlbumAPI.length === 0) {
        this.setState({
          nenhumAlbumEncontrado: true,
          loadingComponent: false,
        });
      } else {
        this.setState({
          nenhumAlbumEncontrado: false,
          loadingComponent: false,
          loadingAlbuns: false,
          nameAnterior: searchInput,
          searchInput: '',
          albuns: resulSearchAlbumAPI,
        });
      }
    });
  }

  render() {
    const { searchInput,
      buttonDisabled,
      loading,
      loadingAlbuns,
      albuns,
      nameAnterior,
      loadingComponent,
      nenhumAlbumEncontrado } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? (
          <Carregando />
        ) : (
          <div>
            <form>
              <input
                data-testid="search-artist-input"
                value={ searchInput }
                onChange={ this.handleChange }
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ buttonDisabled }
                onClick={ this.requisiçãoAlbuns }
              >
                Pesquisar
              </button>
            </form>
          </div>
        )}
        {nenhumAlbumEncontrado ? <h1>Nenhum álbum foi encontrado</h1> : ''}
        {loadingComponent ? <Carregando /> : ''}
        {loadingAlbuns ? '' : (
          <div>
            <h3>{`Resultado de álbuns de: ${nameAnterior}`}</h3>
            {albuns.map((value, id) => (
              <Link
                key={ id }
                data-testid={ `link-to-album-${value.collectionId}` }
                to={ `/album/${value.collectionId}` }
              >
                <div>
                  <img src={ value.artworkUrl100 } alt={ value.collectionName } />
                  <h5>{value.collectionName}</h5>
                  <h6>{value.artistName}</h6>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Search;
