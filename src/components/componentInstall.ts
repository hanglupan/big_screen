//注册全局组件
import type { DefineComponent } from 'vue'
const component = Object.create(null)//纯净且不需要属性检查

import Echart from './echartCanvas/index'

component.install = function (vue: DefineComponent) {//全局注册组件
    vue.component('echart', Echart);
}

export default component