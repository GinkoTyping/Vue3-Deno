<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import SInput from '@/components/SInput.vue';
import { login, register } from '@/api';

const router = useRouter();
const form = ref({
  username: '',
  password: '',
});
const isLogin = ref(true);
const texts = computed(() => {
  return isLogin.value
    ? { title: 'Log In', switch: "New here? Register Now" }
    : { title: 'Register', switch: "Member already? Login Now" }
});

async function submit() {
  let res;
  if (isLogin.value) {
    res = await login(form.value);
  } else {
    res = await register(form.value);
  }

  // if a user login or successfully registered an account, auto login
  if (res.isSuccess) {
    sessionStorage.setItem('userId', res.userId);
    sessionStorage.setItem('username', res.username);
    sessionStorage.setItem('points', res.points);
    router.push('/home');
  }

  alert(res.message);
}

</script>

<template>
  <div class="container">
    <div class="login-container">
      <div class="login-container-wrap">
        <h2>{{ texts.title }}</h2>
        <div class="input-container">
          <SInput label="Username" v-model="form.username" />
          <SInput label="Password" type="password" v-model="form.password" />
        </div>
        <button class="primary-button" @click="submit">{{ texts.title }}</button>
        <p class="switch" @click="isLogin = !isLogin">{{ texts.switch }}</p>
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
  background-color: #fff;
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
  background-color: var(--primary-color);
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
