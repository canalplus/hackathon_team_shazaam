import React from 'react';

export default class PlayerInformations extends React.Component {
  render() {
    return <div className='player-informations-container'>
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
