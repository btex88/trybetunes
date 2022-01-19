import React from 'react';
import notFoundImg from '../images/not-found.png';

class NotFound extends React.Component {
  render() {
    return (
      <div
        data-testid="page-not-found"
        className="w-full h-full flex flex-col items-center justify-center"
        style={ { backgroundColor: '#E3E3E8' } }
      >
        <span
          className="text-4xl font-bold tracking-widest"
        >
          Not Found!
        </span>
        <img
          className="w-full"
          src={ notFoundImg }
          alt="not found"
        />
      </div>
    );
  }
}

export default NotFound;
