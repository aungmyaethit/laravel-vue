<script setup>
// import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const route = useRoute();
const store = useStore();

// const loading = computed(() => store.state.currentShop.loading);
// const shop = computed(() => store.state.currentShop.data);

store.dispatch("getShopBySlug", route.params.slug);
</script>

<style></style>
