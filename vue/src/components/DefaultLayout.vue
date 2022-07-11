<template>
    <div class="min-h-full">
        <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
            <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            <img
                                class="w-8 h-8"
                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                alt="Workflow"
                            />
                        </div>
                        <div class="hidden md:block">
                            <div class="flex items-baseline ml-10 space-x-4">
                                <router-link
                                    v-for="item in navigation"
                                    :key="item.name"
                                    :to="item.to"
                                    active-class="text-white bg-gray-900"
                                    class="px-3 py-2 text-sm font-medium text-white rounded-md"
                                    >{{ item.name }}</router-link
                                >
                            </div>
                        </div>
                    </div>
                    <div class="hidden md:block">
                        <div class="flex items-center ml-4 md:ml-6">
                            <!-- Profile dropdown -->
                            <Menu as="div" class="relative ml-3">
                                <div>
                                    <MenuButton
                                        class="flex items-center max-w-xs text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                    >
                                        <span class="sr-only"
                                            >Open user menu</span
                                        >
                                        <img
                                            class="w-8 h-8 rounded-full"
                                            :src="user.profile_image_url"
                                            alt=""
                                        />
                                    </MenuButton>
                                </div>
                                <transition
                                    enter-active-class="transition duration-100 ease-out"
                                    enter-from-class="transform scale-95 opacity-0"
                                    enter-to-class="transform scale-100 opacity-100"
                                    leave-active-class="transition duration-75 ease-in"
                                    leave-from-class="transform scale-100 opacity-100"
                                    leave-to-class="transform scale-95 opacity-0"
                                >
                                    <MenuItems
                                        class="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    >
                                        <MenuItem
                                            v-for="item in userNavigation"
                                            :key="item.name"
                                            v-slot="{ active }"
                                        >
                                            <RouterLink
                                                :to="item.to"
                                                :class="[
                                                    active ? 'bg-gray-100' : '',
                                                    'block px-4 py-2 text-sm text-gray-700 cursor-pointer',
                                                ]"
                                                >{{ item.name }}</RouterLink
                                            >
                                        </MenuItem>
                                        <MenuItem v-slot="{ active }">
                                            <a
                                                @click="logout"
                                                :class="[
                                                    active ? 'bg-gray-100' : '',
                                                    'block px-4 py-2 text-sm text-gray-700 cursor-pointer',
                                                ]"
                                                >Logout</a
                                            >
                                        </MenuItem>
                                    </MenuItems>
                                </transition>
                            </Menu>
                        </div>
                    </div>
                    <div class="flex -mr-2 md:hidden">
                        <!-- Mobile menu button -->
                        <DisclosureButton
                            class="inline-flex items-center justify-center p-2 text-gray-400 bg-gray-800 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                        >
                            <span class="sr-only">Open main menu</span>
                            <MenuIcon
                                v-if="!open"
                                class="block w-6 h-6"
                                aria-hidden="true"
                            />
                            <XIcon
                                v-else
                                class="block w-6 h-6"
                                aria-hidden="true"
                            />
                        </DisclosureButton>
                    </div>
                </div>
            </div>

            <DisclosurePanel class="md:hidden">
                <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <router-link
                        v-for="item in navigation"
                        :key="item.name"
                        as="a"
                        :to="item.to"
                        active-class="text-white bg-gray-900"
                        class="block px-3 py-2 text-base font-medium text-white rounded-md"
                        >{{ item.name }}</router-link
                    >
                </div>
                <div class="pt-4 pb-3 border-t border-gray-700">
                    <div class="flex items-center px-5">
                        <div class="flex-shrink-0">
                            <img
                                class="w-10 h-10 rounded-full"
                                :src="user.profile_image_url"
                                alt=""
                            />
                        </div>
                        <div class="ml-3">
                            <div
                                class="text-base font-medium leading-none text-white"
                            >
                                {{ user.name }}
                            </div>
                            <div
                                class="text-sm font-medium leading-none text-gray-400"
                            >
                                {{ user.email }}
                            </div>
                        </div>
                    </div>
                    <div class="px-2 mt-3 space-y-1">
                        <RouterLink
                            v-for="item in userNavigation"
                            :key="item.name"
                            as="a"
                            :to="item.to"
                            class="block px-3 py-2 text-base font-medium text-gray-400 rounded-md cursor-pointer hover:text-white hover:bg-gray-700"
                            >{{ item.name }}</RouterLink
                        >
                        <DisclosureButton
                            as="a"
                            @click="logout"
                            class="block px-3 py-2 text-base font-medium text-gray-400 rounded-md cursor-pointer hover:text-white hover:bg-gray-700"
                        >
                            Logout
                        </DisclosureButton>
                    </div>
                </div>
            </DisclosurePanel>
        </Disclosure>
        <router-view></router-view>
        <NotificationBox />
    </div>
</template>

<script setup>
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from "@headlessui/vue";

import { MenuIcon, XIcon } from "@heroicons/vue/outline";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import NotificationBox from "./NotificationBox.vue";

const navigation = [
    { name: "Map", to: { name: "Map" } },
    { name: "Shop", to: { name: "Shopes" } },
];
const userNavigation = [
    { name: "Your Profile", to: { name: "UserProfile" } },
    { name: "Password Change", to: { name: "UserPassword" } },
];

const store = useStore();
const user = computed(() => store.state.user.data);

const router = useRouter();

function logout() {
    store.dispatch("logout").then(() => {
        router.push({
            name: "Login",
        });
    });
}
</script>
