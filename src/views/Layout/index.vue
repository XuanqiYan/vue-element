<template>
	<div id='layout'>
		<LayoutHeader />	
		<LayoutNav />
		<LayoutMain />
		
	</div>	
</template>

<script>
import LayoutHeader from './components/Head.vue'	
import LayoutNav from './components/Nav.vue'	
import LayoutMain from './components/Main.vue'	
export default {
	components:{
		LayoutHeader,
		LayoutNav,
		LayoutMain
		
	},
	
}	
</script>

<style lang='scss' scoped="">
#layout{
	
}	
</style>
