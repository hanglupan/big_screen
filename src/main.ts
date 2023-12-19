import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dataV from '@jiaminghi/data-view'
//引入图标
import './assets/icon/iconfont.css'
// 引入样式
import './assets/scss/style.scss'
// 引入全局注册组件
import PublicComponent from '@/components/componentInstall';

const app = createApp(App)
app.use(PublicComponent)
app.use(dataV)
app.use(store)
app.use(router)//使用路由才能把index的主页内容填充进去
app.mount('#app')
