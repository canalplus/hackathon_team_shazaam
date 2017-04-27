import React from 'react';
import PlayerInformations from './playerInformations.js';

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayInformations: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.video !== this.props.video) {
      this.displayInformations();
    }
  }

  render() {
    return <div className="player">
      <video
        className="player-video"
        src={this.props.video.url}
        ref={(video) => { this.video = video; }}
        autoPlay
        loop
      />
      <PlayerInformations
        title={this.props.video.title}
        subtitle={this.props.video.subtitle}
        display={this.state.displayInformations}
        />
    </div>;
  }

  displayInformations() {
    clearTimeout(this.timeout);

    this.setState({ displayInformations: true });
    this.timeout = setTimeout(() => {
      this.setState({ displayInformations: false });
    }, 5e3);
  }

  componentDidMount() {
    this.video.onplay = () => {
      this.props.onVideoLoaded();
      this.displayInformations();
    };
  }
}
