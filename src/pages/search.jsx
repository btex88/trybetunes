import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import searchAlbumsAPI from '../services/search-albums-api';
import Loading from '../components/loading';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      isButtonDisabled: true,
      isButtonClicked: false,
      searchValue: '',
      albunsList: [],
      showResult: false,
      resultMsg: '',
    };
  }

  handleInputChange = (event) => {
    const { value } = event.target;
    this.setState({ inputValue: value }, () => {
      this.setState({ searchValue: value });
      this.verifyIfButtonShouldEnable();
    });
  };

  verifyIfButtonShouldEnable = () => {
    const { inputValue } = this.state;
    const minLength = 2;
    if (inputValue.length >= minLength) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  };

  setDisplayMsg = () => {
    const { searchValue, albunsList } = this.state;
    if (albunsList.length) {
      this.setState({
        resultMsg: `Resultado de álbuns de: ${searchValue}`,
      });
    } else {
      this.setState({
        resultMsg: 'Nenhum álbum foi encontrado',
      });
    }
  };

  handleButtonClick = (event) => {
    const { searchValue } = this.state;
    event.preventDefault();
    this.setState(
      {
        inputValue: '',
        isButtonClicked: true,
      },
      () => {
        searchAlbumsAPI(searchValue).then((data) => {
          this.setState({
            albunsList: [...data],
          });
          this.setState(
            {
              isButtonClicked: false,
              showResult: true,
            },
            () => {
              this.setDisplayMsg();
            },
          );
        });
      },
    );
  };

  render() {
    const {
      isButtonDisabled,
      isButtonClicked,
      showResult,
      resultMsg,
      albunsList,
    } = this.state;

    return (
      <>
        <div
          className="w-full flex flex-col items-center justify evenly"
          data-testid="page-search"
        >
          <Header />
          <h2 className="text-3xl font-semibold text-gray-600 tracking-wider pt-28 mb-4">
            Search
          </h2>
          {isButtonClicked ? (
            <Loading />
          ) : (
            <form
              className="flex flex-col w-72 bg-white shadow-md rounded px-8 pt-6
                pb-8 mb-4 items-center justify-evenly border"
            >
              <input
                className="shadow appearance-none border rounded w-64 py-2 px-3
                  text-gray-700 leading-tight focus:outline-none focus:shadow-outline
                  text-center"
                data-testid="search-artist-input"
                placeholder="Nome do Artista"
                type="text"
                minLength="2"
                onChange={ this.handleInputChange }
              />
              <button
                className={
                  isButtonDisabled
                    ? `bg-pink-500 text-white font-bold py-2 px-4 rounded opacity-50
                cursor-not-allowed mt-4`
                    : `bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4
                rounded focus:outline-none focus:shadow-outline mt-4`
                }
                data-testid="search-artist-button"
                type="submit"
                disabled={ isButtonDisabled }
                onClick={ this.handleButtonClick }
              >
                Pesquisar
              </button>
            </form>
          )}
        </div>
        {showResult ? (
          <div className="w-full flex flex-row flex-wrap justify-evenly">
            <h3 className="w-full text-xl text-gray-700 font-bold text-center my-4">
              {resultMsg}
            </h3>
            {albunsList.map((album) => (
              <Link
                key={ album.collectionId }
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `album/${album.collectionId}` }
              >
                <div
                  className="flex flex-col items-center w-32 h-54 text-sm border rounded
                  shadow-2xl justify-evenly m-2 py-2"
                >
                  <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                  <span className="text-center text-gray">
                    {album.collectionName}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <h3>{resultMsg}</h3>
        )}
      </>
    );
  }
}

export default Search;
