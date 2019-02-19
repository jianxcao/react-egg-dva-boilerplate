import dva from 'dva';
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { Router } from 'dva/router';
import { matchRoutes, renderRoutes } from 'react-router-config';
import ReactDOM from 'react-dom'
import { isReactComponent } from 'asset/js/utils';
import { createMemoryHistory, createBrowserHistory } from 'history';
import createLoading from 'dva-loading';
import hoistNonReactStatics from 'hoist-non-react-statics';

function clientRender(models, target, opt = {}) {
  if (!models) {
    models = [];
  }
  if (!Array.isArray(models)) {
    models = [models];
  }
  // 拿出初始化的状态
  let { initialState = {} } = opt;
  initialState = {
    ...window.__INITIAL_STATE__,
    ...initialState
  }
  opt.initialState = initialState;
  opt.history = createBrowserHistory();
  // 只用dva的store不用router
  const app = dva(opt);
  for(let model of models) {
    app.model(model);
  }
  // 写在全局方便测试
  window.app = app;
  const router = getRouter(target, app);
  app.router(router);
  setLoading(app);
  const App = app.start();
  // dva注入
  App.prototype.dva = app;
  const render = Page =>{
    ReactDOM.hydrate(EASY_ENV_IS_DEV ? <AppContainer><Page /></AppContainer> : <Page />, document.getElementById('app'));
  };
  if (EASY_ENV_IS_DEV && module.hot) {
    module.hot.accept();
  }
  render(App);
}

function filterLocals(locals = {}) {
  const fil = [ 'ctx', 'request', 'helper'];
  const keys = Object.keys(locals);
  return keys.reduce((res, cur) => {
    if (!fil.includes(cur) && !(typeof locals[cur] ===  'function')) {
      res[cur] = locals[cur];
    }
    return res;
  }, {});
}
function filterState (locals = {}) {
  const fil = ['csrf', 'loading', 'routing'];
  const keys = Object.keys(locals);
  return keys.reduce((res, cur) => {
    if (!fil.includes(cur) && !cur.startsWith('@@')) {
      res[cur] = locals[cur];
    }
    return res;
  }, {});
}

const serverRender =  (models, target, opt = {}, routers) => async (context, options) => {
  if (!models) {
    models = [];
  }
  if (!Array.isArray(models)) {
    models = [models];
  }

  const url = context.state.ctx.request.url;
  // 服务端渲染用内存路由
  opt.history = createMemoryHistory({
    initialEntries: [url]
  });
  // 只用dva的store不用router
  let { initialState = {} } = opt;
  Object.assign(initialState, filterLocals(context.state));
  opt.initialState = initialState;
  const app = dva(opt);
  for(let model of models) {
    app.model(model);
  }
  // 注入路由
  const router = getRouter(target, app);
  app.router(router);
  setLoading(app);
  const App = app.start();
   // 注入fetch数据
   if (isReactComponent(target) && target.fetch) {
    await target.fetch(app._store);
  }
  // 有routers对象取routers对象上的fetch数据
  if (routers) {
    // 匹配路由调用fetch然后，组合数据注入组件
    const branch = matchRoutes(routers, url);
    const promises = branch.map(({route}) => {
      const fetch = route.component.fetch;
      // 调用fetch将state放到store中
      return fetch instanceof Function ? fetch(app._store) : Promise.resolve(null)
    });
    await Promise.all(promises);
  }
  // 将store中的state同步到 window.__INITIAL_STATE__中
  context.state = Object.assign(context.state, filterState(app._store.getState()));
  return App;
};

const setLoading = app => {
  app.use(createLoading({
    global: false
  }));
};
/**
 * 
 * @param {component|Object} target 根据目标生成dva的路由方法,传入一个组件或者一个router的配置对象
 */
const getRouter = (target, app) => {
  const Com = target;
  return ({ history }) => <Router history={history}><DvaContext.Provider value={app}><Com/></DvaContext.Provider></Router>
}
/**
 * 这里只是一个单个组件的链接不带路由
 * 链接dva到一个react的class组件上，注意只能是class组件
 * 这里多用于一个页面直接渲染，后者子路由通过前端渲染
 * @param {Array|Object} models 其他model，非必须，可以自己在组件中调用this.dva注入model
 * @param {Object} opt 标准的dva的配置的参数
 */
export default function connectDva(models, opt, routers) {
  /**
   * 组件或者router对象
   * @param {component|Object} target react的组件 函数式或者class
   * */ 
  return target => {
    // 将类转换成一个对象
    return EASY_ENV_IS_NODE ? serverRender(models, target, opt, routers) 
    : clientRender(models, target, opt);
  };
}
export const DvaContext = React.createContext();

export const getDva = App => {
  const Components = (props) => {
    return <DvaContext.Consumer>{dva => (<App {...props} dva={dva}/>)}</DvaContext.Consumer>
  };
  Components.displayName = `Connectdva`;
  hoistNonReactStatics(Components, App);
  return Components;
}
