<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

import SInput from '@/components/SInput.vue';
import LinkCard from '@/components/LinkCard.vue';
import { getAllLink, getFavorite, getMemberInfo } from '@/api';
import { addNewLink } from '../api';

const router = useRouter();
const userId = ref(Number(sessionStorage.getItem('userId')));
const username = ref(sessionStorage.getItem('username'));
const points = ref(sessionStorage.getItem('points'));

const allLinks = ref([]);
const favoriteLinks = ref([]);
const tabIndex = ref(0);

const currentList = computed(() => {
  if (tabIndex.value === 0) {
    return allLinks.value.filter(link => link.isShow);
  } else if (tabIndex.value === 1) {
    return allLinks.value.filter(link => link.userId === userId.value);
  } else if (tabIndex.value === 2) {
    return favoriteLinks.value.filter(link => link.isShow);
  }
  return [];
});

onMounted(() => {
  init();
});

// TODO sort dont need to query user.
async function init() {
  allLinks.value = await getAllLink(sortInfo.value);

  if (userId.value) {
    await updatePoints();
    await updateFavorites(sortInfo.value);
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

//#region Post Link
const newLinkInfo = ref({
  userId: userId.value,
  title: '',
  desc: '',
});

const isAllowNewLink = computed(() => {
  return newLinkInfo.value.title && newLinkInfo.value.desc;
});

async function postLink() {
  if (newLinkInfo.value.title && newLinkInfo.value.desc) {
    const res = await addNewLink(newLinkInfo.value);
    if (res.isSuccess) {
      alert(res.message);
      init();
    }
  }
}
//#endregion

//#region Sorting
const COLUMN_RATING = 'rating';
const COLUMN_TIME = 'createdAt';
const sortInfo = ref({
  column: COLUMN_TIME,
  isDesc: true,
});

function switchSorting(column) {
  if (sortInfo.value.column === column) {
    sortInfo.value.isDesc = !sortInfo.value.isDesc;
  } else {
    sortInfo.value = { column, isDesc: true };
  }

  init();
}
//#endregion
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
        <div @click="() => onSwitchList(3)" :class="[tabIndex === 3 ? 'active' : '']" v-show="username">
          Post Link
        </div>
      </div>
      <div class="right">
        <div class="user" @click="onClickUsernameOrLogin" :title="`Total Points: ${points}`">
          {{ username ? `${username} [${points}]` : 'Login' }}
        </div>
        <div class="action" @click="() => backToLogin(true)" v-show="username">Log Out</div>
      </div>
    </header>

    <div class="link-container" v-show="tabIndex !== 3">
      <div class="sort sorting rating" @click="() => switchSorting(COLUMN_RATING)"></div>
      <div class="sort created-at" @click="() => switchSorting(COLUMN_TIME)"></div>
      <link-card v-for="(link, index) in currentList" :key="link.linkId" :theme="index % 2 === 0 ? 'light' : 'dark'"
        :data="link" @on-switch-like="handleSwitchLike" :visibility="tabIndex === 1" />
    </div>

    <div class="add-container" v-show="tabIndex === 3">
      <SInput label="Title" v-model="newLinkInfo.title" />
      <SInput label="Description" v-model="newLinkInfo.desc" />
      <button 
        :style="{ cursor: isAllowNewLink ? 'pointer' : 'not-allowed' }" 
        class="add-button" 
        @click="postLink">New Link</button>
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
  position: relative;
}

.link-container .sort {
  position: absolute;
  top: 14px;
  height: 8px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: rgb(189, 123, 104);
}

.sorting {
  height: 4px !important;
  border-bottom-left-radius: 2px !important;
  border-bottom-right-radius: 2px !important;
}

.link-container .created-at {
  width: 94px;
  right: 118px;
}

.link-container .rating {
  width: 40px;
  left: 15px;
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

.add-container {
  margin: 14px auto;
  width: 500px;
}

.add-container .add-button {
  width: 100%;
  padding: 0;
  font-size: 16px;
  border-radius: 4px;
  height: 48px;
  line-height: 48px;
  box-sizing: border-box;
  border: 1px solid #fff;
  background-color: rgb(255, 240, 205);
  color: var(--primary-text-color);
}
</style>