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
      video: 0,
      displayWelcomeScreen: true
    };

    document.onkeydown = (e) => {
      // P+ | fn + Up
      if (e.keyCode === 33) {
        this.setState({ video: ++this.state.video % this.props.videos.length });
      }
      // P- | fn + Down
      else if (e.keyCode === 34) {
        this.setState({ video: --this.state.video % this.props.videos.length });
      }
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
        video={this.props.videos[this.state.video]}
        onVideoLoaded={() => this.onVideoLoaded()} />
</div>;
  }

  onVideoLoaded() {
    !this.timeout && this.setState({ displayWelcomeScreen: false });
  }
}
