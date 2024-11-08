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
  <div class="container">
    <header>
      <div class="left">
        <img src="@/assets/logo.png" alt="">
        <div :class="[isShowFavorite ? '' : 'active']">All Links</div>
        <div :class="[isShowFavorite ? 'active' : '']">My Favorite</div>
      </div>
      <div class="right">
        <div class="user">David</div>
        <div class="action">Log Out</div>
      </div>
    </header>
    <div class="link-container">
      <link-card
        v-for="(link, index) in currentList" 
        :key="link.linkId" 
        :theme="index % 2 === 0 ? 'light' : 'dark'"
        :data="link"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: rgb(245, 232, 203);
  height: 100%;
}
.link-container {
  padding: 12px;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  background-color: var(--primary-color);
}

header img {
  height: 50px;
  padding-left: 6px;
}

.right,.left {
  display: flex;
  align-items: center;
}
.active {
  background-color: rgb(89, 24, 4);
  color: #fff;
}
.right div,.left div {
  line-height: 55px;
  box-sizing: border-box;
  width: 102px;
  font-size: 13px;
  cursor: pointer;
}

.right .user {
  background-color: rgb(89, 24, 4);
  color: #fff;
}
.right .action {
  background-color: rgb(255, 240, 205);
}

</style>