<script setup>
import { computed } from 'vue';

const props = defineProps(['label', 'width']);
const model = defineModel();
const currentPlaceholder = computed(() => `Please input your ${(props.label).toLowerCase()}`);

</script>

<template>
  <div class="input-container">
    <label for="username">{{ props?.label }}</label>
    <input type="text" name="username" v-model="model" :placeholder="currentPlaceholder">
  </div>
</template>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 16px;
  width: 100%;
}

.input-container label {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
}

.input-container input {
  box-sizing: border-box;
  width: 100%;
  height: 48px;
  padding: 0 14px;
  font-size: 14px;
  line-height: 48px;
  border-radius: 4px;
  border-width: 1px;
  border-color: rgba(128, 128, 128, 0.315);
}
</style>