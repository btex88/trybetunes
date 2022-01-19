import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/user-api';
import Loading from '../components/loading';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      isButtonDisabled: true,
      isButtonClicked: false,
      isLoading: false,
    };
  }

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value }, () => {
      this.verifyIfButtonShouldEnable();
    });
  };

  verifyIfButtonShouldEnable = () => {
    const minLength = 3;
    const { inputValue } = this.state;
    if (inputValue.length >= minLength) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  }

  handleButtonClick = (event) => {
    event.preventDefault();
    const { inputValue } = this.state;
    this.setState({ isButtonClicked: true });
    createUser({ name: inputValue }).then(() => {
      this.setState({ isLoading: true });
    });
  };

  redirectAfterLoading = () => {
    const { isLoading } = this.state;
    if (isLoading) {
      return <Redirect to="/search" />;
    }
    return <Loading />;
  }

  render() {
    const { isButtonDisabled, isButtonClicked } = this.state;
    return (
      isButtonClicked
        ? this.redirectAfterLoading()
        : (
          <div
            data-testid="page-login"
            className="w-full h-full flex flex-col justify-center"
          >
            <h1
              className="text-3xl font-semibold text-center pb-8 tracking-wider
              text-gray-500"
            >
              Login
            </h1>
            <form className="w-full flex flex-col items-center justify-evenly">
              <input
                className="shadow appearance-none border rounded w-72 py-2 px-3
                text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                data-testid="login-name-input"
                type="text"
                placeholder="Nome"
                minLength="3"
                onChange={ this.handleInputChange }
              />
              <button
                className={ isButtonDisabled
                  ? (`bg-pink-500 text-white font-bold py-2 px-4 rounded opacity-50
                cursor-not-allowed mt-8`)
                  : (`bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4
                rounded focus:outline-none focus:shadow-outline mt-8`) }
                data-testid="login-submit-button"
                type="submit"
                disabled={ isButtonDisabled }
                onClick={ this.handleButtonClick }
              >
                Entrar
              </button>
            </form>
          </div>
        )
    );
  }
}

export default Login;
