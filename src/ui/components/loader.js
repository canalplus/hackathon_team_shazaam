import React from 'react';

export default class Loader extends React.Component {
  render() {
    const className = `loader-container ${this.props.display ? '' : 'hidden'}`
    return <div className={className}>
      <div className="sub-container">
        <i className="material-icons loader">add</i>
      </div>
    </div>;
  }
}
