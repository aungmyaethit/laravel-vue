<template>
    <div>
        <PageComponent title="Map">
            <div v-if="shopes.loading" class="flex justify-center">
                Loading...
            </div>

            <GoogleMap
                v-else
                class="animate-fade-in-down"
                api-key="AIzaSyAgGNVZLHZ0s5zjkM21dzmet6M0pz_VINw"
                style="width: 100%; height: 600px"
                zoom-control-position="TOP_LEFT"
                :center="center"
                :zoom-control="true"
                :zoom="13"
                @click="onClickMap"
            >
                <MarkerCluster>
                    <Marker
                        v-for="shop in shopes.data"
                        v-on:click="markerClick"
                        :key="shop.id"
                        :options="{
                            position: {
                                lat: parseFloat(shop.latitude),
                                lng: parseFloat(shop.longitude),
                            },
                        }"
                    >
                        <InfoWindow>
                            <div
                                class="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800"
                            >
                                <img
                                    class="object-cover w-full pl-2 h-96 md:h-auto md:w-48"
                                    :src="shop.image_url"
                                    :alt="shop.name"
                                />
                                <div
                                    class="flex flex-col justify-between p-4 leading-normal"
                                >
                                    <h5
                                        v-text="shop.name"
                                        class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                                    ></h5>
                                    <p
                                        v-text="shop.address"
                                        class="mb-3 font-normal text-gray-700 dark:text-gray-400"
                                    ></p>

                                    <p
                                        class="mb-3 font-normal text-gray-700 dark:text-gray-400"
                                    >
                                        Open Time - {{ shop.hour }}
                                    </p>

                                    <p
                                        class="mb-3 font-normal text-gray-700 dark:text-gray-400"
                                    >
                                        Open Time - {{ shop.hour }}
                                    </p>

                                    <p
                                        class="mb-3 font-normal text-gray-700 dark:text-gray-400"
                                    >
                                        Creator - {{ shop.creator_name }}
                                    </p>
                                    <router-link
                                        :to="{
                                            name: 'ShopDetail',
                                            params: { id: shop.id },
                                        }"
                                    >
                                        <button
                                            class="float-right px-4 py-1 font-bold text-white bg-indigo-500 rounded hover:bg-indigo-700"
                                        >
                                            More
                                        </button>
                                    </router-link>
                                </div>
                            </div>
                        </InfoWindow>
                    </Marker>
                </MarkerCluster>
            </GoogleMap>
        </PageComponent>
    </div>
</template>

<script setup>
import PageComponent from "../components/PageComponent.vue";
import store from "../store";
import { GoogleMap, InfoWindow, Marker, MarkerCluster } from "vue3-google-map";
import { useRouter } from "vue-router";
import { ref, watch } from "vue";
const router = useRouter();

store.dispatch("getShopesLocation");
const shopes = store.state.shopesLocation;
const center = { lat: 16.79920066822827, lng: 96.14941094105113 };
store.dispatch("getUser");

let model = ref({
    id: null,
    user_id: null,
    name: "Custom Name",
    image: null,
    image_url: null,
    latitude: null,
    longitude: null,
    address: "custom address",
    hour: "custom time",
    note: "",
    tag: "Default",
});

watch(
    () => store.state.currentShop.data,
    (newVal) => {
        model.value = {
            ...JSON.parse(JSON.stringify(newVal)),
        };
    }
);

function onClickMap(e) {
    let location;
    location = e.latLng.toJSON();
    model.value.latitude = location.lat;
    model.value.longitude = location.lng;
    if (confirm("Are you sure want to create new marker?")) {
        store.dispatch("saveShop", { ...model.value }).then(({ data }) => {
            router.push({
                name: "ShopView",
                params: { id: data.data.id },
            });
            store.commit("notify", {
                type: "success",
                message: "Shop was successfully Create",
            });
        });
    }
}
</script>
