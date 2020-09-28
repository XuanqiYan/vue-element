const path = require('path')

module.exports = {
	//基本路径
	publicPath: process.env.NODE_ENV === 'production' ? '' : '/',

	//输出文件路径
	outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',

	//es-lint 语法格式检查 
	lintOnSave: true,

	chainWebpack: (config) => {},
	css: {
		// 是否使用css分离插件 ExtractTextPlugin
		extract: true,
		// 开启 CSS source maps?
		sourceMap: false,
		// css预设器配置项
		loaderOptions: {
			scss: {
				prependData: `@import "./src/styles/main.scss";`
			}
		},
		// requireModuleExtension: false
		// 启用 CSS modules for all css / pre-processor files.
		// modules: false
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

	//生产环境是否生成 sourceMap 文件
	productionSourceMap: false,

	devServer: {
		open: true, //配置自动启动浏览器
		host: 'localhost',
		port: 8082, // 端口号
		https: false,
		hotOnly: false, // https:{type:Boolean}
		proxy: { // 配置跨域
			'/api': {
				target: 'http://xxx.xx.xxx.xxx:8080', //源地址
				changeOrigin: true, //改变源
				ws: true, //是否代理websockets
				pathRewrite: {
					'^/api': ''
				}
			}
		}, // 配置跨域处理,只有一个代理
		before: app => {}
	},
	// 第三方插件配置
	pluginOptions: {}
}
