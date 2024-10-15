<template>
    <div class="wrapper">
        
    </div>
</template>

<script setup>
import {ref, watch, defineEmits } from "vue"
const props = defineProps({
    TypeMatrix:{
        type: Number,
        required: true
    }

});
const emit = defineEmits();
const sendData = () => {
  emit('dataSent', 'Некоторые данные');
};
// const type = ref(0);
let Matrix = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 0],
];
watch(TypeMatrix => {
    if(TypeMatrix==0){
        Matrix = [
            [2, 4, 3],
            [1, 8, 5],
            [7, 0, 6],
        ];
    }
    else if(TypeMatrix == 1){
        Matrix = [
            [2, 4, 3],
            [1, 8, 5],
            [7, 0, 6],
        ];
    }
    else if(TypeMatrix == 2){
        const numbers = [0,1,2,3,4,5,6,7,8,9]
        const randNumbers = numbers.sort(() => Math.random() - 0.5);
        const newmatrix = [];
    
        for (let i = 0; i < 2; i++) {
            newmatrix[i] = [];
            for (let j = 0; j < 2; j++) {
                // Заполняем матрицу уникальными значениями
                newmatrix[i][j] = randNumbers[i * j + j];
            }
        }
        Matrix = newmatrix;
    }
    console.table(Matrix)
})



let DefaultMAtrix = [
  [2, 4, 3],
  [1, 8, 5],
  [7, 0, 6],
];

const StartMatrix = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 0],
];

let FinishMatrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 0],
];


</script>

<style scoped>
.wrapper{
    width: 120px;
    height: 120px;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    grid-template-rows: repeat(3,1fr);
    grid-gap: 2px;
}
.bg-red{
    background-color:  red;
}
</style>