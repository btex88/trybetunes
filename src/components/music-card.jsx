import React from 'react';
import PropTypes from 'prop-types';
import {
  addSong,
  removeSong,
  getFavoriteSongs,
} from '../services/favorite-songs-api';
import Loading from './loading';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckboxChecked: false,
      displayLoading: false,
    };
  }

  componentDidMount() {
    this.getFavoriteTracks();
  }

  handleInputChange = () => {
    const { trackInfo } = this.props;
    const { isCheckboxChecked } = this.state;

    if (isCheckboxChecked === false) {
      this.setState(
        {
          isCheckboxChecked: true,
          displayLoading: true,
        },
        () => {
          addSong(trackInfo).then(() => {
            this.setState({ displayLoading: false });
          });
        },
      );
    } else {
      this.setState(
        {
          displayLoading: true,
        },
        () => {
          removeSong(trackInfo).then(() => {
            this.setState({
              displayLoading: false,
              isCheckboxChecked: false,
            });
          });
        },
      );
    }
  };

  getFavoriteTracks = () => {
    const { trackId } = this.props;
    getFavoriteSongs().then((tracks) => {
      if (tracks.some((track) => track.trackId === trackId)) {
        this.setState({ isCheckboxChecked: true });
      }
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { displayLoading, isCheckboxChecked } = this.state;
    return displayLoading ? (
      <div className="w-72 h-28 flex flex-col justify-center items-center p-2 my-1">
        <Loading />
      </div>
    ) : (
      <div
        className="w-72 h-28 border rounded-sm flex flex-col items-center p-2 my-1
        shadow-lg"
      >
        <div className="w-full flex flex-row justify-between pb-2">
          <span className="font-semibold">{trackName}</span>
          <label htmlFor={ trackId }>
            Favorita
            <input
              className="ml-1"
              data-testid={ `checkbox-music-${trackId}` }
              id={ trackId }
              type="checkbox"
              checked={ isCheckboxChecked }
              onChange={ this.handleInputChange }
            />
          </label>
        </div>
        <audio
          className="w-64"
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  trackInfo: PropTypes.shape({
    artistId: PropTypes.number,
  }).isRequired,
};

export default MusicCard;
