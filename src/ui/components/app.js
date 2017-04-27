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

    document.onkeydown = (e) => {
      // P+ | fn + Up
      if (e.keyCode === 33) {
        this.setState({ video: ++this.state.video % this.props.videos.length });
      }
      // P- | fn + Down
      else if (e.keyCode === 34) {
        this.setState({ video: (--this.state.video + this.props.videos.length) % this.props.videos.length });
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
      <Loader className={this.props.isSearching ? '' : 'hidden'} />
      <Welcome display={this.state.displayWelcomeScreen} />
      <Player
        video={this.props.videos[this.state.video]}
        onVideoLoaded={() => this.onVideoLoaded()} />
</div>;
  }

  onVideoLoaded() {
    !this.timeout && this.setState({ displayWelcomeScreen: false });
  }

  @keydown('s')
  activateLoader(){

      var myRequest = new Request('http://localhost:3001/id/lalaland/34');
      var myURL = myRequest.url; // http://localhost/flowers.jpg
      var myMethod = myRequest.method; // GET
      //var myCred = myRequest.credentials; // omit
      this.setState({isSearching: true});
      fetch(myRequest)
      .then((response) => {
            if(response.status == 200){
                this.setState({isSearching: false, isDone: true});
                return response.json();
            }
            else throw new Error('Something went wrong on api server!');
        })
        .then((response) => {
            console.debug(response);
            this.setState({isSearching: false});
        });

        if(this.state.isSearching) {
            return <Loader />
        }
        if(this.state.isDone) {
            return <Toast />
        }

  }
}
