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
      <Welcome display={this.state.displayWelcomeScreen} />
      <Player
        src='assets/videos/StudioCanalTheThirdMan.mp4'
        onVideoLoaded={() => this.onVideoLoaded()} />
</div>;
  }

  onVideoLoaded() {
    !this.timeout && this.setState({ displayWelcomeScreen: false });
  }

  @keydown('s')
  activateLoader(){
      console.log('s');

      var myRequest = new Request('localhost:3001/id/snippet/123');

      var myURL = myRequest.url; // http://localhost/flowers.jpg
      var myMethod = myRequest.method; // GET
      //var myCred = myRequest.credentials; // omit
      var isSearching = true;
      fetch(myRequest)
      .then(function(response) {
            if(response.status == 200){
                isSearching = false;
                return response.json();
            }
            else throw new Error('Something went wrong on api server!');
        })
        .then(function(response) {
            console.debug(response);
            isSearching = false;
        })
        .catch(function(error) {
            console.error(error);
        });

        if(isSearching) {
            return <Loader />
        }

  }
}
