import React from 'react';
import Player from './player.js';
import Loader from './loader.js';
import Toast from './toast.js';

export default class App extends React.Component {
  render() {
    return <div>
      <Player />
    </div>;
  }
}
