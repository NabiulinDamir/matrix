<template>
    <div>
        <h1>{{ message }}</h1>
        <button @click="callExternalMethod">Вызвать метод из скрипта</button>
    </div>
</template>

<script>
import { triggerComponentMethod } from '@/scripts/script.js';

export default {
  data() {
    return {
      message: 'Привет, мир!',
    };
  },
  methods: {
    someMethod(text) {
      this.message = text
    },
    callExternalMethod() {
      triggerComponentMethod(this); // Передаем экземпляр компонента
    },
  },
};
</script>

<style lang="scss" scoped>

</style>