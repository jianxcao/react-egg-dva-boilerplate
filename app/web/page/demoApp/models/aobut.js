export default {
  namespace: 'about',
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
          text: '关于食堂饭不好吃的问题的解决',
          href: 'www.163.com'
        }, {
          text: '新产品上线问题',
          href: 'www.163.com'
        }, {
          text: '客服电话号码打不通的问题',
          href: 'www.163.com'
        }, ]
      });
    }
  }
}
