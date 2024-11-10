<script setup>
import { computed, ref, watch } from 'vue';
import { updateLinkIsShow, updateLinkLike } from '../api';

const props = defineProps(['theme', 'data', 'visibility']);
const emits = defineEmits(['onSwitchLike']);
const currentUserId = ref(Number(sessionStorage.getItem('userId')));

const colorSettings = computed(() => {
  return props.theme === 'light' 
  ? { 
      primary: { backgroundColor: 'rgb(255, 248, 231)' }, 
      secondary: { backgroundColor: 'rgb(255, 246, 223)' } 
    }
    : { 
      primary: { backgroundColor: 'rgb(255, 240, 205)' }, 
      secondary: { backgroundColor: 'rgb(255, 237, 195)' } 
    }
});

// likeStatus: 0 dislike, 1 like, 2 default
const likeStatus = computed(() => {
  if (row.value.likes.includes(currentUserId.value)) {
    return 1;
  } else if (row.value.dislikes.includes(currentUserId.value)) {
    return 0;
  } else {
    return 2;
  }
});

const row = ref({});
watch(
  () => props.data,
  (val) => {
    row.value = val;
  },
  {
    deep: true,
    immediate: true,
  }
);

async function switchLike(isLike) {
  let status;
  if ((isLike && likeStatus.value === 1) || (!isLike && likeStatus.value === 0)) {
    status = 2;
  } else {
    status = isLike ? 1 : 0;
  }

  const { isSuccess } = await updateLinkLike({
    userId: currentUserId.value,
    linkId: row.value.linkId,
    likeStatus: status,
    previousStatus: likeStatus.value,
    linkUserId: row.value.userId,
  });
  if (isSuccess) {
    emits('onSwitchLike');
  }
}

async function switchVisible(isShow) {
  if (currentUserId.value !== row.value.userId) {
    alert(`Not allow to modify links of ${row.value.username}`);
    return;
  }

  const res = await updateLinkIsShow({
    userId: currentUserId.value,
    linkId: row.value.linkId,
    isShow,
  });
  
  alert(res.message);
  if (res.isSuccess) {
    emits('onSwitchLike');
  }
}

</script>

<template>
  <div class="card-container" :style="colorSettings.primary">
    <div class="colunm colunm-1">{{ row.rating }}</div>
    <div class="colunm colunm-2"> 
      <a class="ellipsis-multiline" :title="row.desc"><b style="color: rgb(136, 136, 136)">[{{ row.title }}] </b>{{ row.desc }}</a> 
    </div>
    <div class="colunm colunm-3">
      <p>{{ row.userName }} [{{ row.userPoints }}]</p>
      <p style="color: rgb(136, 136, 136)">{{ row.createdAt }}</p>
    </div>
    <div class="colunm colunm-4">
      <div 
        class="icon-container" 
        v-show="!props.visibility"
        @click="() => switchLike(true)">
        <img title="Undo like" v-if="likeStatus === 1" src="@/assets/like-fill.png" alt="">
        <img title="like" v-else src="@/assets/like.png" alt="">
        <span>{{ row.likesCount }}</span>
      </div>
      <div 
        class="icon-container"
        v-show="!props.visibility"
        @click="() => switchLike(false)">
        <img title="Undo dilike" v-if="likeStatus === 0" src="@/assets/dislike_fill.png" alt="">
        <img title="dilike" v-else src="@/assets/dislike.png" alt="">
        <span>{{ row.dislikesCount }}</span>
      </div>
      <div class="icon-container" v-show="props.visibility">
        <img title="hide" v-if="row.isShow === 1" @click="() => switchVisible(false)" src="@/assets/show.png" alt="">
        <img title="show" v-else @click="() => switchVisible(true)" src="@/assets/hide.png" alt="">
      </div>
    </div>
  </div>
</template>

<style scoped>
.ellipsis-multiline {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; 
  overflow: hidden;
  text-overflow: ellipsis; 
}
.card-container {
  box-sizing: border-box;
  border: 2px solid white;
  border-bottom: none;
  height: 60px;
  width: 100%;
  background-color: rgb(255, 248, 231);
  display: flex;
  justify-content: space-between;
}
.card-container:first-child {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.card-container:last-child {
  border-bottom: 2px solid white !important;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
.colunm {
  height: 100%;
  box-sizing: border-box;
  border-right: 2px solid white;
}
.colunm-1 {
  width: 45px;
  font-size: 20px;
  line-height: 60px;
  font-family: Arial Black, Helvetica, sans-serif;
  color: rgb(180, 121, 122);
}

.colunm-2 {
  padding: 6px;
  width: calc(100% - 200px - 45px);
  font-size: 13px;
  display: flex;
  align-items: center;
  text-align: left;
}
.colunm-2 a {
  cursor: pointer;
  color: var(--primary-text-color);
}
.colunm-2 a:hover {
  text-decoration: underline;
}

.colunm-3 {
  color: var(--primary-text-color);
}

.colunm-4,.colunm-3 {
  width: 100px;
  font-size: 11px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.colunm-4 p,.colunm-3 p {
  line-height: 20px;
  padding: 0;
  margin: 0;
}

.colunm-4 {
  border-right: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.colunm-4 img {
  width: 22px;
  margin: 0 2px;
  cursor: pointer;
}
.colunm-4 .icon-container {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-family: Arial Black, Helvetica, sans-serif;
  color: rgb(136, 136, 136);
  margin: 0 4px;
}
</style>