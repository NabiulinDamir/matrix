<template>
    <div class="wrapper">
        <input type="button" v-for="v in arr" :key="v" :value="v" :disabled="v===0">
    </div>
</template>

<script setup>
import {ref} from "vue"
const props = defineProps(["matrix"])
const arr = ref([].concat(props.matrix[0],props.matrix[1],props.matrix[2] ))
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