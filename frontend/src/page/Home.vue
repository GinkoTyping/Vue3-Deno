<script setup>
import LinkCard from '@/components/LinkCard.vue';

</script>

<template>
  <link-card v-for="index in [0, 1, 2, 3]" :key="index" :theme="index % 2 === 0 ? 'light' : 'dark'"/>
</template>