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
				<!--此处v-show会有bug 因为登陆隐藏重复密码 但是还是要验证 用v-if就不会 -->
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
							<el-button type="success" class='block' >获取验证码</el-button>
						</el-col>
						
					</el-row>
					
				</el-form-item>

				<el-form-item>
					<el-button type="danger" @click="submitForm('ruleForm')" class=' margin-top-19 block'>提交</el-button>
				</el-form-item>
			</el-form>
			<!--表单结束-->
		</div>
	</div>
</template>

<script>
	import {_email,_inputValue,validate_email,validate_password,validate_code} from '@/utils/validate.js'
	export default {
		data() {
			//验证邮箱
			var validateUsername = (rule, value, callback) => {
				//过滤非法字符
				this.ruleForm.username = value = _email(value) 
				if (value === '') {
					callback(new Error('邮箱不能为空'));
				} else if(!validate_email(value)){
					callback(new Error('邮箱格式不正确'))
				} else {
					callback();
				}
			}
			//验证密码
			var validatePassword= (rule, value, callback) => {
				this.ruleForm.password = value = _inputValue(value) 
				
				if (value === '') {
					callback(new Error('请再次输入密码'))
				} else if (!validate_password(value)) {
					callback(new Error('密码为6至20位数字+字母'))
				} else {
					callback()
				}
			}
			//验证验证码
			var checkCode = (rule, value, callback) => {
				this.ruleForm.code = value = _inputValue(value) 
				
				if (value === '') {
					callback(new Error('请输入验证码'))
				} else if (!validate_code(value)) {
					callback(new Error('验证码为4为数字'))
				} else {
					callback()
				}
			}
			//验证重复密码
			var validatePasswords = (rule, value, callback) => {
				//如果mode等于login的话 需要跳过
				if(this.mode ==='login') {
					callback()
				}
				this.ruleForm.passwords = value = _inputValue(value) 
				
				if (value === '') {
					callback(new Error('请输入重复密码'))
				} else if (value!=this.ruleForm.password) {
					callback(new Error('两次密码不一致'))
				} else {
					callback()
				}
			}
			return {
				menuTab: [{
						text: '登陆',
						current: false,
						type:'login'
					},
					{
						text: '注册',
						current: true,
						type:'register'
					}
				],
				ruleForm: {
					username: '',
					password: '',
					code: '',
					passwords:''
				},
				rules: {
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
				},
				//显示的模块
				mode:'login'
			}
		},
		methods: {
			toggleMenu(currentItem) {
				this.menuTab.map(item => {
					item.current = false
				})
				currentItem.current = true
				//修改模块
				this.mode = currentItem.type
			},
			//提交表单
			submitForm(formName) {
				//提交前调用validate方法校验表单所有字段
				this.$refs[formName].validate((validResult, field) => { // validResult（boolean）校验结果以及未通过校验字段

					if (validResult) {
						alert('submit!');
					} else {
						console.log('error submit!!')
						return false;
					}
				})
			},

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
		margin: auto;
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
