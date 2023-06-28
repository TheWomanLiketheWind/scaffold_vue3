import { createRouter, createWebHistory } from 'vue-router'

// 1. 定义路由组件.
// 也可以从其他文件导入
const Home = () => import('../view/home/index.vue')
const Title = () => import('../view/title/index.vue')
const About = () => import('../view/about/index.vue')
const Login = () => import('../view/account/login.vue')

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
    {
        path: '/',
        component: Title,
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: Home,
                meta: {
                    title: '首页'
                }
            }
        ]
    },
    {
        path: '/about',
        component: About,
        meta: {
            title: '关于我们',
            isAuthenticated: true // 不校验用户身份，用户可直接访问的路由
        }
    },
    {
        path: '/login',
        component: Login,
        meta: {
            title: '登录',
            isAuthenticated: false // 不校验用户身份，用户可直接访问的路由
        }
    },
    {
        path: '/:pathMatch(.*)*', // 找不到指定页面
        redirect: '/list'
    }
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(import.meta.env.BASE_URL),
    routes // `routes: routes` 的缩写
})
// 全局前置路由
router.beforeEach((to, from, next) => {
    console.log(to)
    if (to.meta.isAuthenticated === false) {
        next()
    } else {
        // 需要验证用户身份
        // console.log(token)
        const token = sessionStorage.getItem('token') || null
        console.log('token', token)
        if (token && to.name != 'login') {
            next()
        } else {
            next('/login')
        }
    }
})

export default router
