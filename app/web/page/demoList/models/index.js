import axios from 'axios';
export default {
  namespace: 'app',
  state: {},
  reducers : {
    initData(state, { payload: todo }) {
      return {
        ...state,
        ...todo
      }
    }
  },
  effects: {
    *init (action, { put, call}) {
      console.log('trigger init');
      yield put({
        type: 'initData',
        payload: {
          'list': [{
            'title': 'Egg + React 服务端渲染骨架1111',
            'summary': '基于Egg + React',
            'hits': 550,
            'url': 'https://github.com/hubcarl/egg-react-webpack-boilerplate',
            'id': 55
          }],
          'total': 1
        }
      })
    }
  }
}
