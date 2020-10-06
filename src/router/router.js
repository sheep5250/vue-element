import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)

import Login from  '../components/login/Login'
import Home from "../components/Home"
const routes = [
    {
        path: '/',
        redirect: "/login"
    },
    {
        path: '/login',
        component : Login
    },
    {
        path: '/home',
        component : Home
    }
]


const router = new VueRouter({
    routes
})

// 导航守卫
router.beforeEach((to,from,next)=>{
    if(to.path === "/login") next()
    // 获取token
    const tokenStr = window.sessionStorage.getItem("token")
    if(!tokenStr) return next('/login')
    next()
})
export default router