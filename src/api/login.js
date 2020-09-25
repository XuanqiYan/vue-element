import axios from '@/utils/request.js'

/*
	获取验证码
*/	
export const getCode =(data)=>{
	
	return axios.request({
		url:'/mock/login/code.json',
		method:'get',
		data
	})
}
/*
	登陆
*/
export const login =(data)=>{
	return axios.request({
		url:'/mock/login/login.json',
		method:'get',//请求mock数据只能是get
		data
	})
}
/*
	注册
*/

export const register =(data)=>{
	return axios.request({
		url:'/mock/login/register.json',
		method:'get',//请求mock数据只能是get
		data
	})
}


