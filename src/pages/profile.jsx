import React from 'react';
import Header from '../components/header';

class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <h1
          className="text-3xl font-semibold text-gray-600 tracking-wider pt-28 mb-8
          text-center"
        >
          Profile
        </h1>
      </div>
    );
  }
}

export default Profile;
