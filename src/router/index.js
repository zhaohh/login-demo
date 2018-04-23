import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
//引入页面
import Login from '@/views/login/login.vue'
import Home from '@/views/home/home.vue'
import Main from '@/views/main/main.vue'

Vue.use(Router)

export default new Router({
  routes: [
//  {
//    path: '/',
//    name: 'HelloWorld',
//    component: HelloWorld
//  },
    {
    	path:'/',
    	name:'Login',
    	component:Login
    },
    {
    	path:'/home',
    	name:'Home',
    	component:Home
    },
    {
    	path:'/main',
    	name:'Main',
    	component:Main
    }
  ]
})
