# react+egg+dva项目说明


## 编译说明
### 编译配置文件说明
1. 编译采用[easywebpack](https://www.yuque.com/easy-team/easywebpack/home)
2. 编译中有自定义loader `/app/web/frmework/entry/lientloader|serverloader`,loader的主要作用是创建dva对象，并加载每个page下面的models目录，还有全局的models目录 

#### loader参数说明
1. globalModels 全局model的路径
2. basePageModelPath 所有页面的基础路径
3. polyfill 是否注入polyfill

### 全局变量说明

1. EASY_ENV_IS_PROD， 是否是线上环境
2. EASY_ENV_IS_NODE, 是否在node端
3. EASY_ENV_IS_BROWSER, 是否在浏览器端
4. EASY_ENV_IS_DEV,是否在dev环境下

## dva说明

1. 所有的models写在models目录中, 全局模块在`app/web/models`，页面模块的models在`app/web/page/{pageNames}/models`
2. 入口文件可导出一个react组件即可，可用connect链接dva数据，如果需要配置dva，入口文件导出dvaOpt的配置即可

## 服务端说明

1. 服务端渲染顶层app或者路由匹配的组件如果带fetch方法(fetch是一个静态方法)，该fetch方法会被调用，并将数据注入到初始化状态中，fetch方法将会有个参数是dispath，用于dispatch一个redux的action
2. 服务端调用生命周期的Hooks不会被调用需要注意
3. 服务端如果有异步组件渲染请使用[loadable](https://github.com/jamiebuilds/react-loadable)

## 客户端说明
1. 客户端渲染调用this.renderClient，请参考项目中的demo
2. 所有客户端的页面将会注入 window.__INITIAL_STATE__
3. __INITIAL_STATE__会被当成dva的初始状态注入dva的model中
4. 所有的状态都可以从redux中获取，通过connect函数去获得
5. 在全局model(app/web/models)中内置了namespace为seo和csrf的model，用来注入seo信息和csrf信息

### 客户端模板

1. 客户端模板在 app/web/view/layout.ejs
2. 客户端渲染会先调用ejs模板渲染,然后在调用react的渲染，最后inject所有的js和css资源


## 懒加载说明
1. react.lazy可以使用，单是仅仅能在客户端使用,不能在服务端使用
2. [loadable](https://github.com/jamiebuilds/react-loadable) 可以同时在客户端和服务使用，本框架没有内置[loadable](https://github.com/jamiebuilds/react-loadable)的插件，如果需要使用服务端异步渲染，请自行参考[loadable](https://github.com/jamiebuilds/react-loadable)设置

## 路由中获取router说明
``` javascript
  import {withRouter } from 'react-router';
  class Login extends React.Component {
    render() {
      //此时才能获取this.props,包含（history, match, location）三个对象
      console.log(this.props);  //输出{match: {…}, location: {…}, history: {…}, 等}
      return <div></div>
    }
  }
  const Login=withRouter(connect(mapStateToProps,mapDispatchToProps)(TLogin))
  export default Login;
```



##  [egg](https://eggjs.org/)相关请查看[egg](https://eggjs.org/)官方文档
