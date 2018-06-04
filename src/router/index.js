import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import SignUp from '@/components/SignUp'

Vue.use(Router)

export default new Router({
  routes: [
  	{path: '', redirect: '/login'},
    {
		path: '/login', name: 'Login', component: Login
    },
    {
    	path: '/home', name: 'Home', component: Home
    },
    {
    	path: '/signUp', name: 'SignUp', component: SignUp
    }
  ]
})
