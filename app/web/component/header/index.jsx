import React from 'react';
import './index.less';
export default class Header extends React.PureComponent {
  componentDidMount() {
    console.log('----Header componentDidMount-----');
  }
  render() {
    return <header className="header">
      <div className="container">
        <h1>Egg + React</h1>
      </div>
    </header>;
  }
}
