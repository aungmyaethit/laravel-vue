<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-gray-900">Shop Detail</h1>
                <router-link
                    v-if="user.data.id == shop.data.user_id"
                    class="px-3 py-2 text-white bg-yellow-500 rounded-md hover:border-yellow-600"
                    :to="{
                        name: 'ShopView',
                        params: { id: shop.data.id },
                    }"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="inline-block w-6 h-6 -mt-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                    </svg>
                    Edit</router-link
                >
            </div>
        </template>
        <div v-if="shop.loading" class="flex justify-center">Loading...</div>
        <div
            v-else
            class="block overflow-hidden bg-white rounded-lg shadow-md animate-fade-in-down"
        >
            <div class="pt-10 pb-10">
                <img
                    class="w-8/12 mx-auto"
                    :src="shop.data.image_url"
                    :alt="shop.data.name"
                />
            </div>

            <div class="h-40 p-4">
                <span
                    class="inline-block px-2 py-1 text-xs font-semibold leading-none tracking-wide text-orange-800 uppercase bg-orange-200 rounded-full"
                    v-text="shop.data.tag"
                ></span>
                <h2 class="mt-2 mb-2 font-bold" v-text="shop.data.name"></h2>
                <p class="text-sm" v-text="shop.data.address"></p>
            </div>

            <div class="p-4 text-xs text-gray-700 border-t">
                <span class="flex items-center mb-1">
                    <p class="mt-2 mb-2 font-bold">Open Time</p>
                </span>
                <span class="flex items-center">
                    <p v-text="shop.data.hour"></p>
                </span>
            </div>

            <div class="p-4 text-xs text-gray-700 border-t">
                <span class="flex items-center mb-1">
                    <p class="mt-2 mb-2 font-bold">Note</p>
                    <pre></pre>
                </span>
                <span class="flex items-center">
                    <p v-text="shop.data.note"></p>
                </span>
            </div>

            <div class="p-4 text-xs text-gray-700 border-t border-b">
                <div class="grid grid-flow-col grid-rows-1 gap-4">
                    <div id="profile_img">
                        <img
                            class="w-20 h-20 rounded-full"
                            :src="user.data.profile_image_url"
                            :alt="user.data.name"
                        />
                    </div>
                    <div id="profile_info">
                        <span class="flex items-center mb-1">
                            <p class="mt-2 mb-2">
                                <b>Creator</b> - Aung Nyi Thit
                            </p>
                        </span>
                        <span class="flex items-center mb-1">
                            <p class="mt-2 mb-2">
                                <b>Created Date</b> - {{ shop.data.created_at }}
                            </p>
                        </span>
                        <span class="flex items-center mb-1">
                            <p class="mt-2 mb-2">
                                <b>Updated Date</b> - {{ shop.data.updated_at }}
                            </p>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </PageComponent>
</template>

<script setup>
import { useRoute } from "vue-router";
import store from "@/store";
import PageComponent from "@/components/PageComponent.vue";
const route = useRoute();

store.dispatch("getUser");
const user = store.state.user;
const shop = store.state.currentShop;
if (route.params.id) {
    store.dispatch("getShop", route.params.id);
}
</script>
