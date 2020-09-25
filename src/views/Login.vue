<template>
	<div id='login'>
		<div class="login-wrap">
			<ul class="menu-tab">
				<li :class='{"current": item.current}' :key='item.id' v-for='item in menuTab' @click='toggleMenu(item)'>{{item.text}}</li>
			</ul>
			<!--表单开始-->
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login_form">

				<el-form-item prop="username" class='form-item'>
					<label>邮箱</label>
					<el-input type="text" v-model="ruleForm.username"></el-input>
				</el-form-item>

				<el-form-item prop="password" class='form-item' >
					<label>密码</label>
					<el-input type="text" v-model="ruleForm.password" minlength='6' maxlength='20'></el-input>
				</el-form-item>
				<el-form-item prop="passwords" class='form-item' v-show= "mode ==='register'">
					<label>重复密码</label>
					<el-input type="text" v-model="ruleForm.passwords" minlength='6' maxlength='20'></el-input>
				</el-form-item>

				<el-form-item prop="code" class='form-item' >
					<label for="">验证码</label>
					<el-row :gutter="10">
						<el-col :span="15">
							<el-input v-model="ruleForm.code" minlength='4' maxlength='4'></el-input>
						</el-col>
						<el-col :span="9">
							<el-button 
								type="success" 
								@click='getValitedCode()' 
								class='block' 
								:disabled='codeButtonState'
							>{{codeButtonText}}</el-button>
						</el-col>
						
					</el-row>
					
				</el-form-item>

				<el-form-item>
					<el-button 
						type="danger" 
						@click="submitForm('ruleForm')" 
						class=' margin-top-19 block'
						:disabled='buttonState'
					>{{mode =='login' ? '登陆' : '注册'}}</el-button>
				</el-form-item>
			</el-form>
			<!--表单结束-->
		</div>
	</div>
</template>

<script>
	import {reactive,ref,isRef,toRefs,onMounted} from '@vue/composition-api'
	import {_email,_inputValue,validate_email,validate_password,validate_code} from '@/utils/validate.js'
	import {getCode,login,register} from '@/api/login.js'
	export default {
		//存放 data内的数据 生命周期钩子 自定义函数 
		setup(props,{refs,root}){
/*----------------------------------验证表单------------------------------------------------*/	
			//验证邮箱
			let validateUsername = (rule, value, callback) => {
				
				//过滤非法字符
				ruleForm.username = value = _email(value) 
				if (value === '') {
					callback(new Error('邮箱不能为空'));
				} else if(!validate_email(value)){
					callback(new Error('邮箱格式不正确'))
				} else {
					callback();
				}
			}
			//验证密码
			let validatePassword= (rule, value, callback) => {
				ruleForm.password = value = _inputValue(value) 
				
				if (value === '') {
					callback(new Error('请再次输入密码'))
				} else if (!validate_password(value)) {
					callback(new Error('密码为6至20位数字+字母'))
				} else {
					callback()
				}
			}
			//验证验证码
			let checkCode = (rule, value, callback) => {
				ruleForm.code = value = _inputValue(value) 
				if (value === '') {
					callback(new Error('请输入验证码'))
				} else if (!validate_code(value)) {
					callback(new Error('验证码为4为数字'))
				} else {
					callback()
				}
			}
			//验证重复密码
			let validatePasswords = (rule, value, callback) => {
				//如果mode等于login的话 需要跳过
				if(mode.value ==='login') {
					callback()
				}
				ruleForm.passwords = value = _inputValue(value) 
				
				if (value === '') {
					callback(new Error('请输入重复密码'))
				} else if (value!=ruleForm.password) {
					callback(new Error('两次密码不一致'))
				} else {
					callback()
				}
			}
/*---------------------------------data-------------------------------------------------*/			
			//定义菜单
			const  menuTab  = reactive([{
					text: '登陆',
					current: true,
					type:'login'
				},
				{
					text: '注册',
					current: false,
					type:'register'
				}
			])
			//当前模块
			const mode  = ref('login')
			//表单数据对象
			const ruleForm = reactive({
				username: '',
				password: '',
				code: '',
				passwords:''
			})
			//验证规则
			const rules = reactive({
				username: [{
					validator: validateUsername,
					trigger: 'blur'
				}],
				password: [{
					validator: validatePassword,
					trigger: 'blur'
				}],
				code: [{
					validator: checkCode,
					trigger: 'blur'
				}],
				passwords: [{
					validator: validatePasswords,
					trigger: 'blur'
				}],
			})
			//登陆注册按钮禁用状态
			const buttonState = ref(true)
			//验证码发送中禁用
			const codeButtonState = ref(false)
			const codeButtonText = ref('获取验证码')
			//倒计时存储
			const timer = ref(null)
			const timer_for_tab_menu = ref(null) /* 如果在注册验证码按钮是 发送中 切换为登陆会后bug */
			
/*-------------------------------methods---------------------------------------------------*/				
			
			//切换模式函数
			const toggleMenu = (currentItem => {
				menuTab.map(item => {
					item.current = false
				})
				currentItem.current = true
				//修改模块
				mode.value = currentItem.type
				//重置表单
				refs['ruleForm'].resetFields()
				//还原定时器
				clearCountDown()
				
			})
			//提交实现
			const submitForm = (formName => {
					
				refs[formName].validate((validResult, field) => {
					if (validResult) {
						mode.value == 'login' ? doLogin() : doRegister()		
					} else {
						console.log('error submit!!')
						return false;
					}
				})
			})
			//执行登陆
			const doLogin = ()=>{
				let LoginData = {
					username:ruleForm.username,
					password:ruleForm.password,
					code:ruleForm.code,
					mode:'login',
				}
				login(LoginData).then(res=>{
					root.$message.success(res.data.message)
					console.log(res)
				}).catch(error=>{
					
				})	
			}
			//执行注册
			const doRegister = ()=>{
				let registerData = {
					username:ruleForm.username,
					password:ruleForm.password,
					code:ruleForm.code,
					mode:'register',
				}
				register(registerData).then(res=>{
					root.$message.success(res.data.message)
					toggleMenu(menuTab[0])
				}).catch(error=>{
					
				})	
			}
			//点击获取验证码 
			const getValitedCode =(()=>{
				//请求验证码邮箱不能为空
				if(ruleForm.username== ''){
					root.$message.error('邮箱不能为空')
					return  false
				}
				//验证码状态控制
				codeButtonState.value = true
				codeButtonText.value = '发送中'
				
				timer_for_tab_menu.value = setTimeout(()=>{ //模拟网络延迟
					getCode({usernmae:ruleForm.username}).then(res=>{
						root.$message.success('验证码:'+res.data.data.code)
						//验证码获取后才能点击登陆和注册按钮
						buttonState.value = false
						//成功后倒计时60秒 倒计时结束后重新发送
						countDown(60)
					}).catch(error=>{
						
					})
				},3000)
			})
			
			// 验证码按钮倒计时
			const countDown = ((time)=>{
				//判断定时器是否存在 存在清除上一个 重新开启定时器 
				if(timer.value){
					clearInterval(timer.value)
				}
				timer.value = setInterval(()=>{
					time--
					if(time === 0){
						clearInterval(timer.value)
						codeButtonState.value = false
						codeButtonText.value = '重新获取验证码'
					}else{
						codeButtonText.value = `倒计时${time}秒`
					}
					
				},1000)
			})
			//还原验证码按钮
			const clearCountDown = ()=>{
				//还原定按钮状态 
				codeButtonState.value = false
				codeButtonText.value = '获取验证码'
				
				clearInterval(timer.value)
				clearTimeout(timer_for_tab_menu.value)
			}
			
			return {
				menuTab,
				mode,
				ruleForm,
				rules,
				toggleMenu,
				submitForm,
				getValitedCode,
				buttonState,
				codeButtonState,
				codeButtonText
				
			}
			
		}
	}
</script>

<style scoped lang='scss'>
	#login {
		height: 100vh; // 100% 不好使 --> vh 基于浏览器窗口的百分比处理的
		background-color: #344a5f;
	}

	.login-wrap {
		width: 330px;
		margin:auto;
		
	}

	.menu-tab {
		text-align: center;

		li {
			display: inline-block;
			width: 88px;
			line-height: 36px;
			height: 36px;
			font-size: 14px;
			color: #fff;
			border-radius: 2px;
			cursor: pointer;
		}

		.current {
			background-color: rgba(0, 0, 0, .1)
		}
	}

	.login_form {
		// 自定义表单整体样式
		margin-top: 29px;

		label {
			display: block;
			font-size: 14px;
			margin-bottom: 3px;
			color: #fff;
		}
	}

	.form-item {
		//表单选项样式
		margin-bottom: 13px;
	}

	.block {
		// 登陆框平铺100%
		display: block;
		width: 100%;
	}
	.margin-top-19{
		margin-top: 19px;
	}
</style>
