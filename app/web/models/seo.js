// seo model
export default {
  namespace: 'seo',
  state: {
    seo: {
      title: '',
      keywords: '',
      description: ''
    }
  },
  reducers: {
    update (state, { payload }) {
      return {
        ...state,
        ...payload
      };
    }
  }
};
