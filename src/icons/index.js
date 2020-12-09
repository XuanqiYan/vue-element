import Vue from "vue";
import SvgIcon from './SvgIcon.vue'
Vue.component('svg-icon',SvgIcon)


// svg 图片解析 
/*
	require.context: 读取目录文件
	参数1：目录位置
	参数2：是否递归读取子目录 
	参数3：正则匹配读取文件类型 
*/
//1.读取文件目录
const files = require.context('./svg', false, /\.svg$/); // 获取当前svg目录所有为.svg结尾的文件
//console.log(files.keys()) //获取文件资源

//2.解析svg 文件 
const res = files.keys().map(files);  // 解析获取的.svg文件的文件名称 交给webpack处理 

//3.配置 svg 解析的 loader
/*
	chainWebpack: (config) => {
		const svgRule = config.module.rule("svg");     
		svgRule.uses.clear();     
		svgRule
		.use("svg-sprite-loader")
		.loader("svg-sprite-loader")
		.options({ 
			symbolId: "icon-[name]",
			include: ["./src/icons"] 
		});
	},
*/

//4. 下载相关的loader 
/*
	npm install svg-sprite-loader  -S
*/

