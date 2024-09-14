<template>
  <div class="MainContainer">
    <div class="FillContainer">
      <div class="MatrixName">Начальная</div>
      <div class="MatrixName">Конечная</div>
      <div class="MatrixContainer"></div>     <!--сюды первую матрицу-->
      <div class="MatrixContainer"></div>     <!--сюды вторую матрицу-->
    </div>
    <Canvas :startMatrix="StartMatrix" :finishMatrix="FinishMatrix"></Canvas>
  </div>
</template>

<script setup>
import Canvas from "@/components/canvas.vue"
let StartMatrix  = [[2, 4, 3],[1, 8, 5],[7, 0, 6],];//здесь должна быть матрица из компонента
let FinishMatrix = [[1, 2, 3],[4, 5, 6],[7, 8, 0],];//здесь должна быть матрица из компонента

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