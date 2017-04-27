import React from 'react';
import PlayerInformations from './playerInformations.js';

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayInformations: false
    };
  }

  render() {
    return <div className="player">
      <video
        className="player-video"
        src={this.props.src}
        ref={(video) => { this.video = video; }}
        autoPlay
        loop
      />
      <PlayerInformations
        title='Le troisième homme'
        subtitle='Film dramatique'
        display={this.state.displayInformations}
        />
    </div>;
  }

  componentDidMount() {
    this.video.onplay = () => {
      this.props.onVideoLoaded();

      this.setState({ displayInformations: true });
      
      setTimeout(() => {
        this.setState({ displayInformations: false });
      }, 5e3);
    };
  }
}
