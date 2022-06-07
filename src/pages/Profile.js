import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      perfilName: '',
      perfilEmail: '',
      perfilDesc: '',
      perfilImage: {},
    };
  }

  async componentDidMount() {
    const perfil = await getUser();
    this.setState({
      perfilName: perfil.name,
      perfilEmail: perfil.email,
      perfilDesc: perfil.description,
      perfilImage: perfil.image,
      loading: false,
    });
  }

  render() {
    const { loading, perfilName, perfilImage, perfilEmail, perfilDesc } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { loading ? <Carregando /> : (
          <div>
            <br />
            <img data-testid="profile-image" src={ perfilImage } alt={ perfilName } />
            <Link to="/profile/edit">Editar perfil</Link>
            <h4>{perfilName}</h4>
            <h5>{perfilEmail}</h5>
            <h5>{perfilDesc}</h5>
          </div>
        ) }
      </div>
    );
  }
}

export default Profile;
