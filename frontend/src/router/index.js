import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Login from "@/components/Login";
import Users from "@/components/Users";
import Register from "@/components/Register";
import userProfile from "@/components/Admin/userProfile";

import User from '@/components/Admin/User';
import NotFound from '@/components/NotFound';

import * as guards from "@/middleware/auth";



Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld,
            beforeEnter: guards.isLogged
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            beforeEnter: guards.isLogged

        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            beforeEnter: guards.isLogged
        },

        {
            path: '/u',
            component: User,
            beforeEnter: guards.protectLoggedRoutes,
            children: [{
                    path: '/',
                    name: 'Dashboard',
                    component: Home
                },
                {
                    path: 'all-users',
                    component: Users,
                    name: 'allUsers'
                },
                {
                    path: 'profile/:userId',
                    component: userProfile,
                    name: 'UserProfile'
                }

            ]

        },
        {
            path: '*',
            component: NotFound
        }
    ]
})