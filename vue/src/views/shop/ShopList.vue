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
            <div class="flex justify-end p-4 -mx-4">
                <form
                    class="px-8 pt-6 pb-8 mr-3 bg-white rounded shadow-md"
                    @submit.prevent="searchShop"
                >
                    <div class="mb-4">
                        <span
                            class="block mb-2 text-sm font-bold text-left text-gray-600"
                            >Search Box</span
                        >
                        <div class="relative flex-grow">
                            <input
                                required
                                type="text"
                                name="key"
                                id="key"
                                v-model="search.key"
                                autocomplete="search_key"
                                placeholder="Name, Address, Tag"
                                class="flex-grow w-full py-1 pl-8 pr-2 bg-gray-100 border rounded"
                                :class="
                                    isDragging
                                        ? 'text-gray-600'
                                        : 'text-gray-900'
                                "
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        class="float-right px-2 py-1 text-sm text-white bg-indigo-500 rounded item-end hover:bg-indigo-700"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="inline-block w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        Search
                    </button>
                </form>
                <form
                    class="px-8 pt-6 pb-8 bg-white rounded shadow-md"
                    @submit.prevent="filterShop"
                >
                    <div class="mb-4">
                        <span
                            class="block mb-2 text-sm font-bold text-left text-gray-600"
                            >Fiter by created date</span
                        >
                        <v-date-picker
                            v-model="range"
                            mode="dateTime"
                            :masks="masks"
                            is-range
                        >
                            <template
                                v-slot="{ inputValue, inputEvents, isDragging }"
                            >
                                <div
                                    class="flex flex-col items-center justify-start sm:flex-row"
                                >
                                    <div class="relative flex-grow">
                                        <svg
                                            class="absolute w-4 h-full mx-2 text-gray-600 pointer-events-none"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            ></path>
                                        </svg>
                                        <input
                                            class="flex-grow w-full py-1 pl-8 pr-2 bg-gray-100 border rounded"
                                            :class="
                                                isDragging
                                                    ? 'text-gray-600'
                                                    : 'text-gray-900'
                                            "
                                            :value="inputValue.start"
                                            name="start_date"
                                            v-on="inputEvents.start"
                                        />
                                    </div>
                                    <span class="flex-shrink-0 m-2">
                                        <svg
                                            class="w-4 h-4 text-gray-600 stroke-current"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                                            />
                                        </svg>
                                    </span>
                                    <div class="relative flex-grow">
                                        <svg
                                            class="absolute w-4 h-full mx-2 text-gray-600 pointer-events-none"
                                            fill="none"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            ></path>
                                        </svg>
                                        <input
                                            class="flex-grow w-full py-1 pl-8 pr-2 bg-gray-100 border rounded"
                                            :class="
                                                isDragging
                                                    ? 'text-gray-600'
                                                    : 'text-gray-900'
                                            "
                                            :value="inputValue.end"
                                            name="end_date"
                                            v-on="inputEvents.end"
                                        />
                                    </div>
                                </div>
                            </template>
                        </v-date-picker>
                    </div>
                    <button
                        type="submit"
                        class="float-right px-2 py-1 text-sm text-white bg-indigo-500 rounded item-end hover:bg-indigo-700"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="inline-block w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                            />
                        </svg>
                        Filter
                    </button>
                </form>
            </div>

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
            <!-- pagination -->
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
            <!-- pagination -->
        </div>
    </PageComponent>
</template>

<script setup>
import store from "@/store";
import { watch, ref } from "vue";
import { useRouter } from "vue-router";
import PageComponent from "@/components/PageComponent.vue";
import ShopListItem from "./ShopListItem.vue";

store.dispatch("getUser");
const router = useRouter();
const isDragging = false;
const masks = ref({ input: "YYYY-MM-DD h:mm A" });
const user = store.state.user;
const shops = ref({});
const shop_state = ref({});

const range = ref({
    start: new Date(2022, 1, 1),
    end: new Date(2022, 1, 31),
});

const search = ref({ key: "" });
// const shops = computed(() => store.state.shops);

watch(shop_state, async (newState) => {
    if (newState == "search") {
        store.dispatch("searchShop", { ...search.value });
        shops.value = await store.state.shops;
        shop_state.value = "change";
    }

    if (newState == "filter") {
        store.dispatch("filterShop", { ...range.value });
        shops.value = await store.state.shops;
        shop_state.value = "change";
    }

    if (newState == "default") {
        store.dispatch("getShops");
        shops.value = await store.state.shops;
        shop_state.value = "change";
    }
});

shop_state.value = "default";

function searchShop() {
    shop_state.value = "search";
    // store.dispatch("searchShop", { ...search.value }).then(() => {
    //     alert("ok");
    // });
}

function filterShop() {
    shop_state.value = "filter";
    // store.dispatch("filterShop", { ...range.value }).then(() => {
    //     alert("ok");
    // });
}

function getForPage(ev, link) {
    ev.preventDefault();
    if (!link.url || link.active) {
        return;
    }

    store.dispatch("getShops", { url: link.url });
}

function deleteShop(shop) {
    if (confirm("Are you sure want to delete? Operation can't be undone!!")) {
        store.dispatch("deleteShop", shop.id).then(() => {
            router.push({
                name: "Shops",
            });
        });
    }
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
