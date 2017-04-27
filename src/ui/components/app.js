import React from 'react';
import Player from './player.js';
import Loader from './loader.js';
import Toast from './toast.js';
import Welcome from './welcome.js';
import keydown from 'react-keydown';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.timeout = true;
    this.state = {
      video: 0,
      displayWelcomeScreen: true,
      isSearching: false,
      isDone: false,
      result: null
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
      <Welcome display={this.state.displayWelcomeScreen} />
      <Player
        video={this.props.videos[this.state.video]}
        onVideoLoaded={() => this.onVideoLoaded()} />
      <Loader display={this.state.isSearching} />
    </div>;
  }

  onVideoLoaded() {
    !this.timeout && this.setState({ displayWelcomeScreen: false });
  }

  // P+ | fn + Up
  @keydown(33)
  onNextVideo() {
    this.setState({ video: ++this.state.video % this.props.videos.length });
  }

  // P- | fn + Down
  @keydown(34)
  onPrevVideo() {
    this.setState({ video: (--this.state.video + this.props.videos.length) % this.props.videos.length });
  }

  @keydown('s')
  activateLoader() {
    var myRequest = new Request('http://localhost:3001/id/lalaland/34');

    this.setState({ isSearching: true });
    fetch(myRequest)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            isSearching: false,
            isDone: true
          });
        }
        else {
          throw new Error('Something went wrong on api server!');
        }
      });
  }
}
