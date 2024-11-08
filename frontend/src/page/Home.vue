<script setup>
import { ref, onMounted, computed } from 'vue';

import LinkCard from '@/components/LinkCard.vue';
import { getAllLink, getFavorite } from '@/api';

const userId = ref(-1);
const allLinks = ref([]);
const favoriteLinks = ref([]);
const isShowFavorite = ref(false);
const storedUserId = sessionStorage.getItem('userId');
if (storedUserId) {
  userId.value = Number(storedUserId);
};
const currentList = computed(() => isShowFavorite.value ? favoriteLinks.value : allLinks.value);

onMounted(async () => {
  allLinks.value = await getAllLink();
});

</script>

<template>
  <link-card
    v-for="(link, index) in currentList" 
    :key="link.linkId" 
    :theme="index % 2 === 0 ? 'light' : 'dark'"
    :data="link"
  />
</template>