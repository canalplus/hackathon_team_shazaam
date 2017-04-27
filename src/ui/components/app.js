import React from 'react';
import Player from './player.js';
import Loader from './loader.js';
import Toast from './toast.js';
import Welcome from './welcome.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.timeout = true;
    this.state = {
      displayWelcomeScreen: true
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.timeout = false;
      this.onVideoLoaded();
    }, 1000);
  }

  render() {
    return <div>
      <Loader />
      <Welcome display={this.state.displayWelcomeScreen} />
      <Player
        src='assets/videos/StudioCanalTheThirdMan.mp4'
        onVideoLoaded={() => this.onVideoLoaded()} />
</div>;
  }

  onVideoLoaded() {
    !this.timeout && this.setState({ displayWelcomeScreen: false });
  }
}
