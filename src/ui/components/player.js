import React from 'react';

export default class Player extends React.Component {
  render() {
    return <video
      src={this.props.src}
      ref={(video) => { this.video = video; }}
      autoPlay="true" />
  }

  componentDidMount() {
    this.video.onplay = this.props.onVideoLoaded;
  }
}
