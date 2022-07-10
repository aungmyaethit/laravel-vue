<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-gray-900">
                    Password Change
                </h1>
            </div>
        </template>
        <AlertBox v-if="error.message">
            {{ error.message }}
            <span
                @click="error.message = ''"
                class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-[rgba(0,0,0,0.2)]"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </span>
        </AlertBox>
        <form
            @submit.prevent="changePassword"
            class="mt-5 animate-fade-in-down"
        >
            <div class="shadow sm:rounded-md sm:overflow-hidden">
                <div class="px-4 py-5 space-y-6 bg-white sm:p-6">
                    <!-- password -->
                    <div>
                        <label
                            for="password"
                            class="block text-sm font-medium text-gray-700"
                            >New password</label
                        >
                        <input
                            required
                            type="password"
                            name="password"
                            id="password"
                            v-model="model.password"
                            autocomplete="password"
                            class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <!-- password -->

                    <!-- password_confirmation -->
                    <div>
                        <label
                            for="password_confirmation"
                            class="block text-sm font-medium text-gray-700"
                            >New Password Confirm</label
                        >
                        <input
                            required
                            type="password"
                            name="password_confirmation"
                            id="password_confirmation"
                            v-model="model.password_confirmation"
                            autocomplete="password_confirmation"
                            class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <!-- password_confirmation -->

                    <!-- old_password -->
                    <div>
                        <label
                            for="old_password"
                            class="block text-sm font-medium text-gray-700"
                            >Provide Your Old Password</label
                        >
                        <input
                            required
                            type="password"
                            name="old_password"
                            id="old_password"
                            v-model="model.old_password"
                            autocomplete="old_password"
                            class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <!-- old_password -->
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
import { ref } from "vue";
import store from "@/store";
import PageComponent from "@/components/PageComponent.vue";
import AlertBox from "@/components/AlertComponent.vue";
import { useRouter } from "vue-router";

const router = useRouter();
let model = ref({
    password: null,
    password_confirmation: null,
    old_password: null,
});

let error = ref({
    message: null,
});

function changePassword() {
    store.dispatch("changePassword", { ...model.value }).then(({ data }) => {
        if (data.success) {
            store.dispatch("logout").then(() => {
                router.push({
                    name: "Login",
                });
            });
        } else {
            error.value.message = data.message;
            model.value.old_password = null;
            model.value.password = null;
            model.value.password_confirmation = null;

            store.commit("notify", {
                type: "error",
                message: data.message,
            });
        }
    });
}
</script>

<style></style>
