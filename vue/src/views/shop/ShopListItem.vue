<template>
    <div class="p-4 sm:w-1/2 md:w-1/2 xl:w-1/3">
        <div
            class="block overflow-hidden bg-white rounded-lg shadow-md c-card hover:shadow-xl"
        >
            <div class="relative pb-48 overflow-hidden">
                <img
                    class="absolute inset-0 object-cover w-full h-full"
                    :src="shop.image_url"
                    alt=""
                />
            </div>

            <div class="h-40 p-4">
                <span
                    class="inline-block px-2 py-1 text-xs font-semibold leading-none tracking-wide text-orange-800 uppercase bg-orange-200 rounded-full"
                    v-text="shop.tag"
                ></span>
                <h2 class="mt-2 mb-2 font-bold" v-text="shop.name"></h2>
                <p class="text-sm" v-text="shop.address"></p>
            </div>

            <div class="p-4 text-xs text-gray-700 border-t">
                <span class="flex items-center mb-1">
                    <p class="mt-2 mb-2 font-bold">Open Time</p>
                </span>
                <span class="flex items-center">
                    <p v-text="shop.hour"></p>
                </span>
            </div>

            <div class="p-4 text-xs text-gray-700 border-t border-b">
                <span class="flex items-center mb-1">
                    <p class="mt-2 mb-2">
                        <b>Creator</b> - {{ shop.creator_name }}
                    </p>
                </span>
                <span class="flex items-center mb-1">
                    <p class="mt-2 mb-2">
                        <b>Created Date</b> - {{ shop.created_at }}
                    </p>
                </span>
                <span class="flex items-center mb-1">
                    <p class="mt-2 mb-2">
                        <b>Updated Date</b> - {{ shop.updated_at }}
                    </p>
                </span>
            </div>

            <div class="flex justify-start p-4 space-x-5 text-sm item-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>

                <router-link
                    :to="{ name: 'ShopDetail', params: { id: shop.id } }"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                    </svg>
                </router-link>
                <router-link
                    v-if="user.id == shop.user_id"
                    :to="{ name: 'ShopView', params: { id: shop.id } }"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6 text-yellow-500"
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
                </router-link>
                <button
                    type="button"
                    @click="emit('delete', shop)"
                    v-if="user.id == shop.user_id || user.is_admin"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6 text-red-500"
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
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
// eslint-disable-next-line vue/no-setup-props-destructure
defineProps({
    shop: Object,
    user: Object,
});

const emit = defineEmits(["delete"]);
</script>
