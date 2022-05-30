import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.verificaButtonEntrar = this.verificaButtonEntrar.bind(this);
    this.state = {
      name: '',
      buttonEntrar: true,
      loading: true,
    };
  }

  handleChange(event) {
    this.verificaButtonEntrar(event);
    this.setState({
      name: event.target.value,
    });
  }

  verificaButtonEntrar(event) {
    const nameLength = 3;
    if (event.target.value.length >= nameLength) {
      this.setState({
        buttonEntrar: false,
      });
    } else {
      this.setState({
        buttonEntrar: true,
      });
    }
  }

  render() {
    const { name, buttonEntrar, loading } = this.state;
    const { history } = this.props;
    return (
      <div>
        {loading ? (
          <div data-testid="page-login">
            <form>
              <label htmlFor="name-input">
                Nome
                <input
                  data-testid="login-name-input"
                  type="text"
                  id="name-input"
                  value={ name }
                  onChange={ this.handleChange }
                />
              </label>
              <button
                data-testid="login-submit-button"
                type="button"
                disabled={ buttonEntrar }
                onClick={ () => {
                  this.setState({
                    loading: false,
                  }, async () => {
                    await createUser(this.state);
                    history.push('/search');
                  });
                } }
              >
                Entrar
              </button>
            </form>
          </div>
        ) : (
          <Carregando />
        )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.string.isRequired,
};

export default Login;
