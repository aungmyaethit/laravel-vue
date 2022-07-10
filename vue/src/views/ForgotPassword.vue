<template>
    <div>
        <div>
            <img
                class="w-auto h-12 mx-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow"
            />
            <h2 class="mt-6 text-3xl font-extrabold text-center text-gray-900">
                Password Rest your account
            </h2>
            <p class="mt-2 text-sm text-center text-gray-600">
                Or
                {{ " " }}
                <router-link
                    :to="{ name: 'Login' }"
                    class="font-medium text-indigo-600 hover:text-indigo-500"
                >
                    login to your account
                </router-link>
            </p>
        </div>

        <form class="mt-8 space-y-6" @submit="resetPassword">
            <AlertBox v-if="errorMsg">
                {{ errorMsg }}
                <span
                    @click="errorMsg = ''"
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
            <input type="hidden" name="remember" value="true" />
            <div class="-space-y-px rounded-md shadow-sm">
                <div>
                    <label for="email-address" class="sr-only"
                        >Enter Your Account Email</label
                    >
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        autocomplete="email"
                        required=""
                        v-model="user.email"
                        class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Email address"
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    class="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    <span
                        class="absolute inset-y-0 left-0 flex items-center pl-3"
                    >
                        <LockClosedIcon
                            class="w-5 h-5 text-indigo-500 group-hover:text-indigo-400"
                            aria-hidden="true"
                        />
                    </span>
                    Reset Password
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { LockClosedIcon } from "@heroicons/vue/solid";
import store from "../store";
import { useRouter } from "vue-router";
import { ref } from "vue";
import AlertBox from "../components/AlertComponent.vue";

const router = useRouter();
const user = {
    email: "",
};

let errorMsg = ref("");

function resetPassword(ev) {
    ev.preventDefault();
    store.dispatch("resetPassword", user).then(({ data }) => {
        if (data.success) {
            router.push({
                name: "Login",
            });
        } else {
            errorMsg.value = data.message;
        }
    });
}
</script>
