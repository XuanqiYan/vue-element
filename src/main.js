import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入 全局css样式
import './styles/common.css'
//引入elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
