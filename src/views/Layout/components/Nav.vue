<template>
	<div id="nav-wrap">
        
		<h1 class="logo"><img src="../../../assets/logo.png" alt=""></h1>
		<el-menu default-active="1-4-1" class="el-menu-vertical-demo" 
			:collapse="isCollapse" 
			background-color="transparent" 
			text-color="#fff" 
			active-text-color="#fff"
			router
			>
			<template  v-for='(item,index) in router' > 
				<el-submenu :index="index + ''" v-if='!item.hidden' :key='item.id' ><!--此处判断v-if路由是否要显示 不能和 v-for放在一起使用  -->
					<template slot="title">
						<svg-icon :iconClass='item.meta.icon' :className='item.meta.icon'/>
						<span slot="title">{{item.meta.name}}</span>
					</template>
					<el-menu-item-group>
						<el-menu-item :index="_item.path" v-for='(_item,_index) in item.children' :key='_item.id'>{{_item.meta.name}}</el-menu-item>
					</el-menu-item-group>
				
				</el-submenu>
			</template>
		</el-menu>
		
	</div>
</template>
<script>
import {reactive,ref,isRef,toRefs,onMounted} from '@vue/composition-api'
export default{
	setup(props,{root}){
		//菜单栏是否收缩 
		const isCollapse = ref(false) 
		//获取路由对象 
		const router = reactive(root.$router.options.routes)
		//console.log(router)
		
		return {
			isCollapse,
			router
			
		}
	}
}
</script>

<style lang="scss" scoped>	
	.logo {
	  text-align: center;
	  img { 
	    margin: 28px auto 25px;
	    width: 72px;
	  }
	}
	#nav-wrap {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: $navMenu;
		background-color: #344a5f;
		svg {
			margin-right:10px;
		}
	}
</style>
