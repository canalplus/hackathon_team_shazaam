import React from 'react';

export default class Toast extends React.Component {
  render() {
    const { display, music } = this.props;
    const className = `toast ${display ? '' : 'hidden'}`;
    if (!music) {
      return <div className={className}>
        <div className="toast-infos">
          <div className="infos-container">
            <span className="title">Désolé, nous n'avons pas trouvé de réponse</span>
          </div>
        </div>
      </div>;
    }

    const artistName = music.artists
      .map(artist => artist.name)
      .join(', ');

    return <div className={className}>
      <div className="toast-picture">
        <img className="album" src={this.props.src} alt="album"/>
      </div>
        <div className="toast-infos">
            <div className="infos-container">
                <span className="title">{music.title}</span>
                <span className="artist">{artistName}</span>
                <span className="album">{music.album.name}</span>
                <div className="toast-icon">
                  <i className="material-icons hearicon">hearing</i>
                </div>
            </div>
        </div>

    </div>
  }
}
