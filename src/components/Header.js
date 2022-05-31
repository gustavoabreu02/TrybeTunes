import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      nameHeader: '',
      loading: false,
    };
  }

  async componentDidMount() {
    const nameRequired = await getUser();
    const { name } = nameRequired;
    this.setState({
      nameHeader: name,
      loading: true,
    });
  }

  render() {
    const { nameHeader, loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading ? (
          <div>
            <p data-testid="header-user-name">{nameHeader}</p>
            <Link data-testid="link-to-search" to="/search">Pesquisar Música</Link>
            <Link data-testid="link-to-favorites" to="/favorites">Músicas Favoritas</Link>
            <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
          </div>
        ) : (
          <Carregando />
        )}
      </header>
    );
  }
}

export default Header;
