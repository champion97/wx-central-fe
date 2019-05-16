import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import Customer from './views/Customer.vue'
import Menu from './views/components/Menu.vue'
import AutoReply from './views/components/AutoReply.vue'
import Mass from './views/components/Mass.vue'

Vue.use(Router)

const router = new Router({
    mode: 'history', //https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90
    base: process.env.BASE_URL,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {x: 0, y: 0};
        }
    },
    routes: [
        {
            path: '/',
            component: Home,
            meta: {
                title: "微信公众号列表",
                requireAuth: true
            }
        },
        {
            path: '/login',
            component: Login,
            meta: {
                title: "登录 - 微信公众号管理平台"
            }
        },
        {
            path: '/app/:id/:name',
            component: Customer,
            children: [
                {
                    path: '',
                    redirect: 'menu'
                },
                {
                    path: 'menu',
                    component: Menu,
                    meta: {
                        path: 'menu',
                        title: "自定义菜单",
                        requireAuth: true
                    }
                },
                {
                    path: 'auto-reply',
                    component: AutoReply,
                    meta: {
                        path: 'auto-reply',
                        title: "自动回复",
                        requireAuth: true
                    }
                },
                {
                    path: 'mass',
                    component: Mass,
                    meta: {
                        path: 'mass',
                        title: "群发",
                        requireAuth: true
                    }
                }
            ]
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})


router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        window.document.title = to.meta.title;
    }

    if (to.matched.some(current => current.meta.requireAuth)) {
        const token = window.localStorage.getItem("wx_token");
        if (token && token !== "") {
            next();
        } else {
            next({
                path: "/login",
                query: {redirect: to.fullPath}
            });
        }
    }

    next();
});


export default router