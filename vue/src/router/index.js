import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/components/DefaultLayout.vue";
import AuthLayout from "@/components/AuthLayout.vue";
import store from "@/store";

import Login from "@/views/LoginView.vue";
import Register from "@/views/RegisterView.vue";
import ShopView from "@/views/shop/ShopView.vue";
import ShopList from "@/views/shop/ShopList.vue";
import ShopPublicView from "@/views/shop/ShopPublicView.vue";
import ShopDetail from "@/views/shop/ShopDetail.vue";
import MapView from "@/views/MapView.vue";
import UserProfile from "@/views/user/UserProfile.vue";
import UserPassword from "@/views/user/UserPassword.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            redirect: "/map",
            component: DefaultLayout,
            meta: { requiresAuth: true },
            children: [
                {
                    path: "/map",
                    name: "Map",
                    component: MapView,
                },
                {
                    path: "/shop-list",
                    name: "Shops",
                    component: ShopList,
                },
                {
                    path: "/shop/create",
                    name: "ShopCreate",
                    component: ShopView,
                },
                {
                    path: "/shop/:id",
                    name: "ShopView",
                    component: ShopView,
                },
                {
                    path: "/shop-detail/:id",
                    name: "ShopDetail",
                    component: ShopDetail,
                },

                {
                    path: "/user/profile",
                    name: "UserProfile",
                    component: UserProfile,
                },

                {
                    path: "/user/password",
                    name: "UserPassword",
                    component: UserPassword,
                },
            ],
        },

        {
            path: "/view/shop/:slug",
            name: "ShopPublicView",
            component: ShopPublicView,
        },
        {
            path: "/auth",
            redirect: "/login",
            name: "Auth",
            component: AuthLayout,
            meta: { isGuest: true },
            children: [
                { path: "/login", name: "Login", component: Login },
                {
                    path: "/forgot-password",
                    name: "ForgotPassword",
                    component: ForgotPassword,
                },
                { path: "/register", name: "Register", component: Register },
            ],
        },
    ],
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user.token) {
        next({ name: "Login" });
    } else if (store.state.user.token && to.meta.isGuest) {
        next({ name: "MapView" });
    } else {
        next();
    }
});

export default router;
