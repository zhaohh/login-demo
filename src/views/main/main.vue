<template>
	<div>
		<p>所有注册用户</p>
		<table>
			<tr v-for="(item,index) in list">
				<td v-bind:id="index">用户{{index+1}}</td>
				<td>{{item.username}}</td>
			</tr>
		</table>
		<a href="#" @click="quit">注销登录</a>
	</div>
</template>

<script>
	import {delCookie} from '../../assets/js/cookie.js'
	export default{
		data(){
			return{
				list:''
			}
		},
		mounted(){
			this.$http.get('/api/user/viewUser').then((res)=>{
				this.list = res.data
			})
		},
		methods:{
			quit(){
				delCookie('username','',-1)
				this.$router.push('/')
			}
		}
	}
</script>

<style scoped>
	ul{padding: 0;}
	ul li{list-style: none;}
	table{
		width: 40%;
		margin: 20px auto;
		font-size: 18px;
	}
	a{
		position: absolute;
		float: right;
		right: 10%;
	}
</style>