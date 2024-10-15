<template>
    <div>
      <table>
        <tbody  v-if="Matrix && Matrix.length">
          <tr v-for="(row, rowIndex) in Matrix" :key="rowIndex">
            <td v-for="(cell, colIndex) in row" :key="colIndex">{{ cell }}</td>
          </tr>
        </tbody>
      </table>
      L:{{ Level }}
      G:{{ G }}
      Q:{{ Q }}
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    Matrix: {
      type: Array,
    },
    Level: {type: Number},
    G:{type: Number},
    Q:{type: Number},
  });
  // console.log(Level)
  </script>
  
  <style>
  table {
    width: 70px;
    height: 70px;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ccc;
    text-align: center;
    user-select: none;
  }
  
  th {
    background-color: #f2f2f2;
  }
  </style>
  