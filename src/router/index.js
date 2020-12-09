import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		redirect: "/home",
		hidden:true, //自定义属性 是否在菜单中显示
		meta:{
			name:'主页',	
		}
	},
	{
		path: '/login',
		name: 'login',
		hidden:true,
		meta:{
			name:'登陆'
		},
		component: () => import('../views/Login/index.vue')
	},
	/*
		首页
	*/
	{
		path: '/home',
		name: 'home',
		hidden:false,
		redirect:'/index',
		meta:{
			name:'控制台',
			icon:'console'
		},
		component: () => import('../views/Layout/index.vue'),
		children:[
			{
				path: '/index',
				name: 'HomeIndex',
				meta:{
					name:'首页'
				},
				component: () => import('../views/Home/index.vue')
			}
		]
	},
	/*
		信息管理
	*/
	{
		path: '/info',
		name: 'info',
		hidden:false,
		meta:{
			name:'信息管理',
			icon:'info'
		},
		component:  () => import('../views/Layout/index.vue'),
		children:[
			{
				path: '/infoIndex',
				name: 'InfoIndex',
				meta:{
					name:'信息管理'
				},
				component: () => import('../views/Info/index.vue')
			},
			{
				path: '/infoCate',
				name: 'InfoCate',
				meta:{
					name:'信息分类'
				},
				component: () => import('../views/Info/cate.vue')
			}
		]
	},
	/*
		用户管理
	*/
	{
		path: '/user',
		name: 'User',
		hidden:false,
		meta:{
			name:'用户管理',
			icon:'user'
		},
		component:  () => import('../views/Layout/index.vue'),
		children:[
			{
				path: '/userIndex',
				name: 'UserIndex',
				meta:{
					name:'用户管理'
				},
				component: () => import('../views/User/index.vue')
			},
			{
				path: '/userCate',
				name: 'UserCate',
				meta:{
					name:'用户分类'
				},
				component: () => import('../views/User/cate.vue')
			}
		]
	}
	
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
	// const isLogin = localStorage.ele_login ? true : false;
	// if (to.path == '/login') {
	// 	next()
	// } else {
	// 	// 是否在登录状态下
	// 	isLogin ? next() : next('/login');
	// }
    next()
})


export default router
