import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
@connect(({ about }) => {
  return {
    about
  };
})
class About extends PureComponent {
  static async fetch({ dispatch }) {
    return dispatch({
      type: 'about/init'
    });
  }
  componentDidMount () {
    this.props.dispatch({
      type: 'about/init'
    });
  }
  render() {
    const list = this.props.about;
    return (
      <div>
        <h1>about</h1>
        <ul>
          {list.map((cur, index) => {
            return (
              <li key={index}>
                <a href={cur.text}>{cur.text}</a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
export default About;
