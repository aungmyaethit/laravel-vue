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

        shops: {
            loading: false,
            links: [],
            data: [],
        },

        shopsLocation: {
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
        // account registration
        register({ commit }, user) {
            return axiosClient.post("/register", user).then((data) => {
                if (data.data.success) {
                    commit("setUser", data.data.user);
                    commit("setToken", data.data.token);
                }
                return data.data;
            });
        },
        //account password change
        resetPassword({}, user) {
            return axiosClient.post("/reset-password", user);
        },
        //account login
        login({ commit }, user) {
            return axiosClient.post("/login", user).then(({ data }) => {
                commit("setUser", data.user);
                commit("setToken", data.token);
                return data;
            });
        },
        //account logout
        logout({ commit }) {
            return axiosClient.post("/logout").then((res) => {
                commit("logout");
                return res;
            });
        },
        //get login user info
        getUser({ commit }) {
            return axiosClient.get("/user").then((res) => {
                commit("setUser", res.data);
            });
        },
        //get all of shope
        getShops({ commit }, { url = null } = {}) {
            commit("setShopLoading", true);
            url = url || "shop";
            return axiosClient.get(url).then((res) => {
                commit("setShopLoading", false);
                commit("setShops", res.data);
                return res;
            });
        },

        // search shop by name, address

        searchShop({ commit }, shop) {
            commit("setShopLoading", true);
            return axiosClient.post("/shop/search", shop).then((res) => {
                console.log(res.data);
                commit("setShopLoading", false);
                commit("setShops", res.data);
                return res;
            });
        },

        filterShop({ commit }, shop) {
            commit("setShopLoading", true);
            return axiosClient.post("/shop/filter", shop).then((res) => {
                console.log(res.data);
                commit("setShopLoading", false);
                commit("setShops", res.data);
                return res;
            });
        },

        //get shops list for map
        getShopsLocation({ commit }) {
            commit("setShopsLocationLoading", true);
            return axiosClient.get(`/shop-location/`).then((res) => {
                commit("setShopsLocationLoading", false);
                commit("setShopsLocation", res.data);
                return res;
            });
        },

        //get shop by id
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
        //create or update shop
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
        // delete shop by id
        deleteShop({ dispatch }, id) {
            return axiosClient.delete(`/shop/${id}`).then((res) => {
                dispatch("getShops");
                return res;
            });
        },

        //for share location for public by slug url
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

        //profile update for user
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

        // password change
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
            state.shops.loading = loading;
        },

        setShops: (state, shops) => {
            state.shops.links = shops.meta.links;
            state.shops.data = shops.data;
        },

        setShopsLocationLoading: (state, loading) => {
            state.shopsLocation.loading = loading;
        },

        setShopsLocation: (state, shops) => {
            state.shopsLocation.data = shops.data;
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
