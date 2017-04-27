import React from 'react';
import PlayerInformations from './playerInformations.js';

export default class Player extends React.Component {
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
        />
    </div>;
  }

  componentDidMount() {
    this.video.onplay = this.props.onVideoLoaded;
  }
}
