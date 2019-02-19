export default {
  namespace: 'newslist',
  state: [],
  reducers: {
    initData(state, {
      payload
    }) {
      return [
        ...payload
      ]
    }
  },
  effects: {
    * init({
      payload: param
    }, {
      put,
      call
    }) {
      // 调用api
      // call();
      yield put({
        type: 'initData',
        payload: [{
          text: '索尼大法好',
          href: 'www.163.com'
        }, {
          text: '爱奇艺收费太不合理',
          href: 'www.163.com'
        }, {
          text: '京东会员其实很啃爹',
          href: 'www.163.com'
        }, ]
      });
    }
  }
}
