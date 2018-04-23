<template>
	<div>
		<div class="register-wrap" v-show="showRegister">
			<h3>注册</h3>
			<p v-show="showInfo">{{info}}</p>
			<input type="text" placeholder="请输入姓名" v-model="username"/>
			<input type="text" placeholder="请输入密码" v-model="password"/>
			<button v-on:click="register">注册</button>
			<span v-on:click="ToLogin">已有账号？马上登录</span>
		</div>	
		<div class="login-wrap" v-show="showLogin">
			<h3>登录</h3>
			<p v-show="showInfo">{{info}}</p>
			<input type="text" placeholder="请输入姓名" v-model="username"/>
			<input type="text" placeholder="请输入密码" v-model="password"/>
			<button v-on:click="login">登录</button>
			<span v-on:click="ToRegister">没有账号？马上注册</span>
		</div>
	</div>
</template>

<script>
	/*引入公共方法*/
	import {setCookie,getCookie} from '../../assets/js/cookie.js'
	export default{
		data(){
			return{
				username:'',
				password:'',
				showInfo:false,
				info:'',
				showRegister:false,
				showLogin:true
			}
		},
		mounted(){
			 /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
			if(getCookie('username')){
				this.$router.push('/home')
			}
		},
		methods:{
			register(){
				if(this.username === '' ||this.password ===''){
					this.info = '用户名或密码不可为空'
					this.showInfo = true
				}else{
					let data = {'username':this.username,'password':this.password}
					this.$http.post('/api/user/addUser',data).then((res)=>{
						console.log(res)
						if(res.data == -1){
							this.info = '用户名已存在'
							this.showInfo = true
							this.username = ''
							this.password = ''
						}else if(res.status == 200){
							this.info = '注册成功'
							this.showInfo = true
							this.username = ''
							this.password = ''
							setTimeout(function(){
								this.showRegister = false
								this.showLogin = true
								this.info = ''
							}.bind(this),1000)
						}
					})
				}								
			},
			login(){
				if(this.username === '' || this.password === ''){
					this.info = '用户名或密码不可为空'
					this.showInfo = true
				}else{
					let data = {'username':this.username,'password':this.password}
					this.$http.post('/api/user/selectUser',data).then((res)=>{
						console.log(res)
						if(res.data == -1){
							this.info = '用户名不存在'
							this.showInfo = true
							this.username = ''
							this.password = ''
						}else if(res.data == 0){
							this.info = '密码不正确'
							this.showInfo = true
							this.username = ''
							this.password = ''
						}else if(res.data == 'admin'){
							this.$router.push('/main')
						}else{
							setCookie('username',this.username,1000*60)
							this.$router.push('/home')
						}						
					})
				}
			},
			ToLogin(){
				this.showLogin = true
				this.showRegister = false				
			},
			ToRegister(){
				this.showRegister = true
				this.showLogin = false
			}
		}
	}
</script>

<style scoped>
	.register-wrap,.login-wrap{text-align: center;}
	input{
		display: block;
		width: 250px;
		height: 40px;
		line-height: 40px;
		margin: 0 auto;
		margin-bottom: 10px;
		border: 1px solid #888;
		padding: 10px;
		box-sizing: border-box;
	}
	p{
		color: red;
		margin-bottom: 5px;
	}
	button{
		display: block;
		width: 250px;
		height: 40px;
		line-height: 40px;
		margin: 0 auto;
		border: none;
		background-color: #41B883;
		color: #fff;
		font-size: 16px;
		margin-bottom: 5px;
	}
	span{
		cursor: pointer;
	}
	span:hover{
		color: #41B883;
	}
</style>