import React from 'react';

export default class Welcome extends React.Component {
  render() {
    const className = `welcome ${this.props.display ? 'welcome-display' : 'welcome-hide'}`;
    return <div className={className} />
  }
}
