<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

import LinkCard from '@/components/LinkCard.vue';
import { getAllLink, getFavorite, getMemberInfo } from '@/api';

const router = useRouter();
const userId = ref(Number(sessionStorage.getItem('userId')));
const username = ref(sessionStorage.getItem('username'));
const points = ref(sessionStorage.getItem('points'));

const allLinks = ref([]);
const favoriteLinks = ref([]);
const tabIndex = ref(0);

const currentList = computed(() => {
  if (tabIndex.value === 0) {
    return allLinks.value;
  } else if (tabIndex.value === 1) {
    return allLinks.value.filter(link => link.userId === userId.value);
  }
  return favoriteLinks.value;
});

onMounted(() => {
  init();
});

async function init() {
  allLinks.value = await getAllLink();

  if (userId.value) {
    await updatePoints();
    await updateFavorites();
  }
}

function onClickUsernameOrLogin() {
  if (!username.value) {
    backToLogin(false);
  }
}

function backToLogin(needComfirm = false) {
  if (needComfirm) {
    if (confirm('Are you sure to log out?')) {
      router.push('/');
    }
  } else {
    router.push('/');
  }
}

function onSwitchList(index) {
  if (tabIndex.value === index) {
    return;
  }

  tabIndex.value = index;
}

async function updatePoints() {
  const res = await getMemberInfo(username.value);
  points.value = res.points;
}

async function updateFavorites() {
  favoriteLinks.value = await getFavorite(userId.value);
}

function handleSwitchLike() {
  init();
}

</script>

<template>
  <div class="container">
    <header>
      <div class="left">
        <img src="@/assets/logo.png" alt="">
        <div @click="() => onSwitchList(0)" :class="[tabIndex === 0 ? 'active' : '']">
          All Links
        </div>
        <div @click="() => onSwitchList(1)" :class="[tabIndex === 1 ? 'active' : '']" v-show="username">
          My Links
        </div>
        <div @click="() => onSwitchList(2)" :class="[tabIndex === 2 ? 'active' : '']" v-show="username">
          My Favorite
        </div>
      </div>
      <div class="right">
        <div class="user" @click="onClickUsernameOrLogin" :title="`Total Points: ${points}`">
          {{ username ? `${username} (${points})` : 'Login' }}
        </div>
        <div class="action" @click="() => backToLogin(true)" v-show="username">Log Out</div>
      </div>
    </header>
    <div class="link-container">
      <link-card v-for="(link, index) in currentList" :key="link.linkId" :theme="index % 2 === 0 ? 'light' : 'dark'"
        :data="link" @on-switch-like="handleSwitchLike" :visibility="tabIndex === 1"/>
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

.right,
.left {
  display: flex;
  align-items: center;
}

.active {
  background-color: rgb(89, 24, 4);
  color: #fff;
}

.right div,
.left div {
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