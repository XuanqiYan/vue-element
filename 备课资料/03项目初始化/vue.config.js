const path = require('path')

module.exports = {

	//es-lint 语法格式检查 
	lintOnSave: false, 
	css: {
		// 是否使用css分离插件 ExtractTextPlugin
		//extract: true, 
		// 开启 CSS source maps?
		//sourceMap: true,
		// css预设器配置项
		loaderOptions: {
			scss: {
				prependData: `@import "./src/styles/main.scss";`
			}
		},
	},

	configureWebpack: (config) => {
		config.resolve = {
			extensions: ['.js', '.json', '.vue'],
			alias: {
				vue$: "vue/dist/vue.esm.js",
				"@": path.resolve(__dirname, "./src"),
				"public": path.resolve(__dirname, "./public"),
				"@c": path.resolve(__dirname, "./src/components")
			}
		}
	},

	// //生产环境是否生成 sourceMap 文件
	productionSourceMap: true,

}