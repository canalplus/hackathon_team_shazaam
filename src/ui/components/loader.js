import React from 'react';

export default class Loader extends React.Component {
  render() {
    return <div className="loader-container">
                <div className="sub-container">
                    <i className="material-icons loader">add</i>
                </div>
            </div>
  }
}
