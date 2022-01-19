import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musics-api';
import Header from '../components/header';
import MusicCard from '../components/music-card';

class Album extends React.Component {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.state = {
      id,
      artistName: '',
      collectionName: '',
      artworkUrl100: '',
      tracks: [],
    };
  }

  componentDidMount() {
    this.getAlbumTracks();
  }

  getAlbumTracks = () => {
    const { id } = this.state;
    getMusics(id).then((data) => {
      this.setState(
        {
          artistName: data[0].artistName,
          collectionName: data[0].collectionName,
          artworkUrl100: data[0].artworkUrl100,
        },
        () => {
          this.setState({ tracks: [...data] });
        },
      );
    });
  };

  render() {
    const { collectionName, tracks, artistName, artworkUrl100 } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1
          className="text-3xl font-semibold text-gray-600 tracking-wider pt-28 mb-8
          text-center"
        >
          Album
        </h1>
        <div className=" w-full flex flex-row justify-evenly">
          <img src={ artworkUrl100 } alt={ collectionName } />
          <div className="w-1/2 flex flex-col items-center justify-center">
            <h2
              className="text-md pb-2 text-center"
              data-testid="album-name"
            >
              {collectionName}
            </h2>
            <h3
              className="text-lg font-bold tracking-wider"
              data-testid="artist-name"
            >
              {artistName}
            </h3>
          </div>
        </div>
        <div
          className="w-full flex flex-row flex-wrap justify-evenly items-center pt-8 px-2
          pb-3"
        >
          {tracks.map((track, index) => (index === 0 ? null : (
            <MusicCard
              key={ track.trackId }
              trackName={ track.trackName }
              previewUrl={ track.previewUrl }
              trackId={ track.trackId }
              trackInfo={ track }
            />
          )))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
