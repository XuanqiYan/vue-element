import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//导入vue3.0
import VueCompositionApi from '@vue/composition-api'
Vue.use(ElementUI)
Vue.use(VueCompositionApi)


// 自定义全局组件
import "./icons";

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
