<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-gray-900">
                    {{ route.params.id ? model.name : "Create a Shop" }}
                </h1>

                <button
                    v-if="route.params.id"
                    type="button"
                    @click="deleteShop()"
                    class="px-3 py-2 text-white bg-red-500 rounded-md hover:border-red-600"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                    </svg>
                    Delete
                </button>
            </div>
        </template>
        <div v-if="shopLoading" class="flex justify-center">Loading...</div>
        <form v-else @submit.prevent="saveShop" class="animate-fade-in-down">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
                <div class="px-4 py-5 space-y-6 bg-white sm:p-6">
                    <!-- Image -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700"
                            >Image
                        </label>
                        <div class="flex items-center mt-1">
                            <img
                                v-if="model.image_url"
                                :src="model.image_url"
                                :alt="model.name"
                                class="object-cover w-64 h-48"
                            />
                            <span
                                v-else
                                class="flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="h-[80%] w-[80%] text-gray-300"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </span>
                            <button
                                type="button"
                                class="relative px-3 py-2 ml-5 overflow-hidden text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <input
                                    type="file"
                                    @change="onImageChoose"
                                    class="absolute top-0 bottom-0 left-0 right-0 opacity-0 cursor-pointer"
                                />
                                Change
                            </button>
                        </div>
                    </div>
                    <!-- Image -->

                    <!-- Name -->
                    <div>
                        <label
                            for="name"
                            class="block text-sm font-medium text-gray-700"
                            >Shop Name</label
                        >
                        <input
                            type="text"
                            name="name"
                            id="name"
                            v-model="model.name"
                            autocomplete="shop_name"
                            class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <!-- Name -->

                    <!-- latitude -->
                    <div>
                        <label
                            for="latitude"
                            class="block text-sm font-medium text-gray-700"
                            >Latitude</label
                        >
                        <input
                            type="text"
                            name="latitude"
                            id="latitude"
                            v-model="model.latitude"
                            autocomplete="shop_latitude"
                            class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <!-- latitude -->

                    <!-- longitude -->
                    <div>
                        <label
                            for="longitude"
                            class="block text-sm font-medium text-gray-700"
                            >Longitude</label
                        >
                        <input
                            type="text"
                            name="longitude"
                            id="longitude"
                            v-model="model.longitude"
                            autocomplete="shop_longitude"
                            class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <!-- longitude -->

                    <!-- address -->
                    <div>
                        <label
                            for="address"
                            class="block text-sm font-medium text-gray-700"
                            >Address</label
                        >
                        <div class="mt-1">
                            <textarea
                                name="address"
                                id="address"
                                rows="3"
                                v-model="model.address"
                                autocomplete="shop_address"
                                class="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Shop Address"
                            ></textarea>
                        </div>
                    </div>
                    <!-- address -->

                    <!-- hour -->
                    <div>
                        <label
                            for="hour"
                            class="block text-sm font-medium text-gray-700"
                            >Open Time</label
                        >
                        <div class="mt-1">
                            <textarea
                                name="hour"
                                id="hour"
                                rows="3"
                                v-model="model.hour"
                                autocomplete="shop_hour"
                                class="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="9:00 AM - 11:00 PM"
                            ></textarea>
                        </div>
                    </div>
                    <!-- hour -->

                    <!-- note -->
                    <div>
                        <label
                            for="note"
                            class="block text-sm font-medium text-gray-700"
                            >Note</label
                        >
                        <div class="mt-1">
                            <textarea
                                name="note"
                                id="note"
                                rows="3"
                                v-model="model.note"
                                autocomplete="shop_note"
                                class="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Something"
                            ></textarea>
                        </div>
                    </div>
                    <!-- note -->

                    <!-- tag -->
                    <div>
                        <label
                            for="tag"
                            class="block text-sm font-medium text-gray-700"
                            >Tag</label
                        >
                        <input
                            type="text"
                            name="tag"
                            id="tag"
                            v-model="model.tag"
                            autocomplete="shop_tag"
                            class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <!-- tag -->
                </div>
                <!-- save -->
                <div class="px-4 py-3 text-right bg-gray-50 sm:px-6">
                    <button
                        type="submit"
                        class="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    </PageComponent>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import store from "@/store";
import PageComponent from "@/components/PageComponent.vue";

const route = useRoute();
const router = useRouter();
const shopLoading = computed(() => store.state.currentShop.loading);

let model = ref({
    id: null,
    user_id: null,
    name: "",
    image: null,
    image_url: null,
    latitude: null,
    longitude: null,
    address: "",
    hour: "",
    note: "",
    tag: "",
});

watch(
    () => store.state.currentShop.data,
    (newVal) => {
        model.value = {
            ...JSON.parse(JSON.stringify(newVal)),
        };
    }
);

if (route.params.id) {
    store.dispatch("getShop", route.params.id);
}

function saveShop() {
    store.dispatch("saveShop", { ...model.value }).then(({ data }) => {
        store.commit("notify", {
            type: "success",
            message: "Shop was successfully updated",
        });
        router.push({
            name: "ShopView",
            params: { id: data.data.id },
        });
    });
}

function onImageChoose(ev) {
    const file = ev.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
        model.value.image = reader.result;

        model.value.image_url = reader.result;
        ev.target.value = "";
    };
    reader.readAsDataURL(file);
}

function deleteShop() {
    if (confirm("Are you sure want to delete? Operation can't be undone!!")) {
        store.dispatch("deleteShop", model.value.id).then(() => {
            router.push({
                name: "Shopes",
            });
        });
    }
}
</script>

<style></style>
