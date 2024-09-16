<template>
  <div class="MainContainer">
    <h1>{{ message }}</h1>
    <button @click="callExternalMethod">Вызвать метод из скрипта</button>
    <div class="TreeContainer">
      <div class="LevelContainer"><MatrixComp :Matrix="startMatrix"></MatrixComp></div>
      <div class="LevelContainer" v-for="(level, index) in elementsTree" :key="index">
        <!-- Правильное обращение к элементам уровня -->
        <MatrixComp 
          v-for="(matrix, matrixIndex) in level" 
          :key="matrixIndex" 
          :Matrix="matrix"
        ></MatrixComp>
      </div>

      <!-- <MatrixComp :matrix="startMatrix"></MatrixComp>
      <hr/>
      <MatrixComp :matrix="finishMatrix"></MatrixComp> -->
    </div>
    <!-- <pre>{{ finishMatrix }}</pre> -->
  </div>
</template>

<script setup>
import { triggerComponentMethod } from '@/scripts/script.js';
import { defineProps, ref } from 'vue';
import  MatrixComp  from "@/components/Matrix.vue"

const elementsTree = ref([]);

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

function addStroke(level){
  // console.log(elementsTree.value.length , "-" ,level)
  if(elementsTree.value.length <= level){
    elementsTree.value.push([]);
    // console.log("да")
  }
  else{
    // console.log("наин")
  }
}
function addNode(matrix, level) {
  // Убедитесь, что массив на нужном уровне существует
  if (!elementsTree.value[level]) {
    // Если нет, создаем его
    elementsTree.value[level] = [matrix];
  }
  
  // Добавляем элемент matrix в массив на нужном уровне
  elementsTree.value[level].push(matrix);
}
function ClearCanvas() {
  elementsTree.value = ([]);
  
}
function someMethod(text) {
  message.value = text;
  
}

function callExternalMethod() {
  triggerComponentMethod({ someMethod,addStroke,addNode,ClearCanvas });
}
</script>


<style lang="scss" scoped>
.TreeContainer{
  background-color: blanchedalmond;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.LevelContainer{
  background-color: rgb(255, 255, 255);
  height: 72px;
  width: 100%;
  border-top: 1px solid black;
  display: flex;
  place-content: center;
}
</style>