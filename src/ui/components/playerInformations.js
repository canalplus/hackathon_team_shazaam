import React from 'react';

export default class PlayerInformations extends React.Component {
  render() {
    const className = `player-informations-container ${this.props.display ? '' : 'player-informations-container--hide'}`;
    return <div className={className}>
      <div className='player-informations'>
        <div className="player-description">
          <div className="title-wrapper">
            <div className="player-title">{this.props.title}</div>
            <div className="player-subtitle">{this.props.subtitle}</div>
          </div>
        </div>
      </div>
    </div>;
  }
}
