import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/user-api';
import Loading from './loading';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName = () => {
    const { userName } = this.state;
    this.setState({ isLoading: true }, () => {
      getUser().then((value) => {
        this.setState({ userName: value.name }, () => {
          if (userName) {
            this.setState({ isLoading: true });
          } else {
            this.setState({ isLoading: false });
          }
        });
      });
    });
  };

  render() {
    const { userName, isLoading } = this.state;
    return isLoading ? (
      <div className="w-full h-24 fixed top-0 flex flex-col justify-evenly items-center">
        <Loading />
      </div>
    ) : (
      <header
        className="w-full h-24 fixed top-0 flex flex-col justify-evenly bg-pink-200
        shadow-md z-10"
        data-testid="header-component"
      >
        <h1
          className="text-2xl font-semibold py-2 pl-10 tracking-wide capitalize"
          id="userName"
          data-testid="header-user-name"
        >
          {userName}
        </h1>
        <div
          className="w-full h-8 flex flex-row flex-nowrap items-center justify-evenly
          tracking-wide"
        >
          <Link to="/search" data-testid="link-to-search">
            <h2>Search</h2>
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites">
            <h2>Favorites</h2>
          </Link>
          <Link to="/profile" data-testid="link-to-profile">
            <h2>Profile</h2>
          </Link>
        </div>
      </header>
    );
  }
}

export default Header;
