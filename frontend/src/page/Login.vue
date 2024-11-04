<script setup>
import { ref } from 'vue';

import SInput from '@/components/SInput.vue';
import { login, test } from '@/api';

const form = ref({
  username: 'jasmine',
  password: '666666',
});

function submit() {
  login(form.value);
}

</script>

<template>
  <div class="container">
    <div class="login-container">
      <div class="login-container-wrap">
        <h2>Log In</h2>
        <div class="input-container">
          <SInput label="Username" v-model="form.username"/>
          <SInput label="Password" v-model="form.password"/>
        </div>
        <button class="primary-button" @click="submit">Log In</button>
        <p class="switch">New here? Register Now</p>
      </div>
    </div>
    <div class="img-container">
      <div class="logo"></div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
}
.login-container {
  width: 50%;
  max-width: 500px;
  margin: 0 auto;
  padding: 0 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.login-container-wrap {
  width: 100%;
}
.img-container {
  width: 50%;
  background-color: rgb(183, 225, 221);
  display: flex;
  justify-content: center;
  align-items: center;
}
.img-container .logo {
  height: 400px;
  width: 80%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url('@/assets/logo.png');
}
.switch {
  text-align: right;
  font-size: 14px;
  cursor: pointer;
}
.switch:hover {
  color: #00000069;
}
</style>

