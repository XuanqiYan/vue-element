import axios from 'axios'
import {Message} from 'element-ui'

//实例化一个axios对象
const http = axios.create()

//请求拦截器
http.interceptors.request.use((config) => {
	/*
		一般在此处在请求头对象内注入向后台注入一些公共参数 
		token 
		userId
		csrf 
	*/
	//config.headers.userId='nice' //注入方式
	//console.log('请求对象',config)
	
	return config
	
}, (error) => {
	
	// 对请求错误做些什么
	return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use((response) => {
	//如果返回的状态码不是0 证明请求数据失败
	if(response.data.resCode==0){
		Message.error('后台返回的错误信息：'+response.data.message)
		return Promise.reject(data)
	}else{
		return response
	}

}, (error) => {
	
	// 对响应错误做点什么
	return Promise.reject(error)
})

export default http
