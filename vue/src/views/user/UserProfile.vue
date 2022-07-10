<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-gray-900">Profile</h1>
            </div>
        </template>
        <form @submit.prevent="saveProfile" class="animate-fade-in-down">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
                <div class="px-4 py-5 space-y-6 bg-white sm:p-6">
                    <!-- Image -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700"
                            >Image
                        </label>
                        <div class="flex items-center mt-1">
                            <img
                                v-if="model.profile_image_url"
                                :src="model.profile_image_url"
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
                            >Full Name</label
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

                    <!-- email -->
                    <div>
                        <label
                            for="email"
                            class="block text-sm font-medium text-gray-700"
                            >Email</label
                        >
                        <input
                            type="email"
                            name="email"
                            id="email"
                            v-model="model.email"
                            autocomplete="shop_email"
                            class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <!-- email -->

                    <!-- password -->
                    <div>
                        <label
                            for="password"
                            class="block text-sm font-medium text-gray-700"
                            >Password</label
                        >
                        <input
                            type="password"
                            name="password"
                            id="password"
                            v-model="model.password"
                            autocomplete="shop_password"
                            class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <!-- password -->
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
        <pre>{{ model }}</pre>
    </PageComponent>
</template>

<script setup>
import { ref, watch } from "vue";
import store from "@/store";
import PageComponent from "@/components/PageComponent.vue";

let model = ref({
    id: null,
    name: null,
    profile_image: null,
    profile_image_url: null,
    email: null,
    password: "",
});

watch(
    () => store.state.user.data,
    (newVal) => {
        model.value = {
            ...JSON.parse(JSON.stringify(newVal)),
        };
    }
);

store.dispatch("getUser");

function saveProfile() {
    store.dispatch("saveProfile", { ...model.value }).then(({ data }) => {
        let success = "success";
        if (!data.success) {
            success = "error";
        }
        store.commit("notify", {
            type: success,
            message: data.message,
        });
    });
}

function onImageChoose(ev) {
    const file = ev.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
        model.value.profile_image = reader.result;

        model.value.profile_image_url = reader.result;
        ev.target.value = "";
    };
    reader.readAsDataURL(file);
}
</script>

<style></style>
