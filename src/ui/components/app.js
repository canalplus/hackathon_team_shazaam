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
      isSearchDone: false,
      music: null
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
        ref={(player) => { this.player = player; }}
        video={this.props.videos[this.state.video]}
        onVideoLoaded={() => this.onVideoLoaded()} />
      <Loader display={this.state.isSearching} />
      <Toast music={this.state.music} display={this.state.isSearchDone} />
    </div>;
  }

  onVideoLoaded() {
    !this.timeout && this.setState({ displayWelcomeScreen: false });
  }

  // P+ | fn + Up
  @keydown(33)
  onNextVideo() {
    this.setState({
      video: ++this.state.video % this.props.videos.length,
      isSearching: false,
      isSearchDone: false,
      music: null
    });
  }

  // P- | fn + Down
  @keydown(34)
  onPrevVideo() {
    this.setState({
      video: (--this.state.video + this.props.videos.length) % this.props.videos.length,
      isSearching: false,
      isSearchDone: false,
      music: null
    });
  }

  @keydown('s')
  search() {
    const video = this.props.videos[this.state.video];
    const position = parseInt(this.player.video.currentTime, 10);
    var myRequest = new Request(
      `http://localhost:3001/id/${video.shortName}/${position}`
    );

    this.setState({
      isSearching: true,
      isSearchDone: false,
      music: null,
    });

    this.promise = fetch(myRequest)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        else {
          this.setState({ isSearching: false });
          throw new Error('Something went wrong on api server!');
        }
      })
      .then(data => {
        this.setState({
          isSearching: false,
          isSearchDone: true,
          music: (data && data.metadata && data.metadata.music && data.metadata.music[0]) || null
        });
      });
  }

  @keydown(27)
  hideResult() {
    this.setState({
      isSearching: false,
      isSearchDone: false,
      music: null
    });
  }
}
