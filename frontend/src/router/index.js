import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from "@/components/Login";
import Users from "@/components/Users";
import Register from "@/components/Register";
import userProfile from "@/components/Admin/userProfile";

import User from '@/components/Admin/User';
import { hasToken } from "@/middleware/auth";

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },

        {
            path: '/u',
            // redirect: 'Dashboard',
            component: User,
            beforeEnter: hasToken,
            children: [{
                    path: '/',
                    name: 'Dashboard',
                    // component: userProfile
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

        }
    ]
})