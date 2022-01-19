import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';

class Favorites extends React.Component {
  render() {
    const favorite = JSON.parse(localStorage.getItem('favorite_songs'));
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1
          className="text-3xl font-semibold text-gray-600 tracking-wider pt-28 mb-4
          text-center"
        >
          Favorites
        </h1>
        {favorite ? (
          <div className="w-full flex flex-row flex-wrap justify-evenly">
            {favorite.map((song) => (
              <Link key={ song.trackId } to={ `album/${song.collectionId}` }>
                <div
                  className="flex flex-col items-center w-32 h-54 text-sm border rounded
                  shadow-2xl justify-evenly m-2 py-2"
                >
                  <img src={ song.artworkUrl100 } alt={ song.trackName } />
                  <span className="text-center text-gray mt-1">
                    {song.trackName}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          null
        )}
      </div>
    );
  }
}

export default Favorites;
//
