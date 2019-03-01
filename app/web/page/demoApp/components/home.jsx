import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getDva } from 'asset/js/connectDva';
// 获取this.props.dva对象
@getDva
@connect(({ newslist }) => {
  return {
    newslist
  };
})
class Home extends PureComponent {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  static async fetch ({ dispatch }) {
    return dispatch({
      type: 'newslist/init'
    });
  }
  componentDidMount () {
    this.props.dispatch({
      type: 'newslist/init'
    });
  }
  render () {
    const list = this.props.newslist;
    return <div>
      <h1>home</h1>
      <ul>
        {list.map((cur, index) => {
          return <li key={index}><a href={cur.text}>{cur.text}</a></li>;
        })}
      </ul>
    </div>;
  }
}

export default Home;
