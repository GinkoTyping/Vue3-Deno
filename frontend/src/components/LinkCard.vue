<script setup>
import { computed, ref, watch } from 'vue';

const props = defineProps(['theme', 'data']);
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

const isLiked = computed(() => row.value.likes.includes(currentUserId.value));
const isDisliked = computed(() => row.value.dislikes.includes(currentUserId.value));

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

</script>

<template>
  <div class="card-container" :style="colorSettings.primary">
    <div class="colunm colunm-1">{{ row.rating }}</div>
    <div class="colunm colunm-2"> 
      <a href="">{{ row.desc }}</a> 
    </div>
    <div class="colunm colunm-3">
      <p>{{ row.userName }}</p>
      <p style="color: rgb(136, 136, 136)">{{ row.createdAt }}</p>
    </div>
    <div class="colunm colunm-4">
      <div class="icon-container">
        <img v-if="isLiked" src="@/assets/like-fill.png" alt="">
        <img v-else src="@/assets/like.png" alt="">
        <span>{{ row.likesCount }}</span>
      </div>
      <div class="icon-container">
        <img v-if="isDisliked" src="@/assets/dislike_fill.png" alt="">
        <img v-else src="@/assets/dislike.png" alt="">
        <span>{{ row.dislikesCount }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
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