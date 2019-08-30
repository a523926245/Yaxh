# 介绍
基于vue的ui移动端框架！


## 安装
```
npm安装

npm install yaxh --S


引入
#main.js

<!-- 引入局部组件 -->
import Vue from 'vue';
import { Button } from 'vant';
import 'yaxh/lib/yaxh.css';
Vue.use(Button);

<!-- 引入全部组件 -->
import Vue from 'vue';
import yaxh from "yaxh";
import 'yaxh/lib/yaxh.css';

Vue.use(yaxh)


```
##注意事项
如果引入yaxh的样式支持编译失败，请确保安装了css loader依赖

npm install css-loader --S 

# Yaxh
