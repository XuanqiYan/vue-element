import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		redirect: "/home"
	},
	{
		path: '/home',
		name: 'home',
		//redirect:'/index',
		component:  () => import('../views/Layout/index.vue'),
		children:[
			{
				path: '/index',
				name: 'HomeIndex',
				component: () => import('../views/Home/index.vue')
			}
		]
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('../views/Login/index.vue')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
	const isLogin = localStorage.ele_login ? true : false;
	if (to.path == '/login') {
		next()
	} else {
		// 是否在登录状态下
		isLogin ? next() : next('/login');
	}

})


export default router
