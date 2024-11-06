<script setup>
import { ref } from 'vue';

import LinkCard from '@/components/LinkCard.vue';

const userId = ref(-1);

const storedUserId = sessionStorage.getItem('userId');
if (storedUserId) {
  userId.value = Number(storedUserId);
};

</script>

<template>
  <link-card v-for="index in [0, 1, 2, 3]" :key="index" :theme="index % 2 === 0 ? 'light' : 'dark'"/>
</template>