import {createRouter, createWebHistory} from 'vue-router'
import PostsView from '../views/PostsView.vue'
import PostsStoreView from '../views/PostsStoreView.vue'

const routes = [
    {
        path: '/',
        name: 'posts',
        component: PostsView
    },
    {
        path: '/store',
        name: 'posts-store',
        component: PostsStoreView
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    {
        path: '/posts/:id',
        component: () => import('../views/PostView.vue')
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
