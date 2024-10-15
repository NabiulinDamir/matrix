<template>
  <div class="MainContainer">
    <h1>{{ message }}</h1>
    <button @click="callExternalMethod">Вызвать метод из скрипта</button><div>шаги:{{ step }}</div>
      <div class="LevelContainer"> <MatrixComp 
    v-for="(matrix, index) in MasNode" 
    :key="index" 
    class="Matrix" 
    :Matrix="matrix[0]" 
    :Level="matrix[1]"
    :G="matrix[2]"
    :Q="matrix[3]"
  /></div>
    </div>

   
  
</template>

<script setup>
import { triggerComponentMethod } from '@/scripts/script.js';
import { defineProps, ref, computed } from 'vue';
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

const message = ref('Дмитрий Ермаков : )');
let MasNode = ref([])


function addElement(Element, level, g, q){
  MasNode.value.push([Element,level, g, q])
}
let step = ref(0);
function AddSteps(){step.value++}

function someMethod(text) {
  message.value = text;
}

let fm = props.finishMatrix

function callExternalMethod() {
  step.value = 0
  MasNode.value = ([]);
  const sm = computed(()=>props.startMatrix).value
  triggerComponentMethod({ sm, fm, someMethod,addElement,AddSteps });
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