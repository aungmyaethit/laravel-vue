<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-gray-900">Shop List</h1>
                <router-link
                    :to="{ name: 'ShopCreate' }"
                    class="px-3 py-2 text-white rounded-md bg-emerald-500 hover:border-emerald-600"
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
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                    Add New Shop</router-link
                >
            </div>
        </template>
        <div v-if="shops.loading" class="flex justify-center">Loading...</div>
        <div v-else>
            <div class="flex flex-wrap -mx-4">
                <ShopListItem
                    v-for="(shop, index) in shops.data"
                    :key="shop.id"
                    :shop="shop"
                    :user="user.data"
                    class="opacity-0 animate-fade-in-down"
                    :style="{ animationDelay: `${index * 0.1}s` }"
                    @delete="deleteShop(shop)"
                />
            </div>
            <div class="flex justify-center mt-5">
                <nav
                    class="relative z-0 inline-flex justify-center -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                >
                    <a
                        v-for="(link, i) of shops.links"
                        :key="i"
                        :disabled="!link.url"
                        href="#"
                        @click="getForPage($event, link)"
                        aria-current="page"
                        class="relative inline-flex items-center px-4 py-2 text-sm font-medium border whitespace-nowrap"
                        :class="[
                            link.active
                                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                            i === 0
                                ? 'rounded-l-md bg-gray-100 text-gray-700'
                                : '',
                            i === shops.links.length - 1 ? 'rounded-r-md' : '',
                        ]"
                        v-html="link.label"
                    >
                    </a>
                </nav>
            </div>
        </div>
    </PageComponent>
</template>

<script setup>
import store from "@/store";
import { computed } from "vue";
import { useRouter } from "vue-router";
import PageComponent from "@/components/PageComponent.vue";
import ShopListItem from "./ShopListItem.vue";

store.dispatch("getShops");
store.dispatch("getUser");

const shops = computed(() => store.state.shops);
const router = useRouter();
const user = store.state.user;

function deleteShop(shop) {
    if (confirm("Are you sure want to delete? Operation can't be undone!!")) {
        store.dispatch("deleteShop", shop.id).then(() => {
            router.push({
                name: "Shops",
            });
        });
    }
}

function getForPage(ev, link) {
    ev.preventDefault();
    if (!link.url || link.active) {
        return;
    }

    store.dispatch("getShops", { url: link.url });
}
</script>

<style>
.c-card img {
    transition: transform 0.3s ease-in-out;
}

.c-card img:hover {
    transform: scale(1.05);
}
</style>
