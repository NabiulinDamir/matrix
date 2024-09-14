<template>
    <div>
        <h1>{{ message }}</h1>
        <button @click="callExternalMethod">Вызвать метод из скрипта</button>
        <hr/>
        <MatrixComp :Matrix= "startMatrix"></MatrixComp>
        <hr/>
        <MatrixComp :Matrix= "finishMatrix"></MatrixComp>
        <!-- <pre>{{ finishMatrix }}</pre> -->
    </div>
</template>

<script setup>
import { triggerComponentMethod } from '@/scripts/script.js';
import { defineProps, ref } from 'vue';
import  MatrixComp  from "@/components/Matrix.vue"

const props = defineProps({
  startMatrix: {
    type: Array,
    required: true
  },
  finishMatrix: {
    type: Array,
    required: true
  }
});

const message = ref('Привет, мир!');

function someMethod(text) {
  message.value = text;
}

function callExternalMethod() {
  triggerComponentMethod({ someMethod });
}
</script>


<style lang="scss" scoped>

</style>