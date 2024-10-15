<template>
  <div>
    <div class="MainContainer">
      <div class="FillContainer">
        <div class="MatrixName">Начальная</div>
        <div class="MatrixName">Конечная</div>
        <div class="wrapper">
          <input type="button" v-for="v in StartArr" :key="v" :value="v" :disabled="v===0" @click="Change(v)">
        </div>
        <div class="wrapper">
          <div class="preButton" v-for="v in FinishArr" :key="v">{{ v }}</div>
        </div>
        <input type="button" value="Сброс" @click="Clear">
        <input type="button" value="Дефолт" @click="Default">
      </div>
      <!-- <div>{{ StartMatrix.value }}</div> -->
      <!-- Передача значений через .value -->
      <Canvas :startMatrix="StartMatrix.value" :finishMatrix="FinishMatrix"></Canvas>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import Canvas from '@/components/canvas.vue'

const StartMatrix = reactive({
  value: [[1, 2, 3],
          [4, 5, 6],
          [7, 8, 0],]
}
);



const FinishMatrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 0],
];


const StartArr = ref([].concat(StartMatrix.value[0],StartMatrix.value[1],StartMatrix.value[2] ))
const FinishArr = ref([].concat(FinishMatrix[0],FinishMatrix[1],FinishMatrix[2] ))

const Clear = () => {
  StartMatrix.value = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0],
];
StartArr.value = ([].concat(StartMatrix.value[0],StartMatrix.value[1],StartMatrix.value[2] ))
}

const Default = () => {
  StartMatrix.value = [
    [2, 4, 3],
    [1, 8, 5],
    [7, 0, 6],
];
  StartArr.value = ([].concat(StartMatrix.value[0],StartMatrix.value[1],StartMatrix.value[2] ))
}

const Change = (v) => {
  for (let i = 0; i < StartMatrix.value.length; i++) {
    for (let j = 0; j < StartMatrix.value[i].length; j++) {
      const element = StartMatrix.value[i][j];
      
      // Проверяем, равен ли элемент целевому значению v
      if (element === v) {
        
        if(j > 0 && StartMatrix.value[i][j - 1] === 0)                              {StartMatrix.value[i][j] = 0; StartMatrix.value[i][j-1] = v} // Слева
        else if(j < StartMatrix.value[i].length - 1 && StartMatrix.value[i][j + 1] === 0) {StartMatrix.value[i][j] = 0; StartMatrix.value[i][j + 1] = v}// Справа
        else if(i > 0 && StartMatrix.value[i - 1][j] === 0)                         {StartMatrix.value[i][j] = 0; StartMatrix.value[i - 1][j] = v}// Сверху
        else if(i < StartMatrix.value.length - 1 && StartMatrix.value[i + 1][j] === 0)    {StartMatrix.value[i][j] = 0; StartMatrix.value[i + 1][j] = v}; // Снизу
        
        // console.log(i,j,l, r, u, b);
        StartArr.value = ([].concat(StartMatrix.value[0], StartMatrix.value[1], StartMatrix.value[2]));
        return
      }
    }
  }

  // Обновляем StartArr с первым 3 строками StartMatrix.value
  
  // console.table(StartMatrix.value); // Раскомментируйте для отладки
}


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



.wrapper{
    // width: 120px;
    // height: 120px;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    grid-template-rows: repeat(3,1fr);
    grid-gap: 3px;
    padding: 5px;
    
}
.preButton{
  text-align: center;
  place-content: center;
  border: 1px solid rgb(130, 128, 128);
  background-color: #efefef;
  border-radius: 2px;
}

</style>