import React, {Component} from 'react';
import Layout from '../../component/layout.jsx';
// import List from './componets/list';
import './styles/index.css';
import { connect } from 'react-redux';
import loadable from '@loadable/component';
import { getDva } from 'asset/js/connectDva';

// 懒加载
const List = loadable(() => import('./componets/list'));

@getDva
@connect(({ app }) => {
  return {
    list: app.list,
    total: app.total
  };
})
class ListIndex extends Component {
  constructor(...arg) {
    super(...arg);
  }
  static async fetch ({ dispatch }) {
    return dispatch({
      type: 'app/init'
    });
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'app/init'
    });
    console.log('----componentDidMount-----');
  }

  render() {
    return <Layout>
      <div className="main">
        <div className="page-container page-component">
          <List list={this.props.list}></List>
        </div>
      </div>
    </Layout>;
  }
}
export default ListIndex;

export const dvaOpt = {
  onAction: function (store) {
    return next => action => {
      // console.dir(action);
      return next(action);
    };
  }
};
