<template>
  <div>
    <div class="MainContainer">
    <div class="FillContainer">
      <div class="MatrixName">Начальная</div>
      <div class="MatrixName">Конечная</div>
      <div class="MatrixContainer"><FillMatrix :matrix="matrix" /></div>     <!--сюды первую матрицу-->
      <div class="MatrixContainer"></div>     <!--сюды вторую матрицу-->
      <input type="button" value="rand" @click="randomize">
    </div>
    <Canvas :startMatrix="StartMatrix" :finishMatrix="FinishMatrix"></Canvas>
  </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Canvas from '@/components/canvas.vue'
import FillMatrix from '@/components/FillMatrix.vue'

const matrix = ref([
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 0],
])
</script>

<style lang="scss" scoped>
.FillContainer{
  height: 180px;
  width: 310px;
  background-color: aqua;
  display: grid;
  grid-template-rows: 25px 1fr; 
  grid-template-columns: repeat(2, 1fr);
  
}
.MatrixName{
  text-align: center;
  font-family: 'Roboto', sans-serif;
  // width: 50%;
  height: 25px;
  align-content: center;
}
</style>