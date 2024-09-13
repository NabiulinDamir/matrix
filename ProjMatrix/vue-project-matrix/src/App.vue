<template>
	<div>
		<Canvas></Canvas>
		<FillMatrix :matrix="matrix" />
    <input type="button" value="rand" @click="randomize">
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

<style lang="scss" scoped></style>
