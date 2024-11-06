<script setup>
import { computed } from 'vue';

const props = defineProps(['theme']);


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


</script>

<template>
  <div class="card-container" :style="colorSettings.primary">
    <div class="colunm colunm-1">22</div>
    <div class="colunm colunm-2"> 
      <a href="">2024《地心之战》第1赛季 史诗钥石地下城全球锦标赛 国服赛区角色11月8日开战！</a> 
    </div>
    <div class="colunm colunm-3">
      <p>Auther Name</p>
      <p style="color: rgb(136, 136, 136)">2024-03-11</p>
    </div>
    <div class="colunm colunm-4">
      <div class="icon-container">
        <img src="@/assets/like.png" alt="">
        <span>22</span>
      </div>
      <div class="icon-container">
        <img src="@/assets/dislike.png" alt="">
        <span>22</span>
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
  color: rgb(26, 57, 89);
}
.colunm-2 a:hover {
  text-decoration: underline;
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