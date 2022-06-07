import propTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Carregando from './Carregando';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.verificaButton = this.verificaButton.bind(this);
    this.salvaPerfil = this.salvaPerfil.bind(this);
    this.state = {
      loading: true,
      perfilName: '',
      perfilEmail: '',
      perfilDesc: '',
      perfilImage: {},
      buttonDisabled: true,
    };
  }

  async componentDidMount() {
    this.verificaButton();
    const perfil = await getUser();
    this.setState({
      perfilName: perfil.name,
      perfilEmail: perfil.email,
      perfilDesc: perfil.description,
      perfilImage: perfil.image,
      loading: false,
    });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      this.verificaButton();
    });
  }

  verificaButton() {
    const { perfilName, perfilImage, perfilEmail, perfilDesc } = this.state;
    if (
      perfilName.length >= 1
      && perfilImage.length >= 1
      && perfilEmail.length >= 1
      && perfilDesc.length >= 1
      && perfilEmail.includes('.')
      && perfilEmail.includes('@')
    ) {
      this.setState({
        buttonDisabled: false,
      });
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
  }

  async salvaPerfil() {
    const { history } = this.props;
    const {
      perfilName,
      perfilImage,
      perfilEmail,
      perfilDesc,
    } = this.state;
    const obj = {
      name: perfilName,
      email: perfilEmail,
      image: perfilImage,
      description: perfilDesc,
    };
    this.setState({
      loading: true,
    });
    await updateUser(obj);
    history.push('/profile');
  }

  render() {
    const {
      loading,
      perfilName,
      perfilImage,
      perfilEmail,
      perfilDesc,
      buttonDisabled,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? (
          <Carregando />
        ) : (
          <form>
            <input
              name="perfilName"
              data-testid="edit-input-name"
              onChange={ this.handleChange }
              value={ perfilName }
            />
            <input
              name="perfilEmail"
              type="email"
              data-testid="edit-input-email"
              onChange={ this.handleChange }
              value={ perfilEmail }
            />
            <input
              name="perfilDesc"
              data-testid="edit-input-description"
              onChange={ this.handleChange }
              value={ perfilDesc }
            />
            <input
              name="perfilImage"
              data-testid="edit-input-image"
              onChange={ this.handleChange }
              value={ perfilImage }
            />
            <button
              data-testid="edit-button-save"
              type="button"
              disabled={ buttonDisabled }
              onClick={ this.salvaPerfil }
            >
              Salvar
            </button>
          </form>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: propTypes.string.isRequired,
};

export default ProfileEdit;
