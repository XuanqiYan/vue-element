<template>
	<svg :class="svgClass" aria-hidden="true">
	    <use :xlink:href="iconName"></use>
	</svg>
</template>

<script>
import {reactive,ref,computed} from '@vue/composition-api'
export default {
	//简化
	//props:['iconClass','className'],
	// 标准
	props:{ 
		iconClass:{
			type:String,
			defualt:''
		},
		className:{
			type:String,
			default:''
		}
	},
	setup:(props,{})=>{
		//获取父组件的传参
		//console.log(props.iconClass) 
		
		// 根据不同的props 计算得到不同的图标和class
		const iconName = computed(() => `#icon-${props.iconClass}`)
		const svgClass = computed(() => {
		    if(props.className) {
		        return `svg-icon ${props.className}` // svg-icon 是所有图标通用样式  也预留了各个图标的自定义方式 
		    }else{
		        return `svg-icon`
		    }
		})
    
		return {
		    iconName,
		    svgClass
		}
	}
}
</script>

<style lang='scss' scoped>
.svg-icon {
    width: 1em;
    height: 1em;
	font-size: 20px;
	fill:currentcolor;
	color:#fff;
   
}
.user{
   color:#fff;  //测试图标颜色
}

</style>
