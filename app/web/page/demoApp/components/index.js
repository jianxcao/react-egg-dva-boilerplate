// 遵循react-router-config的配置方式
import React from 'react';
import About from './about';
import Home from './home';

export default [
    {
        path: "/about",
        component: About
    },
    {
      path: "/clientabout",
      component: About
    },
    {
        path: "/(home)*",
        exact: true,
        component: Home
    },
    {
      path: "/clientindex",
      component: Home
    }
]
