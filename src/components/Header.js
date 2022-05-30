import React from 'react';
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
          <h1 data-testid="header-user-name">{nameHeader}</h1>
        ) : (
          <Carregando />
        )}
      </header>
    );
  }
}

export default Header;
