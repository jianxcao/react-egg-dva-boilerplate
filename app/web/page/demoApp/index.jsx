
import React from 'react';

import Layout from '../../component/layout.jsx';
import {renderRoutes } from 'react-router-config';
import routers from './components';
import { Link } from 'react-router-dom';
import './styles/index.less'

export default function App () {
  return <Layout>
    <div className="main">
      <div className="page-container page-component">
      <nav className="page-nav">
            <Link to="/">home</Link>
            <Link to="/about">about</Link>
      </nav>
      {renderRoutes(routers)}
      </div>
    </div>
  </Layout>;
}
export { routers };
