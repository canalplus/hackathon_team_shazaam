import React from 'react';

export default class Toast extends React.Component {
  render() {
    return <div className="toast">
        <div className="toast-picture">
            <img className="album"  src={this.props.src} alt="test"/>
        </div>
        <div className="toast-infos">

            <div className="infos-container">
                <span className="title">Titre</span>
                <span className="artist">Artiste</span>
                <span className="album">Album</span>
                <span className="album"></span>
                <div className="toast-icon">
                    <i className="material-icons hearicon">hearing</i>
                </div>
            </div>
        </div>

    </div>
  }
}
