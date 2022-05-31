import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.buttonPesquisar = this.buttonPesquisar.bind(this);
    this.state = {
      searchInput: '',
      buttonDisabled: true,
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

  render() {
    const { searchInput, buttonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
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
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
