<template>
  <div class="MainContainer">
    <h1>{{ message }}</h1>
    <button @click="callExternalMethod">Вызвать метод из скрипта</button><div>шаги:{{ step }}</div>
    <!-- <div class="TreeContainer"> -->
      <div class="LevelContainer"><MatrixComp class="Matrix" v-for="matrix in MasNode" :Matrix="matrix"></MatrixComp></div>
        <!-- <div class="LevelContainer" v-for="(level, index) in elementsTree" :key="index">
          <MatrixComp 
            v-for="(matrix, matrixIndex) in level" 
            :key="matrixIndex" 
            :Matrix="matrix"
          ></MatrixComp>
        </div> -->

      <!-- <MatrixComp :matrix="startMatrix"></MatrixComp>
      <hr/>
      <MatrixComp :matrix="finishMatrix"></MatrixComp> -->
    </div>
    <!-- <pre>{{ finishMatrix }}</pre> -->
  <!-- </div> -->
   
  
</template>

<script setup>
import { triggerComponentMethod } from '@/scripts/script.js';
import { defineProps, ref, computed } from 'vue';
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

// console.table(props.startMatrix)

const message = ref('Привет, мир!');
let MasNode = ref([])

function addElement(Element){
  MasNode.value.push(Element)
  // console.log(Element)
}
let step = ref(0);
function AddSteps(){step.value++}

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
function someMethod(text) {
  message.value = text;
  
}



let fm = props.finishMatrix

function callExternalMethod() {
  step.value = 0
  MasNode.value = ([]);
  const sm = computed(()=>props.startMatrix).value
  triggerComponentMethod({ sm, fm, someMethod,addStroke,addNode,addElement,AddSteps });
}
</script>


<style lang="scss" scoped>
.TreeContainer{
  // background-color: blanchedalmond;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.LevelContainer{
  // background-color: rgb(255, 255, 255);
  // // height: 72px;
  width: 100%;
  border-top: 1px solid black;
  display: flex;
  flex-wrap: wrap;
  
  // place-content: center;
  justify-content: flex-end;
  flex-direction: row-reverse;
}
.Matrix{
  margin-right: 30px;
  margin-bottom: 40px;
}
</style>