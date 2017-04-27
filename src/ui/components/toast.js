import React from 'react';

export default class Toast extends React.Component {
  render() {
    return <div className="toast">
        <div className="toast-picture">
test
        </div>
        <div className="toast-infos">
            <span>Titre</span>
            <span>Artiste - Album</span>
        </div>
    </div>
  }
}
