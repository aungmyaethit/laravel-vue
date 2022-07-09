import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../components/DefaultLayout.vue";
import AuthLayout from "../components/AuthLayout.vue";
import store from "../store";

import Dashboard from "@/views/DashboardView.vue";
import Login from "@/views/LoginView.vue";
import Register from "@/views/RegisterView.vue";
import ShopView from "@/views/shop/ShopView.vue";
import ShopList from "@/views/shop/ShopList.vue";
import ShopPublicView from "@/views/shop/ShopPublicView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            redirect: "/dashboard",
            component: DefaultLayout,
            meta: { requiresAuth: true },
            children: [
                { path: "/dashboard", name: "Dashboard", component: Dashboard },
                { path: "/shop-list", name: "Shopes", component: ShopList },
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
                { path: "/register", name: "Register", component: Register },
            ],
        },
    ],
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !store.state.user.token) {
        next({ name: "Login" });
    } else if (store.state.user.token && to.meta.isGuest) {
        next({ name: "Dashboard" });
    } else {
        next();
    }
});

export default router;
