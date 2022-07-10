import { createStore } from "vuex";
import axiosClient from "../axios";

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem("TOKEN"),
        },

        currentShop: {
            loading: false,
            data: {},
        },

        shopes: {
            loading: false,
            links: [],
            data: [],
        },

        shopesLocation: {
            loading: false,
            data: {},
        },

        notification: {
            show: false,
            type: null,
            message: null,
        },
    },
    getters: {},
    actions: {
        register({ commit }, user) {
            return axiosClient.post("/register", user).then((data) => {
                if (data.data.success) {
                    commit("setUser", data.data.user);
                    commit("setToken", data.data.token);
                }
                return data.data;
            });
        },

        resetPassword({}, user) {
            return axiosClient.post("/reset-password", user);
        },

        login({ commit }, user) {
            return axiosClient.post("/login", user).then(({ data }) => {
                commit("setUser", data.user);
                commit("setToken", data.token);
                return data;
            });
        },

        logout({ commit }) {
            return axiosClient.post("/logout").then((res) => {
                commit("logout");
                return res;
            });
        },

        getUser({ commit }) {
            return axiosClient.get("/user").then((res) => {
                commit("setUser", res.data);
            });
        },

        getShopes({ commit }, { url = null } = {}) {
            commit("setShopLoading", true);
            url = url || "shop";
            return axiosClient.get(url).then((res) => {
                commit("setShopLoading", false);
                commit("setShopes", res.data);
                return res;
            });
        },

        getShopesLocation({ commit }) {
            commit("setShopesLocationLoading", true);
            return axiosClient.get(`/shop-location/`).then((res) => {
                commit("setShopesLocationLoading", false);
                commit("setShopesLocation", res.data);
                return res;
            });
        },

        getShop({ commit }, id) {
            commit("setCurrentShopLoading", true);
            return axiosClient
                .get(`/shop/${id}`)
                .then((res) => {
                    commit("setCurrentShop", res.data);
                    commit("setCurrentShopLoading", false);
                    return res;
                })
                .catch((err) => {
                    history.back();
                    commit("setCurrentShopLoading", false);
                    throw err;
                });
        },

        saveShop({ commit }, shop) {
            delete shop.image_url;
            let response;
            if (shop.id) {
                response = axiosClient
                    .put(`/shop/${shop.id}`, shop)
                    .then((res) => {
                        commit("setCurrentShop", res.data);
                        return res;
                    });
            } else {
                response = axiosClient.post("/shop", shop).then((res) => {
                    commit("setCurrentShop", res.data);
                    return res;
                });
            }
            return response;
        },

        deleteShop({ dispatch }, id) {
            return axiosClient.delete(`/shop/${id}`).then((res) => {
                dispatch("getShopes");
                return res;
            });
        },

        getShopBySlug({ commit }, slug) {
            commit("setCurrentShopLoading", true);
            return axiosClient
                .get(`/shop-by-slug/${slug}`)
                .then((res) => {
                    commit("setCurrentShop", res.data);
                    commit("setCurrentShopLoading", false);
                    return res;
                })
                .catch((err) => {
                    commit("setCurrentShopLoading", false);
                    throw err;
                });
        },

        saveProfile({ commit }, user) {
            let response;
            if (user.id) {
                response = axiosClient
                    .post(`/user/profile`, user)
                    .then((res) => {
                        if (res.sucess) {
                            commit("setUser", res.data.data);
                        }
                        return res;
                    });
            }
            return response;
        },

        changePassword({}, user) {
            return axiosClient.post(`/user/password`, user).then((res) => {
                return res;
            });
        },
    },
    mutations: {
        logout: (state) => {
            sessionStorage.removeItem("TOKEN");
            state.user.data = {};
            state.user.token = null;
        },

        setUser: (state, user) => {
            state.user.data = user;
        },
        setToken: (state, token) => {
            state.user.token = token;
            sessionStorage.setItem("TOKEN", token);
        },

        setShopLoading: (state, loading) => {
            state.shopes.loading = loading;
        },

        setShopes: (state, shopes) => {
            state.shopes.links = shopes.meta.links;
            state.shopes.data = shopes.data;
        },

        setShopesLocationLoading: (state, loading) => {
            state.shopesLocation.loading = loading;
        },

        setShopesLocation: (state, shopes) => {
            state.shopesLocation.data = shopes.data;
        },

        setCurrentShopLoading: (state, loading) => {
            state.currentShop.loading = loading;
        },

        setCurrentShop: (state, shop) => {
            state.currentShop.data = shop.data;
        },

        notify: (state, { message, type }) => {
            state.notification.show = true;
            state.notification.type = type;
            state.notification.message = message;
            setTimeout(() => {
                state.notification.show = false;
            }, 3000);
        },
    },
    module: {},
});

export default store;
