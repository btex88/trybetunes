import React from 'react';
import style from '../styles/loading.module.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="flex flex-row w-full justify-evenly items-center">
        <div className={ style.spinner }>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h1>Carregando...</h1>
        <div className={ style.spinner }>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default Loading;
